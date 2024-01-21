from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base

ASYNC_DB_URL = "mysql+aiomysql://root:root@db:3306/demo?charset=utf8"

db_engine = create_async_engine(ASYNC_DB_URL, echo=True)  # echo=True: 生成するSQLを標準出力に表示
db_session = sessionmaker(autocommit=False, autoflush=False, bind=db_engine, class_=AsyncSession)  # セッションクラスを作成
# autocommit: トランザクション内で発生した更新を明示的にコミットする。autoflush: クエリを実行する際に、自動的にフラッシュ(DBに反映)する bind: データベースエンジンを指定
# 自動にすると不整合が生じることがある


Base = declarative_base()  # データベースモデルの基本クラス。テーブルの定義時に使用

async def get_db():
    async with db_session() as sesion:  # with ブロックを抜けると、対象のリソースが解放->セッション終了
        yield sesion

