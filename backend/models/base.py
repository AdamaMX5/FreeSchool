from sqlmodel import SQLModel


# Erstelle eine gemeinsame Basisklasse für alle Modelle
class Base(SQLModel):
    __abstract__ = True  # Wichtig für SQLAlchemy