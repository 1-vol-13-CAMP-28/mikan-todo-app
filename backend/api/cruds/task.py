from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.engine import Result

import api.models.user as user_model
import api.models.task as task_model
import api.schemas.task as task_schema
import copy


async def create_task(db: AsyncSession, user_db: user_model.User, task_info: task_schema.TaskCreate) -> task_schema.TaskInfo:
    task_db = task_model.Task(**task_info.dict())
    db.add(task_db)    
    await db.flush()
    await update_task(db=db, user_id=user_db.id, task_id=task_db.id)
    await db.commit()
    await db.refresh(task_db)
    return task_db

async def read_all_tasks(db: AsyncSession, user_db: user_model.User) -> task_model.Task | None:
    result: Result = await db.execute(
        select(task_model.Task)
        .join(user_model.UserTask)
        .filter(user_model.UserTask.user_id == user_db.id)
    )
    if result:
        return result.scalars().all() or None


async def read_task(db: AsyncSession, user_db: user_model.User, task_id: int) -> task_model.Task | None:
    result: Result = await db.execute(
        select(task_model.Task)
        .filter(task_model.Task.id == select(user_model.UserTask.task_id)
                                        .filter(user_model.UserTask.user_id == user_db.id)
                                        .filter(user_model.UserTask.task_id == task_id))
    )
    if result:
        return result.scalars().first()


async def update_task(db: AsyncSession, user_db: user_model.User, task_info: task_schema.TaskEdit, task_id: int) -> user_model.UserTask:
    task_db = await read_task(db, user_db, task_id)
    task_db.task_title = task_info.task_title
    task_db.task_description = task_info.task_description
    task_db.starts_on = task_info.starts_on
    task_db.deadline_on = task_info.deadline_on
    task_db.priority = task_info.priority
    task_db.mikan_quality = task_info.mikan_quality
    task_db.task_status = task_info.task_status
    await db.commit()
    await db.refresh(task_db)
    return task_db

async def delete_task(db: AsyncSession, user_db: user_model.User, task_id: int) -> None:
    task_db = await read_task(db, user_db, task_id)
    await db.delete(task_db)
    await db.commit()
