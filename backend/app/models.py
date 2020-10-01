import os
from datetime import datetime

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.mysql import INTEGER as Integer
from sqlalchemy.dialects.mysql import TINYINT as Tinyint
from sqlalchemy.dialects.mysql import TIMESTAMP as Timestamp
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.types import DateTime

from database import TestSQLAlchemy


# ほんとは上手く分離できるはずだけど時間ないから仕方ない（本来ここにテストかどうかを書くべきでない）
is_test = bool(os.getenv("IS_TEST"))
db = SQLAlchemy() if not is_test else TestSQLAlchemy()


class User(db.Model):
    __abstract__ = True  # this model should not be created in the database

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    date_of_birth = db.Column(db.DateTime, unique=False, nullable=False)
    tel_number = db.Column(db.String(11), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), unique=False, nullable=False)
    user_type = db.Column(db.String(20), unique=False, nullable=False)

    # 本人確認関連：オペーレータがチェックする
    # FIXME: URL じゃなくて UUID が送られてくるかもしれない
    type_card_url = db.Column(db.String(120), unique=True, nullable=True)
    identity_card_url = db.Column(db.String(120), unique=True, nullable=True)
    is_authenticated = db.Column(
        db.Boolean, unique=False, nullable=False, default=False
    )  # オペレータがチェックしたら「認証済みユーザ」となる

    # その他
    created_at = db.Column(
        Timestamp, unique=False, nullable=False, default=datetime.utcnow
    )
    updated_at = db.Column(
        Timestamp, unique=False, nullable=False, default=datetime.utcnow
    )


class Student(User):
    __tablename__ = "students"

    affiliation_id = db.Column(db.Integer, db.ForeignKey("universities.id"))


class Worker(User):
    __tablename__ = "workers"

    affiliation_id = db.Column(db.Integer, db.ForeignKey("companies.id"))
    department = db.Column(db.String(120), unique=False, nullable=True)
    position = db.Column(db.String(120), unique=False, nullable=True)
    job = db.Column(db.Integer, db.ForeignKey("jobs.id"))
    comment = db.Column(db.String(80), unique=False, nullable=True)

    def __init__(self, username, email):
        self.username = username
        self.email = email


class University(db.Model):
    __tablename__ = "universities"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)


class Company(db.Model):
    __tablename__ = "companies"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)


class Job(db.Model):
    __tablename__ = "jobs"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)


class Match(db.Model):
    __tablename__ = "matches"

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, unique=False, nullable=True)
    speaker_id = db.Column(db.Integer, db.ForeignKey("workers.id"))
    listener_id = db.Column(db.Integer, db.ForeignKey("students.id"))
    meeting_length = db.Column(db.Integer)
    audio_url = db.Column(db.String(120), unique=True, nullable=True)
    is_matched = db.Column(db.Boolean, unique=False, nullable=True)
    is_done_meeting = db.Column(db.Boolean, unique=False, nullable=True, default=False)
    is_done_payment = db.Column(db.Boolean, unique=False, nullable=True, default=False)

    def __init__(
        self,
        id,
        name,
        speaker_id,
        listener_id,
        is_matched,
        is_done_meeting,
        is_done_payment,
    ):
        self.id = id
        self.name = name
        self.speaker_id = speaker_id
        self.listener_id = listener_id
        self.is_matched = is_matched
        self.is_done_meeting = is_done_meeting
        self.is_done_payment = is_done_payment
