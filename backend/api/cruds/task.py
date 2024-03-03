# from sqlalchemy import select
# from sqlalchemy.orm import Session
# from sqlalchemy.engine import Result


# import api.models.task as task_model
# import api.schemas.task as task_schema



# def create_task(db: Session, user_id, task_info: task_schema.TaskCreate) -> task_schema.TaskInfo:
#     task = task_model.Task(**task_info.dict())
#     # task.user_id = user_id
#     db.add(task)
#     db.commit()
#     db.refresh(task)
#     return task


# def get_task(db: Session, task_id: int) -> task_model.Task | None:
#     result: Result = db.execute(
#         # SELECT tasks.id, tasks.title FROM tasks WHERE tasks.id = :task_id
#         select(task_model.Task).filter(task_model.Task.id == task_id)
#     ) 
#     return result.scalars().first()
