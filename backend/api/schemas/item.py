from pydantic import BaseModel, Field
import datetime

"""
  id int PK
  itemname string
  description string
  category  string
  price int
"""

class ItemInDB(BaseModel):
    item_id: int
    item_name: str | None = Field(None, example="緑のこたつ")
    description: str | None = Field(None, example="あったかいこたつ")
    category: str | None = Field(None, example="こたつ")
    price: int

    class Config:
        from_attributes = True

class BuyItem(BaseModel):
    item_id: int
    quantity: int = 0

class BuyItemResponse(ItemInDB):
    item_num: int