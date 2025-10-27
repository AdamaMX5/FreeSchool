from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel, EmailStr
from sqlalchemy import func
from sqlalchemy.orm import selectinload
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from models import User, Profile, Role, UserRoleLink, RoleEnum
from database import get_async_db
from datetime import datetime

from models.base import generate_unique_id_async
from security.auth import verify_password, get_password_hash, create_jwt, create_email_verify_token, get_current_user, get_current_user_by_id
from security.email import EmailService

# Logging konfigurieren
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/user", tags=["user"])


class UserLoginResponse(BaseModel):
    id: str
    email: EmailStr
    jwt: str
    status: str
    roles: List[str]


# Pydantic Modell für Benutzerantwort
class UserResponse(BaseModel):
    id: str
    email: str
    roles: List[str]


class UserLogin(BaseModel):
    email: EmailStr
    password: str  # Klartext-Password wird hier übergeben und dann gehasht gespeichert


@router.post("/login", status_code=status.HTTP_200_OK, response_model=UserLoginResponse)
async def login_user(user_in: UserLogin, db: AsyncSession = Depends(get_async_db)):
    # Prüfen, ob ein User mit der Email existiert:
    logger.warning(f"find User with email: {user_in.email}")
    existing_user = await db.scalar(select(User).where(User.email == user_in.email))
    logger.warning(f"gefundener User: {existing_user}")
    if existing_user:
        if existing_user.deleted_at:
            raise HTTPException(status_code=400, detail="User is deleted call support")
        if not existing_user.password_verify:
            logger.warning(f"Password is not verifyed: {existing_user.password_verify}")
            return UserLoginResponse(
                id=existing_user.id,
                email=existing_user.email,
                roles=[],
                jwt="",
                status="register"
            )
        # Password-Hash überprüfen:
        if not verify_password(user_in.password, existing_user.hashed_password):
            raise HTTPException(status_code=400, detail="Invalid password")
        if not existing_user.email_verify:
            # Token neu generieren, falls abgelaufen oder nicht vorhanden
            if not existing_user.email_verify_token:
                existing_user.email_verify_token = create_email_verify_token()
                await db.commit()

            await send_email_verification(existing_user)
            status_msg = "login_with_verify_email_sended"  # Status für Login mit E-Mail-Verifizierung
        else:
            status_msg = "login"
        existing_user.jwt = create_jwt(data={"sub": existing_user.email, "subid": existing_user.id})  # JWT-Token erstellen
        await db.commit()
        logger.warning(f"Login successfull exsisting User: {existing_user}")
        return UserLoginResponse(
            id=existing_user.id,
            email=existing_user.email,
            roles=await get_role_names(existing_user, db),
            jwt=existing_user.jwt,
            status=status_msg
        )
    else:
        # Registrierungsvorgang gestartet: Neues User-Objekt erstellen:
        new_user = User(email=user_in.email, password=user_in.password)
        new_user.id = await generate_unique_id_async(db, User)
        new_user.last_login = datetime.utcnow()  # Letzter Login
        new_user.hashed_password = get_password_hash(user_in.password)  # Password-Hash erstellen
        new_user.password_verify = False  # Password-Hash erstellen
        new_user.email_verify = False
        db.add(new_user)
        await db.commit()
        await db.refresh(new_user)
        logger.warning(f"New User created and registration is started: {new_user}")
        return UserLoginResponse(
            id=new_user.id,
            email=new_user.email,
            roles=[],
            jwt="",
            status="register"
        )


async def get_role_names(user: User, db: AsyncSession) -> List[str]:
    # Explizit die Rollen laden
    result = await db.scalars(
        select(Role)
        .join(UserRoleLink, UserRoleLink.role_id == Role.id)
        .where(UserRoleLink.user_id == user.id)
    )
    roles = result.all()
    logger.info(f"getrolenames: {roles}")
    return [role.name for role in roles]


class UserRegister(BaseModel):
    id: str
    repassword: str  # Klartext-Password wird hier übergeben und dann gehasht und mit dem gespeicherten HashPassword verglichen


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register_user(user_in: UserRegister, db: AsyncSession = Depends(get_async_db)):
    # Prüfen, ob ein User mit der gleichen Email bereits existiert:
    existing_user = await db.scalar(select(User).where(User.id == user_in.id))

    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(user_in.repassword, existing_user.hashed_password):
        await db.delete(existing_user)
        await db.commit()
        raise HTTPException(status_code=400, detail="Second Password is incorrect, please try registration again.")
    else:
        existing_user.jwt = create_jwt(data={"sub": existing_user.email})  # JWT-Token erstellen
        existing_user.password_verify = True  # Letzter Login
        existing_user.email_verify_token = create_email_verify_token()
        existing_user.email_verify = False
        existing_user.last_login = datetime.utcnow()
        await db.commit()
        await db.refresh(existing_user)

        # Rollen initialisieren
        await initialize_roles(db)

        # Schüler-Rolle für jeden User zuweisen
        student_role = await db.scalar(select(Role).where(Role.name == RoleEnum.STUDENT.value))
        if student_role:
            # Prüfen, ob die Rolle bereits zugewiesen ist
            exists = await db.scalar(
                select(UserRoleLink).where(
                    UserRoleLink.user_id == existing_user.id,
                    UserRoleLink.role_id == student_role.id
                )
            )
            if not exists:
                db.add(UserRoleLink(user_id=existing_user.id, role_id=student_role.id))
                logger.info(f"Assigned SCHUELER role to user {existing_user.id}")

        # Adminrole for first User
        user_count = await db.scalar(select(func.count()).where(User.deleted_at == None))
        logger.info(f"Total users: {user_count}")

        if user_count == 1:
            logger.info("First user detected - assigning ADMIN role")
            admin_role = await db.scalar(select(Role).where(Role.name == RoleEnum.ADMIN.value))
            if admin_role:
                logger.info(f"Found ADMIN role: ID {admin_role.id}")
                exists = await db.scalar(select(UserRoleLink).where(
                    UserRoleLink.user_id == existing_user.id,
                    UserRoleLink.role_id == admin_role.id
                ))
                if not exists:
                    db.add(UserRoleLink(user_id=existing_user.id, role_id=admin_role.id))
                    logger.info("First user gets ADMIN role, now")
            else:
                logger.info("ADMIN role not found in database!")
        await db.commit()
        await db.refresh(existing_user)
        await send_email_verification(existing_user)  # E-Mail zur Verifizierung senden

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
    htmlText += f"Hier ist der Link zur Verifizierung: <a href='http://localhost:8000/user/verify?token={user.email_verify_token}&email={user.email}'>Verifizieren</a>"
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
    logger.warning(f"=== VERIFY EMAIL START ===")
    logger.warning(f"Token: {token}")
    logger.warning(f"Email: {email}")
    # Prüfen, ob der Token gültig ist:
    existing_user = await db.scalar(select(User).where(User.email == email))
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")

    logger.warning(f"User gefunden: ID={existing_user.id}, Email_verify={existing_user.email_verify}, Token={existing_user.email_verify_token}")

    if existing_user.email_verify:
        logger.warning("Email bereits verifiziert")
        return {"Deine E-Mail-Adresse ist bereits verifiziert.<br>Du kannst dich jetzt einloggen."}

    logger.warning(f"Vergleiche Token: DB='{existing_user.email_verify_token}' vs Request='{token}'")
    if existing_user.email_verify_token != token:
        logger.warning("Token stimmt NICHT überein")
        raise HTTPException(status_code=400, detail="Invalid token")

    logger.warning("Token stimmt überein - verifiziere Email")
    existing_user.email_verify = True
    existing_user.email_verify_token = None
    await db.commit()
    await db.refresh(existing_user)
    logger.warning("Email erfolgreich verifiziert und committed")
    return {"Vielen Dank, deine Email-Adresse wurde erfolgreich verifiziert.<br>Du kannst dich jetzt einloggen."}


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
    result = await db.scalars(select(Role))
    existing_roles = [role.name for role in result.all()]

    # Fehlende Rollen erstellen
    new_roles = []
    for role_name in required_roles:
        if role_name not in existing_roles:
            new_roles.append(Role(name=role_name))

    # Neue Rollen speichern
    if new_roles:
        db.add_all(new_roles)
        await db.commit()
