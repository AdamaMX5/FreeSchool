# tests/test_teacher_router.py
import pytest
from fastapi import status
from sqlalchemy.future import select
from models import Teacher, Content
from tests.test_utils import create_test_teacher, create_test_content

# Logging konfigurieren
import traceback
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class TestTeacherRouter:

    @pytest.mark.asyncio
    async def test_get_teacher_not_found(self, test_client, test_db):
        response = test_client.get("/teacher/999")
        assert response.status_code == status.HTTP_404_NOT_FOUND

    @pytest.mark.asyncio
    async def test_get_teacher_success(self, test_client, test_db):
        """Test erfolgreiches Abfragen eines Lehrers"""
        # Test-Lehrer erstellen
        teacher = await create_test_teacher(test_db)
        logger.warning(f"Teacher created: {teacher}")
        response = test_client.get(f"/teacher/{teacher.id}")
        data = response.json()
        logger.warning(f"Response statuscode: {response.status_code}")
        logger.warning(f"Response data: {data}")

        assert response.status_code == status.HTTP_200_OK
        assert data["name"] == "Test Teacher"
        assert data["email"] == "teacher@example.com"
        assert data["city"] == "Test City"
        assert data["country"] == "Test Country"

    @pytest.mark.asyncio
    async def test_get_teachers_all(self, test_client, test_db):
        """Test Abfragen aller Lehrer"""
        # Mehrere Lehrer erstellen
        teacher1 = await create_test_teacher(test_db, "Teacher 1", "teacher1@example.com")
        teacher2 = await create_test_teacher(test_db, "Teacher 2", "teacher2@example.com")

        response = test_client.get("/teacher/all/")
        data = response.json()
        logger.warning(f"Response statuscode: {response.status_code}")
        logger.warning(f"Response data: {data}")

        assert response.status_code == status.HTTP_200_OK
        assert len(data) == 2
        assert {t["name"] for t in data} == {"Teacher 1", "Teacher 2"}

    @pytest.mark.asyncio
    async def test_get_teachers_excludes_deleted(self, test_client, test_db):
        """Test dass gelöschte Lehrer nicht angezeigt werden"""
        # Aktiven und gelöschten Lehrer erstellen
        active_teacher = await create_test_teacher(test_db, "Active Teacher")
        deleted_teacher = await create_test_teacher(test_db, "Deleted Teacher")
        deleted_teacher.is_deleted = True
        await test_db.commit()

        response = test_client.get("/teacher/all/")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert len(data) == 1
        assert data[0]["name"] == "Active Teacher"

    @pytest.mark.asyncio
    async def test_new_teacher_with_auth(self, test_client, test_db, auth_client):
        """Test Erstellen eines neuen Lehrers mit Authentifizierung"""
        try:
            # Moderator login
            token = await auth_client.login("moderator", ["MODERATOR"])
            headers = auth_client.get_headers("moderator")

            teacher_data = {
                "name": "New Teacher",
                "email": "new.teacher@example.com",
                "city": "Berlin",
                "country": "Germany"
            }

            logger.warning(f"Creating teacher with data: {teacher_data}")
            response = test_client.post("/teacher/", json=teacher_data, headers=headers)

            logger.warning(f"Response Status: {response.status_code}")
            logger.warning(f"Response: {response.text}")

            assert response.status_code == status.HTTP_200_OK
            data = response.json()
            assert data["name"] == "New Teacher"
            assert data["email"] == "new.teacher@example.com"
            assert data["city"] == "Berlin"
            assert data["country"] == "Germany"
            assert "id" in data

        except Exception as e:
            logger.warning(f"Exception occurred: {e}")
            logger.warning(f"Stacktrace: {traceback.format_exc()}")
            raise

    @pytest.mark.asyncio
    async def test_new_teacher_without_auth(self, test_client, test_db):
        """Test Erstellen eines Lehrers ohne Authentifizierung"""
        teacher_data = {
            "name": "New Teacher",
            "email": "new.teacher@example.com",
            "city": "Berlin",
            "country": "Germany"
        }

        response = test_client.post("/teacher/", json=teacher_data)
        # Sollte 401 oder 403 zurückgeben
        assert response.status_code in [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN]

    @pytest.mark.asyncio
    async def test_update_teacher_with_auth(self, test_client, test_db, auth_client):
        """Test Aktualisieren eines Lehrers mit Authentifizierung"""
        # Moderator login
        token = await auth_client.login("moderator", ["MODERATOR"])
        headers = auth_client.get_headers("moderator")

        # Lehrer erstellen
        teacher = await create_test_teacher(test_db)

        update_data = {
            "name": "Updated Teacher",
            "email": "updated.teacher@example.com",
            "city": "Hamburg",
            "country": "Deutschland"
        }

        response = test_client.put(f"/teacher/{teacher.id}", json=update_data, headers=headers)
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["name"] == "Updated Teacher"
        assert data["email"] == "updated.teacher@example.com"
        assert data["city"] == "Hamburg"
        assert data["country"] == "Deutschland"

    @pytest.mark.asyncio
    async def test_update_teacher_not_found(self, test_client, test_db, auth_client):
        """Test Aktualisieren eines nicht existierenden Lehrers"""
        # Moderator login
        token = await auth_client.login("moderator", ["MODERATOR"])
        headers = auth_client.get_headers("moderator")

        update_data = {
            "name": "Updated Teacher",
            "email": "updated@example.com",
            "city": "Hamburg",
            "country": "Deutschland"
        }

        response = test_client.put("/teacher/999", json=update_data, headers=headers)
        logger.warning(f"Response statuscode: {response.status_code}")
        logger.warning(f"Response data: {response.json()}")
        assert response.status_code == status.HTTP_404_NOT_FOUND

    @pytest.mark.asyncio
    async def test_delete_teacher_with_auth(self, test_client, test_db, auth_client):
        """Test Löschen eines Lehrers mit Authentifizierung"""
        # Moderator login
        token = await auth_client.login("moderator", ["MODERATOR"])
        headers = auth_client.get_headers("moderator")

        teacher = await create_test_teacher(test_db)

        response = test_client.delete(f"/teacher/{teacher.id}", headers=headers)
        assert response.status_code == status.HTTP_200_OK
        assert response.json()["detail"] == "Lehrer wurde als gelöscht markiert"

        # Überprüfen, dass Lehrer als gelöscht markiert ist
        await test_db.refresh(teacher)
        assert teacher.is_deleted == True

    @pytest.mark.asyncio
    async def test_delete_teacher_not_found(self, test_client, test_db, auth_client):
        """Test Löschen eines nicht existierenden Lehrers"""
        # Moderator login
        token = await auth_client.login("moderator", ["MODERATOR"])
        headers = auth_client.get_headers("moderator")

        response = test_client.delete("/teacher/999", headers=headers)
        assert response.status_code == status.HTTP_404_NOT_FOUND

    @pytest.mark.asyncio
    async def test_delete_already_deleted_teacher(self, test_client, test_db, auth_client):
        """Test Löschen eines bereits gelöschten Lehrers"""
        # Moderator login
        token = await auth_client.login("moderator", ["MODERATOR"])
        headers = auth_client.get_headers("moderator")

        teacher = await create_test_teacher(test_db)
        teacher.is_deleted = True
        await test_db.commit()

        response = test_client.delete(f"/teacher/{teacher.id}", headers=headers)
        assert response.status_code == status.HTTP_404_NOT_FOUND

    @pytest.mark.asyncio
    async def test_get_teacher_contents_empty(self, test_client, test_db):
        """Test Abfragen der Contents eines Lehrers ohne Contents"""
        teacher = await create_test_teacher(test_db)

        response = test_client.get(f"/teacher/{teacher.id}/contents/")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data == []

    @pytest.mark.asyncio
    async def test_get_teacher_contents_with_contents(self, test_client, test_db):
        """Test Abfragen der Contents eines Lehrers mit Contents"""
        teacher = await create_test_teacher(test_db)

        # Contents für den Lehrer erstellen
        content1 = await create_test_content(test_db,
                                             language="de",
                                             text="Erster Content",
                                             youtube_id="yt1",
                                             internal_video="video1.mp4",
                                             teacher_id=teacher.id)

        content2 = await create_test_content(test_db,
                                             language="en",
                                             text="Second Content",
                                             youtube_id="yt2",
                                             internal_video="video2.mp4",
                                             teacher_id=teacher.id)

        response = test_client.get(f"/teacher/{teacher.id}/contents/")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert len(data) == 2
        assert {c["language"] for c in data} == {"de", "en"}

    @pytest.mark.asyncio
    async def test_get_teacher_contents_not_found(self, test_client, test_db):
        """Test Abfragen der Contents eines nicht existierenden Lehrers"""
        response = test_client.get("/teacher/999/contents/")
        assert response.status_code == status.HTTP_404_NOT_FOUND

    @pytest.mark.asyncio
    async def test_get_teacher_contents_excludes_deleted_contents(self, test_client, test_db):
        """Test dass gelöschte Contents nicht angezeigt werden"""
        teacher = await create_test_teacher(test_db)

        # Aktiven und gelöschten Content erstellen
        active_content = await create_test_content(test_db,
                                                   language="de",
                                                   text="Aktiv",
                                                   youtube_id="yt1",
                                                   internal_video="video1.mp4",
                                                   teacher_id=teacher.id)

        deleted_content = await create_test_content(test_db,
                                                    language="en",
                                                    text="Gelöscht",
                                                    youtube_id="yt2",
                                                    internal_video="video2.mp4",
                                                    teacher_id=teacher.id)
        deleted_content.is_deleted = True
        await test_db.commit()

        response = test_client.get(f"/teacher/{teacher.id}/contents/")
        logger.warning(f"Response statuscode: {response.status_code}")
        logger.warning(f"Response data: {response.json()}")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert len(data) == 1
        assert data[0]["language"] == "de"
