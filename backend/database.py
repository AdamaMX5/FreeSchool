from sqlmodel import SQLModel
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import func

# Async-PostgreSQL-Verbindung
DATABASE_URL = "postgresql+asyncpg://freeschool:sicher123@localhost:5432/freeschool"

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

# Tabellen erstellen (async)
async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)
    print("Tabellen erstellt")


async def test_connection():
    try:
        async with engine.connect() as conn:
            print("✅ Verbindung zur Datenbank erfolgreich")
        return True
    except Exception as e:
        print(f"❌ Verbindungsfehler: {e}")
        return False


async def get_table_counts(db: AsyncSession):
    """Helper function to count rows in all tables"""
    tables = SQLModel.metadata.tables
    counts = {}
    for table_name in tables:
        result = await db.execute(select(func.count()).select_from(tables[table_name]))
        counts[table_name] = result.scalar()
    return counts