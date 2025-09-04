from datetime import datetime
from typing import Optional, List
from sqlmodel import Field, Relationship
from enum import Enum
from models.base import Base, RefBase


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
    user_id: Optional[int] = Field(default=None, foreign_key="users.id", primary_key=True)
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
    __tablename__ = "users"  # weil user ein reserviertes Wort ist

    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True, title="E-Mail-Adresse",  min_length=5)
    hashed_password: str = Field(title="Passwort-Hash")
    jwt: Optional[str] = Field(default=None, title="JWT-Token")
    password_verify: bool = Field(default=False, title="Passwort zweites Mal korrekt eingegeben")
    password_reset_token: Optional[str] = Field(default=None, title="Passwort-Token")
    email_verify_token: Optional[str] = Field(default=None, title="E-Mail-Token")
    email_verify: bool = Field(default=False, title="E-Mail-Adresse verifiziert")
    last_login: datetime = Field(default=None, title="Letzter Login")
    comment: str = Field(default="", title="Kommentar")
    last_editor: str = Field(default="automatic", title="Email vom letzten Bearbeiter")
    # Beziehung zu Rollen über die Association Table:
    roles: List[Role] = Relationship(back_populates="users", link_model=UserRoleLink)
    # Beziehung zum Profil (1:1)
    profile: Optional["Profile"] = Relationship(back_populates="user", sa_relationship_kwargs={"uselist": False})
    # Beziehung zu Lektionen (1:n) - Fortschritt des Users in Lektionen
    lesson_progresses: List["UserLessonLink"] = Relationship(back_populates="user")


# ─────────────
# Profil-Modell (erweiterte Informationen)
# ─────────────
class Profile(RefBase, table=True):
    full_name: Optional[str] = Field(default=None, title="Vollständiger Name")
    bio: Optional[str] = Field(default=None, title="Kurzbeschreibung")
    avatar_url: Optional[str] = Field(default=None, title="URL zum Profilbild")
    user_id: Optional[int] = Field(default=None, foreign_key="users.id")
    user: Optional[User] = Relationship(back_populates="profile")
    comment: str = Field(default="", title="Kommentar")
    last_editor: str = Field(default="automatic", title="Email vom letzten Bearbeiter")
