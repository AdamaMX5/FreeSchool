# tests/test_lesson_router.py
import pytest
from fastapi import status
from sqlalchemy.future import select
from models import Lesson, Content, UserLessonLink, RoleEnum
from tests.test_utils import create_test_lesson, create_test_content, create_test_category, create_test_teacher

# Logging konfigurieren
import traceback
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class TestLessonRouter:

    @pytest.mark.asyncio
    async def test_get_lesson_not_found(self, test_client, test_db):
        response = test_client.get("/lesson/999")
        assert response.status_code == status.HTTP_404_NOT_FOUND

    @pytest.mark.asyncio
    async def test_get_lesson_success(self, test_client, test_db):
        """Test erfolgreiches Abfragen einer Lektion"""
        # Test-Lektion erstellen
        lesson = await create_test_lesson(test_db)

        response = test_client.get(f"/lesson/{lesson.id}")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["name"] == "Test Lesson"
        assert data["description"] == "Test Description"
        assert data["contents"] == []

    @pytest.mark.asyncio
    @pytest.mark.asyncio
    async def test_get_lesson_with_contents(self, test_client, test_db):
        """Test Lektion mit Inhalten"""
        # Lektion erstellen
        lesson = await create_test_lesson(test_db)
        teacher = await create_test_teacher(test_db)

        # Contents erstellen (mit allen required Feldern)
        content1 = await create_test_content(test_db,
                                             language="de",
                                             text="Erster Test-Content",
                                             youtube_id="youtube_id_1",
                                             internal_video="video1.mp4",
                                             lesson_id=lesson.id,
                                             teacher_id=teacher.id)

        content2 = await create_test_content(test_db,
                                             language="en",
                                             text="Second test content",
                                             youtube_id="youtube_id_2",
                                             internal_video="video2.mp4",
                                             lesson_id=lesson.id,
                                             teacher_id=teacher.id)

        response = test_client.get(f"/lesson/{lesson.id}")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert len(data["contents"]) == 2
        assert content1.id in data["contents"]
        assert content2.id in data["contents"]

    @pytest.mark.asyncio
    async def test_get_lessons_by_category(self, test_client, test_db):
        """Test Abfragen von Lektionen nach Kategorie"""
        # Kategorie und Lektionen erstellen
        category = await create_test_category(test_db, "Test Category")
        lesson1 = await create_test_lesson(test_db, "Lesson 1", category_id=category.id)
        lesson2 = await create_test_lesson(test_db, "Lesson 2", category_id=category.id)

        response = test_client.get(f"/lesson/by_category/{category.id}")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert len(data) == 2
        assert {lesson["name"] for lesson in data} == {"Lesson 1", "Lesson 2"}

    @pytest.mark.asyncio
    async def test_get_lessons_by_category_empty(self, test_client, test_db):
        """Test Abfragen von Lektionen für leere Kategorie"""
        category = await create_test_category(test_db, "Empty Category")

        response = test_client.get(f"/lesson/by_category/{category.id}")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data == []

    @pytest.mark.asyncio
    async def test_new_lesson_with_auth(self, test_client, test_db, auth_client):
        """Test Erstellen einer neuen Lektion mit Authentifizierung"""
        try:
            # Moderator login
            token = await auth_client.login("moderator", ["MODERATOR"])
            headers = auth_client.get_headers("moderator")

            category = await create_test_category(test_db)

            lesson_data = {
                "category_id": category.id,
                "name": "New Lesson",
                "description": "New Lesson Description",
                "position_x": 100,
                "position_y": 200,
                "contents": []
            }
            logger.warning(f"Calling funktion with dto: {lesson_data}")
            response = test_client.post("/lesson/", json=lesson_data, headers=headers)
            logger.warning(f"Response Status: {response.status_code}")
            logger.warning(f"Response: {response.text}")
            assert response.status_code == status.HTTP_200_OK
            data = response.json()
            assert data["name"] == "New Lesson"
            assert data["category_id"] == category.id
        except Exception as e:
            logger.warning(f"Exception occurred: {e}")
            logger.warning(f"Stacktrace: {traceback.format_exc()}")
            raise

    @pytest.mark.asyncio
    async def test_new_lesson_without_auth(self, test_client, test_db):
        """Test Erstellen einer Lektion ohne Authentifizierung"""
        category = await create_test_category(test_db)

        lesson_data = {
            "category_id": category.id,
            "name": "New Lesson",
            "description": "New Lesson Description",
            "position_x": 100,
            "position_y": 200,
            "contents": []
        }

        response = test_client.post("/lesson/", json=lesson_data)
        # Sollte 401 oder 403 zurückgeben
        assert response.status_code in [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN]

    @pytest.mark.asyncio
    async def test_new_lesson_with_contents(self, test_client, test_db, auth_client):
        """Test Erstellen einer neuen Lektion mit 2 Inhalten"""
        try:
            # Moderator login
            token = await auth_client.login("moderator", ["MODERATOR"])
            headers = auth_client.get_headers("moderator")

            # teacher und category werden immer noch zuerst benötigt
            teacher = await create_test_teacher(test_db)
            category = await create_test_category(test_db)

            # ZUERST die Lektion erstellen (ohne contents)
            lesson_data = {
                "category_id": category.id,
                "name": "Lesson with Contents",
                "description": "Lesson with two contents",
                "position_x": 100,
                "position_y": 200,
                # "contents": []  # Diese Zeile zunächst weglassen oder eine leere Liste übergeben
            }

            logger.warning(f"Creating lesson first: {lesson_data}")
            response = test_client.post("/lesson/", json=lesson_data, headers=headers)
            assert response.status_code == status.HTTP_200_OK
            lesson_data_response = response.json()
            new_lesson_id = lesson_data_response["id"]
            logger.warning(f"Lesson created with ID: {new_lesson_id}")

            # DANACH die Contents erstellen, JETZT mit der soeben erhaltenen lesson_id
            content1 = await create_test_content(test_db,
                                                 language="de",
                                                 text="Erster Test-Content",
                                                 youtube_id="youtube_id_1",
                                                 internal_video="video1.mp4",
                                                 teacher_id=teacher.id,
                                                 lesson_id=new_lesson_id)  # <- WICHTIG: lesson_id hier zuweisen

            content2 = await create_test_content(test_db,
                                                 language="en",
                                                 text="Second test content",
                                                 youtube_id="youtube_id_2",
                                                 internal_video="video2.mp4",
                                                 teacher_id=teacher.id,
                                                 lesson_id=new_lesson_id)  # <- WICHTIG: lesson_id hier zuweisen

            # JETZT die Lektion abrufen und prüfen, ob die Contents korrekt verknüpft sind
            response = test_client.get(f"/lesson/{new_lesson_id}", headers=headers)
            logger.warning(f"Get lesson/{new_lesson_id} Response: {response.text}")
            assert response.status_code == status.HTTP_200_OK
            final_lesson_data = response.json()

            # Überprüfe die Lektionsdaten
            assert final_lesson_data["name"] == "Lesson with Contents"
            assert final_lesson_data["category_id"] == category.id
            assert final_lesson_data["description"] == "Lesson with two contents"

            # Überprüfe dass beide Contents verknüpft wurden
            assert len(final_lesson_data["contents"]) == 2
            assert content1.id in final_lesson_data["contents"]
            assert content2.id in final_lesson_data["contents"]

        except Exception as e:
            logger.warning(f"Exception occurred: {e}")
            logger.warning(f"Stacktrace: {traceback.format_exc()}")
            raise

    @pytest.mark.asyncio
    async def test_update_lesson_with_auth(self, test_client, test_db, auth_client):
        """Test Aktualisieren einer Lektion mit Authentifizierung"""
        # Moderator login
        token = await auth_client.login("moderator", ["MODERATOR"])
        headers = auth_client.get_headers("moderator")

        # Lektion erstellen
        lesson = await create_test_lesson(test_db)

        update_data = {
            "category_id": lesson.category_id,
            "name": "Updated Lesson",
            "description": "Updated Description",
            "position_x": 150,
            "position_y": 250,
            "contents": []
        }

        response = test_client.put(f"/lesson/{lesson.id}", json=update_data, headers=headers)
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["name"] == "Updated Lesson"
        assert data["description"] == "Updated Description"

    @pytest.mark.asyncio
    async def test_delete_lesson_with_auth(self, test_client, test_db, auth_client):
        """Test Löschen einer Lektion mit Authentifizierung"""
        # Moderator login
        token = await auth_client.login("moderator", ["MODERATOR"])
        headers = auth_client.get_headers("moderator")

        lesson = await create_test_lesson(test_db)

        response = test_client.delete(f"/lesson/{lesson.id}", headers=headers)
        assert response.status_code == status.HTTP_200_OK

        # Überprüfen, dass Lektion als gelöscht markiert ist
        test_db.expire(lesson)
        await test_db.refresh(lesson)
        assert lesson.deleted_at

    @pytest.mark.asyncio
    async def test_update_lesson_progress(self, test_client, test_db, auth_client):
        """Test Aktualisieren des Lektionsfortschritts"""
        # User login
        token = await auth_client.login("student", ["STUDENT"])
        headers = auth_client.get_headers("student")

        lesson = await create_test_lesson(test_db)

        progress_data = {
            "lesson_id": lesson.id,
            "progress": 75
        }

        response = test_client.post("/lesson/progress", json=progress_data, headers=headers)
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["progress"] == 75
        assert data["lesson_id"] == lesson.id

    @pytest.mark.asyncio
    async def test_get_lesson_progress(self, test_client, test_db, auth_client):
        """Test Abfragen des Lektionsfortschritts"""
        # User login
        token = await auth_client.login("student", ["STUDENT"])
        headers = auth_client.get_headers("student")

        lesson = await create_test_lesson(test_db)

        # Zuerst Fortschritt setzen
        progress_data = {"lesson_id": lesson.id, "progress": 50}
        test_client.post("/lesson/progress", json=progress_data, headers=headers)

        # Dann Fortschritt abfragen
        response = test_client.get(f"/lesson/progress/{lesson.id}", headers=headers)
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["progress"] == 50

    @pytest.mark.asyncio
    async def test_get_all_progress(self, test_client, test_db, auth_client):
        """Test Abfragen aller Fortschrittsdaten"""
        try:
            # User login
            token = await auth_client.login("student", [RoleEnum.STUDENT.value])
            headers = auth_client.get_headers("student")

            lesson1 = await create_test_lesson(test_db)
            lesson2 = await create_test_lesson(test_db)

            # Fortschritte setzen
            test_client.post("/lesson/progress", json={"lesson_id": lesson1.id, "progress": 25}, headers=headers)
            test_client.post("/lesson/progress", json={"lesson_id": lesson2.id, "progress": 75}, headers=headers)

            # Alle Fortschritte abfragen
            response = test_client.get("/lesson/progress/all", headers=headers)
            assert response.status_code == status.HTTP_200_OK
            data = response.json()
            assert len(data) == 2
            assert {p["progress"] for p in data} == {25, 75}
        except Exception as e:
            logger.warning(f"Exception occurred: {e}")
            logger.warning(f"Stacktrace: {traceback.format_exc()}")
            raise
