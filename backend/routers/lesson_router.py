from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from database import get_async_db

from models.lesson import Lesson
from models.content import Content
from models.user import User, UserLessonLink

from security.auth import get_current_user_optional, get_current_user
from security.auth import required_roles

router = APIRouter(prefix="/lesson", tags=["Lessons"])


class LessonDto(BaseModel):
    id: Optional[int] = None
    category_id: int
    name: str
    description: str
    order: Optional[int]
    position_x: int
    position_y: int
    contents: List[int] = []
    progress: Optional[int] = 0  # Jetzt optional mit Default-Wert 0


async def wrap(lesson: Lesson, db: AsyncSession, progress: int = 0) -> LessonDto:
    # Inhalte sind bereits durch Eager Loading geladen
    content_ids = [content.id for content in lesson.contents]

    return LessonDto(
        id=lesson.id,
        category_id=lesson.category_id,
        name=lesson.name,
        description=lesson.description,
        order=lesson.order,
        position_x=lesson.position_x,
        position_y=lesson.position_y,
        contents=content_ids,
        progress=progress
    )


@router.post("/", dependencies=[Depends(required_roles(["MODERATOR", "TEACHER"]))])
async def new_lesson(dto: LessonDto, db: AsyncSession = Depends(get_async_db)):
    try:
        lesson = Lesson(
            category_id=dto.category_id,
            name=dto.name,
            description=dto.description,
            order=dto.order,
            position_x=dto.position_x,
            position_y=dto.position_y,
        )

        db.add(lesson)
        await db.commit()
        await db.refresh(lesson)

        # Inhalte verknüpfen
        if dto.contents:
            result = await db.execute(
                select(Content)
                .where(Content.id.in_(dto.contents))
                .options(selectinload(Content.lessons))
            )
            contents = result.scalars().all()
            lesson.contents = contents
            await db.commit()
            await db.refresh(lesson)

        return await wrap(lesson, db)
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{lesson_id}")
async def get_lesson(lesson_id: int, db: AsyncSession = Depends(get_async_db)):
    stmt = (
        select(Lesson)
        .where(Lesson.id == lesson_id)
        .options(selectinload(Lesson.contents))
    )
    result = await db.execute(stmt)
    lesson = result.scalars().first()

    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")

    return await wrap(lesson, db)


@router.get("/by_category/{category_id}")
async def get_lessons_by_category(
        category_id: int,
        db: AsyncSession = Depends(get_async_db),
        current_user: Optional[User] = Depends(get_current_user_optional)
):
    # Lessons mit Eager Loading abfragen
    stmt = (
        select(Lesson)
        .where(Lesson.category_id == category_id)
        .where(Lesson.is_deleted == False)
        .options(selectinload(Lesson.contents))
        .order_by(Lesson.order)
    )
    result = await db.execute(stmt)
    lessons = result.scalars().all()

    # Keine 404 mehr bei leeren Listen, sondern 200 mit []
    if not lessons:
        return []

    # Fortschritte laden falls User eingeloggt
    progress_dict = {}
    if current_user:
        progress_result = await db.execute(
            select(UserLessonLink)
            .where(UserLessonLink.user_id == current_user.id)
            .where(UserLessonLink.lesson_id.in_([l.id for l in lessons]))
        )
        progress_dict = {p.lesson_id: p.progress for p in progress_result.scalars()}

    return [
        LessonDto(
            id=lesson.id,
            category_id=lesson.category_id,
            name=lesson.name,
            description=lesson.description,
            order=lesson.order,
            position_x=lesson.position_x,
            position_y=lesson.position_y,
            contents=[content.id for content in lesson.contents],
            progress=progress_dict.get(lesson.id, 0)
        )
        for lesson in lessons
    ]


@router.put("/{lesson_id}", dependencies=[Depends(required_roles(["MODERATOR", "TEACHER"]))])
async def update_lesson(
        lesson_id: int,
        data: LessonDto,
        db: AsyncSession = Depends(get_async_db)
):
    try:
        # Lektion mit Inhalten laden
        stmt = (
            select(Lesson)
            .where(Lesson.id == lesson_id)
            .options(selectinload(Lesson.contents))
        )
        result = await db.execute(stmt)
        lesson = result.scalars().first()

        if not lesson:
            raise HTTPException(status_code=404, detail="Lesson not found")

        # Basisdaten aktualisieren
        lesson.name = data.name
        lesson.description = data.description
        lesson.order = data.order
        lesson.position_x = data.position_x
        lesson.position_y = data.position_y

        # Inhalte aktualisieren (nur wenn geändert)
        if data.contents is not None:
            # Neue Inhalte laden
            result = await db.execute(
                select(Content)
                .where(Content.id.in_(data.contents))
            )
            new_contents = result.scalars().all()

            # Aktuelle Inhalte löschen
            lesson.contents.clear()

            # Neue Inhalte hinzufügen
            lesson.contents.extend(new_contents)

        await db.commit()
        await db.refresh(lesson)

        # Response mit geladenen Inhalten erstellen
        return LessonDto(
            id=lesson.id,
            category_id=lesson.category_id,
            name=lesson.name,
            description=lesson.description,
            order=lesson.order,
            position_x=lesson.position_x,
            position_y=lesson.position_y,
            contents=[c.id for c in lesson.contents],
            progress=data.progress if hasattr(data, 'progress') else 0
        )
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/{lesson_id}", dependencies=[Depends(required_roles(["MODERATOR", "TEACHER"]))])
async def delete_lesson(lesson_id: int, db: AsyncSession = Depends(get_async_db)):
    try:
        stmt = (
            select(Lesson)
            .where(Lesson.id == lesson_id)
            .options(selectinload(Lesson.contents))
        )
        result = await db.execute(stmt)
        lesson = result.scalars().first()

        if not lesson or lesson.is_deleted:
            raise HTTPException(status_code=404, detail="Lesson not found")

        lesson.is_deleted = True
        await db.commit()
        return {"detail": "Lesson wurde als gelöscht markiert"}
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


class ProgressUpdateDto(BaseModel):
    lesson_id: int
    progress: int


@router.post("/progress", response_model=UserLessonLink)
async def update_lesson_progress(
        dto: ProgressUpdateDto,
        db: AsyncSession = Depends(get_async_db),
        current_user: User = Depends(get_current_user)
):
    """
    Update or create the progress of a student for a specific lesson.
    Progress must be between 0 and 100 percent.
    """
    try:
        # Prüfe ob die Lektion existiert
        result = await db.execute(
            select(Lesson)
            .where(Lesson.id == dto.lesson_id)
            .where(Lesson.is_deleted == False)
        )
        lesson = result.scalars().first()
        if not lesson:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Lesson not found"
            )

        # Hole oder erstelle den Fortschrittseintrag
        result = await db.execute(
            select(UserLessonLink)
            .where(UserLessonLink.user_id == current_user.id)
            .where(UserLessonLink.lesson_id == dto.lesson_id)
        )
        progress = result.scalars().first()

        if progress:
            # Update existing progress
            progress.progress = dto.progress
        else:
            # Create new progress entry
            progress = UserLessonLink(
                user_id=current_user.id,
                lesson_id=dto.lesson_id,
                progress=dto.progress
            )
            db.add(progress)

        await db.commit()
        await db.refresh(progress)
        return progress
    except HTTPException:
        raise
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Could not update progress: {str(e)}"
        )


@router.get("/progress/{lesson_id}", response_model=Optional[UserLessonLink])
async def get_lesson_progress(
        lesson_id: int,
        db: AsyncSession = Depends(get_async_db),
        current_user: User = Depends(get_current_user)
):
    """
    Get the progress of the current user for a specific lesson.
    Returns None if no progress has been recorded yet.
    """
    try:
        result = await db.execute(
            select(UserLessonLink)
            .where(UserLessonLink.user_id == current_user.id)
            .where(UserLessonLink.lesson_id == lesson_id)
        )
        progress = result.scalars().first()
        return progress
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Could not fetch progress: {str(e)}"
        )


@router.get("/progress/all", response_model=List[UserLessonLink])
async def get_all_progress(
        db: AsyncSession = Depends(get_async_db),
        current_user: User = Depends(get_current_user)
):
    """
    Get all progress records for the current user.
    """
    try:
        result = await db.execute(
            select(UserLessonLink)
            .where(UserLessonLink.user_id == current_user.id)
            .options(selectinload(UserLessonLink.lesson))
        )
        return result.scalars().all()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Could not fetch progress records: {str(e)}"
        )
