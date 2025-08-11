# this is the Router for the Lesson model
# you can create a new one, change one, delete one or get one

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy.orm import Session
from database import get_db

from models.lesson import Lesson
from models.content import Content
from models.user import User, UserLessonLink

from security.auth import get_current_user, get_current_user_optional
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
    progress: int


def wrap(lesson: Lesson, progress: int = 0) -> LessonDto:
    return LessonDto(
        id=lesson.id,
        category_id=lesson.category_id,
        name=lesson.name,
        description=lesson.description,
        order=lesson.order,
        position_x=lesson.position_x,
        position_y=lesson.position_y,
        contents=[c.id for c in lesson.contents],
        progress = progress
    )


def wrap_list(lessons: List[Lesson]) -> List[LessonDto]:
    return [wrap(lesson) for lesson in lessons]


@router.post("/", dependencies=[Depends(required_roles(["MODERATOR", "TEACHER"]))])
async def new_lesson(dto: LessonDto, db: Session = Depends(get_db)):
    try:
        # 1. Erstelle Lesson-Instanz
        lesson = Lesson(
            category_id=dto.category_id,
            name=dto.name,
            description=dto.description,
            order=dto.order,
            position_x=dto.position_x,
            position_y=dto.position_y,
        )

        # 2. Optional: Inhalte zuweisen, falls contents eine M:N-Beziehung ist
        if dto.contents:
            lesson.contents = db.query(Content).filter(Content.id.in_(dto.contents)).all()

        # 3. Speichern
        db.add(lesson)
        db.commit()
        db.refresh(lesson)
        return wrap(lesson)
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{lesson_id}")
async def get_lesson(lesson_id: int, db: Session = Depends(get_db)):
    l = db.get(Lesson, lesson_id)
    if l is None:
        raise HTTPException(status_code=404, detail="Category not found")
    else:
        return wrap(l)


@router.get("/by_category/{category_id}")
async def get_lessons_by_category(
        category_id: int,
        db: Session = Depends(get_db),
        current_user: Optional[User] = Depends(get_current_user_optional)
):
    lessons = db.query(Lesson).filter(Lesson.category_id == category_id).filter(Lesson.is_deleted == False).all()
    if not lessons:
        raise HTTPException(status_code=404, detail="No Lessons found")

    # 2. Wenn User angemeldet ist, Fortschritte laden
    if current_user:
        # Alle Fortschritte des Users für diese Kategorie in einem Query laden
        progresses = db.query(UserLessonLink).filter(
            UserLessonLink.user_id == current_user.id,
            UserLessonLink.lesson_id.in_([l.id for l in lessons])
        ).all()

        # Dictionary für schnellen Zugriff erstellen
        progress_dict = {p.lesson_id: p.progress for p in progresses}

        # Lektionen mit Fortschritt zurückgeben
        return [
            wrap(
                lesson=lesson,
                progress=progress_dict.get(lesson.id, 0)  # 0 wenn kein Eintrag existiert
            )
            for lesson in lessons
        ]
    else:
        return wrap_list(lessons)


@router.get("/all/")
async def get_lessons(db: Session = Depends(get_db)):
    return wrap_list(db.query(Lesson).filter(Lesson.is_deleted == False).all())


@router.put("/{lesson_id}", dependencies=[Depends(required_roles(["MODERATOR", "TEACHER"]))])
async def update_lesson(lesson_id: int, data: LessonDto, db: Session = Depends(get_db)):
    try:
        l = db.get(Lesson, lesson_id)
        if l is None:
            raise HTTPException(status_code=404, detail="Lesson not found")

        l.name = data.name
        l.description = data.description
        l.order = data.order
        l.position_x = data.position_x
        l.position_y = data.position_y

        db.commit()
        db.refresh(l)
        return wrap(l)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/{lesson_id}", dependencies=[Depends(required_roles(["MODERATOR", "TEACHER"]))])
async def delete_lesson(lesson_id: int, db: Session = Depends(get_db)):
    try:
        l = db.get(Lesson, lesson_id)
        if not l or l.is_deleted:
            raise HTTPException(status_code=404, detail="Lesson not found")
        else:
            l.is_deleted = True
            db.commit()
            return {"detail": "Lesson wurde als gelöscht markiert"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


class ProgressUpdateDto(BaseModel):
    lesson_id: int
    progress: int


@router.post("/progress", response_model=UserLessonLink)
async def update_lesson_progress(
        dto: ProgressUpdateDto,
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_user)  # Angenommen, du hast diese Dependency
):
    """
    Update or create the progress of a student for a specific lesson.
    Progress must be between 0 and 100 percent.
    """
    try:
        # Prüfe ob die Lektion existiert
        lesson = db.get(Lesson, dto.lesson_id)
        if not lesson or lesson.is_deleted:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Lesson not found"
            )

        # Hole oder erstelle den Fortschrittseintrag
        progress = db.query(UserLessonLink).filter(
            UserLessonLink.user_id == current_user.id,
            UserLessonLink.lesson_id == dto.lesson_id
        ).first()

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

        db.commit()
        db.refresh(progress)
        return progress

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Could not update progress: {str(e)}"
        )


@router.get("/progress/{lesson_id}", response_model=Optional[UserLessonLink])
async def get_lesson_progress(
        lesson_id: int,
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    """
    Get the progress of the current user for a specific lesson.
    Returns None if no progress has been recorded yet.
    """
    try:
        progress = db.query(UserLessonLink).filter(
            UserLessonLink.user_id == current_user.id,
            UserLessonLink.lesson_id == lesson_id
        ).first()

        return progress

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Could not fetch progress: {str(e)}"
        )


@router.get("/progress/all", response_model=List[UserLessonLink])
async def get_all_progress(
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    """
    Get all progress records for the current user.
    """
    try:
        return db.query(UserLessonLink).filter(
            UserLessonLink.user_id == current_user.id
        ).all()

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Could not fetch progress records: {str(e)}"
        )