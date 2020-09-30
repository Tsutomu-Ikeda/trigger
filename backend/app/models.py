from sqlalchemy.dialects.mysql import INTEGER as Integer
from sqlalchemy.dialects.mysql import TINYINT as Tinyint
from sqlalchemy.dialects.mysql import TIMESTAMP as Timestamp
from sqlalchemy.types import DateTime
from datetime import datetime

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.declarative import declarative_base

db = SQLAlchemy()
Base = declarative_base()


class Student(Base):
    __tablename__ = "students"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    date_of_birth = db.Column(db.DateTime, unique=False, nullable=False)
    tel_number = db.Column(db.String(11), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    passowrd = db.Column(db.String(120), unique=False, nullable=False)
    certificate_url = db.Column(db.String(120), unique=True, nullable=False)  # 照明
    user_type = db.Column(db.String(20), unique=False, nullable=False)
    # affiliation = db.relationship(
    #     "Universities", backref="students", lazy=True
    # )  # 所属, TODO relation の整備
    affiliation_id = db.Column(db.Integer, db.ForeignKey("universities.id"))
    is_authenticated = db.Column(
        db.Boolean, unique=False, nullable=False, default=False
    )
    type_card = db.Column(db.String(120), unique=True, nullable=True)
    identity_card = db.Column(db.String(120), unique=True, nullable=True)
    created_at = db.Column(
        Timestamp, unique=False, nullable=False, default=datetime.utcnow
    )
    cupdated_at = db.Column(
        Timestamp, unique=False, nullable=False, default=datetime.utcnow
    )


class Worker(Base):
    __tablename__ = "workers"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    date_of_birth = db.Column(db.DateTime, unique=False, nullable=False)
    tel_number = db.Column(db.String(11), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    passowrd = db.Column(db.String(120), unique=False, nullable=False)
    certificate_url = db.Column(db.String(120), unique=True, nullable=False)  # 照明
    user_type = db.Column(db.String(20), unique=False, nullable=False)
    # affiliation = db.relationship(
    #     "Companies", backref="workers", lazy=True
    # )  # 所属, TODO relation の整備
    affiliation_id = db.Column(db.Integer, db.ForeignKey("companies.id"))
    # job = db.relationship("Jobs", backref="workers", lazy=True)  # TODO relation の整備
    job = db.Column(db.Integer, db.ForeignKey("jobs.id"))
    # department = db.relationship(
    #     "Departments", backref="workers", lazy=True
    # )  # 部署, TODO relation の整備
    # position = db.relationship(
    #     "Positions", backref="workers", lazy=True
    # )  # 役職, TODO relation の整備
    department = db.Column(db.String(120), unique=False, nullable=True)
    postions = db.Column(db.String(120), unique=False, nullable=True)
    is_authenticated = db.Column(
        db.Boolean, unique=False, nullable=False, default=False
    )
    type_card = db.Column(db.String(120), unique=True, nullable=True)
    identity_card = db.Column(db.String(120), unique=True, nullable=True)
    created_at = db.Column(
        Timestamp, unique=False, nullable=False, default=datetime.utcnow
    )
    cupdated_at = db.Column(
        Timestamp, unique=False, nullable=False, default=datetime.utcnow
    )
    comment = db.Column(db.String(80), unique=False, nullable=True)


class University(Base):
    __tablename__ = "universities"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)


class Company(Base):
    __tablename__ = "companies"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)


class Job(Base):
    __tablename__ = "jobs"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)


class Match(Base):
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
