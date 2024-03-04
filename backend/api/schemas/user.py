from pydantic import BaseModel, Field
from datetime import datetime


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
    item_info: list | None = []

    class Config:
        from_attributes = True

class UserEditInfo(BaseModel):
    user_name: str
    disabled: bool = False

class UserEditPasswoord(BaseModel):
    old_password: str
    new_password: str