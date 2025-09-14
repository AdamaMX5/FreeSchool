from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload, selectinload
from sqlalchemy.future import select
from database import get_async_db
from datetime import datetime
from models import Content, Category
from pydantic import BaseModel
from typing import Optional, List

from routers.teacher_router import TeacherDto
from security.auth import required_roles

import traceback
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/content", tags=["Contents"])


class ContentDto(BaseModel):
    id: Optional[int] = None
    language: str
    text: str
    youtube_id: str
    internal_video: str
    lesson_id: Optional[int] = None
    teacher_id: Optional[int] = None

    class Config:
        from_attributes = True


class ContentWithTeacherDto(BaseModel):
    id: Optional[int] = None
    language: str
    text: str
    youtube_id: str
    internal_video: str
    lesson_id: Optional[int] = None
    teacher: Optional[TeacherDto] = None

    class Config:
        from_attributes = True


def extractYoutubeId(link: str) -> str:
    if "youtube.com/watch?v=" in link:
        return link.split("v=")[1].split("&")[0]
    elif "youtu.be/" in link:
        return link.split("/")[-1]
    elif "youtube.com/embed/" in link:
        return link.split("/")[-1]
    elif len(link) == 11:
        return link
    else:
        raise HTTPException(status_code=400, detail="Invalid YouTube link")


@router.get("/{content_id}", response_model=ContentDto)
async def get_content(content_id: int, db: AsyncSession = Depends(get_async_db)):
    try:
        content = await db.scalar(select(Content).where(Content.id == content_id))
        if not content:
            raise HTTPException(status_code=404, detail="Content not found")
        return content
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/by_lesson/{lesson_id}", response_model=List[ContentWithTeacherDto])
async def get_contents_by_lesson(lesson_id: int, db: AsyncSession = Depends(get_async_db)):  # get_async_db verwenden
    try:
        logger.info(f"Fetching contents for lesson_id: {lesson_id}")
        # Explizites Laden der Beziehungen mit joinedload
        contents = (await db.scalars(
            select(Content)
            .options(joinedload(Content.teacher))
            .where(Content.lesson_id == lesson_id)
            .where(Content.deleted_at == None)
        )).unique().all()

        logger.info(f"Found {len(contents)} content rows")

        # Manuelle Konvertierung in DTOs
        content_dtos = []
        for content in contents:
            logger.info(f"DTO: content_id={content.id}, teacher={content.teacher_id}")

            try:
                teacher_dto = TeacherDto.from_orm(content.teacher) if content.teacher else None
                logger.info(f"Teacher DTO created: {teacher_dto is not None}")

                content_dto = ContentWithTeacherDto(
                    id=content.id,
                    language=content.language,
                    text=content.text,
                    youtube_id=content.youtube_id,
                    internal_video=content.internal_video,
                    lesson_id=content.lesson_id,
                    teacher=teacher_dto
                )
                content_dtos.append(content_dto)
            except Exception as inner_e:
                logger.error(f"Error processing content {content.id}: {str(inner_e)}")
                raise inner_e

        return content_dtos
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/", response_model=ContentDto, dependencies=[Depends(required_roles(["MODERATOR", "TEACHER"]))])
async def new_content(content_data: ContentDto, db: AsyncSession = Depends(get_async_db)):
    if content_data.lesson_id is None:
        raise HTTPException(status_code=400, detail="Lesson ID is required")

    try:
        content = Content(**content_data.model_dump(exclude_unset=True))
        content.youtube_id = extractYoutubeId(content.youtube_id)

        db.add(content)
        await db.commit()
        await db.refresh(content)
        return content
    except HTTPException:
        raise
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.put("/", response_model=ContentDto, dependencies=[Depends(required_roles(["MODERATOR", "TEACHER"]))])
async def update_content(
        content_data: ContentDto,
        db: AsyncSession = Depends(get_async_db)
):
    try:
        if content_data.id is None:
            raise HTTPException(status_code=400, detail="ID is required for update")

        content = await db.scalar(select(Content).where(Content.id == content_data.id))

        if not content or content.deleted_at:
            raise HTTPException(status_code=404, detail="Content not found")

        update_data = content_data.model_dump(exclude_unset=True, exclude={"id"})
        for key, value in update_data.items():
            setattr(content, key, value)

        content.youtube_id = extractYoutubeId(content.youtube_id)

        await db.commit()
        await db.refresh(content)
        return content
    except HTTPException:
        raise
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/{content_id}", dependencies=[Depends(required_roles(["MODERATOR", "TEACHER"]))])
async def delete_content(content_id: int, db: AsyncSession = Depends(get_async_db)):
    try:
        content = await db.scalar(select(Content).where(Content.id == content_id))

        if not content or content.deleted_at:
            raise HTTPException(status_code=404, detail="Content not found")

        content.deleted_at = datetime.utcnow()
        await db.commit()
        return {"detail": "Content wurde als gelöscht markiert"}
    except HTTPException:
        raise
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/all/", response_model=List[ContentDto])
async def get_content(db: AsyncSession = Depends(get_async_db)):
    try:
        contents = await db.scalars(
            select(Content)
            .where(Content.deleted_at == None)
        )
        return contents.all()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))