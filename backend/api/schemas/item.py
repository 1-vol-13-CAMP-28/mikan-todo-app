from pydantic import BaseModel, Field
import datetime

"""
  id int PK
  item_name string(128)
  description string(512)
  category_id int FK
  price int
"""

class ItemInDB(BaseModel):
    id: int = Field(description="Item ID", example=1)
    category_id: int = Field(example=1)
    item_name: str | None = Field(example="緑のこたつ")
    description: str | None = Field(example="あったかいこたつ")
    price: int = Field(example=10)
    category_name: str | None = Field(example="こたつ")

class BuyItem(BaseModel):
    item_id: int = Field(description="Item ID", example=1)
    quantity: int = Field(0, example=3)

class BuyItemResponse(ItemInDB):
    total_price: int
    mikanpoint: int

class ItemInfo(ItemInDB):
    pass