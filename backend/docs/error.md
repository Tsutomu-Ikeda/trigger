# 各種エラー処理

## コンテナの起動時のエラー

- エラー文：`docker.errors.DockerException: Error while fetching server API version: ('Connection aborted.', FileNotFoundError(2, 'No such file or directory'))`
- 原因：docker デーモンが動いてない

以下を実行．

```sh
$ docker-compose up  # ERROR
$ sudo systemctl start docker
$ sudo systemctl enable docker
```

## DB 周りのエラー

### 権限エラーで Docker Compose で DB 永続化のマウントができないときの対処法

```sh
$ sudo chmod -R 777 /home/ec2-user/trigger/backend/db/mysql/volume
```

### init.d が実行されない

エラーではないけど，SQL の初期設定のスクリプトの反映について

- 問題
  - コンテナのビルド時，`/docker-entrypoint-initdb.d` 配下の SQL が初期化スクリプトとして実行される．
  - しかし，永続化したデータ（`backend/db/mysql/volume` 配下）が既に存在する場合，これは実行されない．
- 解決方法
  - 永続化したデータを消せば良い（**消して良いデータかどうかはチェック**）
    - `rm -rf backend/db/mysql/volume/**`
  - `backend/build-db.sh` を実行すれば一発

```sh
$ cd backend
$ docker-compose build
$ docker-compose up
# -> 初期化 SQL が走らない
$ sh build-db.sh
$ docker-compose up
```
