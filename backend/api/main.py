from fastapi import FastAPI
from datetime import datetime, timedelta, timezone
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel

from api.routers import user, task, item, oauth
import api.schemas.oauth as oauth_schema
import api.schemas.user as user_schema


SECRET_KEY = "9356c3eec3bcaf9276f469845ce7bdaed244a43a798b9d40c067f1c3fc4718c2"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


app = FastAPI()
app.include_router(oauth.router)
app.include_router(user.router)
app.include_router(task.router)
app.include_router(item.router)




fake_users_db = {
    "mikan": {
                "user_id": 1,
                "username": "mikan",
                "email": "mikan@email.com",
                "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
                "mikanpoint": 15,
                "disabled": False
            }
}

fake_item_db = {
                    "id": 1,
                    "itemname": "red_kotatu",
                    "description": "this is red color",
                    "category":  "kotatu",
                    "price": 12
                },


fake_task_db = {
                    "id": 1,
                    "user_id": 1,
                    "task_title": "eat mikan",
                    "task_description": "3 piece",
                    "registrated_on": "Mar 08 2019 20:00:00",
                    "deadline_on": "Mar 08 2019 22:00:00",
                    "priority": 4,
                    "mikan_quality": 1,
                    "task_status": True
                },

# class Token(BaseModel):
#     access_token: str
#     token_type: str


# class TokenData(BaseModel):
    # username: str | None = None


# class User(BaseModel):
#     username: str
#     email: str | None = None
#     full_name: str | None = None
#     disabled: bool | None = None


# class UserInDB(User):
#     hashed_password: str


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="signin")

app = FastAPI()


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return user_schema.UserInDB(**user_dict)


def authenticate_user(fake_users_db, username: str, password: str):
    user = get_user(fake_users_db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = oauth_schema.TokenData(username=username)  # 型変換
    except JWTError:
        raise credentials_exception
    user = get_user(fake_users_db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(current_user: user_schema.UserInfo = Depends(get_current_user)):  # 依存関係の解決が一度だけ行われ、その後はキャッシュされた値が再利用されるため、効率的な処理が可能
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


@app.post("/signin")
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends()   # Dependsで依存関係を解決
) -> oauth_schema.Token:
    user = authenticate_user(fake_users_db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return oauth_schema.Token(access_token=access_token, token_type="bearer")


# @app.get("/users/me/", response_model=user_schema.UserInfo)  # ログイン？
# async def read_users_me(current_user: user_schema.UserInfo = Depends(get_current_active_user)):
#     return current_user


# @app.get("/users/me/items/")
# async def read_own_items(current_user: user_schema.UserInfo = Depends(get_current_active_user)):
#     return [{"item_id": "Foo", "owner": current_user.username}]
