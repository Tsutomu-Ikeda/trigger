from sqlalchemy.dialects.mysql import INTEGER as Integer
from sqlalchemy.dialects.mysql import TINYINT as Tinyint
from sqlalchemy.dialects.mysql import TIMESTAMP as Timestamp
from sqlalchemy.types import DateTime
from datetime import datetime

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Students(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    date_of_birth = db.Column(db.DateTime, unique=False, nullable=False)
    tel_number = db.Column(db.String(11), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    passowrd = db.Column(db.String, unique=False, nullable=False)
    # certificate_id =  照明
    user_type = db.Column(db.String, unique=False, nullable=False)
    affiliation = db.relationship(
        "Universities", backref="person", lazy=True
    )  # 所属, TODO relation の整備
    is_authenticated = db.Column(
        db.Boolean, unique=False, nullable=False, default=False
    )
    type_card = db.Column(db.String, unique=True, nullable=True)
    identity_card = db.Column(db.String, unique=True, nullable=True)
    created_at = db.Column(
        Timestamp, unique=False, nullable=False, default=datetime.utcnow
    )
    cupdated_at = db.Column(
        Timestamp, unique=False, nullable=False, default=datetime.utcnow
    )


class Workers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    date_of_birth = db.Column(db.DateTime, unique=False, nullable=False)
    tel_number = db.Column(db.String(11), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    passowrd = db.Column(db.String, unique=False, nullable=False)
    # certificate_id =  照明
    user_type = db.Column(db.String, unique=False, nullable=False)
    # affiliation = db.relationship(
    #     "Companies", backref="person", lazy=True
    # )  # 所属, TODO relation の整備
    # job = (
    #     "Jobs", backref="person", lazy=True
    # )  # TODO relation の整備
    # department = (
    #     "Departments", backref="person", lazy=True
    # )  # 部署, TODO relation の整備
    # position = (
    #     "Positions", backref="person", lazy=True
    # )  # 役職, TODO relation の整備
    is_authenticated = db.Column(
        db.Boolean, unique=False, nullable=False, default=False
    )
    type_card = db.Column(db.String, unique=True, nullable=True)
    identity_card = db.Column(db.String, unique=True, nullable=True)
    created_at = db.Column(
        Timestamp, unique=False, nullable=False, default=datetime.utcnow
    )
    cupdated_at = db.Column(
        Timestamp, unique=False, nullable=False, default=datetime.utcnow
    )


class Universities(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)


class Companies(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)