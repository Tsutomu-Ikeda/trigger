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
  "password": "buttyake-password"  // int
}
```

- response

```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",  // UUID: string
  "user_type": "student" | "worker"  // string
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
  "message": "ログアウトしました"  // string
}
```

#### POST

None

### /matching

#### GET

- 

#### POST

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
    {}
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
