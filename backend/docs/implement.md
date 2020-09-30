# 就活・転職における企業情報の共有：フロー

- [HackMD: 就活・転職における企業情報の共有](https://hackmd.io/kAtU11I2R0eCzjU2HWDjwg)

## 登場人物

- 運営
    - オペレータ
- 学生：聞き手
- 社会人：話し手

## フロー

1. ホームページに来る
2. ユーザ登録
  2-1. ユーザ情報を登録画面で入力
  2-2. ユーザ情報を送信
3. ユーザ認証
  3-1. 登録後，新規登録者の情報をオペレータに通知
  3-2. オペレータが新規登録者の情報を確認
    - 学生：入力内容，学生証，本人確認書類を確認
    - 社会人：本人確認加え，（Eight や各種 SNS などの 3rd パーティ製ツール等で）企業の所属を確認
  3-3. 確認できたら認可
  3-4. ユーザへ認可されたことを通知
4. 認証ユーザとなる（特に社会人側には重要）
5. アプリの機能を使用する
    - 学生
        - 企業名等で話を聞きたい人を検索
        - 話を聞きたい人を選ぶ -> 確定
        - 社会人に通知される
    - 社会人
        - 自分の所属，話せる内容，料金設定などをプロフィールに書いておく
        - 通知が来る
        - 通話する日程を決める（当事者同士でメッセージ？）
    - 通話する（料金先払い，後払い？）
    - 通話後，料金の支払い，学生が社会人の評価などをして終了
        - マージンをもらう

## 実装

パスプリフィックス `/api`パスプリフィックス `/api`

- REST API
    - users/[students or ]
        - GET: 検索画面
        - POST: 登録時
        - 認証・認可含める？
        - 学生が投げる検索クエリはここ
    - messages/
        - パフォーマンスが要求される Amazon Chime に一任させた方が考えず済む
        - GET: マッチングに紐づく DM 一覧取得
        - POST: DM の送信
        - 話したい人を確定させたとき，どんな内容を話したいか？を学生が DM で送信するようにする
        - あくまでも匿名性と日程調整という用途を重視．DM に期限切れを作って定期的に消去
    - matching/
        - GET: マッチング（既に会話が終わった音声）を一覧取得
        - POST: 申し込みを確定したときに新しく matching レコードを作成
    - tell/
        - POST: 日程，speaker/listerner 情報を POST して URL を発行する
            - Amazon Chime
    - 決済/
        - すり合わせ
- DB
    - users
        - 名前
        - ...
        - （point，アプリ内通貨）
        - is_authenticated
        - 学生か社会人か
        - 所属（univかco を参照）
        - 通知数
    - universities
        - 大学名
        - ...
    - companies
        - 会社名
        - ...
        - 部署，職種は busho, jobs を参照する
    - messages（ユーザ同士の DM）
        - speaker
        - listener
        - 送信者フラグ
        - text
        - matching_id(matching テーブルを参照)
    - busho
    - jobs
    - matching
        - id
        - speaker
        - listener
        - date
        - fee（料金）を参照
        - S3 のリンク
    - fee
        - id
        - speaker がもらった金額
        - listener が払った金額
        - (会社の収益を管理するためのテーブルを作るかどうか)

## システムアーキテクチャ

- バックエンド アーキテクチャ図
  - [ver1 プロトタイプ](https://drive.google.com/file/d/1Kj5mYoOMQD8WEqyXnG8yxAL62fY40cDR/view?usp=sharing)

## すり合わせしたい点

- 決済 API
    - 現金，ポイントについて
    - 会社の収益の管理はどうするか

Stripe 一点

## 実装の方針

- テーブル定義とフロントからリクエスト
- 最低限切り分け
- issue ベースでブランチを切って実装

### 画面ごとのエンドポイント

- ユーザ登録画面: /users POST
    return cookie
- ログイン画面: /login POST
    - メールアドレス
    - パスワード
- マッチング画面:
    - 会社絞り込み
      -> /companies GET
      -> /users [会社 ID] POST
    - 社員一覧表示
      -> 社員選択 /users [listener の user ID, speaker の user ID] POST
        - POST が来たら
          - マッチングの生成 matching
          - 通知（like） 現在の送られているリクエスト数をインクリメント
          - メール送信する
      -> リクエストを送信しました
- マッチング後の DM
  - 直接実装 or Amazon Chime で
