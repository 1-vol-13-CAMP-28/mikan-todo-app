from fastapi import APIRouter

import api.schemas.user as task_user

router = APIRouter()



@router.get("/users/me", response_model=task_user.UserInfo)
async def info_user():
    pass

@router.put("/users/me", response_model=task_user.UserInfo)
async def edit_user():
    pass

@router.delete("/users/me", response_model=None)
async def delete_user():
    pass

