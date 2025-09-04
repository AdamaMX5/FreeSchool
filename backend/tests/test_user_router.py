# tests/test_user_router.py
import pytest
from fastapi import status
from sqlalchemy.future import select

from models import User, Role, UserRoleLink, RoleEnum
from security.auth import get_password_hash, create_jwt, create_email_verify_token
from util.time_util import timestamp
from tests.test_utils import create_test_user

# Logging konfigurieren
import logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


class TestUserRouter:

    @pytest.mark.asyncio
    async def test_login_user_not_found(self, test_client, test_db):
        login_data = {
            "email": "nonexistent@example.com",
            "password": "password123"
        }

        response = test_client.post("/user/login", json=login_data)
        assert response.status_code == status.HTTP_200_OK  # Should return register status
        data = response.json()
        assert data["status"] == "register"
        assert data["jwt"] == ""
        assert data["roles"] == []

    @pytest.mark.asyncio
    async def test_login_user_success(self, test_client, test_db):
        # Create test user
        user = await create_test_user(test_db, "testuser", password="password123")

        login_data = {
            "email": "testuser@example.com",
            "password": "password123"
        }

        response = test_client.post("/user/login", json=login_data)
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["status"] == "login"
        assert data["email"] == "testuser@example.com"
        assert "jwt" in data
        assert data["jwt"] != ""

    @pytest.mark.asyncio
    async def test_login_user_wrong_password(self, test_client, test_db):
        # Create test user
        user = await create_test_user(test_db, "testuser", password="correct_password")


        login_data = {
            "email": "testuser@example.com",
            "password": "wrong_password"
        }

        response = test_client.post("/user/login", json=login_data)
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert response.json()["detail"] == "Invalid password"

    @pytest.mark.asyncio
    async def test_login_user_not_verified(self, test_client, test_db):
        # test_utils.create_test_user would be verified
        user = User(
            email="test@example.com",
            hashed_password=get_password_hash("password123"),
            password_verify=True,
            email_verify=False,
            email_verify_token=create_email_verify_token(),
            last_login=timestamp()
        )
        test_db.add(user)
        await test_db.commit()
        await test_db.refresh(user)

        login_data = {
            "email": "test@example.com",
            "password": "password123"
        }

        response = test_client.post("/user/login", json=login_data)
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["status"] == "login_with_verify_email_sended"

    @pytest.mark.asyncio
    async def test_register_user_success(self, test_client, test_db):
        # First create a user through login (which creates unverified user)
        login_data = {
            "email": "newuser@example.com",
            "password": "password123"
        }

        login_response = test_client.post("/user/login", json=login_data)
        assert login_response.status_code == status.HTTP_200_OK
        login_data = login_response.json()
        assert login_data["status"] == "register"

        # Now complete registration
        register_data = {
            "id": login_data["id"],
            "repassword": "password123"
        }

        response = test_client.post("/user/register", json=register_data)
        assert response.status_code == status.HTTP_201_CREATED
        data = response.json()
        assert data["status"] == "verify_email_sended"
        assert data["email"] == "newuser@example.com"
        assert "jwt" in data
        assert data["jwt"] != ""

    @pytest.mark.asyncio
    async def test_register_user_wrong_repassword(self, test_client, test_db):
        # First create a user through login
        login_data = {
            "email": "newuser@example.com",
            "password": "password123"
        }

        login_response = test_client.post("/user/login", json=login_data)
        login_data = login_response.json()

        # Try registration with wrong repassword
        register_data = {
            "id": login_data["id"],
            "repassword": "wrong_password"
        }

        response = test_client.post("/user/register", json=register_data)
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert response.json()["detail"] == "Second Password is incorrect, please try registration again."

    @pytest.mark.asyncio
    async def test_register_user_not_found(self, test_client, test_db):
        register_data = {
            "id": 999,
            "repassword": "password123"
        }

        response = test_client.post("/user/register", json=register_data)
        assert response.status_code == status.HTTP_404_NOT_FOUND
        assert response.json()["detail"] == "User not found"

    @pytest.mark.asyncio
    async def test_verify_email_success(self, test_client, test_db):
        # Create special-user with verification token
        verify_token = create_email_verify_token()
        user = User(
            email="test@example.com",
            hashed_password=get_password_hash("password123"),
            password_verify=True,
            email_verify=False,
            email_verify_token=verify_token,
            last_login=timestamp()
        )
        test_db.add(user)
        await test_db.commit()
        await test_db.refresh(user)

        response = test_client.get(f"/user/verify?token={verify_token}&email=test@example.com")
        assert response.status_code == status.HTTP_200_OK
        assert "erfolgreich verifiziert" in response.text

        # Verify user is now marked as verified
        await test_db.commit()  # Sicherstellen, dass alle Transaktionen abgeschlossen sind
        await test_db.refresh(user)  # User-Objekt aktualisieren
        
        logger.warning(f"User in Database has email_verify==true? {user}")
        assert user.email_verify == True
        assert user.email_verify_token is None

    @pytest.mark.asyncio
    async def test_verify_email_invalid_token(self, test_client, test_db):
        user = User(
            email="test@example.com",
            hashed_password=get_password_hash("password123"),
            password_verify=True,
            email_verify=False,
            email_verify_token="valid_token",
            last_login=timestamp()
        )
        test_db.add(user)
        await test_db.commit()
        await test_db.refresh(user)

        response = test_client.get("/user/verify?token=invalid_token&email=test@example.com")
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert response.json()["detail"] == "Invalid token"

    @pytest.mark.asyncio
    async def test_verify_email_already_verified(self, test_client, test_db):
        user = User(
            email="test@example.com",
            hashed_password=get_password_hash("password123"),
            password_verify=True,
            email_verify=True,
            email_verify_token="some_token",
            last_login=timestamp()
        )
        test_db.add(user)
        await test_db.commit()
        await test_db.refresh(user)

        response = test_client.get("/user/verify?token=some_token&email=test@example.com")
        assert response.status_code == status.HTTP_200_OK
        assert "bereits verifiziert" in response.text

    @pytest.mark.asyncio
    async def test_verify_email_user_not_found(self, test_client, test_db):
        response = test_client.get("/user/verify?token=some_token&email=nonexistent@example.com")
        assert response.status_code == status.HTTP_404_NOT_FOUND
        assert response.json()["detail"] == "User not found"

    @pytest.mark.asyncio
    async def test_logout_with_auth(self, test_client, test_db, auth_client):
        # Login as moderator first
        token = await auth_client.login("moderator", ["MODERATOR"])
        headers = auth_client.get_headers("moderator")

        response = test_client.post("/user/logout", headers=headers)
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["status"] == "logout"
        assert "user_id" in data

    @pytest.mark.asyncio
    async def test_first_user_gets_admin_role(self, test_client, test_db):
        # Create and register first user
        login_data = {
            "email": "first@example.com",
            "password": "password123"
        }

        login_response = test_client.post("/user/login", json=login_data)
        login_data = login_response.json()

        register_data = {
            "id": login_data["id"],
            "repassword": "password123"
        }

        response = test_client.post("/user/register", json=register_data)
        assert response.status_code == status.HTTP_201_CREATED

        # Check if user has ADMIN role
        stmt = select(User).where(User.email == "first@example.com")
        user = await test_db.scalar(stmt)

        stmt = select(UserRoleLink).where(UserRoleLink.user_id == user.id)
        role_links = await test_db.scalars(stmt)

        # Should have at least one role (ADMIN)
        assert len(role_links.all()) >= 1

        # Verify ADMIN role exists
        stmt = select(Role).where(Role.name == RoleEnum.ADMIN.value)
        admin_role = await test_db.scalar(stmt)
        assert admin_role is not None

    @pytest.mark.asyncio
    async def test_get_user_roles(self, test_client, test_db):
        # Create user and roles
        user = await create_test_user(test_db, "testuser", roles=["ADMIN", "MODERATOR"], password="password123")

        # Test login to trigger role retrieval
        login_data = {
            "email": "testuser@example.com",
            "password": "password123"
        }

        response = test_client.post("/user/login", json=login_data)
        assert response.status_code == status.HTTP_200_OK
        data = response.json()

        # Should have both roles
        assert RoleEnum.ADMIN.value in data["roles"]
        assert RoleEnum.MODERATOR.value in data["roles"]
        assert len(data["roles"]) == 2
