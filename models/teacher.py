# this is the teacher model
# it is an database object
# it has the following attributes:
# 1. teacher_id: the id of the teacher
# 2. name: the name of the teacher
# 3. email: the email of the teacher
# 4. city: the city of the teacher
# 5. country: the country of the teacher

from typing import Optional

from sqlmodel import SQLModel, Field, Relationship


class Teacher(SQLModel, table=True):
    id: Optional[int] = Field(primary_key=True, index=True)
    is_deleted: bool = Field(default=False)
    name: str
    email: str
    city: str
    country: str

    contents: list["Content"] = Relationship(back_populates="teacher")
