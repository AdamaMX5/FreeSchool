from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import SQLModel, Field, Session, select
from sqlalchemy import event
from typing import Optional
from datetime import datetime
from typing import Type
import random
import string


# Erstelle eine gemeinsame Basisklasse für alle Modelle
class Base(SQLModel):
    __abstract__ = True
    # Gemeinsame Spalten für alle Tabellen
    id: Optional[str] = Field(primary_key=True, index=True)
    deleted_at: Optional[datetime] = Field(default=None, nullable=True)

    @classmethod
    def get_prefix(cls) -> str:
        prefix_map = {
            "User": "u",
            "Profile": "pr",
            "Role": "ro",
            "Category": "ca",
            "Content": "co",
            "Lesson": "le",
            "Teacher": "t"
        }
        prefix = prefix_map.get(cls.__name__)
        if prefix is None:
            raise ValueError(
                f"Kein Prefix für Klasse '{cls.__name__}' definiert. "
                f"Bitte füge einen Prefix in Base.get_prefix() hinzu. "
                f"Verfügbare Klassen: {list(prefix_map.keys())}"
            )
        return prefix


class RefBase(SQLModel):
    __abstract__ = True


# ID-Generierungsfunktion
def generate_unique_id(session, model_class: Type[Base]) -> str:
    """Generiert eine eindeutige ID mit Konfliktauflösung"""
    prefix = model_class.get_prefix()

    def generate_random_string(length: int) -> str:
        """Generiert einen zufälligen String aus a-z, A-Z, 0-9"""
        characters = string.ascii_letters + string.digits  # a-z, A-Z, 0-9
        return ''.join(random.choice(characters) for _ in range(length))

    prefix = model_class.get_prefix()
    characters = string.ascii_letters + string.digits

    current_length = 6

    while True:
        random_part = ''.join(random.choice(characters) for _ in range(current_length))
        candidate_id = f"{prefix}_{random_part}"

        # Prüfe ob ID bereits existiert
        existing = session.exec(
            select(model_class).where(model_class.id == candidate_id)
        ).first()

        if not existing:
            return candidate_id

        # Erhöhe die Länge für den nächsten Versuch
        current_length += 1


async def generate_unique_id_async(session: AsyncSession, model_class: Type[Base]) -> str:
    """Async Version der ID-Generierung"""
    from sqlmodel import select

    prefix = model_class.get_prefix()
    characters = string.ascii_letters + string.digits

    current_length = 6

    while True:
        random_part = ''.join(random.choice(characters) for _ in range(current_length))
        candidate_id = f"{prefix}_{random_part}"

        # Async Prüfung
        stmt = (select(model_class).where(model_class.uid == candidate_id))
        existing = await session.scalar(stmt)

        if not existing:
            return candidate_id

        current_length += 1


# Event Listener
@event.listens_for(Session, "before_flush")
def before_flush_handler(session, flush_context, instances):
    """Automatische ID-Generierung für neue Objekte"""
    for obj in session.new:
        if isinstance(obj, Base) and obj.id is None:
            obj.id = generate_unique_id(session, type(obj))