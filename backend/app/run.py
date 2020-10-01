import os
from datetime import datetime

from functools import wraps
from flask import abort, jsonify, request, session
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


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get("user_id"):
            abort(401)
        return f(*args, **kwargs)
    return decorated_function


@app.route("/api/healthcheck", methods=["GET"])
def healthchek():
    return jsonify({"status": "ok"})


@app.route("/api/register", methods=["POST"])
@swag_from("swagger/register.yml")
def register():
    # ユーザ登録
    # extract user data
    req = request.json
    email = req["email"]
    password_hash = generate_password_hash(req["password"])
    affiliation_id = req["affiliation_id"]  # 文字列が送られてくることを想定
    affiliation_name = req["affiliation_name"]

    user_dict = {
        "name": req["name"],
        "date_of_birth": datetime.strptime(req["date_of_birth"], "%Y/%m/%d"),
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
        university = University.query.get(affiliation_id)
        user_dict.update({"affiliation_id": university.id})
        user = Student(**user_dict)
    else:
        # Company はユーザが入力する部分．テーブルに無ければ作成する
        company = Company.query.filter_by(id=affiliation_id).first()
        if not company:
            # Company を新規作成
            company = Company(name=affiliation_name)
            db.session.add(company)

        worker_dict = {
            "affiliation_id": company.id,
            "job_id": req["job_id"],
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

    # FIXME 本当は Student と Worker 両方使わずに User のみで検索したい
    student = Student.query.filter_by(email=email).first()
    worker = Worker.query.filter_by(email=email).first()

    if (not student) and (not worker):
        # Email が DB に存在しない
        return {"is_logined": False, "id": "", "user_type": "", "message": "ユーザが存在しません"}, 401
    else:
        user = student if student else worker
        # パスワードのチェック
        if check_password_hash(user, password):
            # ログイン成功
            response = jsonify(
                {
                    "user_id": user.id,
                    "user_type": user.user_type,
                    "message": "ログインに成功しました",
                }
            )
            response.set_cookie(key="user_id", value=user.id)
            session["user_id"] = user.id
            return response
        else:
            # ログイン失敗
            response = jsonify(
                {"user_id": "", "user_type": "", "message": "パスワードが間違っています"}
            )
            return response, 401


@app.route("/api/logout", methods=["GET"])
def logout():
    session.clear()
    return {"message": "ログアウトしました"}


@app.route("/api/matching", methods=["GET"])
@login_required
def matches_list():  # マッチ履歴と予定
    # 「予定」と「終わった」マッチングを返す is_done_payment

    # TODO:所属返すのどうするか（必要機能か？）
    user_id = session["user_id"]
    will_matches = Match.query.filter_by(
        listener_id=user_id, is_done_meeting=False
    ).all()
    done_matches = Match.query.filter_by(
        listener_id=user_id, is_done_meeting=True
    ).all()

    response_will = matches_schema.jsonify(will_matches)
    response_done = matches_schema.jsonify(done_matches)
    will_list = response_will.json
    done_list = response_done.json

    return jsonify({"will_matches": will_list, "done_mathes": done_list})
    # return workers_schema.jsonify(will_matches, "done_matches": workers_schema.jsonify(done_matches)}
    # return workers_schema.jsonify(will_matches, done_matches)


@app.route("/api/matching/apply", methods=["POST"])
@login_required
def apply_match():
    # 面談申し込み
    # listener 学生
    # speaker 社会人
    speaker_id = request.json["speaker_id"]
    listener_id = session.get("user_id")
    apply_comment = request.json["apply_comment"]

    match = Match(
        speaker_id=speaker_id,
        listener_id=listener_id,
        date=None,
        is_done_payment=None,
        is_done_meeting=None,
        is_matched=None,
    )
    db.session.add(match)
    db.session.commit()
    # TODO: メール送信する

    return {"message": "マッチングの申し込みが完了しました", "id": match.id}


@app.route("/api/matching/update", methods=["POST"])
@login_required
def matching():
    # マッチング状況の更新
    match_id = request.json["match_id"]
    is_matched = request.json["is_matched"]
    is_done_meeting = request.json["is_done_meeting"]

    # match = Match.query.get(match_id)

    Match.query.filter_by(id=match_id).update(
        {Match.is_matched: is_matched, Match.is_done_meeting: is_done_meeting}
    )
    # TODO: メール送信する

    return {"message": "マッチングを更新しました"}


@app.route("/api/company/search", methods=["GET"])
@login_required
def search_companies():
    # 会社検索のエンドポイント
    query = request.args["q"]
    company_models = Company.query.filter(Company.name.ilike(f"%{query}%")).all()

    response = companies_schema.jsonify(company_models)
    company_list = response.json
    return {
        "query": query,
        "num_companies": len(company_list),
        "companies": company_list,
    }


@app.route("/api/company/<company_id>", methods=["GET"])
@login_required
def company(company_id):
    # 特定の会社の相談者を全て表示する
    company = Company.query.get(company_id)
    worker_models = Worker.query.filter_by(affiliation_id=company_id).all()

    response = workers_schema.jsonify(worker_models)
    worker_list = response.json
    return jsonify(
        {
            "company_id": company_id,
            "company_name": company.name,
            "num_workers": len(worker_list),
            "workers": worker_list,
        }
    )


@app.route("/api/worker/<worker_id>", methods=["GET"])
@login_required
def get_worker(worker_id):
    # 特定の会社の相談者を全て表示する
    worker = Worker.query.get(worker_id)

    return jsonify({
        "id": worker.id,
        "job": {
            "name": worker.job.name,
        },
        "company": {
            "name": worker.company.name,
        },
        "comment": worker.comment,
        "is_authenticated": worker.is_authenticated,
    })


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
