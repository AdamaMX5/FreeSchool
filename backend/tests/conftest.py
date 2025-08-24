# tests/conftest.py
import pytest
from fastapi import Request
from fastapi.testclient import TestClient
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLModel
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select

from main import app
from database import get_async_db
from tests.auth_utils import AuthClient
from models import Role, RoleEnum

import logging
# SQLAlchemy Logging deaktivieren
logging.getLogger('sqlalchemy.engine').setLevel(logging.WARNING)
logging.getLogger('sqlalchemy.pool').setLevel(logging.WARNING)
logging.getLogger('sqlalchemy.dialects').setLevel(logging.WARNING)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Test-Datenbank URL
TEST_DATABASE_URL = "sqlite+aiosqlite:///:memory:"


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    logger.warning(f"Validation error: {exc.errors()}")
    body = await request.body()
    logger.warning(f"Request body: {body.decode()}")
    return JSONResponse(
        status_code=422,
        content={"detail": exc.errors(), "body": body.decode()},
    )


test_engine = create_async_engine(
    TEST_DATABASE_URL, echo=True, future=True
)

AsyncTestSessionLocal = sessionmaker(
    class_=AsyncSession,
    autocommit=False,
    autoflush=False,
    bind=test_engine,
    expire_on_commit=False,
)


async def initialize_roles(db):
    """Erstellt alle notwendigen Rollen für Tests"""
    required_roles = [role.value for role in RoleEnum]

    for role_name in required_roles:
        result = await db.exec(select(Role).where(Role.name == role_name))
        existing_role = result.first()
        if not existing_role:
            db.add(Role(name=role_name))

    await db.commit()


async def override_get_async_db():
    async with AsyncTestSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()


@pytest.fixture(scope="function")
async def test_db():
    # Create all tables
    async with test_engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

    async with AsyncTestSessionLocal() as session:
        # Rollen initialisieren
        await initialize_roles(session)
        yield session

    async with test_engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.drop_all)


@pytest.fixture(scope="function")
async def auth_client(test_client, test_db):
    return AuthClient(test_client, test_db)


@pytest.fixture(scope="module")
def test_client():
    app.dependency_overrides[get_async_db] = override_get_async_db
    with TestClient(app) as client:
        yield client
    app.dependency_overrides.clear()