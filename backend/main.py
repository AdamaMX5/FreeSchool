from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from routers.user_router import router as UserRouter
from routers.category_router import router as CategoryRouter
from routers.lesson_router import router as LessonRouter
from routers.content_router import router as ContentRouter
from routers.teacher_router import router as TeacherRouter
from sqlmodel import SQLModel, select
from sqlalchemy import func
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_async_db, engine
import uvicorn
from typing import Dict, Any

app = FastAPI()

app.include_router(UserRouter)
app.include_router(CategoryRouter)
app.include_router(LessonRouter)
app.include_router(ContentRouter)
app.include_router(TeacherRouter)

# CORS-Konfiguration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://v3264.1blu.de"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


async def check_database_health(db: AsyncSession) -> Dict[str, Any]:
    health_status = {
        "database_connection": False,
        "tables": {}
    }

    try:
        # 1. Verbindungstest
        async with engine.connect() as conn:
            health_status["database_connection"] = True

        # 2. Tabellen und Zeilen zählen
        tables = SQLModel.metadata.tables
        for table_name in tables:
            try:
                result = await db.execute(select(func.count()).select_from(tables[table_name]))
                count = result.scalar()
                health_status["tables"][table_name] = {
                    "exists": True,
                    "row_count": count
                }
            except Exception as e:
                health_status["tables"][table_name] = {
                    "exists": False,
                    "error": str(e)
                }

    except Exception as e:
        health_status["error"] = str(e)

    return health_status


@app.get("/")
async def home(db: AsyncSession = Depends(get_async_db)):
    try:
        db_health = await check_database_health(db)

        if not db_health["database_connection"]:
            raise HTTPException(status_code=500, detail="Database connection failed")

        message = "✅ FreeSchool Backend is running\n"
        message += f"📊 Database status: {'Connected' if db_health['database_connection'] else 'Disconnected'}\n"

        for table, status in db_health["tables"].items():
            if status["exists"]:
                message += f"📦 Table {table}: {status['row_count']} rows\n"
            else:
                message += f"❌ Table {table}: Missing ({status.get('error', 'Unknown error')}\n"

        return {"message": message, "details": db_health}

    except Exception as e:
        return {
            "error": str(e),
            "message": "⚠️ FreeSchool Backend is running but database check failed"
        }


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
