from fastapi import APIRouter
import api.schemas.item as item_schema

router = APIRouter()

@router.get("/items", response_model=item_schema.ItemInDB)
async def get_items():
    pass

@router.get("/items/{item_id}", response_model=item_schema.ItemInDB)
async def info_item(item_id:int):
    pass

@router.get("/users/me/items", response_model=item_schema.ItemInDB)
async def get_user_items():
    pass

@router.post("/users/me/items/buy_item", response_model=item_schema.BuyItemResponse)
async def buy_item():
    pass

