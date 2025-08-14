# create_tables.py
import asyncio
from database import create_tables, engine
from sqlalchemy import inspect
from sqlmodel import SQLModel


async def main():
    print("⏳ Checking database tables...")

    # Tabellen existieren bereits?
    async with engine.connect() as conn:
        inspector = inspect(conn)
        existing_tables = inspector.get_table_names()

        # Liste der erwarteten Tabellen
        expected_tables = list(SQLModel.metadata.tables.keys())

        if all(table in existing_tables for table in expected_tables):
            print("✅ All tables already exist")
            return

        # Fehlende Tabellen anzeigen
        missing_tables = [t for t in expected_tables if t not in existing_tables]
        print(f"⚠️ Missing tables: {', '.join(missing_tables)}")

        # Tabellen erstellen
        print("⏳ Creating tables...")
        await create_tables()

        # Ergebnis prüfen
        async with engine.connect() as conn:
            inspector = inspect(conn)
            new_tables = inspector.get_table_names()
            created = set(new_tables) - set(existing_tables)
            print(f"✅ Created {len(created)} tables: {', '.join(created)}")


if __name__ == "__main__":
    asyncio.run(main())
