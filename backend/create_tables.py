import asyncio
from database import create_tables, engine, SQLModel
from sqlalchemy import text, inspect  # text Import hinzugefügt
import logging
from models import *  # Alle Modelle importieren, um sie in SQLModel.metadata zu registrieren

# Logging konfigurieren
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


async def main():
    logger.info("⏳ Starting database table creation process...")

    try:
        # 1. Engine-Informationen anzeigen
        logger.info(f"🔧 Using database URL: {engine.url}")

        # 2. Verbindung testen
        async with engine.connect() as conn:
            logger.info("✅ Database connection successful")

            # 3. Version der PostgreSQL-Datenbank anzeigen
            version_result = await conn.execute(text("SELECT version()"))  # text verwenden
            db_version = version_result.scalar()
            logger.info(f"🔍 Database version: {db_version}")

            # 4. Vorhandene Tabellen im public-Schema auflisten
            tables_result = await conn.execute(text("""
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public' 
                  AND table_catalog = :dbname
                """))
            existing_tables = [row[0] for row in tables_result.fetchall()]
            logger.info(f"📋 Existing tables: {existing_tables}")

            # 5. Erwartete Tabellen anzeigen
            expected_tables = list(SQLModel.metadata.tables.keys())
            logger.info(f"📋 Expected tables: {expected_tables}")

            # 6. Fehlende Tabellen identifizieren
            missing_tables = [t for t in expected_tables if t not in existing_tables]

            if missing_tables:
                logger.warning(f"⚠️ Missing tables: {', '.join(missing_tables)}")
                logger.info("⏳ Creating missing tables...")
                await create_tables()
            else:
                logger.info("✅ All expected tables already exist")
                return

            # 7. Nach Erstellung erneut prüfen
            tables_result_after = await conn.execute(text(
                "SELECT table_name FROM information_schema.tables "
                "WHERE table_schema = 'public'"
            ))
            new_tables = [row[0] for row in tables_result_after.fetchall()]
            created_tables = set(new_tables) - set(existing_tables)

            if created_tables:
                logger.info(f"✅ Created tables: {', '.join(created_tables)}")
            else:
                logger.error("❌ No new tables were created!")

    except Exception as e:
        logger.exception(f"❌ Critical error during table creation: {e}")
        raise


if __name__ == "__main__":
    asyncio.run(main())
