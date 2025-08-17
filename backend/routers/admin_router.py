from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel, EmailStr
from sqlalchemy import delete
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from models import User, Role, UserRoleLink, RoleEnum
from database import get_async_db
from security.auth import get_current_user, required_roles

router = APIRouter(prefix="/admin", tags=["admin"])


class UserResponse(BaseModel):
    id: int
    email: str
    roles: List[str]


@router.get("/users", response_model=List[UserResponse], dependencies=[Depends(required_roles([RoleEnum.ADMIN.value]))])
async def get_all_users(
        db: AsyncSession = Depends(get_async_db),
        current_user: User = Depends(get_current_user)
):
    # Explizit die Rollen des aktuellen Benutzers laden
    result = await db.execute(
        select(User)
        .where(User.id == current_user.id)
        .options(selectinload(User.roles))
    )
    refreshed_user = result.scalars().first()

    # Überprüfen auf Admin-Rolle
    if not any(role.name == RoleEnum.ADMIN.value for role in refreshed_user.roles):
        raise HTTPException(status_code=403, detail="Nicht autorisiert")

    # Alle Benutzer mit Rollen laden
    result = await db.execute(
        select(User)
        .options(selectinload(User.roles)))
    users = result.scalars().all()

    return [
        UserResponse(
            id=user.id,
            email=user.email,
            roles=[role.name for role in user.roles]
        )
        for user in users
    ]


class UpdateRolesRequest(BaseModel):
    roles: List[str]


@router.put("/user/{user_id}/roles", response_model=UserResponse, dependencies=[Depends(required_roles([RoleEnum.ADMIN.value]))])
async def update_user_roles(
        user_id: int,
        roles_data: UpdateRolesRequest,
        db: AsyncSession = Depends(get_async_db),
        current_user: User = Depends(get_current_user)
):
    # Explizit die Rollen des aktuellen Benutzers laden
    result = await db.execute(
        select(User)
        .where(User.id == current_user.id)
        .options(selectinload(User.roles)))
    refreshed_user = result.scalars().first()

    # Überprüfen auf Admin-Rolle
    if not any(role.name == RoleEnum.ADMIN.value for role in refreshed_user.roles):
        raise HTTPException(status_code=403, detail="Nicht autorisiert")

    # Benutzer laden
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalars().first()
    if not user:
        raise HTTPException(status_code=404, detail="Benutzer nicht gefunden")

    # Vorhandene Rollen entfernen
    await db.execute(delete(UserRoleLink).where(UserRoleLink.user_id == user_id))

    # Neue Rollen hinzufügen
    for role_name in roles_data.roles:
        result = await db.execute(select(Role).where(Role.name == role_name))
        role = result.scalars().first()
        if role:
            db.add(UserRoleLink(user_id=user_id, role_id=role.id))

    await db.commit()
    await db.refresh(user)

    # Rollen explizit laden für die Antwort
    result = await db.execute(
        select(User)
        .where(User.id == user_id)
        .options(selectinload(User.roles)))
    user_with_roles = result.scalars().first()

    return UserResponse(
        id=user_with_roles.id,
        email=user_with_roles.email,
        roles=[role.name for role in user_with_roles.roles]
    )
