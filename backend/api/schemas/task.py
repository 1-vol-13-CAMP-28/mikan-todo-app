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
    task_title: str | None = Field(None, example="みかんを食べる")
    task_description: str | None = Field(None, example="午後3時、3つ")
    starts_on: datetime | None = None
    deadline_on: datetime | None = None
    priority: int = 3
    mikan_quality: int = 5
    task_status: bool = False
    # tags: list[int] | None = None

    class Config:
        from_attributes = True

class TaskInDB(TaskBase):
    id: int = Field(description="Task ID")

    pass

class TaskCreate(TaskBase):
    class Config:
        from_attributes = True
    
class TaskInfo(TaskBase):
    id: int = Field(description="Task ID")
    # tags: list[int] | None = None
    pass

class TaskEdit(TaskBase):
    pass
