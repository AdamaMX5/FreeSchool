# this is the Router for the Category model
# you can create a new one, change one, delete one or get one

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select, Session
from sqlalchemy import not_, func
from sqlalchemy.orm import joinedload
from database import get_db
from models.category import Category, CategoryCategory
from pydantic import BaseModel
from typing import List, Optional

from security.auth import required_roles

router = APIRouter(prefix="/category", tags=["Categories"])


class CategoryDto(BaseModel):
    id: Optional[int] = None
    name: str
    backgroundLink: str
    parents: List[int] = []
    children: List[int] = []


@router.get("/{category_id}")
def get_category(category_id: int, db: Session = Depends(get_db)):
    try:
        c = db.query(Category).options(
            joinedload(Category.parents), # so werden diese Atribute gleich mitgeladen und nicht auf LazyLoading gewartet
            joinedload(Category.children)
        ).get(category_id)

        if c is None:
            raise HTTPException(status_code=404, detail="Category not found")

        return CategoryDto(
            id=c.id,
            name=c.name,
            backgroundLink=c.backgroundLink,
            parents=[parent.id for parent in c.parents],
            children=[child.id for child in c.children]
        )
    except Exception as e:
        return {"error": str(e)}


@router.get("/{category_id}/children")
def get_category_children(category_id: int, db: Session = Depends(get_db)):
    try:
        category = db.query(Category).options(
            joinedload(Category.children)
        ).get(category_id)

        if category is None:
            raise HTTPException(status_code=404, detail="Category not found")

        dtoList = []
        for c in category.children:
            if c.is_deleted:
                continue

            dto = CategoryDto(
                id=c.id,
                name=c.name,
                backgroundLink=c.backgroundLink,
                parents=[parent.id for parent in c.parents],
                children=[child.id for child in c.children]
            )
            dtoList.append(dto)
        return dtoList
    except Exception as e:
        return {"error": str(e)}


@router.post("/", dependencies=[Depends(required_roles(["MODERATOR"]))])
async def new_category(dto: CategoryDto, db: Session = Depends(get_db)):
    try:
        c = Category(
            name=dto.name,
            backgroundLink=dto.backgroundLink,
        )
        db.add(c)
        db.commit()
        db.refresh(c)
        # add the parents to the category
        for parent_id in dto.parents:
            print("Parent ID hinzufügen: ", parent_id)
            cc = CategoryCategory(parent_id=parent_id, child_id=c.id)
            db.add(cc)
        # add the children to the category
        for child_id in dto.children:
            cc = CategoryCategory(parent_id=c.id, child_id=child_id)
            db.add(cc)

        db.commit()
        return CategoryDto(
            id=c.id,
            name=c.name,
            backgroundLink=c.backgroundLink,
            parents=[parent.id for parent in c.parents],
            children=[child.id for child in c.children]
        )
    except Exception as e:
        db.rollback()
        return {"error": str(e)}


@router.post("/{category_id}/addChild/{child_id}", dependencies=[Depends(required_roles(["MODERATOR"]))])
async def add_child(category_id: int, child_id: int, db: Session = Depends(get_db)):
    try:
        cc = CategoryCategory(parent_id=category_id, child_id=child_id)
        # add the child to the category
        db.add(cc)
        db.commit()
        db.refresh(cc)
        return cc
    except Exception as e:
        return {"error": str(e)}


@router.put("/{category_id}", dependencies=[Depends(required_roles(["MODERATOR"]))])
async def update_category(category_id: int, data: CategoryDto, db: Session = Depends(get_db)):
    try:
        c = db.get(Category, category_id)
        if c is None:
            raise HTTPException(status_code=404, detail="Category not found")

        # Basisdaten aktualisieren
        c.name = data.name
        c.backgroundLink = data.backgroundLink

        # --- Beziehungen aktualisieren ---

        # Bestehende Parent- und Child-Relations abrufen
        existing_parents = {rel.parent_id for rel in db.query(CategoryCategory).filter_by(child_id=c.id).all()}
        existing_children = {rel.child_id for rel in db.query(CategoryCategory).filter_by(parent_id=c.id).all()}

        new_parents = set(data.parents)
        new_children = set(data.children)

        # --- Parents ---
        # Zu entfernende Parent-Relations
        to_remove_parents = existing_parents - new_parents
        for pid in to_remove_parents:
            db.query(CategoryCategory).filter_by(parent_id=pid, child_id=c.id).delete()

        # Neue Parent-Relations hinzufügen
        to_add_parents = new_parents - existing_parents
        for pid in to_add_parents:
            db.add(CategoryCategory(parent_id=pid, child_id=c.id))

        # --- Children ---
        # Zu entfernende Child-Relations
        to_remove_children = existing_children - new_children
        for cid in to_remove_children:
            db.query(CategoryCategory).filter_by(parent_id=c.id, child_id=cid).delete()

        # Neue Child-Relations hinzufügen
        to_add_children = new_children - existing_children
        for cid in to_add_children:
            db.add(CategoryCategory(parent_id=c.id, child_id=cid))

        db.commit()
        db.refresh(c)

        return CategoryDto(
            id=c.id,
            name=c.name,
            backgroundLink=c.backgroundLink,
            parents=[rel.parent_id for rel in db.query(CategoryCategory).filter_by(child_id=c.id)],
            children=[rel.child_id for rel in db.query(CategoryCategory).filter_by(parent_id=c.id)]
        )

    except Exception as e:
        db.rollback()
        return {"error": str(e)}


@router.delete("/{category_id}", dependencies=[Depends(required_roles(["MODERATOR"]))])
async def delete_category(category_id: int, db: Session = Depends(get_db)):
    try:
        category = db.get(Category, category_id)
        if not category or category.is_deleted:
            raise HTTPException(status_code=404, detail="Kategorie nicht gefunden")

        category.is_deleted = True
        db.commit()
        return {"detail": "Kategorie wurde als gelöscht markiert"}
    except Exception as e:
        return {"error": str(e)}


@router.get("/all/")
def get_categories(db: Session = Depends(get_db)):
    categories = db.query(Category).filter(Category.is_deleted == False).all()
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
def get_categories_as_learning_hubs(db: Session = Depends(get_db)):
    subq = db.query(CategoryCategory.child_id).subquery()
    categories = db.query(Category).filter(not_(Category.id.in_(subq))).filter(Category.is_deleted == False).all()
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
def get_categories_by_parent(parent_id: int, db: Session = Depends(get_db)):
    categories = db.query(Category).filter(Category.parentId == parent_id).filter(Category.is_deleted == False).all()
    print("Meine süße Muhkuh")  # gefunden
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
