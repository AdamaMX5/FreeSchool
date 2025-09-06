from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

from util.uid_generator import generate_id


# Erstelle eine gemeinsame Basisklasse für alle Modelle
class Base(SQLModel):
    __abstract__ = True
    # Gemeinsame Spalten für alle Tabellen


class RefBase(SQLModel):
    __abstract__ = True