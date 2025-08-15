from typing import Optional, List

from sqlalchemy import Column, ForeignKey, Integer
from sqlalchemy.sql import expression
from sqlmodel import SQLModel, Field, Relationship
from enum import Enum
from models import Base


class RoleEnum(str, Enum):
    STUDENT = "STUDENT"
    TEACHER = "TEACHER"
    TUTOR = "TUTOR"
    PROJECTMANAGER = "PROJECTMANAGER"
    SCHOOLDIRECTOR = "SCHOOLDIRECTOR"
    MODERATOR = "MODERATOR"
    ADMIN = "ADMIN"


# ─────────────────────────────
# Many-to-Many Association Table
# ─────────────────────────────
class UserRoleLink(Base, table=True):
    user_id: Optional[int] = Field(default=None, foreign_key="user.id", primary_key=True)
    role_id: Optional[int] = Field(default=None, foreign_key="role.id", primary_key=True)


# ─────────────
# Role-Modelle
# ─────────────
class Role(Base, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str  # z. B. "STUDENT", "TEACHER", "TUTOR", "PROJECTMANAGER", "SCHOOLDIRECTOR", "MODERATOR", "ADMIN"
    # Relationship zur Many-to-Many Verknüpfung:
    users: List["User"] = Relationship(back_populates="roles", link_model=UserRoleLink)


# ─────────────
# User-Modelle
# ─────────────
class User(Base, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    is_deleted: bool = Field(default=False)
    email: str = Field(index=True, unique=True, title="E-Mail-Adresse",  min_length=5)
    hashed_password: str = Field(title="Passwort-Hash")
    jwt: Optional[str] = Field(default=None, title="JWT-Token")
    passwordVerify: bool = Field(default=False, title="Passwort zweites Mal korrekt eingegeben")
    passwortResetToken: Optional[str] = Field(default=None, title="Passwort-Token")
    emailVerifyToken: Optional[str] = Field(default=None, title="E-Mail-Token")
    emailVerify: bool = Field(default=False, title="E-Mail-Adresse verifiziert")
    lastLogin: int = Field(default=None, title="Letzter Login")
    comment: str = Field(default="", title="Kommentar")
    lastEditor: str = Field(default="automatic", title="Email vom letzten Bearbeiter")
    # Beziehung zu Rollen über die Association Table:
    roles: List[Role] = Relationship(back_populates="users", link_model=UserRoleLink)
    # Beziehung zum Profil (1:1)
    profile: Optional["Profile"] = Relationship(back_populates="user", sa_relationship_kwargs={"uselist": False})
    # Beziehung zu Lektionen (1:n) - Fortschritt des Users in Lektionen
    lesson_progresses: List["UserLessonLink"] = Relationship(back_populates="user")


# ─────────────
# Profil-Modell (erweiterte Informationen)
# ─────────────
class Profile(Base, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    full_name: Optional[str] = Field(default=None, title="Vollständiger Name")
    bio: Optional[str] = Field(default=None, title="Kurzbeschreibung")
    avatar_url: Optional[str] = Field(default=None, title="URL zum Profilbild")
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    user: Optional[User] = Relationship(back_populates="profile")
    comment: str = Field(default="", title="Kommentar")
    lastEditor: str = Field(default="automatic", title="Email vom letzten Bearbeiter")


class UserLessonLink(Base, table=True):
    """Tabelle zur Speicherung des Fortschritts eines Users in einer Lektion"""
    user_id: int = Field(sa_column=Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), primary_key=True))
    lesson_id: int = Field(sa_column=Column(Integer, ForeignKey("lesson.id", ondelete="CASCADE"), primary_key=True))

    progress: int = Field(default=0, ge=0, le=100, sa_column=Column(Integer, server_default="0", nullable=False))  # Wert zwischen 0 und 100

    # Relationships
    user: "User" = Relationship(back_populates="lesson_progresses")
    lesson: "Lesson" = Relationship(back_populates="user_progresses")