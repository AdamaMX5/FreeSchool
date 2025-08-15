from sqlmodel import SQLModel
from .user import User, UserRoleLink
from .role import Role
from .profile import Profile
from .lesson import Lesson, UserLessonLink
from .category import Category, CategoryCategory
from .content import Content
from .teacher import Teacher


# Erstelle eine gemeinsame Basisklasse für alle Modelle
class Base(SQLModel):
    __abstract__ = True  # Wichtig für SQLAlchemy


# Explizit alle Modelle auflisten
__all__ = [
    'User',
    'UserRoleLink',
    'Role',
    'Profile',
    'Lesson',
    'UserLessonLink',
    'Category',
    'CategoryCategory',
    'Content',
    'Teacher'
]
