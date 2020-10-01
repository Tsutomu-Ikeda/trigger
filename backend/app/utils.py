from models import User


def generate_password_hash(password: str) -> str:
    return password


def check_password_hash(user: User, password: str) -> bool:
    # TODO: ログイン画面で入力されたパスワードのハッシュ値を比較
    password_hash = user.password_hash

    return True


def check_affilication_exists():
    pass
