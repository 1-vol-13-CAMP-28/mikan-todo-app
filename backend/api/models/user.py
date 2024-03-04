from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from api.db import Base
from api.models.item import *
from api.models.task import *


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True) 
    user_name = Column(String(128))
    email = Column(String(128))
    hashed_password = Column(String(512))
    salt = Column(String(128))
    created_on = Column(DateTime)
    mikanpoint = Column(Integer)
    disabled = Column(Boolean)

    user_item = relationship("UserItem")
    user_task = relationship("UserTask")


class UserItem(Base):
    __tablename__ = "user_items"

    id = Column(Integer, primary_key=True, auto_increment=True) 
    user_id = Column(Integer, ForeignKey('users.id'))
    item_id = Column(Integer, ForeignKey('items.id'))
    item_num = Column(Integer)

    user = relationship("User")
    item = relationship("Item")

class UserTask(Base):
    __tablename__ = "user_tasks"

    id = Column(Integer, primary_key=True, auto_increment=True) 
    user_id = Column(Integer, ForeignKey('users.id'))
    task_id = Column(Integer, ForeignKey('tasks.id'))
    
    user = relationship("User")
    task = relationship("Task")
