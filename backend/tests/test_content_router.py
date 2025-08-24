# tests/test_content_router.py
import pytest
from fastapi import status
from sqlalchemy.future import select
from models import Content, Teacher
from tests.test_utils import create_test_content, create_test_teacher, create_test_lesson

# Logging konfigurieren
import traceback
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class TestContentRouter:

    @pytest.mark.asyncio
    async def test_get_content_not_found(self, test_client, test_db):
        response = test_client.get("/content/999")
        assert response.status_code == status.HTTP_404_NOT_FOUND

    @pytest.mark.asyncio
    async def test_get_content_success(self, test_client, test_db):
        """Test erfolgreiches Abfragen eines Contents"""
        # Test-Content erstellen
        content = await create_test_content(test_db)

        response = test_client.get(f"/content/{content.id}")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["language"] == "de"
        assert data["text"] == "Test content text"
        assert data["youtube_id"] == "test_youtube_id"

    @pytest.mark.asyncio
    async def test_get_all_contents(self, test_client, test_db):
        """Test Abfragen aller Contents"""
        # Mehrere Contents erstellen
        content1 = await create_test_content(test_db, language="de")
        content2 = await create_test_content(test_db, language="en")

        response = test_client.get("/content/all/")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert len(data) == 2
        assert {c["language"] for c in data} == {"de", "en"}

    @pytest.mark.asyncio
    async def test_get_all_contents_excludes_deleted(self, test_client, test_db):
        """Test dass gelöschte Contents nicht angezeigt werden"""
        # Aktiven und gelöschten Content erstellen
        active_content = await create_test_content(test_db, language="de")
        deleted_content = await create_test_content(test_db, language="en")
        deleted_content.is_deleted = True
        await test_db.commit()

        response = test_client.get("/content/all/")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert len(data) == 1
        assert data[0]["language"] == "de"

    @pytest.mark.asyncio
    async def test_get_contents_by_lesson_empty(self, test_client, test_db):
        """Test Abfragen von Contents für leere Lektion"""
        lesson = await create_test_lesson(test_db)

        response = test_client.get(f"/content/by_lesson/{lesson.id}")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data == []

    @pytest.mark.asyncio
    async def test_get_contents_by_lesson_with_contents(self, test_client, test_db):
        """Test Abfragen von Contents für eine Lektion"""
        lesson = await create_test_lesson(test_db)
        teacher = await create_test_teacher(test_db)

        # Contents für die Lektion erstellen
        content1 = await create_test_content(test_db,
                                             language="de",
                                             text="Deutscher Content",
                                             lesson_id=lesson.id,
                                             teacher_id=teacher.id)

        content2 = await create_test_content(test_db,
                                             language="en",
                                             text="English Content",
                                             lesson_id=lesson.id,
                                             teacher_id=teacher.id)

        response = test_client.get(f"/content/by_lesson/{lesson.id}")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert len(data) == 2
        assert {c["language"] for c in data} == {"de", "en"}
        # Überprüfe dass Teacher-Daten enthalten sind
        assert all("teacher" in c for c in data)

    @pytest.mark.asyncio
    async def test_get_contents_by_lesson_excludes_deleted(self, test_client, test_db):
        """Test dass gelöschte Contents nicht angezeigt werden"""
        lesson = await create_test_lesson(test_db)
        teacher = await create_test_teacher(test_db)

        # Aktiven und gelöschten Content erstellen
        active_content = await create_test_content(test_db,
                                                   language="de",
                                                   lesson_id=lesson.id,
                                                   teacher_id=teacher.id)

        deleted_content = await create_test_content(test_db,
                                                    language="en",
                                                    lesson_id=lesson.id,
                                                    teacher_id=teacher.id)
        deleted_content.is_deleted = True
        await test_db.commit()

        response = test_client.get(f"/content/by_lesson/{lesson.id}")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert len(data) == 1
        assert data[0]["language"] == "de"

    @pytest.mark.asyncio
    async def test_new_content_with_auth(self, test_client, test_db, auth_client):
        """Test Erstellen eines neuen Contents mit Authentifizierung"""
        try:
            # Moderator login
            token = await auth_client.login("moderator", ["MODERATOR"])
            headers = auth_client.get_headers("moderator")

            teacher = await create_test_teacher(test_db)
            lesson = await create_test_lesson(test_db)

            content_data = {
                "language": "de",
                "text": "Neuer Test-Content",
                "youtube_id": "https://youtube.com/watch?v=abc123",
                "internal_video": "new_video.mp4",
                "lesson_id": lesson.id,
                "teacher_id": teacher.id
            }

            logger.warning(f"Creating content with data: {content_data}")
            response = test_client.post("/content/", json=content_data, headers=headers)

            logger.warning(f"Response Status: {response.status_code}")
            logger.warning(f"Response: {response.text}")

            assert response.status_code == status.HTTP_200_OK
            data = response.json()
            assert data["language"] == "de"
            assert data["text"] == "Neuer Test-Content"
            assert data["youtube_id"] == "abc123"  # Extrahiert von der URL
            assert data["lesson_id"] == lesson.id
            assert data["teacher_id"] == teacher.id

        except Exception as e:
            logger.warning(f"Exception occurred: {e}")
            logger.warning(f"Stacktrace: {traceback.format_exc()}")
            raise

    @pytest.mark.asyncio
    async def test_new_content_without_auth(self, test_client, test_db):
        """Test Erstellen eines Contents ohne Authentifizierung"""
        teacher = await create_test_teacher(test_db)
        lesson = await create_test_lesson(test_db)

        content_data = {
            "language": "de",
            "text": "Neuer Test-Content",
            "youtube_id": "abc123",
            "internal_video": "new_video.mp4",
            "lesson_id": lesson.id,
            "teacher_id": teacher.id
        }

        response = test_client.post("/content/", json=content_data)
        # Sollte 401 oder 403 zurückgeben
        assert response.status_code in [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN]

    @pytest.mark.asyncio
    async def test_new_content_missing_required_fields(self, test_client, test_db, auth_client):
        """Test Erstellen eines Contents ohne required Felder"""
        # Moderator login
        token = await auth_client.login("moderator", ["MODERATOR"])
        headers = auth_client.get_headers("moderator")

        content_data = {
            "language": "de",
            "text": "Test Content",
            "youtube_id": "abc123",
            "internal_video": "video.mp4"
            # lesson_id und teacher_id fehlen absichtlich
        }

        response = test_client.post("/content/", json=content_data, headers=headers)
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    @pytest.mark.asyncio
    async def test_update_content_with_auth(self, test_client, test_db, auth_client):
        """Test Aktualisieren eines Contents mit Authentifizierung"""
        # Moderator login
        token = await auth_client.login("moderator", ["MODERATOR"])
        headers = auth_client.get_headers("moderator")

        # Content erstellen
        content = await create_test_content(test_db)

        update_data = {
            "id": content.id,
            "language": "en",
            "text": "Updated English Content",
            "youtube_id": "https://youtu.be/xyz789",
            "internal_video": "updated_video.mp4",
            "lesson_id": content.lesson_id,
            "teacher_id": content.teacher_id
        }

        response = test_client.put("/content/", json=update_data, headers=headers)
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["language"] == "en"
        assert data["text"] == "Updated English Content"
        assert data["youtube_id"] == "xyz789"  # Extrahiert von der URL

    @pytest.mark.asyncio
    async def test_update_content_not_found(self, test_client, test_db, auth_client):
        """Test Aktualisieren eines nicht existierenden Contents"""
        # Moderator login
        token = await auth_client.login("moderator", ["MODERATOR"])
        headers = auth_client.get_headers("moderator")

        update_data = {
            "id": 999,
            "language": "en",
            "text": "Updated Content",
            "youtube_id": "xyz789",
            "internal_video": "video.mp4",
            "lesson_id": 1,
            "teacher_id": 1
        }

        response = test_client.put("/content/", json=update_data, headers=headers)
        assert response.status_code == status.HTTP_404_NOT_FOUND

    @pytest.mark.asyncio
    async def test_delete_content_with_auth(self, test_client, test_db, auth_client):
        """Test Löschen eines Contents mit Authentifizierung"""
        # Moderator login
        token = await auth_client.login("moderator", ["MODERATOR"])
        headers = auth_client.get_headers("moderator")

        content = await create_test_content(test_db)

        response = test_client.delete(f"/content/{content.id}", headers=headers)
        assert response.status_code == status.HTTP_200_OK
        assert response.json()["detail"] == "Content wurde als gelöscht markiert"

        # Überprüfen, dass Content als gelöscht markiert ist
        await test_db.refresh(content)
        assert content.is_deleted == True

    @pytest.mark.asyncio
    async def test_delete_content_not_found(self, test_client, test_db, auth_client):
        """Test Löschen eines nicht existierenden Contents"""
        # Moderator login
        token = await auth_client.login("moderator", ["MODERATOR"])
        headers = auth_client.get_headers("moderator")

        response = test_client.delete("/content/999", headers=headers)
        assert response.status_code == status.HTTP_404_NOT_FOUND

    @pytest.mark.asyncio
    async def test_youtube_id_extraction(self, test_client, test_db, auth_client):
        """Test Extraktion der YouTube ID aus verschiedenen URL-Formaten"""
        # Moderator login
        token = await auth_client.login("moderator", ["MODERATOR"])
        headers = auth_client.get_headers("moderator")

        teacher = await create_test_teacher(test_db)
        lesson = await create_test_lesson(test_db)

        test_cases = [
            ("https://youtube.com/watch?v=S4zI2oCkD4I", "S4zI2oCkD4I"),
            ("https://youtu.be/S4zI2oCkD4I", "S4zI2oCkD4I"),
            ("https://youtube.com/embed/S4zI2oCkD4I", "S4zI2oCkD4I"),
            ("S4zI2oCkD4I", "S4zI2oCkD4I")
        ]

        for youtube_url, expected_id in test_cases:
            content_data = {
                "language": "de",
                "text": f"Test Content for {youtube_url}",
                "youtube_id": youtube_url,
                "internal_video": "test.mp4",
                "lesson_id": lesson.id,
                "teacher_id": teacher.id
            }
            logger.warning(f"extract youtubelink: {youtube_url}")
            response = test_client.post("/content/", json=content_data, headers=headers)
            logger.warning(f"Response statuscode: {response.status_code}")
            logger.warning(f"Response data: {response.json()}")
            assert response.status_code == status.HTTP_200_OK
            data = response.json()
            assert data["youtube_id"] == expected_id
