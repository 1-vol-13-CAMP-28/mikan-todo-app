from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from api.auth import *
from api.db import get_db
import api.schemas.auth as auth_schema
import api.schemas.user as user_schema
import api.cruds.user as user_crud
import api.models.user as user_model


router = APIRouter()

@router.post("/signup", response_model=user_schema.UserAllInfo | None)
async def signup(signup_body: user_schema.UserCreate, db: AsyncSession = Depends(get_db)):
    user_info: dict = signup_body.dict()
    user_info["salt"] = generate_salt()
    user_info["hashed_password"] = get_password_hash(signup_body.password, user_info["salt"])
    user_db: user_model.User = await user_crud.create_user(db, user_schema.UserInDB(**user_info))    
    if user_db is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="The specified user name is already registered"
        )
    return user_info


@router.post("/signin", response_model=auth_schema.Token)
async def signin(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    user = await authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.user_name}, expires_delta=access_token_expires
    )
    return auth_schema.Token(access_token=access_token, token_type="bearer")

