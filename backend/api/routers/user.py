from fastapi import APIRouter
from api.auth import *

import api.schemas.user as user_schema

import api.cruds.user as user_crud
import api.cruds.item as item_crud


router = APIRouter()


@router.get("/users/me/", response_model=user_schema.UserAllInfo)
async def get_user_info(current_user_db: user_model.User = Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    assert isinstance(current_user_db, user_model.User), "ERROR"
    user_item_info = await item_crud.read_user_item_info(db, current_user_db)
    response = current_user_db.__dict__ | {"item_info": user_item_info}
    return response


@router.put("/users/me/edit/info", response_model=user_schema.UserInfo | None)
async def update_user_name(body: user_schema.UserEditInfo, current_user_db: user_model.User = Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    if body.user_name == current_user_db.user_name:
        # ユーザー名が変更されていない
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="User name has not been changed"
        )
    new_user_db: user_model.User = await user_crud.update_user_name(db, body, current_user_db)
    
    if new_user_db is None:
        # ユーザー名がすでに使用済み
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="The specified user name is already registered"
        )
    return new_user_db


@router.put("/users/me/edit/password", response_model=user_schema.UserInfo | None)
async def update_user_password(body: user_schema.UserEditPasswoord, current_user_db: user_model.User = Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    # パスワードの一致を確認
    plain_password_with_salt = (body.old_password + current_user_db.salt)
    if not verify_password(plain_password_with_salt, current_user_db.hashed_password):
        # パスワードが一致していない
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Password does not match"
        )
    # ハッシュ化したパスワードを登録
    new_hashed_password = get_password_hash(body.new_password, current_user_db.salt)
    new_user_db: user_model.User = await user_crud.update_user_password(db, new_hashed_password, current_user_db)
    return new_user_db

@router.put("/users/me/add_point", response_model=user_schema.UserInfo | None)
async def update_user_name(point: int, current_user_db: user_model.User = Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    return await user_crud.add_user_point(db, current_user_db, point)

@router.delete("/users/me/delete", response_model=None)
async def delete_user(current_user_db: user_model.User = Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    return await user_crud.delete_user(db, current_user_db)
