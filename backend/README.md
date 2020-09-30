# バックエンド

## アプリケーションの起動

- **MUST**：`.env.dev` ファイルを用意

`.env.dev`

```sh

```

- Docker Compose でコンテナを

```sh
$ docker-compose up
```

## DB 関連

### マイグレーション

参考：[Flask-Migrateに関して自分の言葉で(Qiita, 2019/06)](https://qiita.com/KI1208/items/2581ed6f211a2d73e5fd)

#### DB 初期化時

DB 初期化時（または DB の設定を全部リセットしたくなった時の最終手段として）実行するコマンド

- 処理内容
  - `migrations` ディレクトリの作成
  - マイグレーション用スクリプトの生成

```sh
$ docker-compose exec app bash

# コンテナ内
# migrations ディレクトリがあれば，"rm -rf migrations"
$ flask db init
$ flask db migrate
```

#### 初回以降

初回以降，つまり，モデル（`models.py`）更新時に実行するコマンド

- マイグレーションの実行
- モデル（`models.py`）の更新を反映

```sh
$ flask db upgrade
```

### DB の操作

#### SQLAlchemy を利用して Python シェルから DB を操作

`app` コンテナに入る．

```sh
$ docker compose up -d  # 起動中の場合，実行しなくて良い
$ docker-compose exec app bash

# db コンテナ内
$ FLASK_APP=run.py flask shell
mysql> show databases;  # SQL が実行できる
mysql> show tables;  # SQL が実行できる
```

#### MySQL のコンソールで直接 DB を操作

`db` コンテナに入る．

```sh
$ docker compose up -d  # 起動中の場合，実行しなくて良い
$ docker-compose exec db mysql -uroot -proot

# db コンテナ内
$ mysql -uroot -proot
mysql> show databases;  # SQL が実行できる
mysql> show tables;  # SQL が実行できる
```

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
