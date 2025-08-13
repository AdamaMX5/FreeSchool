from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta
from typing import Optional, Union, Any, List
from jose import jwt, JWTError, ExpiredSignatureError
from jose.exceptions import JWTClaimsError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from database import get_async_db
from models.user import User, Role, UserRoleLink
from passlib.context import CryptContext
import random
import string

# Diese Werte solltest du in einer Umgebungsvariable speichern oder konfigurieren!
SECRET_KEY = "geheimer_schluessel_123"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 12
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token", auto_error=False)
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def create_jwt(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_jwt(token: str) -> Union[dict, None]:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token ist abgelaufen",
            headers={"WWW-Authenticate": "Bearer"}
        )
    except JWTClaimsError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Ungültige Token-Claims: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"}
        )
    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Ungültiges Token: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"}
        )


async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_async_db)) -> User:
    payload = verify_jwt(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="kein Authentifizierungstoken",
            headers={"WWW-Authenticate": "Bearer"}
        )
    email: str = payload.get("sub")
    if email is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Ungültige Authentifizierungsdaten (Email ist nicht im Token enthalten)",
            headers={"WWW-Authenticate": "Bearer"}
        )

    result = await db.execute(select(User).where(User.email == email))
    user = result.scalars().first()

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User nicht gefunden",
            headers={"WWW-Authenticate": "Bearer"}
        )
    return user


async def get_current_user_optional(token: Optional[str] = Depends(oauth2_scheme),
                                    db: AsyncSession = Depends(get_async_db)) -> Optional[User]:
    if not token:
        return None
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if not email:
            return None

        result = await db.execute(select(User).where(User.email == email))
        return result.scalars().first()
    except (JWTError, ExpiredSignatureError, HTTPException) as e:
        print(f"Token-Verifikation fehlgeschlagen: {str(e)}")
        return None


async def get_current_user_by_id(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_async_db)) -> User:
    payload = verify_jwt(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="kein Authentifizierungstoken",
            headers={"WWW-Authenticate": "Bearer"}
        )
    user_id: int = payload.get("subid")
    if user_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token enthält keine User-ID")

    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalars().first()

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User nicht gefunden",
            headers={"WWW-Authenticate": "Bearer"}
        )
    return user


def create_email_verify_token() -> str:
    chars = string.ascii_letters + string.digits + '-_'
    return ''.join(random.choice(chars) for _ in range(32))


async def get_user_roles(user: User, db: AsyncSession) -> List[str]:
    result = await db.execute(
        select(Role.name)
        .join(UserRoleLink, UserRoleLink.role_id == Role.id)
        .where(UserRoleLink.user_id == user.id)
    )
    return result.scalars().all()


def required_roles(required_roles: List[str]):
    async def role_checker(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_async_db)):
        user_roles = await get_user_roles(current_user, db)
        if not any(role in user_roles for role in required_roles):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Operation not permitted"
            )
        return current_user

    return role_checker