from flask import request, jsonyfy

from app import app
from models import (
    Student,
    Worker,
    Match,
)
from schema import (
    student_schema,
    students_schema,
    worker_schema,
    workers_schema,
    match_schema,
    matches_schema,
)

@app.route("/api/login")
def login():
    # 優先度低い
    # セッション？
    def get():
        return jsonyfy({"user_id": "hoge"})
    def post():
        pass


@app.route("/api/auth", methods=["POST"])
def auth():
    # ユーザ登録を行う
    # get param
    req = request.json
    user_type = req["user_type"]

    # バイナリが来るか，URL が来るかで変わる
    if user_type == "student":
        user = Student(
            name=req["name"],
            date_of_birth=req["date_of_birth"],
            tel_number=req["tel_number"],
            email=["email"],
        )
    # TODO: ユーザ情報が全部載せ（テキスト，画像ファイル）で来る
    # TODO: 画像ファイルは AWS S3 にアップロードして URL を発行
    # TODO: 「登録完了した何か」を返す
    # 認証周りの話
    # - Cookie をテーブルで管理する？
    # - Cookie ヘッダを返す

    return jsonify({
        "id": "",
        "user_type": "",
        "is_logined": True,  # ログインは OK
        "is_authenticated": False,  # 本人確認等が終わってないので「認証ユーザではない」
    })


@app.route("/api/matching", methods=["GET"])
def matches_list(): # マッチ履歴と予定
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
        listener_id=current_user_id, is_done_meeting=False).all()
    done_mathches = Match.query.filter_by(
        listener_id=current_user_id, is_done_meeting=True).all()
    return matches_schema.jsonify(matches+done_mathches)

        



@app.route("/api/matching/apply", methods=["GET"])
def apply_match():  # 申し込み
    speaker_id = request.json['speaker_id']
    listener_id = request.json['listener_id']
    apply_comment = request.json['apply_comment']

    match = Match(speaker_id=speaker_id, listener_id=listener_id) # TODO:この書き方いいのか?
    db.session.add(match)
    db.session.commit()
    # TODO: speaker ID, listener ID, 相談内容を受け取る
    # TODO: メール送信する


@app.route("/api/matching/update", methods=["POST"])
def matching():
    def post():  # 重そう
        # TODO: match ID, 取得してis_matchedの更新
        # TODO: speaker ID, listener ID, 相談内容を受け取る
        # TODO: メール送信する
        # 


@app.route("/api/company")
def company():
    def get():
        # TODO: 会社名を GET で受け取る
        # TODO: 会社名が含まれていたらレコードを返す
        return [{}, {}]
    def post():
        # TODO: 会社 ID を POST? で受け取る
        # TODO: 会社の ID に一致する Worker を返す
        # ページング処理
        return [{}, {}]


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
# TODO: せいぜいモックくらい
###########################
@app.route("/api/payment")
def payment():
    def get():
        pass
    def post():
        pass



if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)
