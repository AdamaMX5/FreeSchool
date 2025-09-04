from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from dotenv import load_dotenv
from alembic import context
from sqlmodel import SQLModel
import sys
import os

# Model-Imports (für Autogenerate)
import models.category
import models.content
import models.lesson
import models.teacher
import models.user

# Konfiguration
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))
load_dotenv(os.path.join(BASE_DIR, ".env"))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
config = context.config


# Metadaten für Migrationen
target_metadata = SQLModel.metadata

# Logging setup
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

database_url = os.getenv("DATABASE_URL")
if database_url and database_url.startswith("postgresql+asyncpg"):
    database_url = database_url.replace("postgresql+asyncpg", "postgresql+psycopg2")

config.set_main_option("sqlalchemy.url", database_url)


def run_migrations_offline() -> None:
    """Offline-Modus (ohne DB-Verbindung)"""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        compare_type=True  # Wichtig für Schema-Änderungen
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Online-Modus (mit aktiver DB-Verbindung)"""
    # Synchrone Engine für PostgreSQL erstellen
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,
            include_schemas=True  # Falls Sie Schemas nutzen
        )

        with context.begin_transaction():
            context.run_migrations()


# Ausführungsmodus
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()