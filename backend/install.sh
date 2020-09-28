sudo yum update -y
sudo yum install -y git

# Docker
sudo yum install -y docker git
sudo service docker start
sudo usermod -a -G docker ec2-user  # Docker の実行に sudo いらなくなる

# Docker Compose
sudo curl -L https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Python
sudo yum install python3 -y
cd ~/trigger
python3 -m venv venv
source venv/bin/activate
pip install poetry

# Nginx
## 日本時間と日本語に対応させる
sudo timedatectl set-timezone Asia/Tokyo
sudo localectl set-locale LANG=ja_JP.UTF-8
sudo localectl set-keymap jp106