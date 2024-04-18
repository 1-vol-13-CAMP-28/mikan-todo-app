from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from api.db import Base
from api.models.user import *
from api.models.tag import *


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, auto_increment=True) 
    task_title = Column(String(512))
    task_description = Column(String(1024))
    starts_on = Column(DateTime)
    deadline_on = Column(DateTime)
    priority = Column(Integer)
    mikan_quality = Column(Integer)
    task_status = Column(Boolean)

    user_task = relationship("UserTask")
    task_tags = relationship("TaskTag")


class TaskTag(Base):
    __tablename__ = "task_tags"

    id = Column(Integer, primary_key=True, auto_increment=True) 
    tag_id = Column(Integer, ForeignKey('tags.id'))
    task_id = Column(Integer, ForeignKey('tasks.id'))

    tag = relationship("Tag")
    task = relationship("Task")
