# バックエンド

## アプリケーションの起動

```sh
$ docker-compose up
```

## 環境構築

1. AWS 上で EC2 インスタンスを立てる
2. ローカルからサーバへの SSH 接続
3. サーバから GitHub への SSH 接続

### EC2 インスタンスを立てる

- IP アドレスを取得
- Web サーバ用にポートを開ける

### サーバへの SSH 接続

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

### GitHub への接続

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