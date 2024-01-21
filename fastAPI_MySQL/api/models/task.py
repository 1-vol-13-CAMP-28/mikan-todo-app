from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from api.db import Base

class Task(Base):  # Base: テーブルの定義時に使用する基本モデル
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True)  # primary_key: この列がこのテーブルの主キー
    title = Column(String(1024))  # 左辺はカラム名。第一引数はカラム名の型

    done = relationship("Done", back_populates="task", cascade="delete")  # relationshipはデーブル同士の関係性。相互に参照可能。カスケードで他のDBの要素も消す

class Done(Base):
    __tablename__ = "dones"

    id = Column(Integer, ForeignKey("tasks.id"), primary_key=True)  # ForeignKeyは外部キー。親テーブルに存在しない値を登録したらエラー。

    task = relationship("Task", back_populates="done")  # back_populatesには　テーブル名を指定