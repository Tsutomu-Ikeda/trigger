import os
from datetime import date

import pytest
import requests

import models
from app import app, app_db


API_ROOT = "http://nginx:80/api"  # nginx はコンテナ名


@pytest.fixture(scope="function", autouse=True)
def db_rollback():
    # create app context
    app.app_context().push()

    yield

    # テスト関数毎に rollback() メソッドを実行する
    app_db.session.rollback()


class TestHealthCheck:

    PATH = "/healthcheck"
    URL = API_ROOT + PATH

    def test(self):
        req = requests.get(url=self.URL)
        res = req.json()
        assert res == {"status": "ok"}


class TestRegister:

    """ ユーザ登録のテスト """

    PATH = "/register"
    URL = API_ROOT + PATH

    def test_register_student(self):
        method = "POST"
        payload = {
            "name": "okuwaki",
            "date_of_birth": "20210331",
            "date_of_birth": date(2021, 3, 31).strftime("%Y%m%d"),
            "tel_number": "08012345678",
            "email": "yskbsk13@gmail.com",
            "password": "password",
            "user_type": "student",
            "type_card_url": "hoge.s3-aws.com",  # FIXME: S3 上の一意なファイル名になるかも
            "identity_card_url": "hogehoge.s3-aws.com",  # FIXME: S3 上の一意なファイル名になるかも
            "affiliation": "B 大学",
        }
        headers = {"Content-Type": "application/json"}

        # 1 回目のリクエスト：登録成功
        res_success = requests.post(url=self.URL, json=payload, headers=headers)
        res_json = res_success.json()
        print(res_json["message"])
        assert res_json["is_logined"] == True

    def test_register_worker(self):
        pass


class TestLogin:
    """ ユーザ登録のテスト """

    PATH = "/register"
    URL = API_ROOT + PATH

    # def test_register_student(self):
    #     method = "POST"
    #     payload = {
    #         "name": "okuwaki",
    #         "date_of_birth": "20210331",
    #         # "date_of_birth": date(2021, 3, 31),
    #         "tel_number": "08012345678",
    #         "email": "yskbsk13@gmail.com",
    #         "password": "password",
    #         "user_type": "student",
    #         "type_card_url": "hoge.s3-aws.com",  # FIXME: S3 上の一意なファイル名になるかも
    #         "identity_card_url": "hogehoge.s3-aws.com",  # FIXME: S3 上の一意なファイル名になるかも
    #         "affiliation": "B 大学",
    #     }
    #     headers = {"Content-Type": "application/json"}

    #     # 1 回目のリクエスト：登録成功
    #     res_success = requests.post(url=self.URL, json=payload, headers=headers)
    #     res_json = res_success.json()
    #     print(res_json["message"])
    #     assert res_json["is_logined"] == True

    # def test_register_worker(self):
    #     pass

