from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

from util.uid_generator import generate_id


# Erstelle eine gemeinsame Basisklasse für alle Modelle
class Base(SQLModel):
    __abstract__ = True
    # Gemeinsame Spalten für alle Tabellen
    uid: str = Field(
        default_factory=lambda: generate_id(),
        primary_key=True,
        index=True,
        unique=True,
        min_length=8,
        max_length=128,
        description="Unique identifier with random 8-character string"
    )
    deleted_at: Optional[datetime] = Field(default=None)


class RefBase(SQLModel):
    __abstract__ = True
    deleted_at: Optional[datetime] = Field(default=None)