# This is the class of a Lesson.
# It has a name, a description, it is linked to a category
# it has an automatically order
# it has an optional position(x,y) on the background image
# it is a model for the database
from datetime import datetime
from typing import Optional
from sqlalchemy import Column, ForeignKey, Integer
from sqlmodel import Field, Relationship
from models.base import Base, RefBase


class Lesson(Base, table=True):
    id: Optional[int] = Field(primary_key=True, index=True)
    name: str
    description: str
    display_order: Optional[int]
    position_x: int
    position_y: int

    category_id: Optional[str] = Field(default=None, foreign_key="category.id")

    category: Optional["Category"] = Relationship(back_populates="lessons")

    contents: list["Content"] = Relationship(back_populates="lesson")
    # Beziehung für User-Fortschritte
    user_progresses: list["UserLessonLink"] = Relationship(back_populates="lesson")


class UserLessonLink(RefBase, table=True):
    """Tabelle zur Speicherung des Fortschritts eines Users in einer Lektion"""
    user_id: int = Field(sa_column=Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True))
    lesson_id: int = Field(sa_column=Column(Integer, ForeignKey("lesson.id", ondelete="CASCADE"), primary_key=True))
    progress: int = Field(default=0, ge=0, le=100, sa_column=Column(Integer, server_default="0", nullable=False))  # Wert zwischen 0 und 100

    # Relationships
    user: "User" = Relationship(back_populates="lesson_progresses")
    lesson: "Lesson" = Relationship(back_populates="user_progresses")