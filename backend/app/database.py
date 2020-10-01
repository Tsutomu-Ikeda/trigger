from flask_sqlalchemy import orm, SignallingSession, SQLAlchemy


class TestSignallingSession(SignallingSession):
    def commit(self):
        self.flush()  # セッションが保持しているデータをすべてデータベースに書き込む
        self.expire_all()  # セッションが保持してるデータをクリアしデータベースより読むこむようにする


class TestSQLAlchemy(SQLAlchemy):
    def create_session(self, options):
        return orm.sessionmaker(class_=TestSignallingSession, db=self, **options)
