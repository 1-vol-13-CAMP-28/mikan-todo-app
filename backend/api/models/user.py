from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from api.db import Base
# from api.models.item import *
# from api.models.task import *


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

    # task = relationship("Task", backref="users")
    user_items = relationship("UserItem")
    # user_tasks = relationship("UserTask", backref="users")


class UserItem(Base):
    __tablename__ = "user_items"

    id = Column(Integer, primary_key=True, auto_increment=True) 
    user_id = Column(Integer, ForeignKey('users.id'))
    item_id = Column(Integer, ForeignKey('items.id'))
    item_num = Column(Integer)

    users = relationship("User")
    items = relationship("Item")

# class UserTask(Base):
#     __tablename__ = "user_tasks"

#     id = Column(Integer, primary_key=True, auto_increment=True) 
#     user_id = relationship("User", foreign_keys="users.id")
#     task_id = relationship("Task", foreign_keys="tasks.id")
