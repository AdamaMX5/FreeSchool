# this is the Router for the Content model
# you can create a new one, change one, delete one or get one

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import joinedload
from sqlmodel import Session
from database import get_db

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
    # Extract the YouTube ID from the link
    if "youtube.com/watch?v=" in link:
        return link.split("v=")[1].split("&")[0]
    elif "youtu.be/" in link:
        return link.split("/")[-1]
    elif "youtube.com/embed/" in link:
        return link.split("/")[-1]
    # or already a id
    elif len(link) == 11:
        return link
    else:
        raise ValueError("Invalid YouTube link")


@router.get("/{content_id}", response_model=ContentDto)
def get_content(content_id: int, db: Session = Depends(get_db)):
    try:
        c = db.get(Content, content_id)
        if c is None:
            raise HTTPException(status_code=404, detail="Content not found")
        return c
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/by_lesson/{lesson_id}", response_model=list[ContentWithTeacherDto])
def get_contents_by_lesson(lesson_id: int, db: Session = Depends(get_db)):
    return db.query(Content).options(joinedload(Content.teacher)).filter(
                Content.lesson_id == lesson_id,
                Content.is_deleted == False
            ).all()


@router.post("/", response_model=ContentDto, dependencies=[Depends(required_roles(["MODERATOR", "TEACHER"]))])
async def new_content(content_data: ContentDto, db: Session = Depends(get_db)):
    if (content_data.lesson_id is None):
        raise HTTPException(status_code=400, detail="Lesson ID is required")
    if (content_data.teacher_id is None):
        raise HTTPException(status_code=400, detail="Teacher ID is required")
    try:
        # Convert DTO to SQLModel Content
        content = Content(**content_data.model_dump(exclude_unset=True))

        # extract YoutubeID out of the Link: https://www.youtube.com/watch?v=RMnNnECqU_k || https://youtu.be/la17ZW0SAUY || https://www.youtube.com/embed/la17ZW0SAUY
        content.youtube_id = extractYoutubeId(content.youtube_id);

        db.add(content)
        db.commit()
        db.refresh(content)
        return content
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.put("/", response_model=ContentDto, dependencies=[Depends(required_roles(["MODERATOR", "TEACHER"]))])
async def update_content(
    content_data: ContentDto,
    db: Session = Depends(get_db)
):
    try:
        if content_data.id is None:
            raise HTTPException(status_code=400, detail="ID is required for update")

        content = db.get(Content, content_data.id)
        if content is None or content.is_deleted:
            raise HTTPException(status_code=404, detail="Content not found")

        # Update only provided fields (excluding id to prevent accidental changes)
        update_data = content_data.model_dump(exclude_unset=True, exclude={"id"})
        for key, value in update_data.items():
            setattr(content, key, value)

        # extract YoutubeID out of the Link: https://www.youtube.com/watch?v=RMnNnECqU_k || https://youtu.be/la17ZW0SAUY || https://www.youtube.com/embed/la17ZW0SAUY
        content.youtube_id = extractYoutubeId(content.youtube_id);

        db.commit()
        db.refresh(content)
        return content
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/{content_id}", dependencies=[Depends(required_roles(["MODERATOR", "TEACHER"]))])
async def delete_content(content_id: int, db: Session = Depends(get_db)):
    try:
        c = db.get(Content, content_id)
        if not c or c.is_deleted:
            raise HTTPException(status_code=404, detail="Content not found")

        c.is_deleted = True
        db.commit()
        return {"detail": "Content wurde als gelöscht markiert"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/all/", response_model=list[ContentDto])
def get_content(db: Session = Depends(get_db)):
    contents = db.query(Content).filter(Content.is_deleted == False).all()
    return contents
