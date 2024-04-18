from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from api.auth import *
from api.db import get_db
import api.schemas.user as user_schema
import api.schemas.task as task_schema
import api.cruds.task as task_crud



router = APIRouter()

@router.get("/users/me/tasks", response_model=list[task_schema.TaskInfo])
async def get_tasks(db: AsyncSession = Depends(get_db), current_user: user_model.User  = Depends(get_current_active_user)):
    return await task_crud.read_all_tasks(db, current_user)

@router.post("/users/me/tasks", response_model=task_schema.TaskInfo)
async def create_task(body: task_schema.TaskCreate, db: AsyncSession = Depends(get_db), current_user: user_model.User  = Depends(get_current_active_user)):
    return await task_crud.create_task(db, current_user, body)

@router.get("/users/me/tasks/{task_id}", response_model=task_schema.TaskInfo)
async def read_task(task_id:int, db: AsyncSession = Depends(get_db), current_user: user_model.User  = Depends(get_current_active_user)):
    result =  await task_crud.read_task(db, current_user, task_id)
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Invalid task_id"
        )
    return result

@router.put("/users/me/tasks/{task_id}", response_model=task_schema.TaskInfo)
async def update_task(body: task_schema.TaskEdit, task_id:int, db: AsyncSession = Depends(get_db), current_user: user_model.User  = Depends(get_current_active_user)):
    return await task_crud.update_task(db, current_user, body, task_id)

@router.delete("/users/me/tasks/{task_id}", response_model=None)
async def delete_task(task_id:int, db: AsyncSession = Depends(get_db), current_user: user_model.User  = Depends(get_current_active_user)):
    return await task_crud.delete_task(db, current_user, task_id)

