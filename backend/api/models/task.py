# from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
# from sqlalchemy.orm import relationship

# from api.db import Base
# from api.models.user import *
# from api.models.tag import *


# class Task(Base):
#     __tablename__ = "tasks"

#     id = Column(Integer, primary_key=True) 
#     user_id = relationship("User", foreign_keys="users.id")
#     task_title = Column(String(512))
#     task_description = Column(String(1024))
#     starts_on = Column(DateTime)
#     deadline_on = Column(DateTime)
#     priority = Column(Integer)
#     mikan_quality = Column(Integer)
#     task_status = Column(Boolean)

#     user_task = relationship("UserTask")
#     task_tags = relationship("TaskTag")



# class TaskTag(Base):
#     __tablename__ = "task_tags"

#     id = Column(Integer, primary_key=True, auto_increment=True) 
#     tag_id =relationship("Tag", foreign_keys="tags.id")
#     task_id =relationship("Task", foreign_keys="task.id")
