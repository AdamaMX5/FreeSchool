# tests/test_category_router.py
import pytest
from fastapi import status
from sqlmodel import select

from models import Category, CategoryCategory
from tests.test_utils import create_test_category

# Logging konfigurieren
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class TestCategoryRouter:

    @pytest.mark.asyncio
    async def test_get_category_not_found(self, test_client, test_db):
        response = test_client.get("/category/999")
        assert response.status_code == status.HTTP_404_NOT_FOUND

    @pytest.mark.asyncio
    async def test_get_category_success(self, test_client, test_db):
        # Create test category
        category = await create_test_category(test_db, "Test Category")

        response = test_client.get(f"/category/{category.id}")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["name"] == "Test Category"
        assert data["backgroundLink"] == "test.jpg"
        assert data["parents"] == []
        assert data["children"] == []

    @pytest.mark.asyncio
    async def test_get_category_with_relations(self, test_client, test_db):
        # Create parent category
        parent = await create_test_category(test_db, "Parent Category")

        # Create child category
        child = await create_test_category(test_db, "Child Category")

        # Create main category with relations
        main_category = await create_test_category(
            test_db,
            "Main Category",
            parents=[parent.id],
            children=[child.id]
        )

        response = test_client.get(f"/category/{main_category.id}")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["parents"] == [parent.id]
        assert data["children"] == [child.id]

    @pytest.mark.asyncio
    async def test_get_category_children(self, test_client, test_db):
        # Create parent category
        parent = await create_test_category(test_db, "Parent Category")

        # Create child categories
        child1 = await create_test_category(test_db, "Child 1")
        child2 = await create_test_category(test_db, "Child 2")

        # Add children to parent
        cc1 = CategoryCategory(parent_id=parent.id, child_id=child1.id)
        cc2 = CategoryCategory(parent_id=parent.id, child_id=child2.id)
        test_db.add(cc1)
        test_db.add(cc2)
        await test_db.commit()

        response = test_client.get(f"/category/{parent.id}/children")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert len(data) == 2
        assert {child["name"] for child in data} == {"Child 1", "Child 2"}

    @pytest.mark.asyncio
    async def test_new_category_with_auth(self, test_client, test_db, auth_client):
        # Moderator login
        token = await auth_client.login("moderator", ["MODERATOR"])
        headers = auth_client.get_headers("moderator")

        category_data = {
            "name": "New Category",
            "backgroundLink": "new.jpg",
            "parents": [],
            "children": []
        }

        print("Sending POST request to /category/ with auth...")
        response = test_client.post("/category/", json=category_data, headers=headers)

        print(f"Response status: {response.status_code}")
        print(f"Response text: {response.text}")


        assert response.status_code == status.HTTP_200_OK

    @pytest.mark.asyncio
    async def test_new_category_without_auth(self, test_client, test_db):
        category_data = {
            "name": "New Category",
            "backgroundLink": "new.jpg",
            "parents": [],
            "children": []
        }

        response = test_client.post("/category/", json=category_data)
        # Entweder 401 (Unauthorized) oder 403 (Forbidden) ist akzeptabel
        assert response.status_code in [401, 403]

    @pytest.mark.asyncio
    async def test_add_child_relation_with_auth(self, test_client, test_db, auth_client):
        # Moderator login
        token = await auth_client.login("moderator", ["MODERATOR"])
        headers = auth_client.get_headers("moderator")

        # Create parent and child categories
        parent = await create_test_category(test_db, "Parent")
        child = await create_test_category(test_db, "Child")

        response = test_client.post(
            f"/category/{parent.id}/addChild/{child.id}",
            headers=headers
        )
        assert response.status_code == status.HTTP_200_OK

    @pytest.mark.asyncio
    async def test_update_category_with_auth(self, test_client, test_db, auth_client):
        # Moderator login
        token = await auth_client.login("moderator", ["MODERATOR"])
        headers = auth_client.get_headers("moderator")

        # Create category to update
        category = await create_test_category(test_db, "Old Name", "old.jpg")

        update_data = {
            "name": "Updated Name",
            "backgroundLink": "updated.jpg",
            "parents": [],
            "children": []
        }

        response = test_client.put(
            f"/category/{category.id}",
            json=update_data,
            headers=headers
        )
        assert response.status_code == status.HTTP_200_OK

    @pytest.mark.asyncio
    async def test_delete_category_with_auth(self, test_client, test_db, auth_client):
        # Moderator login
        token = await auth_client.login("moderator", ["MODERATOR"])
        headers = auth_client.get_headers("moderator")

        category = await create_test_category(test_db, "To Delete")

        response = test_client.delete(
            f"/category/{category.id}",
            headers=headers
        )
        assert response.status_code == status.HTTP_200_OK

    @pytest.mark.asyncio
    async def test_get_all_categories(self, test_client, test_db):
        # Create multiple categories
        cat1 = await create_test_category(test_db, "Category 1")
        cat2 = await create_test_category(test_db, "Category 2")

        response = test_client.get("/category/all/")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()

        assert len(data) == 2
        assert {cat["name"] for cat in data} == {"Category 1", "Category 2"}

    # tests/test_category_router.py
    @pytest.mark.asyncio
    async def test_get_learning_hubs(self, test_client, test_db):
        # Create a learning hub (category without parents)
        learning_hub = await create_test_category(test_db, "Learning Hub")

        # Create another learning hub
        learning_hub2 = await create_test_category(test_db, "Learning Hub 2")

        # Create a regular category as child of learning hub 2
        regular_category = await create_test_category(test_db, "Sub Category", parents=[learning_hub2.id])

        response = test_client.get("/category/asLearningHubs/")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        logger.info(f"Learning hub Response: {data}")

        # Should return both learning hubs (categories without parents)
        assert len(data) == 2
        assert {hub["name"] for hub in data} == {"Learning Hub", "Learning Hub 2"}

    @pytest.mark.asyncio
    async def test_get_categories_by_parent(self, test_client, test_db):
        # Create parent category
        parent = await create_test_category(test_db, "Parent")

        # Create child categories
        child1 = await create_test_category(test_db, "Child 1", parents=[parent.id])
        child2 = await create_test_category(test_db, "Child 2", parents=[parent.id])

        response = test_client.get(f"/category/ByParent/{parent.id}")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()

        assert len(data) == 2
        assert {cat["name"] for cat in data} == {"Child 1", "Child 2"}