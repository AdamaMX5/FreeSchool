# This is the class of a Lesson.
# It has a name, a description, it is linked to a category
# it has an automatically order
# it has an optional position(x,y) on the background image
# it is a model for the database

from typing import Optional

from sqlmodel import SQLModel, Field, Relationship
from models import Base


class Lesson(Base, table=True):
    id: Optional[int] = Field(primary_key=True, index=True)
    is_deleted: bool = Field(default=False)
    name: str
    description: str
    order: Optional[int]
    position_x: int
    position_y: int

    category_id: Optional[int] = Field(default=None, foreign_key="category.id")

    category: Optional["Category"] = Relationship(back_populates="lessons")

    contents: list["Content"] = Relationship(back_populates="lesson")
    # Beziehung für User-Fortschritte
    user_progresses: list["UserLessonLink"] = Relationship(back_populates="lesson")