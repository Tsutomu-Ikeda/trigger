import os


class Config:
    # SQLAlchemy
    SQLALCHEMY_DATABASE_URI = os.getenv("DB_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = bool(os.getenv("SQLALCHEMY_TRACK_MODIFICATIONS"))
    SQLALCHEMY_ECHO = bool(os.getenv("SQLALCHEMY_ECHO"))
