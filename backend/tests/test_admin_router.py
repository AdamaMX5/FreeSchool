# tests/test_admin_router.py
import pytest
from fastapi import status
from sqlalchemy import text, insert
from sqlalchemy.orm import selectinload
from sqlalchemy.future import select
from models import User, Role, UserRoleLink, RoleEnum, Category, Lesson, Teacher, Content
from tests.test_utils import create_test_user
from conftest import test_db
from database import get_database_type


# Logging konfigurieren
import traceback
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class TestAdminRouter:

    @pytest.mark.asyncio
    async def test_get_all_users_with_admin_role(self, test_client, test_db, auth_client):
        """Test Abfragen aller Benutzer mit Admin-Rolle"""
        try:
            # Admin user erstellen und login
            admin_user = await create_test_user(test_db, "admin", [RoleEnum.ADMIN.value])
            token = await auth_client.login("admin", [RoleEnum.ADMIN.value])
            headers = auth_client.get_headers("admin")

            # Weitere Test-Benutzer erstellen
            user1 = await create_test_user(test_db, "user1", [RoleEnum.STUDENT.value])
            user2 = await create_test_user(test_db, "user2", [RoleEnum.TEACHER.value])

            response = test_client.get("/admin/users", headers=headers)
            logger.warning(f"Response Status: {response.status_code}")
            logger.warning(f"Response: {response.text}")

            assert response.status_code == status.HTTP_200_OK
            data = response.json()
            assert len(data) >= 3  # Admin + 2 weitere Benutzer
            assert any(user["email"] == "admin@example.com" for user in data)
            assert any(user["email"] == "user1@example.com" for user in data)
            assert any(user["email"] == "user2@example.com" for user in data)

        except Exception as e:
            logger.warning(f"Exception occurred: {e}")
            logger.warning(f"Stacktrace: {traceback.format_exc()}")
            raise

    @pytest.mark.asyncio
    async def test_get_all_users_without_admin_role(self, test_client, test_db, auth_client):
        """Test Abfragen aller Benutzer ohne Admin-Rolle (sollte fehlschlagen)"""
        try:
            # Normaler User ohne Admin-Rechte
            token = await auth_client.login("student", [RoleEnum.STUDENT.value])
            headers = auth_client.get_headers("student")

            response = test_client.get("/admin/users", headers=headers)
            logger.warning(f"Response Status: {response.status_code}")

            # Sollte 403 Forbidden zurückgeben
            assert response.status_code == status.HTTP_403_FORBIDDEN

        except Exception as e:
            logger.warning(f"Exception occurred: {e}")
            logger.warning(f"Stacktrace: {traceback.format_exc()}")
            raise

    @pytest.mark.asyncio
    async def test_get_all_users_without_auth(self, test_client, test_db):
        """Test Abfragen aller Benutzer ohne Authentifizierung"""
        response = test_client.get("/admin/users")
        # Sollte 401 oder 403 zurückgeben
        assert response.status_code in [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN]

    @pytest.mark.asyncio
    async def test_update_user_roles_with_admin_role(self, test_client, test_db, auth_client):
        """Test Aktualisieren von Benutzerrollen mit Admin-Rechten"""
        try:
            # Admin user erstellen und login
            admin_user = await create_test_user(test_db, "admin", [RoleEnum.ADMIN.value])
            token = await auth_client.login("admin", [RoleEnum.ADMIN.value])
            headers = auth_client.get_headers("admin")

            # Ziel-Benutzer erstellen (ohne Rollen)
            target_user = await create_test_user(test_db, "targetuser", [])

            # Rollen aktualisieren
            update_data = {
                "roles": [RoleEnum.TEACHER.value, RoleEnum.MODERATOR.value]
            }

            response = test_client.put(
                f"/admin/user/{target_user.id}/roles",
                json=update_data,
                headers=headers
            )

            logger.warning(f"Response Status: {response.status_code}")
            logger.warning(f"Response: {response.text}")

            assert response.status_code == status.HTTP_200_OK
            data = response.json()
            assert data["id"] == target_user.id
            assert data["email"] == "targetuser@example.com"
            assert set(data["roles"]) == {RoleEnum.TEACHER.value, RoleEnum.MODERATOR.value}

            # In Datenbank überprüfen
            target_user_with_roles = await test_db.scalar(
                select(User)
                .where(User.id == target_user.id)
                .options(selectinload(User.roles))
            )
            role_names = [role.name for role in target_user_with_roles.roles]
            assert set(role_names) == {RoleEnum.TEACHER.value, RoleEnum.MODERATOR.value}

        except Exception as e:
            logger.warning(f"Exception occurred: {e}")
            logger.warning(f"Stacktrace: {traceback.format_exc()}")
            raise

    @pytest.mark.asyncio
    async def test_update_user_roles_remove_all_roles(self, test_client, test_db, auth_client):
        """Test Entfernen aller Rollen von einem Benutzer"""
        try:
            # Admin user erstellen und login
            admin_user = await create_test_user(test_db, "admin", [RoleEnum.ADMIN.value])
            token = await auth_client.login("admin", [RoleEnum.ADMIN.value])
            headers = auth_client.get_headers("admin")

            # Ziel-Benutzer mit Rollen erstellen
            target_user = await create_test_user(test_db, "targetuser",
                                                 [RoleEnum.TEACHER.value, RoleEnum.STUDENT.value])

            # Alle Rollen entfernen
            update_data = {"roles": []}

            response = test_client.put(
                f"/admin/user/{target_user.id}/roles",
                json=update_data,
                headers=headers
            )

            assert response.status_code == status.HTTP_200_OK
            data = response.json()
            assert data["roles"] == []

            # In Datenbank überprüfen
            target_user_with_roles = await test_db.scalar(
                select(User)
                .where(User.id == target_user.id)
                .options(selectinload(User.roles))
            )
            assert len(target_user_with_roles.roles) == 0

        except Exception as e:
            logger.warning(f"Exception occurred: {e}")
            logger.warning(f"Stacktrace: {traceback.format_exc()}")
            raise

    @pytest.mark.asyncio
    async def test_update_user_roles_without_admin_role(self, test_client, test_db, auth_client):
        """Test Aktualisieren von Rollen ohne Admin-Rechte (sollte fehlschlagen)"""
        try:
            # Normaler User ohne Admin-Rechte
            token = await auth_client.login("teacher", [RoleEnum.TEACHER.value])
            headers = auth_client.get_headers("teacher")

            # Ziel-Benutzer erstellen
            target_user = await create_test_user(test_db, "targetuser", [])

            update_data = {"roles": [RoleEnum.STUDENT.value]}

            response = test_client.put(
                f"/admin/user/{target_user.id}/roles",
                json=update_data,
                headers=headers
            )

            # Sollte 403 Forbidden zurückgeben
            assert response.status_code == status.HTTP_403_FORBIDDEN

        except Exception as e:
            logger.warning(f"Exception occurred: {e}")
            logger.warning(f"Stacktrace: {traceback.format_exc()}")
            raise

    @pytest.mark.asyncio
    async def test_update_nonexistent_user_roles(self, test_client, test_db, auth_client):
        """Test Aktualisieren von Rollen eines nicht existierenden Benutzers"""
        try:
            # Admin user erstellen und login
            admin_user = await create_test_user(test_db, "admin", [RoleEnum.ADMIN.value])
            token = await auth_client.login("admin", [RoleEnum.ADMIN.value])
            headers = auth_client.get_headers("admin")

            update_data = {"roles": [RoleEnum.STUDENT.value]}

            response = test_client.put(
                "/admin/user/999/roles",
                json=update_data,
                headers=headers
            )

            # Sollte 404 Not Found zurückgeben
            assert response.status_code == status.HTTP_404_NOT_FOUND

        except Exception as e:
            logger.warning(f"Exception occurred: {e}")
            logger.warning(f"Stacktrace: {traceback.format_exc()}")
            raise

    @pytest.mark.asyncio
    async def test_update_user_roles_with_invalid_role(self, test_client, test_db, auth_client):
        """Test Aktualisieren mit ungültigen Rollennamen"""
        try:
            # Admin user erstellen und login
            admin_user = await create_test_user(test_db, "admin", [RoleEnum.ADMIN.value])
            token = await auth_client.login("admin", [RoleEnum.ADMIN.value])
            headers = auth_client.get_headers("admin")

            # Ziel-Benutzer erstellen
            target_user = await create_test_user(test_db, "targetuser", [])

            # Ungültige Rolle
            update_data = {"roles": ["INVALID_ROLE", RoleEnum.STUDENT.value]}

            response = test_client.put(
                f"/admin/user/{target_user.id}/roles",
                json=update_data,
                headers=headers
            )

            # Sollte trotzdem 200 OK zurückgeben, aber nur die gültige Rolle setzen
            assert response.status_code == status.HTTP_200_OK
            data = response.json()
            assert data["roles"] == [RoleEnum.STUDENT.value]

        except Exception as e:
            logger.warning(f"Exception occurred: {e}")
            logger.warning(f"Stacktrace: {traceback.format_exc()}")
            raise

    @pytest.mark.asyncio
    async def test_user_response_structure(self, test_client, test_db, auth_client):
        """Test dass die UserResponse die korrekte Struktur hat"""
        try:
            # Admin user erstellen und login
            admin_user = await create_test_user(test_db, "admin", [RoleEnum.ADMIN.value])
            token = await auth_client.login("admin", [RoleEnum.ADMIN.value])
            headers = auth_client.get_headers("admin")

            response = test_client.get("/admin/users", headers=headers)
            assert response.status_code == status.HTTP_200_OK

            data = response.json()
            assert len(data) > 0

            # Überprüfe die Struktur des ersten Users
            user = data[0]
            assert "id" in user
            assert "email" in user
            assert "roles" in user
            assert isinstance(user["roles"], list)

        except Exception as e:
            logger.warning(f"Exception occurred: {e}")
            logger.warning(f"Stacktrace: {traceback.format_exc()}")
            raise

    @pytest.mark.asyncio
    async def test_backup_database_with_admin_role(self, test_client, test_db, auth_client):
        """Test Backup-Funktion mit Admin-Rechten"""
        try:
            # Admin user erstellen und login
            admin_user = await create_test_user(test_db, "admin", [RoleEnum.ADMIN.value])
            token = await auth_client.login("admin", [RoleEnum.ADMIN.value])
            headers = auth_client.get_headers("admin")

            # Testdaten erstellen
            category = Category(name="Test Category", background_link="/test.jpg")
            test_db.add(category)
            await test_db.commit()
            await test_db.refresh(category)

            teacher = Teacher(name="Test Teacher", email="teacher@test.com", city="Test City", country="Test Country")
            test_db.add(teacher)
            await test_db.commit()
            await test_db.refresh(teacher)

            lesson = Lesson(name="Test Lesson", description="Test Description",
                            position_x=100, position_y=200, category_id=category.id)
            test_db.add(lesson)
            await test_db.commit()
            await test_db.refresh(lesson)

            response = test_client.get("/admin/backup", headers=headers)
            logger.warning(f"Response Status: {response.status_code}")
            logger.warning(f"Response: {response.text}")

            assert response.status_code == status.HTTP_200_OK
            assert response.headers["content-type"] == "application/sql"
            assert "attachment" in response.headers["content-disposition"]
            assert ".sql" in response.headers["content-disposition"]

            # Backup-Inhalt überprüfen
            backup_content = response.content.decode('utf-8')
            logger.warning(f"Backup content length: {len(backup_content)}")

            assert "-- FreeSchool Database Backup" in backup_content

            # Datenbanktyp erkennen und entsprechende Befehle prüfen
            db_type = get_database_type(test_db)

            if db_type == 'sqlite':
                assert "PRAGMA foreign_keys = OFF" in backup_content
                assert "PRAGMA foreign_keys = ON" in backup_content
                assert "DELETE FROM" in backup_content
            elif db_type == 'postgresql':
                assert "SET CONSTRAINTS ALL DEFERRED" in backup_content
                assert "SET CONSTRAINTS ALL IMMEDIATE" in backup_content
                assert "TRUNCATE TABLE" in backup_content
            else:  # MySQL/MariaDB
                assert "SET FOREIGN_KEY_CHECKS=0" in backup_content
                assert "SET FOREIGN_KEY_CHECKS=1" in backup_content

            # Wichtige Überprüfung: Nur EIN INSERT pro Zeile, nicht pro Spalte!
            assert "INSERT INTO" in backup_content

            # Spezifische Überprüfungen für korrekten Backup-Inhalt
            lines = backup_content.split('\n')
            insert_count = 0
            for line in lines:
                if line.strip().startswith('INSERT INTO'):
                    insert_count += 1
                    # Jeder INSERT sollte alle Spaltenwerte enthalten
                    assert line.count('VALUES') == 1
                    assert line.count('(') == 2  # Spaltenliste und Werte
                    assert line.count(')') == 2

            logger.warning(f"Found {insert_count} INSERT statements")

            # Sollte mehrere INSERTs haben, aber nicht zu viele
            assert insert_count >= 3  # Mindestens role, user, category, teacher, lesson
            assert insert_count < 50  # Sollte nicht hunderte von INSERTs sein

            # Überprüfen dass keine kaputten INSERTs vorhanden sind
            # Angepasst an das neue Format mit deleted_at Feld
            assert "INSERT INTO role (id, deleted_at, name) VALUES (1, NULL, 'STUDENT');" in backup_content
            assert "INSERT INTO role (id, deleted_at, name) VALUES (1, NULL);" not in backup_content

            # Überprüfen dass wichtige Tabellen enthalten sind
            expected_tables = ['role', 'user', 'category', 'teacher', 'lesson']
            for table in expected_tables:
                assert f"INSERT INTO {table}" in backup_content

            # Überprüfen dass die Testdaten enthalten sind
            assert "Test Category" in backup_content
            assert "Test Teacher" in backup_content
            assert "Test Lesson" in backup_content

        except Exception as e:
            logger.warning(f"Exception occurred: {e}")
            logger.warning(f"Stacktrace: {traceback.format_exc()}")
            raise

    @pytest.mark.asyncio
    async def test_backup_database_without_admin_role(self, test_client, test_db, auth_client):
        """Test Backup-Funktion ohne Admin-Rechte (sollte fehlschlagen)"""
        try:
            # Normaler User ohne Admin-Rechte
            token = await auth_client.login("student", [RoleEnum.STUDENT.value])
            headers = auth_client.get_headers("student")

            response = test_client.get("/admin/backup", headers=headers)

            # Sollte 403 Forbidden zurückgeben
            assert response.status_code == status.HTTP_403_FORBIDDEN

        except Exception as e:
            logger.warning(f"Exception occurred: {e}")
            logger.warning(f"Stacktrace: {traceback.format_exc()}")
            raise

    @pytest.mark.asyncio
    async def test_import_database_with_admin_role(self, test_client, test_db, auth_client):
        """Test Import-Funktion mit Admin-Rechten"""
        try:
            # Admin user erstellen und login
            admin_user = await create_test_user(test_db, "admin", [RoleEnum.ADMIN.value])
            token = await auth_client.login("admin", [RoleEnum.ADMIN.value])
            headers = auth_client.get_headers("admin")

            # PostgreSQL-kompatibler SQL-Inhalt
            # SQL mit allen erforderlichen Feldern für die user-Tabelle
            sql_content = """
-- FreeSchool Database Backup
-- Generated at: 2025-09-09T15:02:14.216020
-- Database type: sqlite

PRAGMA foreign_keys = OFF;

-- Table: role
DELETE FROM role;
INSERT INTO role (id, deleted_at, name) VALUES (1, NULL, 'STUDENT');
INSERT INTO role (id, deleted_at, name) VALUES (2, NULL, 'TEACHER');
INSERT INTO role (id, deleted_at, name) VALUES (3, NULL, 'TUTOR');
INSERT INTO role (id, deleted_at, name) VALUES (4, NULL, 'PROJECTMANAGER');
INSERT INTO role (id, deleted_at, name) VALUES (5, NULL, 'SCHOOLDIRECTOR');
INSERT INTO role (id, deleted_at, name) VALUES (6, NULL, 'MODERATOR');
INSERT INTO role (id, deleted_at, name) VALUES (7, NULL, 'ADMIN');

-- Table: users
DELETE FROM users;
INSERT INTO users (id, deleted_at, email, hashed_password, jwt, password_verify, password_reset_token, email_verify_token, email_verify, last_login, comment, last_editor) VALUES (1, NULL, 'admin@example.com', '$argon2id$v=19$m=6
5536,t=3,p=4$3fu/t5Yy5vy/t7aWstZ6zw$QvvZlCL8lTpzoG7irePIhUMI2dleKvG5Z6ijzjq5tJE', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsInN1YmlkIjoxLCJleHAiOjE3NTc1MDkzMzR9.sesS_CMiXs1oOUzgEfuNlf3z_aHRRvQeAgY
lNW-6nsU', 1, NULL, NULL, 1, '2025-09-09 15:02:14.056979', 'a Testuser', 'pytest');

-- Table: userrolelink
DELETE FROM userrolelink;
INSERT INTO userrolelink (user_id, role_id) VALUES (1, 7);

-- Table: profile
DELETE FROM profile;

-- Table: category
DELETE FROM category;
INSERT INTO category (id, deleted_at, name, background_link) VALUES (1, NULL, 'Test Category', '/test.jpg');

-- Table: categorycategory
DELETE FROM categorycategory;

-- Table: teacher
DELETE FROM teacher;
INSERT INTO teacher (id, deleted_at, name, email, city, country, language) VALUES (1, NULL, 'Test Teacher', 'teacher@test.com', 'Test City', 'Test Country', 'de');

-- Table: lesson
DELETE FROM lesson;
INSERT INTO lesson (id, deleted_at, name, description, display_order, position_x, position_y, category_id) VALUES (1, NULL, 'Test Lesson', 'Test Description', NULL, 100, 200, 1);

-- Table: content
DELETE FROM content;

-- Table: userlessonlink
DELETE FROM userlessonlink;

PRAGMA foreign_keys = ON;
                    """

            import_data= {"sql_content": sql_content}

            response = test_client.post(
                "/admin/import",
                json=import_data,
                headers=headers
            )

            assert response.status_code == status.HTTP_200_OK
            data = response.json()
            assert data["message"] == "Import erfolgreich"
            assert data["statements_executed"] > 0

            # Überprüfen ob Daten importiert wurden
            imported_user = await test_db.scalar(
                select(User).where(User.email == "admin@example.com")
            )
            assert imported_user is not None
            assert imported_user.email == "admin@example.com"

        except Exception as e:
            logger.warning(f"Exception occurred: {e}")
            logger.warning(f"Stacktrace: {traceback.format_exc()}")
            raise

    @pytest.mark.asyncio
    async def test_import_database_with_invalid_sql(self, test_client, test_db, auth_client):
        """Test Import-Funktion mit ungültigem SQL"""
        try:
            # Admin user erstellen und login
            admin_user = await create_test_user(test_db, "admin", [RoleEnum.ADMIN.value])
            token = await auth_client.login("admin", [RoleEnum.ADMIN.value])
            headers = auth_client.get_headers("admin")

            # Ungültiges SQL
            sql_content = "INVALID SQL SYNTAX; DROP TABLE user;"

            import_data = {"sql_content": sql_content}

            response = test_client.post(
                "/admin/import",
                json=import_data,
                headers=headers
            )

            # Sollte fehlschlagen
            assert response.status_code == status.HTTP_500_INTERNAL_SERVER_ERROR
            data = response.json()
            assert "Import fehlgeschlagen" in data["detail"]

        except Exception as e:
            logger.warning(f"Exception occurred: {e}")
            logger.warning(f"Stacktrace: {traceback.format_exc()}")
            raise

    @pytest.mark.asyncio
    async def test_import_database_with_unauthorized_commands(self, test_client, test_db, auth_client):
        """Test Import-Funktion mit nicht erlaubten SQL-Befehlen"""
        try:
            # Admin user erstellen und login
            admin_user = await create_test_user(test_db, "admin", [RoleEnum.ADMIN.value])
            token = await auth_client.login("admin", [RoleEnum.ADMIN.value])
            headers = auth_client.get_headers("admin")

            # SQL mit nicht erlaubten Befehlen
            sql_content = """
            DROP TABLE user;
            CREATE TABLE hacked_table (id INT);
            INSERT INTO role (id, name) VALUES (999, 'HACKED');
            """

            import_data = {"sql_content": sql_content}

            response = test_client.post(
                "/admin/import",
                json=import_data,
                headers=headers
            )

            # Sollte teilweise erfolgreich sein (nur INSERT wird ausgeführt)
            assert response.status_code == status.HTTP_200_OK
            data = response.json()
            assert data["statements_executed"] == 1  # Nur der INSERT-Befehl
            assert data["statements_skipped"] == 2  # DROP und CREATE werden übersprungen

            # Überprüfen ob nur der erlaubte Befehl ausgeführt wurde
            role = await test_db.scalar(
                select(Role).where(Role.name == "HACKED")
            )
            assert role is not None
            assert role.name == "HACKED"

        except Exception as e:
            logger.warning(f"Exception occurred: {e}")
            logger.warning(f"Stacktrace: {traceback.format_exc()}")
            raise

    @pytest.mark.asyncio
    async def test_import_database_without_admin_role(self, test_client, test_db, auth_client):
        """Test Import-Funktion ohne Admin-Rechte (sollte fehlschlagen)"""
        try:
            # Normaler User ohne Admin-Rechte
            token = await auth_client.login("teacher", [RoleEnum.TEACHER.value])
            headers = auth_client.get_headers("teacher")

            sql_content = "INSERT INTO role (id, name) VALUES (999, 'TEST');"
            import_data = {"sql_content": sql_content}

            response = test_client.post(
                "/admin/import",
                json=import_data,
                headers=headers
            )

            # Sollte 403 Forbidden zurückgeben
            assert response.status_code == status.HTTP_403_FORBIDDEN

        except Exception as e:
            logger.warning(f"Exception occurred: {e}")
            logger.warning(f"Stacktrace: {traceback.format_exc()}")
            raise

    @pytest.mark.asyncio
    async def test_backup_and_restore_roundtrip(self, test_client, test_db, auth_client):
        """Test kompletter Backup- und Restore-Zyklus"""
        try:
            # Admin user erstellen und login
            admin_user = await create_test_user(test_db, "admin", [RoleEnum.ADMIN.value])
            token = await auth_client.login("admin", [RoleEnum.ADMIN.value])
            headers = auth_client.get_headers("admin")

            # Testdaten erstellen
            test_user = await create_test_user(test_db, "backuptest", [RoleEnum.STUDENT.value])
            category = Category(name="Backup Test", background_link="/backup.jpg")
            test_db.add(category)
            await test_db.commit()
            await test_db.refresh(category)

            # Backup erstellen
            backup_response = test_client.get("/admin/backup", headers=headers)
            assert backup_response.status_code == status.HTTP_200_OK
            backup_content = backup_response.content.decode('utf-8')

            # Einige Daten löschen um Restore zu testen
            await test_db.execute("DELETE FROM category")
            await test_db.execute("DELETE FROM user_role_link")
            await test_db.commit()

            # Überprüfen dass Daten gelöscht sind
            categories = await test_db.scalars(select(Category))
            assert len(categories.all()) == 0

            # Backup wiederherstellen
            import_data = {"sql_content": backup_content}
            import_response = test_client.post(
                "/admin/import",
                json=import_data,
                headers=headers
            )

            assert import_response.status_code == status.HTTP_200_OK

            # Überprüfen dass Daten wiederhergestellt wurden
            restored_categories = await test_db.scalars(select(Category))
            assert len(restored_categories.all()) == 1
            assert restored_categories.first().name == "Backup Test"

            # Benutzer sollte noch existieren (wurde nicht gelöscht im Test)
            user = await test_db.scalar(
                select(User).where(User.email == "backuptest@example.com")
            )
            assert user is not None

        except Exception as e:
            logger.warning(f"Exception occurred: {e}")
            logger.warning(f"Stacktrace: {traceback.format_exc()}")
            raise

    @pytest.mark.asyncio
    async def test_backup_content_integrity(self, test_client, test_db, auth_client):
        """Test ob Backup alle relevanten Tabellen enthält"""
        try:
            # Admin user erstellen und login
            admin_user = await create_test_user(test_db, "admin", [RoleEnum.ADMIN.value])
            token = await auth_client.login("admin", [RoleEnum.ADMIN.value])
            headers = auth_client.get_headers("admin")

            # Backup erstellen
            response = test_client.get("/admin/backup", headers=headers)
            assert response.status_code == status.HTTP_200_OK
            backup_content = response.content.decode('utf-8')

            # Überprüfen ob alle wichtigen Tabellen im Backup sind
            expected_tables = [
                'role', 'user', 'user_role_link', 'profile',
                'category', 'categorycategory', 'teacher',
                'lesson', 'content', 'userlessonlink'
            ]

            for table in expected_tables:
                assert f"DELETE FROM {table}" in backup_content
                assert f"INSERT INTO {table}" in backup_content or f"-- Table: {table}" in backup_content

            # Überprüfen ob FOREIGN_KEY_CHECKS gesetzt sind
            assert "SET FOREIGN_KEY_CHECKS=0" in backup_content
            assert "SET FOREIGN_KEY_CHECKS=1" in backup_content

        except Exception as e:
            logger.warning(f"Exception occurred: {e}")
            logger.warning(f"Stacktrace: {traceback.format_exc()}")
            raise

    @pytest.mark.asyncio
    async def test_empty_backup(self, test_client, test_db, auth_client):
        """Test Backup mit leeren Tabellen"""
        try:
            # Admin user erstellen und login
            admin_user = await create_test_user(test_db, "admin", [RoleEnum.ADMIN.value])
            token = await auth_client.login("admin", [RoleEnum.ADMIN.value])
            headers = auth_client.get_headers("admin")

            # Alle Daten löschen (außer dem Admin-Benutzer)
            await test_db.execute("DELETE FROM user_role_link WHERE user_id != :admin_id",
                                  {"admin_id": admin_user.id})
            await test_db.execute("DELETE FROM profile WHERE user_id != :admin_id",
                                  {"admin_id": admin_user.id})
            await test_db.execute("DELETE FROM category")
            await test_db.execute("DELETE FROM teacher")
            await test_db.execute("DELETE FROM lesson")
            await test_db.execute("DELETE FROM content")
            await test_db.execute("DELETE FROM userlessonlink")
            await test_db.commit()

            # Backup erstellen
            response = test_client.get("/admin/backup", headers=headers)
            assert response.status_code == status.HTTP_200_OK
            backup_content = response.content.decode('utf-8')

            # Backup sollte trotzdem gültiges SQL sein
            assert "-- FreeSchool Database Backup" in backup_content
            assert "SET FOREIGN_KEY_CHECKS=0" in backup_content
            assert "SET FOREIGN_KEY_CHECKS=1" in backup_content

            # Sollte DELETE-Statements für alle Tabellen enthalten
            assert "DELETE FROM" in backup_content

        except Exception as e:
            logger.warning(f"Exception occurred: {e}")
            logger.warning(f"Stacktrace: {traceback.format_exc()}")
            raise

    @pytest.mark.asyncio
    async def test_export_users_with_admin_role(self, test_client, test_db, auth_client):
        """Test Export aller Userobjekte als JSON mit Hash-Informationen"""
        admin_user = await create_test_user(test_db, "admin", [RoleEnum.ADMIN.value])
        await auth_client.login("admin", [RoleEnum.ADMIN.value])
        headers = auth_client.get_headers("admin")

        await create_test_user(test_db, "student", [RoleEnum.STUDENT.value])

        response = test_client.get("/admin/export/users", headers=headers)

        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert isinstance(data, list)
        assert len(data) >= 2

        admin_export = next((entry for entry in data if entry["email"] == "admin@example.com"), None)
        assert admin_export is not None
        assert admin_export["hashed_password"].startswith("$argon2")
        assert admin_export["hash_scheme"] == "argon2id"
        assert RoleEnum.ADMIN.value in admin_export["roles"]

    @pytest.mark.asyncio
    async def test_export_users_without_admin_role(self, test_client, test_db, auth_client):
        """Test Export ohne Admin-Rechte (sollte fehlschlagen)"""
        await auth_client.login("student", [RoleEnum.STUDENT.value])
        headers = auth_client.get_headers("student")

        response = test_client.get("/admin/export/users", headers=headers)

        assert response.status_code == status.HTTP_403_FORBIDDEN
