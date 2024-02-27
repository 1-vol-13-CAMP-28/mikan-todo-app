from pydantic import BaseModel, Field

"""
  id int PK
  name string
  email string
  hashed_password string  
  mikanpoint int
  disabled bool
"""

class UserInDB(BaseModel):
    user_id: int
    username: str = Field(None, example="mikan")
    email: str = Field(None, example="mikan@example.com")
    hashed_password: str = Field(None, example="p@ssw0rd")
    mikanpoint: int = 0
    disabled: bool = False

    class Config:
        from_attributes = True

class Signup(BaseModel):
    username: str | None = Field(None, example="mikan")
    password: str | None = Field(None, example="p@ssw0rd")
    email: str | None = Field(None, example="mikan@example.com")

class Signin(BaseModel): 
    username: str | None = Field(None, example="mikan")
    password: str | None = Field(None, example="p@ssw0rd")


class UserInfo(BaseModel):
    username: str | None = Field(None, example="mikan")
    email: str | None = Field(None, example="mikan@example.com")
    mikanpoint: int
    disabled: bool | None =  None

    class Config:
        from_attributes = True

class UserEdit(BaseModel):
    username: str | None = Field(None, example="mikan")
    password: str | None = Field(None, example="p@ssw0rd")
    email: str | None = Field(None, example="mikan@example.com")