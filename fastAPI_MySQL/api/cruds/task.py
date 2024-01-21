from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy.engine import Result

import api.models.task as task_model
import api.schemas.task as task_schema

def create_task(db: Session, task_create: task_schema.TaskCreate) -> task_model.Task:
    task = task_model.Task(**task_create.dict())
    db.add(task)
    db.commit()
    db.refresh(task)
    return task


def get_tasks_with_done(db: Session) -> list[tuple[int, str, bool]]:
    result: Result = db.execute(
        select(
            task_model.Task.id,
            task_model.Task.title,
            task_model.Done.id.isnot(None).label("done"),  # isnot(None): Noneでなければtrue。labelはフィールドに名前をつける(カラム名ではない)
        ).outerjoin(task_model.Done)  # メインのDBモデルに対してjoinしたいモデルを指定。一致する行のみ結合
    )

    return result.all()


def get_task(db: Session, task_id: int) -> task_model.Task | None:
    result: Result = db.execute(
        # SELECT tasks.id, tasks.title FROM tasks WHERE tasks.id = :task_id
        select(task_model.Task).filter(task_model.Task.id == task_id)  # filterはWHEREと同じ
    ) 
    return result.scalars().first()  # 結果から最初のレコードを取得。

def update_task(
    db: Session, task_create: task_schema.TaskCreate, original: task_model.Task
    ) -> task_model.Task:
        original.title = task_create.title  # titleだけ変更して保存
        db.add(original)
        db.commit()
        db.refresh(original)
        return original