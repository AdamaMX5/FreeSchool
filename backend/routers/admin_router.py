from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, EmailStr
from sqlalchemy import delete, text, inspect
from sqlalchemy.orm import selectinload
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime
from typing import List
from models import User, Role, UserRoleLink, RoleEnum
from database import get_async_db
from security.auth import get_current_user, required_roles
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
    try:
        # Tabellen in der richtigen Reihenfolge sichern (wegen Fremdschlüssel)
        # Die Reihenfolge ist wichtig: Eltern-Tabellen zuerst, dann Kind-Tabellen
        tables_in_order = [
            'role',  # Unabhängige Tabelle
            'user',  # Benutzer (Referenziert role über Many-to-Many)
            'user_role_link',  # Many-to-Many Verknüpfung
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
        backup_content.append("--")
        backup_content.append("SET FOREIGN_KEY_CHECKS=0;")
        backup_content.append("")

        for table in tables_in_order:
            backup_content.append(f"-- Table: {table}")
            backup_content.append(f"DELETE FROM {table};")

            # Daten abrufen
            try:
                result = await db.execute(text(f"SELECT * FROM {table}"))
                rows = result.all()

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
                                # Escape single quotes
                                escaped_value = value.replace("'", "''")
                                values.append(f"'{escaped_value}'")
                            elif isinstance(value, datetime):
                                values.append(f"'{value.isoformat()}'")
                            elif isinstance(value, bool):
                                values.append("1" if value else "0")
                            else:
                                values.append(str(value))

                                insert_sql = f"INSERT INTO {table} ({', '.join(columns)}) VALUES ({', '.join(values)});"
                                backup_content.append(insert_sql)
            except Exception as e:
                logger.warning(f"Could not backup table {table}: {str(e)}")
                backup_content.append(f"-- Error backing up table {table}: {str(e)}")

            backup_content.append("")

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


@router.post("/import", dependencies=[Depends(required_roles([RoleEnum.ADMIN.value]))])
async def import_database(
        import_data: ImportRequest,
        db: AsyncSession = Depends(get_async_db),
        current_user: User = Depends(get_current_user)
):
    try:
        # SQL-Statements aufteilen
        statements = []
        current_statement = ""

        for line in import_data.sql_content.split('\n'):
            line = line.strip()
            if line.startswith('--') or not line:
                continue

            current_statement += line + " "
            if line.endswith(';'):
                statements.append(current_statement.strip())
                current_statement = ""

        # Sicherheitscheck: Nur bestimmte SQL-Befehle erlauben
        allowed_commands = ['INSERT', 'DELETE', 'SET FOREIGN_KEY_CHECKS']
        filtered_statements = []

        for stmt in statements:
            # Prüfen ob der Befehl erlaubt ist
            if any(stmt.upper().startswith(cmd) for cmd in allowed_commands):
                filtered_statements.append(stmt)
            else:
                logger.warning(f"Skipping unauthorized SQL command: {stmt[:100]}...")

        # Transaktion starten
        async with db.begin():
            # FOREIGN_KEY_CHECKS zuerst setzen
            await db.execute(text("SET FOREIGN_KEY_CHECKS=0;"))

            for statement in filtered_statements:
                if statement.strip():
                    try:
                        await db.execute(text(statement))
                    except Exception as e:
                        logger.error(f"Error executing statement: {statement[:100]}... - {str(e)}")
                        raise

            # FOREIGN_KEY_CHECKS wieder aktivieren
            await db.execute(text("SET FOREIGN_KEY_CHECKS=1;"))

        await db.commit()
        return {
            "message": "Import erfolgreich",
            "statements_executed": len(filtered_statements),
            "statements_skipped": len(statements) - len(filtered_statements)
        }

    except Exception as e:
        await db.rollback()
        logger.error(f"Import error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Import fehlgeschlagen: {str(e)}")
