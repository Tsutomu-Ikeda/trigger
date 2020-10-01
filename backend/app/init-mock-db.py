from models import (
    db,
    Company,
    Job,
    Match,
    Student,
    University,
    User,
    Worker,
)
from sqlalchemy import exc


def insert_mock(Model, mock_data: list):
    for name in mock_data:
        model = Model(name=name)
        db.session.add(model)


# "universities"
universities_mock = [
    "A 大学",
    "B 大学",
    "C 大学",
    "D 大学",
    "E 大学",
    "F 大学",
]
insert_mock(University, universities_mock)

# "jobs"
jobs_mock = [
    "サーバーサイドエンジニア",
    "フロントエンド エンジニア",
    "Web エンジニア",
    "iOS エンジニア",
    "インフラエンジニア",
    "研究開発職",
]
insert_mock(Job, jobs_mock)


db.session.commit()
