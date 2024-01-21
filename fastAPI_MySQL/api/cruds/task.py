from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy.engine import Result
from sqlalchemy.ext.asyncio import AsyncSession
import api.models.task as task_model
import api.schemas.task as task_schema

async def create_task(db: AsyncSession, task_create: task_schema.TaskCreate) -> task_model.Task:
    task = task_model.Task(**task_create.dict())
    db.add(task)
    await db.commit()
    await db.refresh(task)
    return task


async def get_tasks_with_done(db: AsyncSession) -> list[tuple[int, str, bool]]:
    result: Result = await db.execute(
        select(
            task_model.Task.id,
            task_model.Task.title,
            task_model.Done.id.isnot(None).label("done"),  # isnot(None): Noneでなければtrue。labelはフィールドに名前をつける(カラム名ではない)
        ).outerjoin(task_model.Done)  # メインのDBモデルに対してjoinしたいモデルを指定。一致する行のみ結合
    )

    return result.all()


async def get_task(db: AsyncSession, task_id: int) -> task_model.Task | None:
    result: Result = await db.execute(
        # SELECT tasks.id, tasks.title FROM tasks WHERE tasks.id = :task_id
        select(task_model.Task).filter(task_model.Task.id == task_id)  # filterはWHEREと同じ
    ) 
    return result.scalars().first()  # 結果から最初のレコードを取得。

async def update_task(
    db: AsyncSession, task_create: task_schema.TaskCreate, original: task_model.Task
    ) -> task_model.Task:
        original.title = task_create.title  # titleだけ変更して保存
        db.add(original)
        await db.commit()
        await db.refresh(original)
        return original

async def delete_task(db: AsyncSession, original: task_model.Task) -> None:
    await db.delete(original)
    await db.commit()