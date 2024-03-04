from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from .config import Settings

settings = Settings()

ASYNC_DB_URL = f'mysql+aiomysql://{settings.MYSQL_USER}:{settings.MYSQL_PASSWORD}@{settings.DOCKER_CONTAINER}:{settings.MYSQL_PORT}/{settings.MYSQL_DATABASE}?charset=utf8mb4'

db_engine = create_async_engine(ASYNC_DB_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=db_engine, class_=AsyncSession)  # セッションクラスを作成


Base = declarative_base()

async def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
