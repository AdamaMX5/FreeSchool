# tests/test_admin_router.py
import pytest
from fastapi import status
from sqlalchemy.orm import selectinload
from sqlalchemy.future import select
from models import User, Role, UserRoleLink, RoleEnum
from tests.test_utils import create_test_user
from tests.auth_utils import AuthClient

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
