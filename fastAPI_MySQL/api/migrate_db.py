from sqlalchemy import create_engine
from api.models.task import Base
import os

DB_USER = os.getenv('ROOT_USER')
DB_PASS = os.getenv('ROOT_PASS')
DB_HOST = os.getenv('DB_HOST')
DB_PORT = os.getenv('DB_PORT')
DB_NAME = os.getenv('DB_NAME')
print(f"mysql+pymysql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}?charset=utf8")
# mysql+pymysql://user:root@None:33306/demo?charset=utf8
DB_URL = f"mysql+pymysql://root:root@db:3306/demo?charset=utf8"
engine = create_engine(DB_URL, echo=True)


def reset_database():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    reset_database()