# Idempotent one-way migrator: old relational DB -> ObjectService.
#
# Runs on server start (see main.py lifespan). For each entity it upserts a JSON
# document into the ObjectService, keyed by the legacy prefixed id stored in
# refs.selfId (wildcard-indexed). Re-running never duplicates: an existing selfId
# is replaced (PUT), a new one is created (POST).
import logging
from datetime import datetime
from typing import Callable, Optional

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from sqlmodel import select

from models import Category, Lesson, Content, Teacher, UserLessonLink
from services.object_service_client import extract_object_id, ObjectServiceClient

logger = logging.getLogger(__name__)

APP = "FreeSchool"


def _iso(dt: Optional[datetime]) -> Optional[str]:
    return dt.isoformat() if dt else None


# --- pure mapping functions (ORM row -> ObjectService payload), no IO ---------

def category_to_payload(c: Category) -> dict:
    return {
        "data": {
            "legacyId": c.id,
            "name": c.name,
            "background_link": c.background_link,
            "parents": [p.id for p in c.parents],
            "children": [ch.id for ch in c.children],
            "deletedAt": _iso(c.deleted_at),
        },
        "refs": {"selfId": c.id},
        "isPublic": True,
        "app": APP,
    }


def lesson_to_payload(l: Lesson) -> dict:
    return {
        "data": {
            "legacyId": l.id,
            "name": l.name,
            "description": l.description,
            "display_order": l.display_order,
            "position_x": l.position_x,
            "position_y": l.position_y,
            "deletedAt": _iso(l.deleted_at),
        },
        "refs": {"selfId": l.id, "categoryId": l.category_id},
        "isPublic": True,
        "app": APP,
    }


def content_to_payload(c: Content) -> dict:
    refs = {"selfId": c.id, "lessonId": c.lesson_id}
    if c.teacher_id:
        refs["teacherId"] = c.teacher_id
    return {
        "data": {
            "legacyId": c.id,
            "language": c.language,
            "text": c.text,
            "youtube_id": c.youtube_id,
            "internal_video": c.internal_video,
            "deletedAt": _iso(c.deleted_at),
        },
        "refs": refs,
        "isPublic": True,
        "app": APP,
    }


def teacher_to_payload(t: Teacher) -> dict:
    return {
        "data": {
            "legacyId": t.id,
            "name": t.name,
            "email": t.email,
            "city": t.city,
            "country": t.country,
            "language": t.language,
            "deletedAt": _iso(t.deleted_at),
        },
        "refs": {"selfId": t.id},
        "isPublic": True,
        "app": APP,
    }


def progress_self_id(p: UserLessonLink) -> str:
    return f"{p.user_id}_{p.lesson_id}"


def progress_to_payload(p: UserLessonLink) -> dict:
    return {
        "data": {"progress": p.progress},
        "refs": {
            "selfId": progress_self_id(p),
            "userId": p.user_id,
            "lessonId": p.lesson_id,
        },
        "isPublic": False,
        "app": APP,
    }


# --- upsert + orchestration ---------------------------------------------------

async def upsert(client: ObjectServiceClient, collection: str, self_id: str, payload: dict) -> str:
    """Create the document, or replace it if a doc with this selfId already exists.
    Returns "created" or "updated"."""
    existing = await client.find_by_self_id(collection, self_id)
    if existing:
        object_id = extract_object_id(existing)
        await client.replace(collection, object_id, payload)
        return "updated"
    await client.create(collection, payload)
    return "created"


async def _migrate_collection(
    client: ObjectServiceClient,
    collection: str,
    rows: list,
    mapper: Callable[[object], dict],
    self_id_of: Callable[[object], str],
) -> dict:
    counts = {"created": 0, "updated": 0, "failed": 0}
    for row in rows:
        self_id = self_id_of(row)
        try:
            result = await upsert(client, collection, self_id, mapper(row))
            counts[result] += 1
        except Exception as e:  # one bad row must not abort the whole run
            counts["failed"] += 1
            logger.warning("Migration failed for %s/%s: %s", collection, self_id, e)
    return counts


async def run_migration(session: AsyncSession, client: ObjectServiceClient) -> dict:
    """Migrate all FreeSchool entities into the ObjectService. Returns a per-collection
    summary of {created, updated, failed}. Users/Roles/Profiles are intentionally
    excluded (owned by AuthService/ProfileService)."""
    categories = (
        await session.scalars(
            select(Category).options(
                selectinload(Category.parents),
                selectinload(Category.children),
            )
        )
    ).all()
    lessons = (await session.scalars(select(Lesson))).all()
    contents = (await session.scalars(select(Content))).all()
    teachers = (await session.scalars(select(Teacher))).all()
    progresses = (await session.scalars(select(UserLessonLink))).all()

    summary = {
        "categories": await _migrate_collection(
            client, "categories", categories, category_to_payload, lambda c: c.id
        ),
        "lessons": await _migrate_collection(
            client, "lessons", lessons, lesson_to_payload, lambda l: l.id
        ),
        "contents": await _migrate_collection(
            client, "contents", contents, content_to_payload, lambda c: c.id
        ),
        "teachers": await _migrate_collection(
            client, "teachers", teachers, teacher_to_payload, lambda t: t.id
        ),
        "lesson_progress": await _migrate_collection(
            client, "lesson_progress", progresses, progress_to_payload, progress_self_id
        ),
    }
    logger.info("ObjectService migration summary: %s", summary)
    return summary
