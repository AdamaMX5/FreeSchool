# create_tables.py
import asyncio
from database import create_tables, engine, SQLModel
from sqlalchemy import inspect


async def main():
    print("⏳ Checking database tables...")

    # Async-Inspektion mit run_sync
    async with engine.connect() as conn:
        # Synchrone Tabellenprüfung
        existing_tables = await conn.run_sync(
            lambda sync_conn: inspect(sync_conn).get_table_names()
        )

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

        # Ergebnis erneut prüfen
        async with engine.connect() as conn:
            new_tables = await conn.run_sync(
                lambda sync_conn: inspect(sync_conn).get_table_names()
            )
            created_tables = set(new_tables) - set(existing_tables)
            print(f"✅ Created {len(created_tables)} tables: {', '.join(created_tables)}")


if __name__ == "__main__":
    asyncio.run(main())
