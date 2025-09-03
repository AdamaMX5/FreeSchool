# This is the class of a Category.
# This has multiple Parents and multiple Children of category.
# When parent.size = 0 ist is a learning hub.
# It has a name, an link to a background image
# It is a model for the database.
# it contains lessons
from datetime import datetime
from typing import Optional

from sqlmodel import SQLModel, Field, Relationship
from models.base import Base, RefBase


class CategoryCategory(RefBase, table=True):
    parent_uid: str = Field(default=None, foreign_key="category.uid", primary_key=True)
    child_uid: str = Field(default=None, foreign_key="category.uid", primary_key=True)


class Category(Base, table=True):
    name: str
    background_link: str

    lessons: list["Lesson"] = Relationship(back_populates="category")

    parents: list["Category"] = Relationship(
        back_populates="children",
        link_model=CategoryCategory,
        sa_relationship_kwargs={"primaryjoin": "Category.uid==CategoryCategory.child_uid",
                                "secondaryjoin": "Category.uid==CategoryCategory.parent_uid"}
    )

    children: list["Category"] = Relationship(
        back_populates="parents",
        link_model=CategoryCategory,
        sa_relationship_kwargs={"primaryjoin": "Category.uid==CategoryCategory.parent_uid",
                                "secondaryjoin": "Category.uid==CategoryCategory.child_uid"}
    )