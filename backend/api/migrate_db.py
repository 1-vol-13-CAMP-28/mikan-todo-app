from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from .config import Settings
from api.models.user import Base as userDB
from api.models.item import Base as itemDB
# from api.models.task import Base as taskDB
# from api.models.tag import Base as tagDB
settings = Settings()

DB_URL = f'mysql+pymysql://{settings.MYSQL_USER}:{settings.MYSQL_PASSWORD}@{settings.DOCKER_CONTAINER}:{settings.MYSQL_PORT}/{settings.MYSQL_DATABASE}?charset=utf8mb4'
engine = create_engine(DB_URL, echo=True)
Session = sessionmaker(bind=engine)
session = Session()

def reset_database():
    userDB.metadata.drop_all(bind=engine)
    userDB.metadata.create_all(bind=engine)
    itemDB.metadata.drop_all(bind=engine)
    itemDB.metadata.create_all(bind=engine)
    # taskDB.metadata.drop_all(bind=engine)
    # taskDB.metadata.create_all(bind=engine)
    # tagDB.metadata.drop_all(bind=engine)
    # tagDB.metadata.create_all(bind=engine)

def init_items():
    session.execute(text("""
    INSERT INTO category (id, category_name) VALUES
        (1, 'こたつ'),
        (2, 'ねこ')
    """))
    session.commit()

    session.execute(text("""
    INSERT INTO items (id, item_name, description, category_id, price) VALUES
        (1, '緑のこたつ', 'あったかいこたつ', 1, 10),
        (2, '赤のこたつ', 'あったかいこたつ', 1, 10),
        (3, '青のこたつ', 'あったかいこたつ', 1, 10),
        (4, '黄のこたつ', 'あったかいこたつ', 1, 10),
        (5, '黄緑のこたつ', 'あったかいこたつ', 1, 10),
        (6, '緑のこたつ', 'こたつの中にねこがいます', 2,20),
        (7, '赤のこたつ', 'こたつの中にねこがいます', 2, 20),
        (8, '青のこたつ', 'こたつの中にねこがいます', 2, 20),
        (9, '黄のこたつ', 'こたつの中にねこがいます', 2, 20),
        (10, '黄緑のこたつ', 'こたつの中にねこがいます', 2, 20)
    """))
    session.commit()
    session.close()
    
if __name__ == "__main__":
    reset_database()
    init_items()
