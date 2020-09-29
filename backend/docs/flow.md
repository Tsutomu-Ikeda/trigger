# バックエンド

## DB 設計

- users ユーザ
    - id: int
    - name: str 名前 (*)
    - date_of_birth: datetime 生年月日 (*)
    - phone_number: str 電話番号 (*)
    - email: str メールアドレス (*)
    - certificate_id: str
        - 外部キー：certificates
    - type: str タイプ（student か company を参照）
    - affiliation 所属 (*)
      - 外部キー：companies, university
    - job 仕事内容（*）
      - 外部キー：jobs
    - department 部署
    - position 役職
    - is_authenticated 認証フラグ（本人確認書類で認可されたか）
    - notifications 通知数
    - 制約
        - notifications は正．
- certificates 本人確認書類の写真
    - id
    - type_card: str 学生なら学生証，会社員なら名刺 S3 の URL
    - identity_card: str 保険証，免許証
- universities
    - id: int
    - name: str 大学名
- companies
    - id: int
    - name: str 会社名
    - [MVP ではない] 職種：jobs
    - [MVP ではない] 部署：departments を参照する
- [MVP] departments
- jobs
    - id: int
    - name: str （選択肢を固定しておく：エンジニア，総合職，研究職）
- matching
    - id: int
    - speaker
      - 外部キー users の ID
    - listener:
      - 外部キー users の ID
    - date: datetime
    - meeting_length: int ミーティングの長さ
    - audio_url: str S3 のリンク
    - is_done_meeting: bool
    - is_done_payment: bool
    - 制約
        - speaker は必ず users.type=company
        - linstener は必ず users.type=student

<!--
Amazon Chime がどうかによる．メッセージとか全部押しつけられるなら押しつけたい．
Amazon Chime がユーザ同士のメッセージをどうやってやりとりするか（Meeting ID に紐づいて勝手にメッセージを管理してくれる，とか）
DB
- messages（ユーザ同士の DM）
    - speaker
    - listener
    - 送信者フラグ
    - text
    - matching_id(matching テーブルを参照)

API
- messages/
    - パフォーマンスが要求される Amazon Chime に一任させた方が考えず済む
    - GET: マッチングに紐づく DM 一覧取得
    - POST: DM の送信
    - 話したい人を確定させたとき，どんな内容を話したいか？を学生が DM で送信するようにする
    - あくまでも匿名性と日程調整という用途を重視．DM に期限切れを作って定期的に消去
-->

## API 設計

パスプリフィックス `/api`

- /users
- /matching
- /meeting
- （実装詰めてない）/payment Stripe で実装
- （実装詰めてない）/messages
    - Amazon Chime が使えれば必要ない

### /users

- POST: `/users?`

レスポンス

```
```

    - GET: 検索画面
    - POST: 登録時
    - 認証・認可含める？
    - 学生が投げる検索クエリはここ
## /matching
    - GET: マッチング（既に会話が終わった音声へのリンクを含め）を一覧取得
    - POST: 申し込みを確定したときに新しく matching レコードを作成
- meeting/
    - POST: 日程，speaker/listerner 情報を POST して URL を発行する
        - Amazon Chime
- 決済/
    - すり合わせ

## フロントエンドとバックエンドのやりとり

## issue の切り分け

