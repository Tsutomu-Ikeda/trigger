import os

from flask import Flask
from flask_migrate import Migrate

from models import db


def create_app():
    # flask config
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DB_URL")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = bool(
        os.getenv("SQLALCHEMY_TRACK_MODIFICATIONS")
    )
    app.config["SQLALCHEMY_ECHO"] = bool(os.getenv("SQLALCHEMY_ECHO"))
    app.secret_key = os.getenv("SESSION_SECRET_KEY")

    # DB config
    db.init_app(app)  # DB と Flask の接続部分
    migrate = Migrate(app, db)
    app_db = db

    return app, app_db


app, app_db = create_app()
