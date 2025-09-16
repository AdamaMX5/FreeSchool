# this is the Router for the Teacher model
# you can create a new one, change one, delete one or get one

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from database import get_async_db
from datetime import datetime
from pydantic import BaseModel
from typing import Optional

from models import Teacher
from security.auth import required_roles

import traceback
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/teacher", tags=["Teachers"])


class TeacherDto(BaseModel):
    id: Optional[int] = None
    name: str
    email: str
    city: str
    country: str

    class Config:
        from_attributes = True


@router.post("/", dependencies=[Depends(required_roles(["MODERATOR"]))])
async def new_teacher(t: Teacher, db: AsyncSession = Depends(get_async_db)):
    try:
        db.add(t)
        await db.commit()
        await db.refresh(t)
        return t
    except Exception as e:
        await db.rollback()
        return {"error": str(e)}


@router.put("/{teacher_id}", dependencies=[Depends(required_roles(["MODERATOR"]))])
async def update_teacher(teacher_id: int, data: Teacher, db: AsyncSession = Depends(get_async_db)):
    try:
        t = await db.scalar(select(Teacher).where(Teacher.id == teacher_id))
        if t is None:
            raise HTTPException(status_code=404, detail="Teacher not found")

        # update all attributes
        for key, value in data.model_dump().items():
            setattr(t, key, value)

        await db.commit()
        await db.refresh(t)
        return t
    except HTTPException:
        raise
    except Exception as e:
        await db.rollback()
        return {"error": str(e)}


@router.delete("/{teacher_id}", dependencies=[Depends(required_roles(["MODERATOR"]))])
async def delete_teacher(teacher_id: int, db: AsyncSession = Depends(get_async_db)):
    try:
        t = await db.scalar(select(Teacher).where(Teacher.id == teacher_id))
        if not t or t.deleted_at:
            raise HTTPException(status_code=404, detail="Teacher not found")

        t.deleted_at = datetime.utcnow()
        await db.commit()
        return {"detail": "Lehrer wurde als gelöscht markiert"}
    except HTTPException:
        raise
    except Exception as e:
        await db.rollback()
        return {"error": str(e)}


@router.get("/all")
async def get_teachers(db: AsyncSession = Depends(get_async_db)):
    try:
        teachers = await db.scalars(select(Teacher).where(Teacher.deleted_at == None))
        return teachers.all()
    except Exception as e:
        return {"error": str(e)}


@router.get("/{teacher_id}/contents")
async def get_teacher_contents(teacher_id: int, db: AsyncSession = Depends(get_async_db)):
    try:
        t = await db.scalar(select(Teacher).where(Teacher.id == teacher_id).options(selectinload(Teacher.contents)))
        if t is None:
            raise HTTPException(status_code=404, detail="Teacher not found")
        return [content for content in t.contents if not content.deleted_at]
    except HTTPException:
        raise
    except Exception as e:
        return {"error": str(e)}


@router.get("/{teacher_id}")
async def get_teacher(teacher_id: int, db: AsyncSession = Depends(get_async_db)):
    t = await db.scalar(select(Teacher).where(Teacher.id == teacher_id))
    if t is None:
        raise HTTPException(status_code=404, detail="Teacher not found")
    return t
