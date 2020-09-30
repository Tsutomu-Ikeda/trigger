import os

from flask import Flask

from database import init_db


def create_app():
    # flask config
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DB_URL")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = bool(
        os.getenv("SQLALCHEMY_TRACK_MODIFICATIONS")
    )
    app.config["SQLALCHEMY_ECHO"] = bool(os.getenv("SQLALCHEMY_ECHO"))

    import models

    # init DB
    init_db(app)

    return app


app = create_app()
