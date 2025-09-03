from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.responses import StreamingResponse, JSONResponse
from pydantic import BaseModel, EmailStr
from sqlalchemy import delete, text, inspect
from sqlalchemy.orm import selectinload
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime
from typing import Dict, List, Any
from models import User, Role, UserRoleLink, RoleEnum
from database import get_async_db, get_database_type
from security.auth import get_current_user, required_roles
import json
import io
# Logging konfigurieren
import traceback
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/admin", tags=["admin"])


class UserResponse(BaseModel):
    id: int
    email: str
    roles: List[str]


@router.get("/users", response_model=List[UserResponse], dependencies=[Depends(required_roles([RoleEnum.ADMIN.value]))])
async def get_all_users(
        db: AsyncSession = Depends(get_async_db),
        current_user: User = Depends(get_current_user)
):
    # Explizit die Rollen des aktuellen Benutzers laden
    refreshed_user = await db.scalar(
        select(User)
        .where(User.id == current_user.id)
        .options(selectinload(User.roles))
    )

    # Überprüfen auf Admin-Rolle
    if not any(role.name == RoleEnum.ADMIN.value for role in refreshed_user.roles):
        raise HTTPException(status_code=403, detail="Nicht autorisiert")

    # Alle Benutzer mit Rollen laden
    users = await db.scalars(
        select(User)
        .options(selectinload(User.roles)))

    return [
        UserResponse(
            id=user.id,
            email=user.email,
            roles=[role.name for role in user.roles]
        ) for user in users.all()
    ]


class UpdateRolesRequest(BaseModel):
    roles: List[str]


@router.put("/user/{user_id}/roles", response_model=UserResponse, dependencies=[Depends(required_roles([RoleEnum.ADMIN.value]))])
async def update_user_roles(
        user_id: int,
        roles_data: UpdateRolesRequest,
        db: AsyncSession = Depends(get_async_db),
        current_user: User = Depends(get_current_user)
):
    # Explizit die Rollen des aktuellen Benutzers laden
    refreshed_user = await db.scalar(
        select(User)
        .where(User.id == current_user.id)
        .options(selectinload(User.roles))
    )

    # Überprüfen auf Admin-Rolle
    if not any(role.name == RoleEnum.ADMIN.value for role in refreshed_user.roles):
        raise HTTPException(status_code=403, detail="Nicht autorisiert")

    # Benutzer laden
    user = await db.scalar(select(User).where(User.id == user_id))
    if not user:
        raise HTTPException(status_code=404, detail="Benutzer nicht gefunden")

    # Vorhandene Rollen entfernen
    await db.execute(delete(UserRoleLink).where(UserRoleLink.user_id == user_id))

    # Neue Rollen hinzufügen
    for role_name in roles_data.roles:
        role = await db.scalar(select(Role).where(Role.name == role_name))
        if role:
            db.add(UserRoleLink(user_id=user_id, role_id=role.id))

    await db.commit()
    await db.refresh(user)

    # Rollen explizit laden für die Antwort
    user_with_roles = await db.scalar(
        select(User)
        .where(User.id == user_id)
        .options(selectinload(User.roles))
    )

    return UserResponse(
        id=user_with_roles.id,
        email=user_with_roles.email,
        roles=[role.name for role in user_with_roles.roles]
    )


@router.get("/backup", dependencies=[Depends(required_roles([RoleEnum.ADMIN.value]))])
async def backup_database(
        db: AsyncSession = Depends(get_async_db),
        current_user: User = Depends(get_current_user)
):
    db_type = get_database_type(db)
    logger.info(f"Database type detected: {db_type}")
    try:
        # Tabellen in der richtigen Reihenfolge sichern (wegen Fremdschlüssel)
        tables_in_order = [
            'role',  # Unabhängige Tabelle
            'users',  # Benutzer (Referenziert role über Many-to-Many)
            'userrolelink',  # Many-to-Many Verknüpfung
            'profile',  # Profil (Referenziert user)
            'category',  # Kategorien
            'categorycategory',  # Many-to-Many für Kategorie-Hierarchie
            'teacher',  # Lehrer
            'lesson',  # Lektionen (Referenziert category)
            'content',  # Inhalte (Referenziert lesson und teacher)
            'userlessonlink'  # Fortschritt (Referenziert user und lesson)
        ]

        backup_content = []
        backup_content.append("-- FreeSchool Database Backup")
        backup_content.append(f"-- Generated at: {datetime.now().isoformat()}")
        backup_content.append(f"-- Database type: {db_type}")
        backup_content.append("")

        # Datenbankspezifische Vorbereitung
        if db_type == 'sqlite':
            backup_content.append("PRAGMA foreign_keys = OFF;")
        elif db_type == 'postgresql':
            backup_content.append("SET CONSTRAINTS ALL DEFERRED;")
        else:  # MySQL/MariaDB
            backup_content.append("SET FOREIGN_KEY_CHECKS=0;")
        backup_content.append("")

        for table in tables_in_order:

            backup_content.append(f"-- Table: {table}")
            # Datenbankspezifisches Löschen
            if db_type == 'postgresql':
                backup_content.append(f"TRUNCATE TABLE {table} CASCADE;")
            else:
                backup_content.append(f"DELETE FROM {table};")

            # Daten abrufen
            try:
                result = await db.execute(text(f"SELECT * FROM {table}"))
                rows = result.all()
                logger.info(f"Backup Table: {table} with {len(rows)} Objects")
                if rows:
                    # Spaltennamen ermitteln
                    columns = list(rows[0]._mapping.keys())

                    for row in rows:
                        values = []
                        for col in columns:
                            value = getattr(row, col)
                            if value is None:
                                values.append("NULL")
                            elif isinstance(value, str):
                                # Escape single quotes für PostgreSQL
                                escaped_value = value.replace("'", "''")
                                values.append(f"'{escaped_value}'")
                            elif isinstance(value, datetime):
                                values.append(f"'{value.isoformat()}'")
                            elif isinstance(value, bool):
                                if db_type == 'postgresql':
                                    values.append("TRUE" if value else "FALSE")
                                elif db_type == 'sqlite':
                                    values.append("1" if value else "0")
                            else:
                                values.append(str(value))

                            # Reservierte Schlüsselwörter in Backticks setzen
                            safe_columns = []
                            for col in columns:
                                if col.lower() in ['order', 'group', 'select', 'where', 'from']:
                                    safe_columns.append(f'"{col}"')
                                else:
                                    safe_columns.append(col)

                        insert_sql = f"INSERT INTO {table} ({', '.join(safe_columns)}) VALUES ({', '.join(values)});"
                        backup_content.append(insert_sql)
            except Exception as e:
                logger.warning(f"Could not backup table {table}: {str(e)}")
                backup_content.append(f"-- Error backing up table {table}: {str(e)}")

            backup_content.append("")

        # Datenbankspezifische Nachbereitung
        if db_type == 'sqlite':
            backup_content.append("PRAGMA foreign_keys = ON;")
        elif db_type == 'postgresql':
            backup_content.append("SET CONSTRAINTS ALL IMMEDIATE;")
        else:  # MySQL/MariaDB
            backup_content.append("SET FOREIGN_KEY_CHECKS=1;")

        # In Datei umwandeln
        backup_text = "\n".join(backup_content)
        backup_bytes = backup_text.encode('utf-8')

        return StreamingResponse(
            io.BytesIO(backup_bytes),
            media_type="application/sql",
            headers={
                "Content-Disposition": f"attachment; filename=freeschool_backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.sql"
            }
        )

    except Exception as e:
        logger.error(f"Backup error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Backup fehlgeschlagen: {str(e)}")


class ImportRequest(BaseModel):
    sql_content: str


# Universelle Lösung für alle Datenbanktypen
@router.post("/import", dependencies=[Depends(required_roles([RoleEnum.ADMIN.value]))])
async def import_database(
        import_data: ImportRequest,
        db: AsyncSession = Depends(get_async_db),
        current_user: User = Depends(get_current_user)
):
    try:
        logger.info(f"Starting database import for user {current_user.email}")

        db_type = get_database_type(db)
        logger.info(f"Database type detected: {db_type}")

        # SQL-Statements aufteilen
        statements = []
        current_statement = ""
        in_quotes = False
        quote_char = None

        lines = import_data.sql_content.split('\n')
        logger.info(f"Processing {len(lines)} lines of SQL")

        for i, line in enumerate(lines):
            line = line.strip()
            if line.startswith('--') or not line:
                continue

            for char in line:
                if char in ['"', "'"] and not in_quotes:
                    in_quotes = True
                    quote_char = char
                elif char == quote_char and in_quotes:
                    in_quotes = False
                    quote_char = None

                current_statement += char

                if char == ';' and not in_quotes:
                    statements.append(current_statement.strip())
                    current_statement = ""
                    in_quotes = False
                    quote_char = None

        # Falls am Ende noch ein Statement ohne Semikolon vorhanden ist
        if current_statement.strip():
            statements.append(current_statement.strip())

        logger.info(f"Found {len(statements)} SQL statements")

        # Sicherheitscheck: Nur bestimmte SQL-Befehle erlauben
        allowed_commands = ['INSERT', 'DELETE', 'TRUNCATE']
        # Datenbankspezifische Constraint-Befehle erlauben
        if db_type == 'sqlite':
            allowed_commands.append('PRAGMA')
        elif db_type == 'postgresql':
            allowed_commands.extend(['SET', 'CONSTRAINTS'])
        elif db_type in ['mysql', 'mariadb']:
            allowed_commands.extend(['SET', 'FOREIGN_KEY_CHECKS'])
        filtered_statements = []

        for stmt in statements:
            # Prüfen ob der Befehl erlaubt ist
            stmt_upper = stmt.upper()
            is_allowed = any(stmt_upper.startswith(cmd) for cmd in allowed_commands)

            # Spezielle Constraint-Befehle für verschiedene Datenbanken erlauben
            if not is_allowed:
                if db_type == 'postgresql' and ('SET CONSTRAINTS' in stmt_upper or 'CONSTRAINTS ALL' in stmt_upper):
                    is_allowed = True
                elif db_type in ['mysql', 'mariadb'] and ('SET FOREIGN_KEY_CHECKS' in stmt_upper):
                    is_allowed = True

            if is_allowed:
                # Für SQLite: TRUNCATE in DELETE umwandeln
                if db_type == 'sqlite' and stmt_upper.startswith('TRUNCATE'):
                    # TRUNCATE TABLE table_name CASCADE; -> DELETE FROM table_name;
                    table_name = stmt.split()[2]  # TRUNCATE TABLE table_name
                    if 'CASCADE' in stmt_upper:
                        delete_stmt = f"DELETE FROM {table_name};"
                    else:
                        delete_stmt = f"DELETE FROM {table_name};"
                    filtered_statements.append(delete_stmt)
                    logger.info(f"Converted TRUNCATE to DELETE: {delete_stmt}")
                else:
                    filtered_statements.append(stmt)
            else:
                logger.warning(f"Skipping unauthorized SQL command: {stmt[:100]}...")

        logger.info(f"Executing {len(filtered_statements)} filtered statements")

        # Datenbankspezifische Vorbereitung (falls nicht schon im SQL enthalten)
        constraint_already_set = any(
            ('PRAGMA FOREIGN_KEYS' in s.upper() or
             'SET CONSTRAINTS' in s.upper() or
             'SET FOREIGN_KEY_CHECKS' in s.upper())
            for s in filtered_statements
        )
        if not constraint_already_set:
            if db_type == 'sqlite':
                await db.execute(text("PRAGMA foreign_keys = OFF;"))
            elif db_type == 'postgresql':
                await db.execute(text("SET CONSTRAINTS ALL DEFERRED;"))
            elif db_type in ['mysql', 'mariadb']:
                await db.execute(text("SET FOREIGN_KEY_CHECKS=0;"))
            await db.commit()
            logger.info(f"Disabled constraints for {db_type}")

        # Alle Statements ausführen
        executed_count = 0
        for i, statement in enumerate(filtered_statements):
            if statement.strip():
                try:
                    logger.debug(f"Executing statement {i + 1}: {statement[:100]}...")
                    await db.execute(text(statement))
                    executed_count += 1
                except Exception as e:
                    logger.error(f"Error executing statement {i + 1}: {statement[:100]}... - {str(e)}")
                    await db.rollback()
                    # Constraints wieder normal setzen
                    await reset_constraints(db, db_type)
                    raise

        # Constraints wieder normal setzen (falls nicht schon im SQL enthalten)
        constraint_already_reset = any(
            ('PRAGMA FOREIGN_KEYS = ON' in s.upper() or
             'SET CONSTRAINTS ALL IMMEDIATE' in s.upper() or
             'SET FOREIGN_KEY_CHECKS=1' in s.upper())
            for s in filtered_statements
        )

        if not constraint_already_reset:
            await reset_constraints(db, db_type)

        await db.commit()
        logger.info(f"Import completed successfully, executed {executed_count} statements")

        return {
            "message": "Import erfolgreich",
            "statements_executed": executed_count,
            "statements_skipped": len(statements) - len(filtered_statements),
            "database_type": db_type
        }

    except Exception as e:
        logger.error(f"Import failed: {str(e)}")
        logger.error(traceback.format_exc())
        await db.rollback()
        await reset_constraints(db, get_database_type(db))
        raise HTTPException(status_code=500, detail=f"Import fehlgeschlagen: {str(e)}")


async def reset_constraints(db: AsyncSession, db_type: str):
    """Setzt Constraints für verschiedene Datenbanktypen zurück"""
    try:
        if db_type == 'sqlite':
            await db.execute(text("PRAGMA foreign_keys = ON;"))
        elif db_type == 'postgresql':
            await db.execute(text("SET CONSTRAINTS ALL IMMEDIATE;"))
        elif db_type in ['mysql', 'mariadb']:
            await db.execute(text("SET FOREIGN_KEY_CHECKS=1;"))
        await db.commit()
        logger.info(f"Reset constraints for {db_type}")
    except Exception as e:
        logger.error(f"Failed to reset constraints for {db_type}: {str(e)}")


# routers/admin_router.py
class ImportRequest(BaseModel):
    json_data: Dict[str, List[Dict[str, Any]]]


@router.post("/import/json", dependencies=[Depends(required_roles([RoleEnum.ADMIN.value]))])
async def import_database_json(
        import_data: ImportRequest,
        db: AsyncSession = Depends(get_async_db),
        current_user: User = Depends(get_current_user)
):
    try:
        imported_count = 0
        skipped_count = 0

        # Tabellen in der richtigen Reihenfolge verarbeiten
        tables_in_order = [
            'role', 'user', 'user_role_link', 'profile',
            'category', 'categorycategory', 'teacher',
            'lesson', 'content', 'userlessonlink'
        ]

        for table in tables_in_order:
            if table in import_data.json_data:
                table_data = import_data.json_data[table]

                for row_data in table_data:
                    try:
                        # Prüfen ob die ID bereits existiert
                        if 'id' in row_data:
                            existing = await db.execute(
                                text(f"SELECT id FROM {table} WHERE id = :id"),
                                {"id": row_data['id']}
                            )
                            if existing.scalar():
                                logger.info(f"Skipping existing {table} with ID {row_data['id']}")
                                skipped_count += 1
                                continue

                        # Insert statement erstellen
                        columns = list(row_data.keys())
                        values = list(row_data.values())
                        placeholders = [f":{col}" for col in columns]

                        insert_sql = f"""
                            INSERT INTO {table} ({', '.join(columns)})
                            VALUES ({', '.join(placeholders)})
                        """

                        await db.execute(text(insert_sql), row_data)
                        imported_count += 1

                    except Exception as e:
                        logger.error(f"Error importing {table} row: {str(e)}")
                        skipped_count += 1

        await db.commit()

        return {
            "message": "Import erfolgreich",
            "imported_count": imported_count,
            "skipped_count": skipped_count
        }

    except Exception as e:
        await db.rollback()
        logger.error(f"Import error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Import fehlgeschlagen: {str(e)}")


@router.get("/backup/json", dependencies=[Depends(required_roles([RoleEnum.ADMIN.value]))])
async def backup_database_json(
        db: AsyncSession = Depends(get_async_db),
        current_user: User = Depends(get_current_user)
):
    try:
        backup_data = {}

        # Tabellen in der richtigen Reihenfolge
        tables_in_order = [
            'role', 'user', 'user_role_link', 'profile',
            'category', 'categorycategory', 'teacher',
            'lesson', 'content', 'userlessonlink'
        ]

        for table in tables_in_order:
            try:
                result = await db.execute(text(f"SELECT * FROM {table} WHERE is_deleted = FALSE"))
                rows = result.all()

                if rows:
                    # Convert rows to dictionaries
                    table_data = []
                    for row in rows:
                        row_dict = dict(row._mapping)
                        # Convert UUID objects to strings
                        for key, value in row_dict.items():
                            if hasattr(value, 'hex'):
                                row_dict[key] = str(value)
                        table_data.append(row_dict)

                    backup_data[table] = table_data
            except Exception as e:
                logger.warning(f"Could not backup table {table}: {str(e)}")

        # Create JSON response
        json_data = json.dumps(backup_data, indent=2, default=str)

        return JSONResponse(
            content=backup_data,
            media_type="application/json",
            headers={
                "Content-Disposition": f"attachment; filename=freeschool_backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
            }
        )

    except Exception as e:
        logger.error(f"Backup error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Backup fehlgeschlagen: {str(e)}")
