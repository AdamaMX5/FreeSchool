# Unit tests for the ObjectService migrator core: pure mapping functions and the
# upsert (create vs. update) branching with a mocked client. No DB / network IO.
from datetime import datetime
from types import SimpleNamespace

import pytest

from migrations_objectservice.migrator import (
    category_to_payload,
    lesson_to_payload,
    content_to_payload,
    teacher_to_payload,
    progress_to_payload,
    progress_self_id,
    upsert,
)


# --- mapping functions --------------------------------------------------------

def test_category_payload_embeds_relations_and_self_id():
    cat = SimpleNamespace(
        id="ca_abc",
        name="Mathe",
        background_link="http://x/y.png",
        parents=[SimpleNamespace(id="ca_root")],
        children=[SimpleNamespace(id="ca_1"), SimpleNamespace(id="ca_2")],
        deleted_at=None,
    )
    payload = category_to_payload(cat)
    assert payload["refs"]["selfId"] == "ca_abc"
    assert payload["data"]["legacyId"] == "ca_abc"
    assert payload["data"]["parents"] == ["ca_root"]
    assert payload["data"]["children"] == ["ca_1", "ca_2"]
    assert payload["data"]["deletedAt"] is None
    assert payload["isPublic"] is True
    assert payload["app"] == "FreeSchool"


def test_lesson_payload_keeps_category_ref_and_iso_deleted_at():
    deleted = datetime(2026, 1, 2, 3, 4, 5)
    lesson = SimpleNamespace(
        id="le_x",
        name="L1",
        description="d",
        display_order="1",
        position_x=10,
        position_y=20,
        category_id="ca_abc",
        deleted_at=deleted,
    )
    payload = lesson_to_payload(lesson)
    assert payload["refs"] == {"selfId": "le_x", "categoryId": "ca_abc"}
    assert payload["data"]["position_x"] == 10
    assert payload["data"]["deletedAt"] == deleted.isoformat()


def test_content_payload_includes_teacher_ref_only_when_present():
    with_teacher = content_to_payload(SimpleNamespace(
        id="co_1", language="de", text="t", youtube_id="yt", internal_video="",
        lesson_id="le_x", teacher_id="t_7", deleted_at=None,
    ))
    assert with_teacher["refs"]["teacherId"] == "t_7"

    without_teacher = content_to_payload(SimpleNamespace(
        id="co_2", language="de", text="t", youtube_id="yt", internal_video="",
        lesson_id="le_x", teacher_id=None, deleted_at=None,
    ))
    assert "teacherId" not in without_teacher["refs"]
    assert without_teacher["refs"]["lessonId"] == "le_x"


def test_teacher_payload():
    payload = teacher_to_payload(SimpleNamespace(
        id="t_7", name="Frau X", email="x@y.z", city="B", country="DE",
        language="de", deleted_at=None,
    ))
    assert payload["refs"]["selfId"] == "t_7"
    assert payload["data"]["email"] == "x@y.z"


def test_progress_payload_is_private_with_composite_self_id():
    link = SimpleNamespace(user_id="u_1", lesson_id="le_x", progress=42)
    assert progress_self_id(link) == "u_1_le_x"
    payload = progress_to_payload(link)
    assert payload["isPublic"] is False
    assert payload["refs"] == {"selfId": "u_1_le_x", "userId": "u_1", "lessonId": "le_x"}
    assert payload["data"]["progress"] == 42


# --- upsert branching ---------------------------------------------------------

class FakeClient:
    def __init__(self, existing=None):
        self._existing = existing
        self.created = []
        self.replaced = []

    async def find_by_self_id(self, collection, self_id):
        return self._existing

    async def create(self, collection, payload):
        self.created.append((collection, payload))
        return {"_id": "os_new"}

    async def replace(self, collection, object_id, payload):
        self.replaced.append((collection, object_id, payload))
        return {"_id": object_id}


@pytest.mark.asyncio
async def test_upsert_creates_when_absent():
    client = FakeClient(existing=None)
    result = await upsert(client, "categories", "ca_abc", {"data": {}})
    assert result == "created"
    assert len(client.created) == 1
    assert client.replaced == []


@pytest.mark.asyncio
async def test_upsert_replaces_when_present():
    client = FakeClient(existing={"_id": "os_42"})
    result = await upsert(client, "categories", "ca_abc", {"data": {}})
    assert result == "updated"
    assert client.replaced == [("categories", "os_42", {"data": {}})]
    assert client.created == []
