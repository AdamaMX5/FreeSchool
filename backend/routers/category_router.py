# this is the Router for the Category model
# you can create a new one, change one, delete one or get one
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select
from sqlalchemy import not_, func
from sqlalchemy.orm import joinedload, selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_async_db
from models import Category, CategoryCategory
from pydantic import BaseModel
from typing import List, Optional
from security.auth import required_roles
# Logging konfigurieren
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/category", tags=["Categories"])


class CategoryDto(BaseModel):
    id: Optional[int] = None
    name: str
    backgroundLink: str
    parents: List[int] = []
    children: List[int] = []


@router.get("/{category_id}")
async def get_category(category_id: int, db: AsyncSession = Depends(get_async_db)):
    try:
        stmt = (
            select(Category)
            .where(Category.id == category_id)
            .options(
                selectinload(Category.parents),
                selectinload(Category.children)
            )
        )
        c = await db.scalar(stmt)
        if c is None:
            raise HTTPException(status_code=404, detail="Category not found")

        return CategoryDto(
            id=c.id,
            name=c.name,
            backgroundLink=c.backgroundLink,
            parents=[parent.id for parent in c.parents],
            children=[child.id for child in c.children]
        )
    except HTTPException:
        raise  # HTTPExceptions weiterwerfen
    except Exception as e:
        # Andere Exceptions als 500 behandeln
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{category_id}/children")
async def get_category_children(category_id: int, db: AsyncSession = Depends(get_async_db)):
    try:
        stmt = (
            select(Category)
            .where(Category.id == category_id)
            .options(
                selectinload(Category.children).options(
                    selectinload(Category.parents),
                    selectinload(Category.children)
                )
            )
        )
        category = await db.scalar(stmt)

        if category is None:
            raise HTTPException(status_code=404, detail="Category not found")

        dtoList = []
        for c in category.children:
            if c.is_deleted:
                continue

            # Jetzt haben wir Zugriff auf c.parents und c.children, da sie geladen wurden
            dto = CategoryDto(
                id=c.id,
                name=c.name,
                backgroundLink=c.backgroundLink,
                parents=[parent.id for parent in c.parents],
                children=[child.id for child in c.children]
            )
            dtoList.append(dto)
        return dtoList
    except HTTPException:
        raise  # HTTPExceptions weiterwerfen
    except Exception as e:
        # Andere Exceptions als 500 behandeln
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/", dependencies=[Depends(required_roles(["MODERATOR"]))])
async def new_category(dto: CategoryDto, db: AsyncSession = Depends(get_async_db)):
    try:
        logger.info("Erstelle neue Category:")
        c = Category(
            name=dto.name,
            backgroundLink=dto.backgroundLink,
        )
        logger.info("Add zur DB")
        db.add(c)
        logger.info("Commit Category to DB")
        await db.commit()
        logger.info("Refresche Category um dei erstellte id zu bekommen")
        await db.refresh(c)

        logger.info("Füge die Eltern Categorien hinzu")
        # add the parents to the category
        for parent_id in dto.parents:
            cc = CategoryCategory(parent_id=parent_id, child_id=c.id)
            db.add(cc)

        logger.info("Füge die Kinder Kategorien hinzu")
        # add the children to the category
        for child_id in dto.children:
            cc = CategoryCategory(parent_id=c.id, child_id=child_id)
            db.add(cc)

        logger.info("DB Committe die Beziehungen der Category zur DB")
        await db.commit()

        logger.info("Kategory mit Eltern und Kindern neu eager laden")
        c = await db.scalar(
            select(Category)
            .where(Category.id == c.id)
            .options(selectinload(Category.parents))
            .options(selectinload(Category.children))
        )

        logger.info(f"Return CategoryDTO of {c}")
        return CategoryDto(
            id=c.id,
            name=c.name,
            backgroundLink=c.backgroundLink,
            parents=[parent.id for parent in c.parents],
            children=[child.id for child in c.children]
        )
    except HTTPException:
        logger.info(f"HTTPException Raise: {e}")
        raise  # HTTPExceptions weiterwerfen
    except Exception as e:
        # Andere Exceptions als 500 behandeln
        logger.info(f"Exeptionlogger: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/{category_id}/addChild/{child_id}", dependencies=[Depends(required_roles(["MODERATOR"]))])
async def add_child(category_id: int, child_id: int, db: AsyncSession = Depends(get_async_db)):
    try:
        cc = CategoryCategory(parent_id=category_id, child_id=child_id)
        db.add(cc)
        await db.commit()
        await db.refresh(cc)
        return cc
    except HTTPException:
        raise  # HTTPExceptions weiterwerfen
    except Exception as e:
        # Andere Exceptions als 500 behandeln
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/{category_id}", dependencies=[Depends(required_roles(["MODERATOR"]))])
async def update_category(category_id: int, data: CategoryDto, db: AsyncSession = Depends(get_async_db)):
    try:
        c = await db.scalar(select(Category).where(Category.id == category_id))
        if c is None:
            raise HTTPException(status_code=404, detail="Category not found")

        # Basisdaten aktualisieren
        c.name = data.name
        c.backgroundLink = data.backgroundLink

        # --- Beziehungen aktualisieren ---
        # Bestehende Parent- und Child-Relations abrufen
        parents_result = await db.scalars(
            select(CategoryCategory.parent_id)
            .where(CategoryCategory.child_id == c.id)
        )
        existing_parents = {pid for (pid,) in parents_result.all()}

        children_result = await db.scalars(
            select(CategoryCategory.child_id)
            .where(CategoryCategory.parent_id == c.id)
        )
        existing_children = {cid for (cid,) in children_result.all()}

        new_parents = set(data.parents)
        new_children = set(data.children)

        # --- Parents ---
        # Zu entfernende Parent-Relations
        to_remove_parents = existing_parents - new_parents
        for pid in to_remove_parents:
            await db.execute(
                CategoryCategory.__table__.delete()
                .where(CategoryCategory.parent_id == pid)
                .where(CategoryCategory.child_id == c.id)
            )

        # Neue Parent-Relations hinzufügen
        to_add_parents = new_parents - existing_parents
        for pid in to_add_parents:
            db.add(CategoryCategory(parent_id=pid, child_id=c.id))

        # --- Children ---
        # Zu entfernende Child-Relations
        to_remove_children = existing_children - new_children
        for cid in to_remove_children:
            await db.execute(
                CategoryCategory.__table__.delete()
                .where(CategoryCategory.parent_id == c.id)
                .where(CategoryCategory.child_id == cid)
            )

        # Neue Child-Relations hinzufügen
        to_add_children = new_children - existing_children
        for cid in to_add_children:
            db.add(CategoryCategory(parent_id=c.id, child_id=cid))

        await db.commit()
        await db.refresh(c)

        return CategoryDto(
            id=c.id,
            name=c.name,
            backgroundLink=c.backgroundLink,
            parents=list(new_parents),
            children=list(new_children)
        )
    except HTTPException:
        raise  # HTTPExceptions weiterwerfen
    except Exception as e:
        # Andere Exceptions als 500 behandeln
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{category_id}", dependencies=[Depends(required_roles(["MODERATOR"]))])
async def delete_category(category_id: int, db: AsyncSession = Depends(get_async_db)):
    try:
        category = await db.scalar(select(Category).where(Category.id == category_id))

        if not category or category.is_deleted:
            raise HTTPException(status_code=404, detail="Kategorie nicht gefunden")

        category.is_deleted = True
        await db.commit()
        return {"detail": "Kategorie wurde als gelöscht markiert"}
    except HTTPException:
        raise  # HTTPExceptions weiterwerfen
    except Exception as e:
        # Andere Exceptions als 500 behandeln
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/all/")
async def get_categories(db: AsyncSession = Depends(get_async_db)):
    stmt = (
        select(Category)
        .where(Category.is_deleted == False)
        .options(
            selectinload(Category.parents),
            selectinload(Category.children)
        )
    )
    categories = await db.scalars(stmt)

    dtoList = []
    for c in categories:
        dto = CategoryDto(
            id=c.id,
            name=c.name,
            backgroundLink=c.backgroundLink,
            parents=[parent.id for parent in c.parents],
            children=[child.id for child in c.children]
        )
        dtoList.append(dto)
    return dtoList


@router.get("/asLearningHubs/")
async def get_categories_as_learning_hubs(db: AsyncSession = Depends(get_async_db)):
    subq = select(CategoryCategory.child_id)
    stmt = (
        select(Category)
        .where(not_(Category.id.in_(subq)))
        .where(Category.is_deleted == False)
        .options(
            selectinload(Category.parents),
            selectinload(Category.children)
        )
    )
    categories = await db.scalars(stmt)

    dtoList = []
    for c in categories:
        dto = CategoryDto(
            id=c.id,
            name=c.name,
            backgroundLink=c.backgroundLink,
            parents=[parent.id for parent in c.parents],
            children=[child.id for child in c.children]
        )
        dtoList.append(dto)
    return dtoList


@router.get("/ByParent/{parent_id}")
async def get_categories_by_parent(parent_id: int, db: AsyncSession = Depends(get_async_db)):
    stmt = (
        select(Category)
        .join(CategoryCategory, Category.id == CategoryCategory.child_id)
        .where(CategoryCategory.parent_id == parent_id)
        .where(Category.is_deleted == False)
        .options(
            selectinload(Category.parents),
            selectinload(Category.children)
        )
    )
    categories = await db.scalars(stmt)

    dtoList = []
    for c in categories:
        dto = CategoryDto(
            id=c.id,
            name=c.name,
            backgroundLink=c.backgroundLink,
            parents=[parent.id for parent in c.parents],
            children=[child.id for child in c.children]
        )
        dtoList.append(dto)
    return dtoList
