from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.engine import Result
import bcrypt

import api.schemas.auth as auth_schema
import api.schemas.user as user_schema
import api.models.user as user_model



def generate_salt() -> str:
    return bcrypt.gensalt().decode()

async def create_user(db: AsyncSession, user_all_info: user_schema.UserInDB) -> user_model.User | None:
    is_user_exist: user_model.User = await read_user(db, user_all_info.user_name)
    if is_user_exist is None: 
        user_db = user_model.User(**user_all_info.__dict__)
        db.add(user_db)
        await db.commit()
        return user_db
    return None

async def read_user(db: AsyncSession, user_name: str) -> user_model.User:
    assert isinstance(user_name, str), "user_name type must be 'str'"
    result: Result = await db.execute(
        # SELECT * FROM users WHERE user.name = :user_name
        select(user_model.User).filter(user_model.User.user_name == user_name)
    ) 
    user_db = result.scalars().first()
    return user_db

async def update_user_name(db: AsyncSession, new_user_info: user_schema.UserEditInfo, user_db: user_model.User) -> user_model.User | None:
    assert isinstance(new_user_info, user_schema.UserEditInfo), "new_user_info type must be 'str'"
    
    is_user_exist: user_model.User = await read_user(db, new_user_info.user_name)
    if is_user_exist is None: 
        user_db.user_name = new_user_info.user_name
        user_db.disabled = new_user_info.disabled
        await db.commit()
        await db.refresh(user_db)
        return user_db
    return None  # ユーザー名がすでに使用済み

async def update_user_password(db: AsyncSession, new_hashed_password: str, user_db: user_model.User) -> user_model.User:
    assert isinstance(new_hashed_password, str), "new_hashed_password type must be 'str'"
    
    user_db.hashed_password = new_hashed_password
    await db.commit()
    await db.refresh(user_db)
    return user_db

# みかんポイントの加算
async def add_user_point(db: AsyncSession, user_db: user_model.User, add_point: int) -> user_model.User | None:
    user_db.mikanpoint += add_point
    await db.commit()
    await db.refresh(user_db)
    return user_db 

# みかんポイントの減算
async def sub_user_point(db: AsyncSession, user_db: user_model.User, sub_point: int) -> user_model.User | None:
    point = user_db.mikanpoint - sub_point
    if point < 0:
        return None
    user_db.mikanpoint = point
    await db.commit()
    await db.refresh(user_db)
    return user_db


async def delete_user(db: AsyncSession, user_db: user_schema.UserInfo) -> None:
    await db.delete(user_db)
    await db.commit()
