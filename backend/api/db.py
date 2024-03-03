from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from .config import Settings

settings = Settings()


# import os
# os.system('pip install cryptography')
# os.system('pip install sqlalchemy')

ASYNC_DB_URL = f'mysql+aiomysql://{settings.MYSQL_USER}:{settings.MYSQL_PASSWORD}@{settings.DOCKER_CONTAINER}:{settings.MYSQL_PORT}/{settings.MYSQL_DATABASE}?charset=utf8mb4'
# ASYNC_DB_URL = f'mysql+aiomysql://root:root@{settings.DOCKER_CONTAINER}:{settings.MYSQL_PORT}/{settings.MYSQL_DATABASE}?charset=utf8mb4'

db_engine = create_async_engine(ASYNC_DB_URL, echo=True)
db_session = sessionmaker(autocommit=False, autoflush=True, bind=db_engine, class_=AsyncSession)  # セッションクラスを作成


Base = declarative_base()  # データベースモデルの基本クラス。テーブルの定義時に使用

async def get_db():
    async with db_session() as sesion:  # with ブロックを抜けると、対象のリソースが解放->セッション終了
        yield sesion