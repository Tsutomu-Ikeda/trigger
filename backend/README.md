# バックエンド

- アプリケーションの起動
- API ドキュメント
- 環境構築

## アプリケーションの起動

### basic

- **MUST**：`.env.dev` ファイルを用意
- Docker Compose でコンテナを起動

```sh
$ docker-compose up
```

### 環境の初期化

- DB，app 共にまっさらな状態でアプリを起動したい時の手順
  - コンフリクトなどでマイグレーションの整合性が合わなくなる可能性があるので，そのときはローカルの Docker 環境を初期化する
  - **永続化した DB の初期化をするので，本番データでは絶対やっちゃだめ**（今回は実際に運用しないから関係ないけど）

```sh
$ cd backend

# 1. (MUST) DB の初期化（永続化の消去，db コンテナのビルド）
$ sh build-db.sh
$ docker-compose build
$ docker-compose up

# 2. マイグレーション情報の初期化
# 別のターミナルから flask shell に入る
$ docker-compose exec app bash
# 以下，app コンテナ内
$ rm -rf migrations
$ sh init-db.sh  # flask db init -> flask db migrate -> flask db upgrade

# 3. DB へのモックデータの挿入
$ flask shell
# 以下，ipython
In [1]: %run init-mock-db.py
```

## DB 関連

### マイグレーション

参考：[Flask-Migrate に関して自分の言葉で(Qiita, 2019/06)](https://qiita.com/KI1208/items/2581ed6f211a2d73e5fd)

#### DB 初期化時

DB 初期化時（または DB の設定を全部リセットしたくなった時の最終手段として）実行するコマンド

- 処理内容
  - まず，flask のシェルに入ってテーブルの作成
  - `migrations` ディレクトリの作成
  - マイグレーション用スクリプトの生成

```sh
$ docker-compose exec app bash

# コンテナ内
# migrations ディレクトリがあれば，"rm -rf migrations"
$ flask shell
>>> from database import db
>>> db.create_all()  # DB コンテナに入るとテーブルが確認できる
>>> exit
$ flask db init  # テーブル作成後，マイグレーションの設定
$ flask db migrate
```

#### 初回以降

初回以降，つまり，モデル（`models.py`）更新時に実行するコマンド

- マイグレーションの実行
- モデル（`models.py`）の更新を反映

```sh
$ flask db migrate  # field の変更を検知
$ flask db upgrade  # 更新
```

### DB の操作

#### SQLAlchemy を利用して Python シェルから DB を操作

`app` コンテナに入る．

```sh
$ docker compose up  # 起動中の場合，実行しなくて良い
$ docker-compose exec app bash

# db コンテナ内
$ flask shell
>>> from models import Worker
...
```

#### MySQL のコンソールで直接 DB を操作

`db` コンテナに入る．

```sh
$ docker compose up  # 起動中の場合，実行しなくて良い
$ docker-compose exec db mysql -uroot -ppassword

# db コンテナ内
mysql> show databases;  # SQL が実行できる
mysql> show tables;
...
```

---

## API ドキュメント

- パスプレフィックス `/api`
- エンドポイント
  - `/register`
  - `/login`
  - `/logout`
  - `/matching`
  - `/company`
  - `/call`
  - `/payment`

### /register

ユーザ登録

#### GET

None

#### POST

ユーザ情報を受け取り，ログイン情報を返す．

- request

```json
{
  "name": "ぶっちゃけ　たろう",
  "email": "buttyake@example.com",
  "date_of_barth": "2020,10,2,10,00",
  "tel_number": "00000000",
  "password": "password",
  "user_type": "worker",
  "affilication_id": "UUID",
  "affilication_name": "デジハリ大学",
  "type_card_url": "buttyake.type.s3",
  "identity_card_url": "buttyake.id.s3",
  "is_authenticated": 0
}
```

- response

```json
{
  "is_logined": true, // true | false
  "user_id": "UUID",
  "is_authenticated": false, // 本人確認等が終わってないので「認証ユーザ」ではない
  "message": "ユーザ登録に失敗しました．同じ Email アドレスが既に登録されています．"
}
```

### /login

ログイン

#### GET

None

#### POST

Email アドレスとパスワードを受け取り，ユーザ ID を返す．

- request

```json
{
  "email": "buttyake@sample.com", // string
  "password": "buttyake-password" // int
}
```

- response

```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000", // UUID: string
  "user_type": "student" | "worker", // string
  "message": "ログインに成功しました" // string
}
```

### /logout

ログアウト

#### GET

セッションを切り，ログアウトする．

- request
  - parameter
    - None
- response

```json
{
  "message": "ログアウトしました" // string
}
```

#### POST

None

### /matching

#### GET

ユーザの現在のマッチング一覧を返す（ユーザ ID はフロントから渡されない？セッションから受け取る？）

- request
  - parameter
    - None
- response

```json
{
  "done_mathes": [],
  "will_matches": [
    {
      "id": "022818c2-8a6d-4572-896d-aa38bb2fd575",
      "is_done_meeting": false,
      "is_done_payment": false,
      "is_matched": true,
      "listener_id": "57c4e455-314a-46ea-9f42-90f1b69cc4f0",
      "speaker_id": "a0334571-4583-4f4a-99dd-7bf8fb608685"
    },
    {
      "id": "ca2aa9c0-2e62-4869-9c69-e44733b62869",
      "is_done_meeting": false,
      "is_done_payment": false,
      "is_matched": false,
      "listener_id": "57c4e455-314a-46ea-9f42-90f1b69cc4f0",
      "speaker_id": "26d7ddf5-7e81-4b79-b2eb-a14b11bc3548"
    }
  ]
}
```

#### POST

None

#### /matching/apply

##### GET

None

##### POST

- request

```json
{
  "seapker_id": "UUID", // 相談役のユーザ ID
  "listener_id": "UUID", // 相談者のユーザ ID
  "apply_comment": "就活の闇を包み隠さず教えてください" // 相談者が申請時に入力するコメント
}
```

- response

```json
{
  "message": "マッチングの申し込みが完了しました" // string
}
```

#### /matching/update

マッチングの内容を更新する．

#### GET

None

#### POST

- request

```json
{
  "match_id": "UUID",  // UUID
  "is_matched": true,  // boolean
  "is_done_meeting": true,  // boolean
}'
```

- response

```json
{
  "message": "マッチングを更新しました" // string
}
```

### /company

企業のデータ関連

#### /company/search

##### GET

検索クエリでフィルタリングされた企業のリストを返す．

- request
  - パス：`/api/company/search?q=searchquery`
  - parameter
    - `q`：検索クエリ
- response

```json
{
  "query": "Sansan", // string
  "num_companies": 24,  // int
  "companies": [
    {
      "user_id": "550e8400-e29b-41d4-a716-446655440000"  // UUID: string
      "name": "Sansan 株式会社"  // string
    },
    {
      "user_id": "005edk90-e37c-4874-3c17-546379440990"  // UUID: string
      "name": "SANSAN Inc."  // string
    },
    ...
  ]
}
```

##### POST

None

#### /company/:company_id

##### GET

特定の会社の相談者を全て表示する．

- request
  - パス：`/api/company/550e8400-e29b-41d4-a716-446655440000`
  - parameter
    - None
- response

```json
{
  "company_id": "550e8400-e29b-41d4-a716-446655440000",  // UUID: string
  "company_name": "Sansan 株式会社",
  "num_workers": 35,
  "workers": [
    {
      "id": "UUID",
      "job": {
        "id": "UUID",
        "name": "フロントエンドエンジニア",
        "is_authenticated": true,
        "comment": "がんばります",
      }
    },
    {
      "id": "UUID",
      "job": {
        "id": "UUID",
        "name": "インフラエンジニア",
        "is_authenticated": false,
        "comment": "インフラを始めてから早 10 年",
      }
    },
    ...
  ]
}
```

##### POST

None

### /call

None

### /payment

None

---

## 環境構築

1. AWS 上で EC2 インスタンスを立てる
2. ローカルからサーバへの SSH 接続
3. サーバから GitHub への SSH 接続

### 1. EC2 インスタンスを立てる

- IP アドレスを取得
- Web サーバ用にポートを開ける

### 2. サーバへの SSH 接続

- 必要なもの
  - ローカル
    - ssh_config: `~/ssh/config`
    - 公開鍵：`~/shh/trigger.pem`
  - ec2 上
    - ssh_config: `~/ssh/config`

```sh
# ローカルのターミナルから SSH 接続
$ ssh trigger
```

あとは VSCode で Remote-SSH を使える．

### 3. GitHub への接続

以下 EC2 上のターミナルでの作業．

1. キーペアを生成
2. ssh_config `~/ssh/config` を編集
3. GitHub リポジトリに公開鍵を登録する
4. SSH 接続できるか確認

- キーペアを生成

```sh
$ cd ~/.ssh
$ ssh-keygen -t rsa  # キーペアの確認
```

- ssh_config の編集

```sh
$ cd ~/.ssh
$ vi config
```

`~/.ssh/config` を以下のように書く．

```config
Host GitHub
	User git
	HostName github.com
	IdentityFile ~/.ssh/id_rsa
```

- GitHub に公開鍵を登録する
  - リポジトリトップ > Settings > Deploy keys > 生成した公開鍵をコピペ
- 確認

```sh
$ ssh -T git@github.com
Hi Tsutomu-Ikeda/trigger! You've successfully authenticated, but GitHub does not provide shell access.
```

### 4. 初期設定：各種パッケージのインストールや諸設定

- `backend/install.sh` を参照（これ自身を実行しても多分うまく動かない）
  - git, docker, docker-compose, python3
  - サーバのロケールの設定
  - gitconfig の設定
