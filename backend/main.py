from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.user_router import router as UserRouter
from routers.category_router import router as CategoryRouter
from routers.lesson_router import router as LessonRouter
from routers.content_router import router as ContentRouter
from routers.teacher_router import router as TeacherRouter
import uvicorn

app = FastAPI()

app.include_router(UserRouter)
app.include_router(CategoryRouter)
app.include_router(LessonRouter)
app.include_router(ContentRouter)
app.include_router(TeacherRouter)

# CORS-Konfiguration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # oder ["*"] für alles (nicht für Produktion empfohlen!)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"Hallo Welt! FreeSchool is important!<br> in Git we trust!"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
