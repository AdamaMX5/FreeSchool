# this is the teacher model
# it is an database object
# it has the following attributes:
# 1. teacher_id: the id of the teacher
# 2. name: the name of the teacher
# 3. email: the email of the teacher
# 4. city: the city of the teacher
# 5. country: the country of the teacher

from sqlmodel import Field, Relationship
from models.base import Base


class Teacher(Base, table=True):

    name: str
    email: str
    city: str
    country: str
    language: str = Field(default="de")

    contents: list["Content"] = Relationship(back_populates="teacher")
