from pydantic import BaseModel, Field
from datetime import datetime

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_name: str | None = None

