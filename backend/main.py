import uvicorn
import os
from fastapi import FastAPI, Depends, HTTPException
from fastapi.staticfiles import StaticFiles  # Favicon
from fastapi.responses import FileResponse  # Favicon
from routers.user_router import router as UserRouter
from routers.category_router import router as CategoryRouter
from routers.lesson_router import router as LessonRouter
from routers.content_router import router as ContentRouter
from routers.teacher_router import router as TeacherRouter
from routers.admin_router import router as AdminRouter
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import inspect
from database import get_async_db, engine, create_tables
from typing import Dict, Any
from models import *

app = FastAPI()

# Statische Dateien verfügbar machen (z.B. für Favicon)
app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(UserRouter)
app.include_router(CategoryRouter)
app.include_router(LessonRouter)
app.include_router(ContentRouter)
app.include_router(TeacherRouter)
app.include_router(AdminRouter)


async def check_database_health(db: AsyncSession) -> Dict[str, Any]:
    health_status = {
        "database_connection": False,
        "tables": {}
    }

    try:
        # 1. Verbindungstest
        async with engine.connect() as conn:
            health_status["database_connection"] = True

        # 2. Vorhandene Tabellen in der Datenbank abfragen
        async with engine.connect() as conn:
            # Synchrone Tabellenabfrage mit run_sync
            existing_tables = await conn.run_sync(
                lambda sync_conn: inspect(sync_conn).get_table_names()
            )

            # 3. Zeilen zählen für vorhandene Tabellen
            for table_name in existing_tables:
                try:
                    # Tabellenname maskieren (für reservierte Wörter wie "user")
                    safe_table_name = f'"{table_name}"' if table_name.lower() == "user" else table_name

                    result = await db.execute(f"SELECT COUNT(*) FROM {safe_table_name}")
                    count = result.scalar()
                    health_status["tables"][table_name] = {
                        "exists": True,
                        "row_count": count
                    }
                except Exception as e:
                    health_status["tables"][table_name] = {
                        "exists": True,  # Tabelle existiert, aber Zählung fehlgeschlagen
                        "row_count": None,
                        "error": str(e)
                    }

    except Exception as e:
        health_status["error"] = str(e)

    return health_status


# Favicon-Endpunkt hinzufügen
@app.get("/favicon.ico")
async def favicon():
    return FileResponse("static/favicon.ico")


@app.get("/", status_code=200)
async def home(db: AsyncSession = Depends(get_async_db)) -> Dict[str, Any]:
    response = {
        "message": "Hello World, in GIT we trust",
        "database": {
            "connection": False,
            "tables": {}
        }
    }

    try:
        # Check database health
        db_health = await check_database_health(db)
        response["database"]["connection"] = db_health["database_connection"]

        # Process table information
        for table, status in db_health["tables"].items():
            table_info = {
                "exists": status["exists"],
                "rows": status.get("row_count", 0) if status["exists"] else None,
                "error": status.get("error") if not status["exists"] else None
            }
            response["database"]["tables"][table] = table_info

        # Add success messages
        if response["database"]["connection"]:
            response["message"] += "\n✅ Database connection successful"
            for table, info in response["database"]["tables"].items():
                if info["exists"]:
                    response["message"] += f"\n📊 Table {table}: {info['rows']} rows"
                else:
                    response["message"] += f"\n⚠️ Table {table}: missing"
        else:
            response["message"] += "\n❌ Database connection failed"

    except Exception as e:
        response["message"] += f"\n⚠️ Database check failed: {str(e)}"
        response["database"]["error"] = str(e)

    return response


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
