from fastapi import APIRouter
import api.schemas.task as task_schema


router = APIRouter()

@router.get("/users/me/tasks", response_model=list[task_schema.TaskInfo])
async def get_tasks():
    pass

@router.post("/users/me/tasks", response_model=task_schema.TaskInfo)
async def add_task():
    pass

@router.get("/users/me/tasks/{task_id}", response_model=list[task_schema.TaskInfo])
async def info_task(task_id:int):
    pass

@router.put("/users/me/tasks/{task_id}", response_model=list[task_schema.TaskInfo])
async def edit_task(task_id:int):
    pass

@router.delete("/users/me/tasks/{task_id}", response_model=None)
async def delete_task(task_id:int):
    pass

