from sqlmodel import SQLModel
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import func, select, inspect
import os
from dotenv import load_dotenv
from models import *

# Lade Umgebungsvariablen aus .env
load_dotenv()

# Konstruiere DATABASE_URL aus Einzelvariablen
DB_HOST = os.getenv("DB_HOST", "db")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_USER = os.getenv("DB_USER", "freeschool")
DB_PASSWORD = os.getenv("DB_PASSWORD", "sicher123")
DB_NAME = os.getenv("DB_NAME", "freeschool")

DATABASE_URL = f"postgresql+asyncpg://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# Async-Engine erstellen
engine = create_async_engine(DATABASE_URL, echo=True)

# Async-Session-Factory
async_session = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)


# Async-Dependency für DB-Sitzung (renamed from get_db to get_async_db)
async def get_async_db():
    async with async_session() as session:
        yield session


async def get_db():
    get_async_db()


async def create_tables():
    async with engine.begin() as conn:
        # Synchrone Inspektion mit run_sync
        existing_tables = await conn.run_sync(
            lambda sync_conn: inspect(sync_conn).get_table_names()
        )

        # Nur nicht-existente Tabellen erstellen
        tables_to_create = [
            t for t in SQLModel.metadata.tables.values()
            if t.name not in existing_tables
        ]

        if not tables_to_create:
            print("All tables already exist")
            return

        print(f"Creating {len(tables_to_create)} tables...")
        await conn.run_sync(
            lambda sync_conn: SQLModel.metadata.create_all(bind=sync_conn, tables=tables_to_create)
        )
        print("Tables created")


async def test_connection():
    try:
        async with engine.connect() as conn:
            print("Verbindung zur Datenbank erfolgreich")
        return True
    except Exception as e:
        print(f"Verbindungsfehler: {e}")
        return False


async def get_table_counts(db: AsyncSession):
    """Helper function to count rows in all tables"""
    tables = SQLModel.metadata.tables
    counts = {}
    for table_name in tables:
        result = await db.execute(select(func.count()).select_from(tables[table_name]))
        counts[table_name] = result.scalar()
    return counts