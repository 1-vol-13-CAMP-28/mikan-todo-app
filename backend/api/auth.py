from datetime import datetime, timedelta, timezone
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import RedirectResponse
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
import bcrypt
from datetime import datetime

from .config import Settings
from api.db import get_db

import api.schemas.auth as auth_schema
import api.schemas.user as user_schema
import api.cruds.user as user_crud
import api.models.user as user_model


settings = Settings()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="signin")


def generate_salt() -> str:
    return bcrypt.gensalt().decode()

def get_password_hash(password, salt):
    return pwd_context.hash(password + salt)

def verify_password(plain_password_with_salt, hashed_password):
    return pwd_context.verify(plain_password_with_salt, hashed_password)

async def authenticate_user(db: AsyncSession, user_name: str, password: str):
    user: user_model.User = await user_crud.read_user(db, user_name)
    if not user:
        return False
    if not verify_password(password + user.salt, user.hashed_password):
        return False
    return user

def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)) -> user_model.User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_name: str = payload.get("sub")
        if user_name is None:
            raise credentials_exception
        token_data = auth_schema.TokenData(user_name=user_name)
    except JWTError:
        raise credentials_exception
    user: user_model.User = await user_crud.read_user(db, user_name=token_data.user_name)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: user_model.User = Depends(get_current_user)) -> user_model.User | None:
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user
