# create_tables.py
import asyncio
from database import create_tables, engine, SQLModel
from sqlalchemy import inspect


async def main():
    print("⏳ Checking database tables...")

    # Async-Inspektion mit run_sync
    async with engine.connect() as conn:
        # 1. Tabellen im public-Schema auflisten
        result = await conn.execute(
            text("SELECT table_name FROM information_schema.tables WHERE table_schema='public'")
        )
        existing_tables = [row[0] for row in result.fetchall()]
        print(f"🔍 Existing tables: {existing_tables}")

        # 2. Erwartete Tabellen anzeigen
        expected_tables = list(SQLModel.metadata.tables.keys())
        print(f"📋 Expected tables: {expected_tables}")

        if all(table in existing_tables for table in expected_tables):
            print("✅ All tables already exist")
            return

        # Fehlende Tabellen anzeigen
        missing_tables = [t for t in expected_tables if t not in existing_tables]
        print(f"⚠️ Missing tables: {', '.join(missing_tables)}")

        # Tabellen erstellen
        print("⏳ Creating tables...")
        await create_tables()

        # Ergebnis erneut prüfen
        async with engine.connect() as conn:
            new_tables = await conn.run_sync(
                lambda sync_conn: inspect(sync_conn).get_table_names()
            )
            created_tables = set(new_tables) - set(existing_tables)
            print(f"✅ Created {len(created_tables)} tables: {', '.join(created_tables)}")


if __name__ == "__main__":
    asyncio.run(main())
