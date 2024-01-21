from pydantic import BaseModel, Field

class Task(BaseModel):
    id: int
    title: str | None = Field(None, example="クリーニングを撮りに行く")
    done: bool = Field(False, description="完了フラグ")

class TaskCreate(BaseModel):
    title: str | None = Field(None, example="クリーニングを撮りに行く")

class TaskCreateResponse(TaskCreate):
    id: int
    title: str | None = Field(None, example="クリーニングを撮りに行く")

    class Config:
        orm_mode = True  # データベースからの結果に欠落データが時、Pydanticはデフォルト値を使用

