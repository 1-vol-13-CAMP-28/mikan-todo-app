# from sqlalchemy import Column, Integer, String
# from sqlalchemy.orm import relationship
# from api.models.task import *
# from api.db import Base


# class Tag(Base):
#     __tablename__ = "tags"

#     id = Column(Integer, primary_key=True, auto_increment=True) 
#     tag_name = Column(String(128))

#     task_tags = relationship("TaskTag")
