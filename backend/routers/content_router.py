from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload
from sqlmodel import select
from database import get_async_db

from models.content import Content
from pydantic import BaseModel
from typing import Optional

from routers.teacher_router import TeacherDto
from security.auth import required_roles

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
    teacher: TeacherDto = None

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
        raise ValueError("Invalid YouTube link")


@router.get("/{content_id}", response_model=ContentDto)
async def get_content(content_id: int, db: AsyncSession = Depends(get_async_db)):
    try:
        result = await db.execute(select(Content).where(Content.id == content_id))
        content = result.scalars().first()
        if not content:
            raise HTTPException(status_code=404, detail="Content not found")
        return content
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/by_lesson/{lesson_id}", response_model=list[ContentWithTeacherDto])
async def get_contents_by_lesson(lesson_id: int, db: AsyncSession = Depends(get_async_db)):  # get_async_db verwenden
    try:
        # Explizites Laden der Beziehungen mit joinedload
        result = await db.execute(
            select(Content)
            .options(joinedload(Content.teacher))
            .where(Content.lesson_id == lesson_id)
            .where(Content.is_deleted == False)
        )
        contents = result.unique().scalars().all()

        # Manuelle Konvertierung in DTOs
        content_dtos = []
        for content in contents:
            teacher_dto = TeacherDto.from_orm(content.teacher) if content.teacher else None
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

        return content_dtos
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/", response_model=ContentDto, dependencies=[Depends(required_roles(["MODERATOR", "TEACHER"]))])
async def new_content(content_data: ContentDto, db: AsyncSession = Depends(get_async_db)):
    if content_data.lesson_id is None:
        raise HTTPException(status_code=400, detail="Lesson ID is required")
    if content_data.teacher_id is None:
        raise HTTPException(status_code=400, detail="Teacher ID is required")

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

        result = await db.execute(select(Content).where(Content.id == content_data.id))
        content = result.scalars().first()

        if not content or content.is_deleted:
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
        result = await db.execute(select(Content).where(Content.id == content_id))
        content = result.scalars().first()

        if not content or content.is_deleted:
            raise HTTPException(status_code=404, detail="Content not found")

        content.is_deleted = True
        await db.commit()
        return {"detail": "Content wurde als gelöscht markiert"}
    except HTTPException:
        raise
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/all/", response_model=list[ContentDto])
async def get_content(db: AsyncSession = Depends(get_async_db)):
    try:
        result = await db.execute(
            select(Content)
            .where(Content.is_deleted == False)
        )
        contents = result.scalars().all()
        return contents
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))