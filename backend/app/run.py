import os

from flask import jsonify, request, session
from flasgger import swag_from, Swagger

from app import app
from models import (
    db,
    Company,
    Match,
    Student,
    University,
    User,
    Worker,
)
from schema import (
    student_schema,
    students_schema,
    worker_schema,
    workers_schema,
    university_schema,
    universities_schema,
    company_schema,
    companies_schema,
    match_schema,
    matches_schema,
)
from utils import check_password_hash, generate_password_hash


if not bool(os.getenv("IS_TEST")):
    # テスト環境では表示しない
    swagger = Swagger(app)


@app.route("/api/healthcheck", methods=["GET"])
def healthchek():
    return jsonify({"status": "ok"})


@app.route("/api/register", methods=["POST"])
@swag_from("swagger/register.yml")
def register():
    # ユーザ登録
    # extract body
    req = request.json
    email = req["email"]
    password_hash = generate_password_hash(req["password"])
    affiliation_name = req["affiliation"]  # 文字列が送られてくることを想定
    user_dict = {
        "name": req["name"],
        "date_of_birth": req["date_of_birth"],
        "tel_number": req["tel_number"],
        "email": req["email"],
        "password_hash": password_hash,
        "user_type": req["user_type"],
        "type_card_url": req["type_card_url"],  # FIXME: S3 上の一意なファイル名になるかも
        "identity_card_url": req["identity_card_url"],  # FIXME: S3 上の一意なファイル名になるかも
        "is_authenticated": False,  # オペレータがチェックしたら True になる
    }

    # email の照合
    # FIXME: 本当は Users やビューを使って一括でクエリを実行したい
    students_same_email = Student.query.filter_by(email=email).first()
    workers_same_email = Worker.query.filter_by(email=email).first()

    if students_same_email or workers_same_email:
        # 同じ Email アドレスが存在するためログイン失敗
        return jsonify(
            {
                "is_logined": False,
                "user_id": "",
                "is_authenticated": False,  # 本人確認等が終わってないので「認証ユーザではない」
                "message": "ユーザ登録に失敗しました．同じ Email アドレスが既に登録されています．",
            }
        )

    if user_dict["user_type"] == "student":
        # TODO: University はあらかじめ DB 側に固定されてユーザが登録側で選択できる想定
        # TODO: DB に入れておく必要がある
        university = University.query.filter_by(name=affiliation_name).first()
        user_dict.update({"affiliation_id": university.id})
        user = Student(**user_dict)
    else:
        # Company はユーザが入力する部分．テーブルに無ければ作成する
        company = Company.query.filter_by(name=affiliation_name).first()
        if not company:
            # Company を新規作成
            company = Company(name=affiliation_name)
            db.session.add(company)

        worker_dict = {
            "affiliation_id": company.id,
            "job": req["job"],
            "department": req["department"],
            "position": req["position"],
            "comment": req["comment"],
        }
        user_dict.update(worker_dict)
        user = Worker(**user_dict)

    db.session.add(user)
    db.session.commit()

    # 認証周りの話
    response = jsonify(
        {
            "is_logined": True,  # ログインは OK
            "user_id": user.id,
            "is_authenticated": False,  # 本人確認等が終わってないので「認証ユーザではない」
            "message": "ユーザ登録に成功しました",
        }
    )
    response.set_cookie(key="user_id", value=user.id, expires=None)

    return response


@app.route("/api/login", methods=["POST"])
@swag_from("swagger/login.yml")
def login():
    # ログイン
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter(User.email == email).first()

    if not user:
        # ユーザが存在しない
        return {"is_logined": False, "id": "", "user_type": ""}
    else:
        is_logined = check_password_hash(user, password)
        response = jsonify(
            {"is_logined": is_logined, "user_id": user.id, "user_type": user.user_type}
        )
        response.set_cookie(key="user_id", value=user.id, expires=None)

        return response


@app.route("/api/logout", methods=["GET"])
def logout():
    session.clear()
    return {"message": "ログアウトしました"}


@app.route("/api/matching", methods=["GET"])
def matches_list():  # マッチ履歴と予定
    # http://hoge.com?key=value&key2=value2
    # value = request.args['key']
    # value2 = request.args['key2']
    # return jsonyfy({"user_id": "hoge"})
    # 全てのマッチングを引っ張る
    # TODO: speaker,listennerのIDを受け取る
    # TODO: ユーザのマッチングを返す
    # TODO: 「予定」と「終わった」マッチングを返す is_done_payment

    # TODO:所属返すのどうするか（必要機能か？）
    mathches = Match.query.filter_by(
        listener_id=current_user_id, is_done_meeting=False
    ).all()
    done_mathches = Match.query.filter_by(
        listener_id=current_user_id, is_done_meeting=True
    ).all()
    return matches_schema.jsonify(matches + done_mathches)


@app.route("/api/matching/apply", methods=["GET"])
def apply_match():  # 申し込み
    speaker_id = request.json["speaker_id"]
    listener_id = request.json["listener_id"]
    apply_comment = request.json["apply_comment"]

    match = Match(speaker_id=speaker_id, listener_id=listener_id)  # TODO:この書き方いいのか?
    db.session.add(match)
    db.session.commit()
    # TODO: speaker ID, listener ID, 相談内容を受け取る
    # TODO: メール送信する


@app.route("/api/matching/update", methods=["POST"])
def matching(type):
    # 1. Match レコードの作成
    # TODO: 2. マッチング確定
    # TODO: is_matched を True にする
    # TODO: マッチング ID と日程が POST される
    # TODO: 確定した日程等の情報をメールで送信
    # TODO: 3. ミーティング終了
    # TODO: ミーティングの情報が送信されてくる
    # TODO: is_done_meeting を True にする
    pass


@app.route("/api/company/search", methods=["GET"])
def search_companies():
    # 会社検索のエンドポイント
    company_name = request.args["q"]
    companies = Company.query.filter(Company.name.ilike(company_name)).all()

    return companies_schema.jsonify(companies)


@app.route("/api/company/<comapany_id>", methods=["POST"])
def company(company_id):
    workers = Worker.query.filter_by(affiliation_id=company_id)

    return workers_schema.jsonify(workers)


###########################
# Amazon Chime 関連
# TODO: DM（マッチング前の調整）のやりとり
# TODO: DM & 音声（マッチング）
###########################


@app.route("/api/call")
def hoge():
    def get():
        pass

    def post():
        pass


###########################
# 金融 Stripe の決済基盤
###########################


@app.route("/api/payment", methods=["POST"])
def payment():
    # matching ID を受け取って完了にする
    pass


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)
