from fastapi import APIRouter

from api.auth import *

import api.schemas.item as item_schema
import api.cruds.item as item_crud

router = APIRouter()

# @router.get("/items", response_model=list[item_schema.ItemInfo] | None)
@router.get("/items")
async def get_all_items(db: AsyncSession = Depends(get_db)):
    return await item_crud.read_all_items(db)

@router.get("/items/{item_id}", response_model=item_schema.ItemInfo | None)
async def get_item_info(item_id:int, db: AsyncSession = Depends(get_db)):
    return await item_crud.read_item_info(db, item_id=item_id)

@router.get("/users/me/items_info", response_model=list[item_schema.ItemsInfo] | None)
async def get_user_items_info(current_user_db: user_model.User= Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    return await item_crud.read_user_item_info(db, current_user_db)

@router.post("/users/me/items/buy_item", response_model=item_schema.BuyItemResponse | None)
async def buy_item(body: item_schema.BuyItem, current_user_db: user_model.User= Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    result = await item_crud.buy_item(db, current_user_db, body)
    if "error" in result:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail=result["error"]
        )
    return result