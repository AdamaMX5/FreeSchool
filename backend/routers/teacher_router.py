# this is the Router for the Teacher model
# you can create a new one, change one, delete one or get one

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_db
from pydantic import BaseModel
from typing import Optional

from models import Teacher
from security.auth import required_roles

router = APIRouter(prefix="/teacher", tags=["Teachers"])


class TeacherDto(BaseModel):
    id: Optional[int] = None
    name: str
    email: str
    city: str
    country: str

    class Config:
        from_attributes = True


@router.get("/{teacher_id}")
async def get_teacher(teacher_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Teacher).where(Teacher.id == teacher_id))
    t = result.scalars().first()
    if t is None:
        raise HTTPException(status_code=404, detail="Teacher not found")
    return t


@router.post("/", dependencies=[Depends(required_roles(["MODERATOR"]))])
async def new_teacher(t: Teacher, db: AsyncSession = Depends(get_db)):
    try:
        db.add(t)
        await db.commit()
        await db.refresh(t)
        return t
    except Exception as e:
        await db.rollback()
        return {"error": str(e)}


@router.put("/{teacher_id}", dependencies=[Depends(required_roles(["MODERATOR"]))])
async def update_teacher(teacher_id: int, data: Teacher, db: AsyncSession = Depends(get_db)):
    try:
        result = await db.execute(select(Teacher).where(Teacher.id == teacher_id))
        t = result.scalars().first()
        if t is None:
            raise HTTPException(status_code=404, detail="Teacher not found")

        # update all attributes
        for key, value in data.model_dump().items():
            setattr(t, key, value)

        await db.commit()
        await db.refresh(t)
        return t
    except Exception as e:
        await db.rollback()
        return {"error": str(e)}


@router.delete("/{teacher_id}", dependencies=[Depends(required_roles(["MODERATOR"]))])
async def delete_teacher(teacher_id: int, db: AsyncSession = Depends(get_db)):
    try:
        result = await db.execute(select(Teacher).where(Teacher.id == teacher_id))
        t = result.scalars().first()
        if not t or t.is_deleted:
            raise HTTPException(status_code=404, detail="Teacher not found")

        t.is_deleted = True
        await db.commit()
        return {"detail": "Lehrer wurde als gelöscht markiert"}
    except Exception as e:
        await db.rollback()
        return {"error": str(e)}


@router.get("/all/")
async def get_teachers(db: AsyncSession = Depends(get_db)):
    try:
        result = await db.execute(select(Teacher).where(Teacher.is_deleted == False))
        return result.scalars().all()
    except Exception as e:
        return {"error": str(e)}


@router.get("/{teacher_id}/contents/")
async def get_teacher_contents(teacher_id: int, db: AsyncSession = Depends(get_db)):
    try:
        result = await db.execute(select(Teacher).where(Teacher.id == teacher_id))
        t = result.scalars().first()
        if t is None:
            raise HTTPException(status_code=404, detail="Teacher not found")
        return t.contents
    except Exception as e:
        return {"error": str(e)}