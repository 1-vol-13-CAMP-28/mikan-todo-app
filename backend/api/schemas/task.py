from pydantic import BaseModel, Field
from datetime import datetime

"""
  id int PK
  user_id int FK
  task_title string
  task_description string
  registrated_on datetime
  deadline_on datetime
  priority int
  task_status bool
  mikan_quality int
"""

class TaskBase(BaseModel):
    task_title: str | None = Field(None, example="みかんを食べる")
    task_description: str | None = Field(None, example="午後3時、3つ")
    registrated_on: datetime | None = Field(None)
    deadline_on: datetime | None = Field(None)
    priority: int

class TaskInDB(TaskBase):
    task_id: int 
    user_id: int
    mikan_quality: int
    task_status: bool = False

    class Config:
        from_attributes = True

class TaskCreate(TaskBase):  # task_id, user_id, mikan_quality, task_statusなし
    pass

class TaskInfo(TaskBase):   # user_idなし
    task_id: int 
    mikan_quality: int
    task_status: bool = False

class TaskEdit(TaskInfo):
    pass
