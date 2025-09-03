# this is the class of content
# it is an database object
# it has the following attributes:
# 1. content_id: the id of the content
# 2. lesson_id: the id of the lesson
# 3. teacher_id: the id of the teacher
# 4. language: the language of the content
# 5. text: the text of the content in Markdown inklusive links to pdfs
# 6. video: the link to the extern youtube-video
# 7. internal_video: the link to the intern video (Server will download External Video and save it for the case of deletion)

from datetime import datetime
from typing import Optional
from sqlalchemy import Column, Text
from sqlmodel import Field, Relationship
from models.base import Base


class Content(Base, table=True):
    language: str
    text: str = Field( default="", sa_column=Column(Text), title="Markdown-Text")
    youtube_id: str
    internal_video: str

    lesson_uid: str = Field(default=None, foreign_key="lesson.uid")

    lesson: Optional["Lesson"] = Relationship(back_populates="contents")

    teacher_uid: str = Field(default=None, foreign_key="teacher.uid")

    teacher: Optional["Teacher"] = Relationship(back_populates="contents")
