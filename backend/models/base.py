from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

from util.uid_generator import generate_id


# Erstelle eine gemeinsame Basisklasse für alle Modelle
class Base(SQLModel):
    __abstract__ = True
    # Gemeinsame Spalten für alle Tabellen
    id: Optional[int] = Field(primary_key=True, index=True)
    deleted_at: Optional[datetime] = Field(default=None, nullable=True)


class RefBase(SQLModel):
    __abstract__ = True