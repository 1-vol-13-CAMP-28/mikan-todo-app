from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from api.models.user import *
from api.db import Base

class Item(Base): 
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, auto_increment=True)
    item_name = Column(String(128))
    description = Column(String(512))
    category_id = Column(Integer, ForeignKey('category.id'))
    price = Column(Integer)
    
    category = relationship("Category")
    user_item = relationship("UserItem")


class Category(Base): 
    __tablename__ = "category"

    id = Column(Integer, primary_key=True)
    category_name = Column(String(128))

    item = relationship("Item")