from pydantic import BaseModel, Field
from datetime import datetime

"""
  id int PK
  user_name string
  email string
  hashed_password string(512)  
  salt string(128)
  created_on datetime
  mikanpoint int
  disabled bool
"""

class UserCreate(BaseModel):
    id: int = Field(description="User ID")
    user_name: str = Field(example="mikan")
    password: str = Field(example="password")
    email: str = Field(example="mikan@mikan.com")
    created_on: datetime = datetime.now()
    class Config:
        from_attributes = True

class UserInDB(BaseModel):
    id: int = Field(description="User ID")
    user_name: str
    email: str
    hashed_password: str
    salt: str
    created_on: datetime = datetime.now()
    mikanpoint: int = 0
    disabled: bool = False

    class Config:
        from_attributes = True

class UserInfo(BaseModel):
    user_name: str
    email: str
    mikanpoint: int = 0
    disabled: bool =  False

    class Config:
        from_attributes = True

class UserAllInfo(UserInfo):
    item_ids: list[int] = []

    class Config:
        from_attributes = True

class UserEditName(BaseModel):
    user_name: str

class UserEditPasswoord(BaseModel):
    old_password: str
    new_password: str