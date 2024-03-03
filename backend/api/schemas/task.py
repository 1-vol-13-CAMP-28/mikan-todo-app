from pydantic import BaseModel, Field
from datetime import datetime

"""
  id int PK
  user_id int FK
  task_title string
  task_description string
  starts_on datetime
  deadline_on datetime
  priority int
  task_status bool
  mikan_quality int
"""

class TaskBase(BaseModel):
    id: int = Field(description="Task ID")
    task_title: str | None = Field(None, example="みかんを食べる")
    task_description: str | None = Field(None, example="午後3時、3つ")
    starts_on: datetime | None = None
    deadline_on: datetime | None = None
    priority: int

class TaskInDB(TaskBase):
    id: int = Field(description="Task ID")
    mikan_quality: int
    task_status: bool = False

    class Config:
        from_attributes = True

class TaskCreate(TaskBase):  # user_id, mikan_quality, task_statusなし
    pass

class TaskInfo(TaskBase):   # user_idなし、tagあり
    mikan_quality: int
    task_status: bool = False
    tags: list[int] | None = None

class TaskEdit(TaskInfo):
    pass
