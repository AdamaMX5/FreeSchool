from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel, EmailStr
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func
from typing import List, Optional
from models import User, Profile, Role, UserRoleLink, RoleEnum
from database import get_async_db
from security.auth import verify_password, get_password_hash, create_jwt, create_email_verify_token, get_current_user, get_current_user_by_id
from security.email import EmailService
from util.time_util import timestamp
# Logging konfigurieren
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/user", tags=["user"])


class UserLoginResponse(BaseModel):
    id: int
    email: EmailStr
    jwt: str
    status: str
    roles: List[str]


# Pydantic Modell für Benutzerantwort
class UserResponse(BaseModel):
    id: int
    email: str
    roles: List[str]


class UserLogin(BaseModel):
    email: EmailStr
    password: str  # Klartext-Passwort wird hier übergeben und dann gehasht gespeichert


@router.post("/login", status_code=status.HTTP_200_OK, response_model=UserLoginResponse)
async def login_user(user_in: UserLogin, db: AsyncSession = Depends(get_async_db)):
    # Prüfen, ob ein User mit der Email existiert:
    result = await db.execute(select(User).where(User.email == user_in.email))
    existing_user = result.scalars().first()
    if existing_user:
        if existing_user.is_deleted:
            raise HTTPException(status_code=400, detail="User is deleted call support")
        if not existing_user.passwordVerify:
            return UserLoginResponse(
                id=existing_user.id,
                email=existing_user.email,
                roles=[],
                jwt="",
                status="register"
            )
        # Passwort-Hash überprüfen:
        if not verify_password(user_in.password, existing_user.hashed_password):
            raise HTTPException(status_code=400, detail="Invalid password")
        if not existing_user.emailVerify:
            # Token neu generieren, falls abgelaufen oder nicht vorhanden
            if not existing_user.emailVerifyToken:
                existing_user.emailVerifyToken = create_email_verify_token()
                await db.commit()

            await send_email_verification(existing_user)
            status_msg = "login_with_verify_email_sended"  # Status für Login mit E-Mail-Verifizierung
        else:
            status_msg = "login"
        existing_user.jwt = create_jwt(data={"sub": existing_user.email, "subid": existing_user.id})  # JWT-Token erstellen
        await db.commit()
        return UserLoginResponse(
            id=existing_user.id,
            email=existing_user.email,
            roles=await get_role_names(existing_user, db),
            jwt=existing_user.jwt,
            status=status_msg
        )
    else:
        # Registrierungsvorgang gestartet: Neues User-Objekt erstellen:
        new_user = User(email=user_in.email, passwort=user_in.password)
        new_user.lastLogin = timestamp()  # Letzter Login
        new_user.hashed_password = get_password_hash(user_in.password)  # Passwort-Hash erstellen
        new_user.passwordVerify = False  # Passwort-Hash erstellen
        new_user.emailVerify = False
        db.add(new_user)
        await db.commit()
        await db.refresh(new_user)
        return UserLoginResponse(
            id=new_user.id,
            email=new_user.email,
            roles=[],
            jwt="",
            status="register"
        )


async def get_role_names(user: User, db: AsyncSession) -> List[str]:
    # Explizit die Rollen laden
    result = await db.execute(
        select(Role)
        .join(UserRoleLink, UserRoleLink.role_id == Role.id)
        .where(UserRoleLink.user_id == user.id)
    )
    roles = result.scalars().all()
    return [role.name for role in roles]


class UserRegister(BaseModel):
    id: int
    repassword: str  # Klartext-Passwort wird hier übergeben und dann gehasht und mit dem gespeicherten HashPasswort verglichen


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register_user(user_in: UserRegister, db: AsyncSession = Depends(get_async_db)):
    # Prüfen, ob ein User mit der gleichen Email bereits existiert:
    result = await db.execute(select(User).where(User.id == user_in.id))
    logger.info(f"User ID: {user_in.id}")
    existing_user = result.scalars().first()
    if existing_user:
        if not verify_password(user_in.repassword, existing_user.hashed_password):
            await db.delete(existing_user)
            await db.commit()
            raise HTTPException(status_code=400, detail="Second Password is incorrect, please try registration again.")
        else:
            existing_user.jwt = create_jwt(data={"sub": existing_user.email})  # JWT-Token erstellen
            existing_user.passwordVerify = True  # Letzter Login
            existing_user.emailVerifyToken = create_email_verify_token()
            existing_user.emailVerify = False
            existing_user.lastLogin = timestamp()
            await db.commit()
            await db.refresh(existing_user)

            # Adminrole for first User
            user_count = await db.scalar(select(func.count()).where(User.is_deleted == False))
            logger.info(f"Total users: {user_count}")

            if user_count == 1:
                logger.info("First user detected - assigning ADMIN role")
                await initialize_roles(db)
                admin_role = await db.scalar(select(Role).where(Role.name == RoleEnum.ADMIN.value))
                if admin_role:
                    logger.info(f"Found ADMIN role: ID {admin_role.id}")
                    exists = await db.scalar(select(UserRoleLink).where(
                        UserRoleLink.user_id == existing_user.id,
                        UserRoleLink.role_id == admin_role.id
                    ).exists().select())
                    if not exists:
                        db.add(UserRoleLink(user_id=existing_user.id, role_id=admin_role.id))
                        await db.commit()
                        await db.refresh(existing_user)
                        logger.info("First user gets ADMIN role, now")
                else:
                    logger.info("ADMIN role not found in database!")

            await send_email_verification(existing_user)  # E-Mail zur Verifizierung senden


    else:
        raise HTTPException(status_code=404, detail="User not found")
    return UserLoginResponse(
        id=existing_user.id,
        email=existing_user.email,
        roles=await get_role_names(existing_user, db),
        jwt=existing_user.jwt,
        status="verify_email_sended"
    )


async def send_email_verification(user: User):
    # verify E-Mail erzeugen
    htmlText = "Wir begrüßen dich bei der Freischule."
    htmlText += "<br><br>"
    htmlText += "Um deine E-Mail-Adresse zu verifizieren, klicke bitte auf folgenden Link:<br>"
    htmlText += f"Hier ist der Link zur Verifizierung: <a href='http://localhost:8000/user/verify?token={user.emailVerifyToken}&email={user.email}'>Verifizieren</a>"
    htmlText += "<br><br>"
    htmlText += "Vielen Dank für alles und liebe Grüße<br><br>Euer Kurt"

    await EmailService.send_email(
        to_email=user.email,
        subject="Verifizierung deiner E-Mail-Adresse",
        from_email="registration@flussmark.de",
        from_name="Freischule Registrationsservice",
        html_body=htmlText
    )


@router.get("/verify")
async def verify_email(token: str, email: str, db: AsyncSession = Depends(get_async_db)):
    # Prüfen, ob der Token gültig ist:
    result = await db.execute(select(User).where(User.email == email))
    existing_user = result.scalars().first()
    if existing_user:
        if existing_user.emailVerify:
            return {"Deine E-Mail-Adresse ist bereits verifiziert.<br>Du kannst dich jetzt einloggen."}
        if existing_user.emailVerifyToken == token:
            existing_user.emailVerify = True
            existing_user.emailVerifyToken = None
            await db.commit()
            await db.refresh(existing_user)
            return {"Vielen Dank, deine Email-Adresse wurde erfolgreich verifiziert.<br>Du kannst dich jetzt einloggen."}
        else:
            raise HTTPException(status_code=400, detail="Invalid token")
    else:
        raise HTTPException(status_code=404, detail="User not found")


@router.get("/all", response_model=List[UserResponse])
async def get_all_users(
        db: AsyncSession = Depends(get_async_db),
        current_user: User = Depends(get_current_user)
):
    # Nur Admins dürfen alle Benutzer sehen
    if RoleEnum.ADMIN.value not in current_user.roles:
        raise HTTPException(status_code=403, detail="Nicht autorisiert")

    result = await db.execute(select(User))
    users = result.scalars().all()

    # Benutzerdaten ohne sensible Informationen zurückgeben
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


@router.put("/{user_id}/roles", response_model=UserResponse)
async def update_user_roles(
        user_id: int,
        roles_data: UpdateRolesRequest,
        db: AsyncSession = Depends(get_async_db),
        current_user: User = Depends(get_current_user)
):
    # Nur Admins dürfen Rollen ändern
    if RoleEnum.ADMIN.value not in current_user.roles:
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

    return UserResponse(
        id=user.id,
        email=user.email,
        roles=roles_data.roles
    )


@router.post("/logout")
async def logout(user: User = Depends(get_current_user)):
    # Hier wäre z.B. ein Token-Blacklist-Eintrag möglich (wenn du sowas hast)
    # Oder einfach nur Logging
    return {"status": "logout", "user_id": user.id}


async def initialize_roles(db: AsyncSession):
    """Erstellt alle notwendigen Rollen, falls sie nicht existieren"""
    # Rollen aus dem Enum holen
    required_roles = [role.value for role in RoleEnum]

    # Existierende Rollen abfragen
    result = await db.execute(select(Role))
    existing_roles = [role.name for role in result.scalars().all()]

    # Fehlende Rollen erstellen
    new_roles = []
    for role_name in required_roles:
        if role_name not in existing_roles:
            new_roles.append(Role(name=role_name))

    # Neue Rollen speichern
    if new_roles:
        db.add_all(new_roles)
        await db.commit()
        print(f"Created {len(new_roles)} new roles")