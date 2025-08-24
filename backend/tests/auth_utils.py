# tests/auth_utils.py
from fastapi.testclient import TestClient
from tests.test_utils import create_test_user
from sqlmodel import select
from models import User


class AuthClient:
    def __init__(self, test_client, db):
        self.client = test_client
        self.db = db
        self.tokens = {}

    async def login(self, username="moderator", roles=["MODERATOR"], password="password"):
        # User erstellen oder verwenden
        user = await create_test_user(self.db, username=username, roles=roles, password=password)

        # Login durchführen
        login_data = {
            "email": f"{username}@example.com",
            "password": password
        }

        response = self.client.post("/user/login", json=login_data)

        if response.status_code != 200:
            raise Exception(f"Login failed: {response.text}")

        token = response.json().get("jwt")
        if not token:
            raise Exception("No token in login response")

        self.tokens[username] = token
        return token

    def get_headers(self, username="moderator"):
        token = self.tokens.get(username)
        if token:
            return {"Authorization": f"Bearer {token}"}
        return {}