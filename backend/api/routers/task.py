# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.ext.asyncio import AsyncSession

# from api.auth import *
# from api.db import get_db
# import api.schemas.user as user_schema
# import api.schemas.task as task_schema
# import api.cruds.task as task_crud



# router = APIRouter()

# @router.get("/users/me/tasks", response_model=list[task_schema.TaskInfo])
# async def get_tasks(db: AsyncSession = Depends(get_db)):
#     pass

# @router.post("/users/me/tasks", response_model=task_schema.TaskInfo)
# async def create_task(task_body: task_schema.TaskCreate, db: AsyncSession = Depends(get_db), current_user: user_schema.UserInfo = Depends(get_current_active_user)):
#     return task_crud.create_task(db, current_user.user_id, task_body)

# @router.get("/users/me/tasks/{task_id}", response_model=task_schema.TaskInfo)
# async def info_task(task_id:int, db: AsyncSession = Depends(get_db)):
#     pass

# @router.put("/users/me/tasks/{task_id}", response_model=task_schema.TaskInfo)
# async def edit_task(task_id:int, db: AsyncSession = Depends(get_db)):
#     pass

# @router.delete("/users/me/tasks/{task_id}", response_model=None)
# async def delete_task(task_id:int, db: AsyncSession = Depends(get_db)):
#     pass

