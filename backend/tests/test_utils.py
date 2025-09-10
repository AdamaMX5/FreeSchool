# tests/test_utils.py
from datetime import datetime
from models import Category, CategoryCategory, User, Role, UserRoleLink, Lesson, Content, Teacher
from sqlmodel import select
from security.auth import get_password_hash
from util.time_util import timestamp


async def create_test_category(db, name="Test Category", background_link="test.jpg", parents=None, children=None):
    category = Category(
        name=name,
        background_link=background_link,
        deleted_at=None
    )
    db.add(category)
    await db.commit()
    await db.refresh(category)

    if parents:
        for parent_id in parents:
            cc = CategoryCategory(parent_id=parent_id, child_id=category.id)
            db.add(cc)

    if children:
        for child_id in children:
            cc = CategoryCategory(parent_id=category.id, child_id=child_id)
            db.add(cc)

    await db.commit()
    await db.refresh(category)
    return category


async def create_test_user(db, username="testuser", roles=None, password="password"):
    email = f"{username}@example.com"

    # Prüfen ob User bereits existiert
    existing_user = await db.scalar(select(User).where(User.email == email))
    if existing_user:
        return existing_user

    # Neuen User erstellen
    user = User(
        email=email,
        hashed_password=get_password_hash(password),
        password_verify=True,
        email_verify=True,  # Email als verifiziert markieren für Tests
        last_login=datetime.now(),
        comment="a Testuser",
        last_editor="pytest"
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)

    if roles:
        for role_name in roles:
            # Rolle finden oder erstellen
            role = await db.scalar(select(Role).where(Role.name == role_name))
            if not role:
                role = Role(name=role_name)
                db.add(role)
                await db.commit()
                await db.refresh(role)

            # User-Rolle verknüpfen
            user_role = UserRoleLink(user_id=user.id, role_id=role.id)
            db.add(user_role)

    await db.commit()
    await db.refresh(user)
    return user


async def create_test_lesson(db, name="Test Lesson", description="Test Description",
                             category_id=None, position_x=100, position_y=100,
                             display_order=None):
    """
    Erstellt eine Test-Lektion ohne Contents (da Contents eigene required Felder haben)
    """
    # Falls keine category_id angegeben, erstelle eine Test-Kategorie
    if category_id is None:
        category = await create_test_category(db, "Test Category for Lesson")
        category_id = category.id

    lesson = Lesson(
        name=name,
        description=description,
        category_id=category_id,
        position_x=position_x,
        position_y=position_y,
        display_order=display_order,
        deleted_at=None
    )

    db.add(lesson)
    await db.commit()
    await db.refresh(lesson)

    return lesson


async def create_test_content(db, lesson_id=None, teacher_id=None,
                              language="de", text="Test content text",
                              youtube_id="test_youtube_id",
                              internal_video="test_internal_video.mp4"):
    """
    Erstellt einen Test-Content gemäß dem Content-Modell
    """
    content = Content(
        language=language,
        text=text,
        youtube_id=youtube_id,
        internal_video=internal_video,
        deleted_at=None
    )

    # Optionale Verknüpfungen
    if lesson_id:
        content.lesson_id = lesson_id
    if teacher_id:
        content.teacher_id = teacher_id

    db.add(content)
    await db.commit()
    await db.refresh(content)

    return content


async def create_test_teacher(db, name="Test Teacher", email="teacher@example.com",
                              city="Test City", country="Test Country"):
    """
    Erstellt einen Test-Lehrer
    """
    teacher = Teacher(
        name=name,
        email=email,
        city=city,
        country=country,
        deleted_at=None
    )

    db.add(teacher)
    await db.commit()
    await db.refresh(teacher)

    return teacher
