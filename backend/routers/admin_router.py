from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel, EmailStr
from sqlalchemy import delete
from sqlalchemy.orm import selectinload
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from models import User, Role, UserRoleLink, RoleEnum
from database import get_async_db
from security.auth import get_current_user, required_roles
# Logging konfigurieren
import traceback
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

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
    refreshed_user = await db.scalar(
        select(User)
        .where(User.id == current_user.id)
        .options(selectinload(User.roles))
    )

    # Überprüfen auf Admin-Rolle
    if not any(role.name == RoleEnum.ADMIN.value for role in refreshed_user.roles):
        raise HTTPException(status_code=403, detail="Nicht autorisiert")

    # Alle Benutzer mit Rollen laden
    users = await db.scalars(
        select(User)
        .options(selectinload(User.roles)))

    return [
        UserResponse(
            id=user.id,
            email=user.email,
            roles=[role.name for role in user.roles]
        ) for user in users.all()
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
    refreshed_user = await db.scalar(
        select(User)
        .where(User.id == current_user.id)
        .options(selectinload(User.roles))
    )

    # Überprüfen auf Admin-Rolle
    if not any(role.name == RoleEnum.ADMIN.value for role in refreshed_user.roles):
        raise HTTPException(status_code=403, detail="Nicht autorisiert")

    # Benutzer laden
    user = await db.scalar(select(User).where(User.id == user_id))
    if not user:
        raise HTTPException(status_code=404, detail="Benutzer nicht gefunden")

    # Vorhandene Rollen entfernen
    await db.execute(delete(UserRoleLink).where(UserRoleLink.user_id == user_id))

    # Neue Rollen hinzufügen
    for role_name in roles_data.roles:
        role = await db.scalar(select(Role).where(Role.name == role_name))
        if role:
            db.add(UserRoleLink(user_id=user_id, role_id=role.id))

    await db.commit()
    await db.refresh(user)

    # Rollen explizit laden für die Antwort
    user_with_roles = await db.scalar(
        select(User)
        .where(User.id == user_id)
        .options(selectinload(User.roles))
    )

    return UserResponse(
        id=user_with_roles.id,
        email=user_with_roles.email,
        roles=[role.name for role in user_with_roles.roles]
    )
