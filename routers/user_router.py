from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel, EmailStr
from sqlmodel import Session, select
from typing import List, Optional
from models.user import User
from models.user import Profile
from models.user import Role, UserRoleLink
from database import get_db

from security.auth import verify_password, get_password_hash, create_jwt, create_email_verify_token, get_current_user, get_current_user_by_id
from security.email import EmailService
from util.time_util import timestamp


router = APIRouter(prefix="/user", tags=["user"])


class UserLogin(BaseModel):
    email: EmailStr
    password: str  # Klartext-Passwort wird hier übergeben und dann gehasht gespeichert


class UserLoginResponse(BaseModel):
    id: int
    email: str
    jwt: str
    status: str
    roles: List[str]


@router.post("/login", status_code=status.HTTP_201_CREATED)
def login_user(user_in: UserLogin, db: Session = Depends(get_db)):
    # Prüfen, ob ein User mit der Email existiert:
    statement = select(User).where(User.email == user_in.email)
    existing_user = db.exec(statement).first()
    if existing_user:
        if existing_user.is_deleted:
            raise HTTPException(status_code=400, detail="User is deleted call support")
        if not existing_user.passwordVerify:
            return UserLoginResponse(
                id=existing_user.id,
                email=existing_user.email,
                roles=get_role_names(existing_user),
                jwt="",
                status="register"
            )
        # Passwort-Hash überprüfen:
        if not verify_password(user_in.password, existing_user.hashed_password):
            raise HTTPException(status_code=400, detail="Invalid password")
        existing_user.jwt = create_jwt(data={"sub": existing_user.email, "subid": existing_user.id})  # JWT-Token erstellen
        return UserLoginResponse(
            id=existing_user.id,
            email=existing_user.email,
            roles=get_role_names(existing_user),
            jwt=existing_user.jwt,
            status="login"
        )
    else:
        # Neues User-Objekt erstellen:
        new_user = User(email=user_in.email, passwort=user_in.password)
        new_user.lastLogin = timestamp()  # Letzter Login
        new_user.hashed_password = get_password_hash(user_in.password)  # Passwort-Hash erstellen
        new_user.passwordVerify = False  # Passwort-Hash erstellen
        new_user.emailVerify = False
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return UserLoginResponse(
            id=new_user.id,
            email=new_user.email,
            roles=[],
            jwt="",
            status="register"
        )


def get_role_names(user: User) -> List[str]:
    return [role.name for role in user.roles]


class UserRegister(BaseModel):
    id: int
    repassword: str  # Klartext-Passwort wird hier übergeben und dann gehasht und mit dem gespeicherten HashPasswort verglichen


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register_user(user_in: UserRegister, db: Session = Depends(get_db)):
    # Prüfen, ob ein User mit der gleichen Email bereits existiert:
    statement = select(User).where(User.id == user_in.id)
    print("User ID: ", user_in.id)
    existing_user = db.exec(statement).first()
    if existing_user:
        if not verify_password(user_in.repassword, existing_user.hashed_password):
            db.delete(existing_user)
            raise HTTPException(status_code=400, detail="Secound Passwort is not the same as the first")
        else:
            existing_user.jwt = create_jwt(data={"sub": existing_user.email})  # JWT-Token erstellen
            existing_user.passwordVerify = True  # Letzter Login
            existing_user.emailVerifyToken = create_email_verify_token()
            existing_user.emailVerify = False
            existing_user.lastLogin = timestamp()  # Letzter Login
            db.commit()
            db.refresh(existing_user)
            send_email_verification(existing_user)  # E-Mail zur Verifizierung senden
    else:
        raise HTTPException(status_code=404, detail="User not found")
    return UserLoginResponse(
        id=existing_user.id,
        email=existing_user.email,
        roles=get_role_names(existing_user),
        jwt=existing_user.jwt,
        status="verify_email_sended"
    )


def send_email_verification(user: User):
    # verify E-Mail erzeugen
    htmlText = "Wir begrüßen dich bei der Freischule."
    htmlText += "<br><br>"
    htmlText += "Um deine E-Mail-Adresse zu verifizieren, klicke bitte auf folgenden Link:<br>"
    htmlText += f"Hier ist der Link zur Verifizierung: <a href='http://localhost:8000/user/verify?token={user.emailVerifyToken}&email={user.email}'>Verifizieren</a>"
    htmlText += "<br><br>"
    htmlText += "Vielen Dank für alles und liebe Grüße<br><br>Euer Kurt"

    EmailService.send_email(
        to_email=user.email,
        subject="Verifizierung deiner E-Mail-Adresse",
        from_email="registration@flussmark.de",
        from_name="Freischule Registrationsservice",
        html_body=htmlText
    )


@router.get("/verify")
def verify_email(token: str, email: str, db: Session = Depends(get_db)):
    # Prüfen, ob der Token gültig ist:
    statement = select(User).where(User.email == email)
    existing_user = db.exec(statement).first()
    if existing_user:
        if existing_user.emailVerify:
            return {"Deine E-Mail-Adresse ist bereits verifiziert.<br>Du kannst dich jetzt einloggen."}
        if existing_user.emailVerifyToken == token:
            existing_user.emailVerify = True
            existing_user.emailVerifyToken = None
            db.commit()
            db.refresh(existing_user)
            return {"Vielen Dank, deine Email-Adresse wurde erfolgreich verifiziert.<br>Du kannst dich jetzt einloggen."}
        else:
            raise HTTPException(status_code=400, detail="Invalid token")
    else:
        raise HTTPException(status_code=404, detail="User not found")


@router.post("/logout")
def logout(user: User = Depends(get_current_user)):
    # Hier wäre z.B. ein Token-Blacklist-Eintrag möglich (wenn du sowas hast)
    # Oder einfach nur Logging
    return {"status": "logout", "user_id": user.id}


