from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.engine import Result

import api.models.user as user_model

import api.models.item as item_model
import api.schemas.item as item_schema
import api.cruds.user as user_crud

def make_buy_item_response(item_info: dict, total_price: int, mikanpoint: int) -> dict:
    total_price_dict = {"total_price": total_price}
    mikanpoint_dict = {"mikanpoint": mikanpoint}
    return item_info | total_price_dict | mikanpoint_dict

# 全てのitemsの詳細を取得
async def read_all_items(db: AsyncSession) -> dict| None:
    result: Result = await db.execute(
        select(item_model.Item, item_model.Category.category_name)
        .join(item_model.Category, item_model.Item.category_id == item_model.Category.id)
    )
    return [{**item.__dict__, "category_name": category_name} for item, category_name in result] or None

# 指定されたitem_idの詳細を取得
async def read_item_info(db: AsyncSession, item_id: int) -> dict | None:    
    result: Result = await db.execute(
        select(item_model.Item, item_model.Category.category_name)
        .filter(item_model.Item.id == item_id)
        .join(item_model.Category, item_model.Item.category_id == item_model.Category.id)
    )
    item_with_category = result.fetchone()
    if item_with_category:
        item, category_name = item_with_category
        return {**item.__dict__, "category_name": category_name}
    return None

# ユーザーの所有するitem_idとitem_numを取得
async def read_user_item_info(db: AsyncSession, user_db: user_model.User) -> item_schema.ItemsInfo | None:    
    result: Result = await db.execute(
        select(user_model.UserItem.item_id, user_model.UserItem.item_num )
        .filter(user_model.UserItem.user_id == user_db.id)
    )
    if result:
        items_info = result.fetchall()
        if items_info:
            return [item_schema.ItemsInfo(item_id=item_info[0], item_num=item_info[1]) for item_info in items_info]

# アイテムを購入する
async def buy_item(db: AsyncSession, user_db: user_model.User, item_info: item_schema.BuyItem) -> item_schema.BuyItemResponse | None:    
    user_id = user_db.id
    # 入力値のチェック
    item_id, quantity = item_info.item_id, item_info.quantity
    if not item_id or quantity <= 0:
        return {"error": "Invalid item ID or quantity"} 
    
    # みかんポイントの計算
    item_info: dict = await read_item_info(db, item_id)
    total_price = item_info["price"] * quantity
    new_user_db: user_model.User = await user_crud.sub_user_point(db, user_db, total_price)
    if new_user_db is None:
        return {"error": "Not enough mikanpoint"}
    mikanpoint = new_user_db.mikanpoint

    # アイテムの入手
    await update_user_items(db, user_id, item_id, quantity)

    response =  make_buy_item_response(item_info, total_price, mikanpoint)
    return response


# アイテム入手の処理
async def update_user_items(db: AsyncSession, user_id: int, item_id: int, quantity: int) -> user_model.UserItem | None:
    assert isinstance(user_id, int) or isinstance(item_id, int), "user_id and item_id type must be 'user_model.User'"
    user_item_db: user_model.UserItem = await read_user_item(db, user_id, item_id)
    if user_item_db:
        user_item_db.item_num += quantity
    else:
        user_item_db = user_model.UserItem(
            user_id=user_id,
            item_id=item_id,
            item_num=quantity
        )
        db.add(user_item_db)
    await db.commit()
    await db.refresh(user_item_db)
    return user_item_db

# 特定のユーザーの特定のアイテムのテーブルを取得
async def read_user_item(db: AsyncSession, user_id: int, item_id: int) -> user_model.UserItem | list:
    result: Result = await db.execute(
        select(user_model.UserItem)
        .filter(user_model.UserItem.user_id == user_id)
        .filter(user_model.UserItem.item_id == item_id)
    )
    return result.scalars().first()


