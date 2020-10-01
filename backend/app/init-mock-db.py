import random
import string
from datetime import date

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


UNIVERSITIES_MOCK = [
    {"name": "A 大学"},
    {"name": "B 大学"},
    {"name": "C 大学"},
    {"name": "D 大学"},
    {"name": "E 大学"},
    {"name": "F 大学"},
    {"name": "G 大学"},
    {"name": "H 大学"},
]
COMPANIES_MOCK = [
    # case insensitive
    {"name": "Sansan 株式会社"},
    {"name": "株式会社 Sansan"},
    {"name": "sansan 株式会社"},
    {"name": "SanSan"},
    {"name": "SANSAN Inc."},
    {"name": "合同会社 SANsan"},
]
JOBS_MOCK = [
    {"name": "サーバーサイドエンジニア"},
    {"name": "フロントエンド エンジニア"},
    {"name": "Web エンジニア"},
    {"name": "iOS エンジニア"},
    {"name": "インフラエンジニア"},
    {"name": "研究開発職"},
]
NUM_MOCK = 100
random.seed(NUM_MOCK)


def generate_random_name(n):
    return "".join(random.choices(string.ascii_letters + string.digits, k=n))


def generate_phone_number():
    return "".join(random.choices(string.digits, k=11))


def insert_mock(Model, mock_data: list):
    models = [Model(**mock) for mock in mock_data]
    db.session.add_all(models)


def generate_students():
    """ 100 人分の学生モック
    - 念のため ADMIN も用意
    """

    # date_of_birth = (date(2021, 3, 31).strftime("%Y%m%d"),)
    date_of_birth = date(2021, 3, 31)
    ADMIN = [
        {
            "name": "admin",
            "date_of_birth": date_of_birth,
            "tel_number": generate_phone_number(),
            "email": "yskbsk13@gmail.com",
            "password_hash": "password",
            "user_type": "student",
            "type_card_url": generate_random_name(50),  # FIXME: S3 上の一意なファイル名になるかも
            "identity_card_url": generate_random_name(50),  # FIXME: S3 上の一意なファイル名になるかも
            "affiliation_id": random.randint(1, len(UNIVERSITIES_MOCK)),
        }
    ]

    students = ADMIN + [
        {
            "name": generate_random_name(8),
            "date_of_birth": date_of_birth,
            "tel_number": generate_phone_number(),
            "email": f"{generate_random_name(15)}@buttyake-mock.com",
            "password_hash": "password",
            "user_type": "student",
            "type_card_url": generate_random_name(50),  # FIXME: S3 上の一意なファイル名になるかも
            "identity_card_url": generate_random_name(50),  # FIXME: S3 上の一意なファイル名になるかも
            "affiliation_id": random.randint(1, len(UNIVERSITIES_MOCK)),
        }
        for _ in range(NUM_MOCK)
    ]

    return students


def generate_workers():
    """ 100 人分の社会人モック
    - 念のため ADMIN も用意
    """

    # date_of_birth = date(2021, 3, 31).strftime("%Y%m%d")
    date_of_birth = date(2021, 3, 31)
    comments_mock = [
        "がんばります",
        "就活のことならお任せください",
        "就活だけでなく日々の悩みもお聞かせください",
        "SIer -> Web 業界のように違う業界を見てきているので，それらに関して何かお役に立てるかもしれません",
        "俺に全部投資しろ",
    ]
    ADMIN = [
        {
            "name": "admin",
            "date_of_birth": date_of_birth,
            "tel_number": generate_phone_number(),
            "email": "yskbsk13@gmail.com",
            "password_hash": "password",
            "user_type": "worker",
            "is_authenticated": True,
            "type_card_url": "IMG-"
            + generate_random_name(50),  # FIXME: S3 上の一意なファイル名になるかも
            "identity_card_url": "IMG-"
            + generate_random_name(50),  # FIXME: S3 上の一意なファイル名になるかも
            "affiliation_id": random.randint(1, len(COMPANIES_MOCK)),
            "department": random.choice(["Sansan 事業部", "Eight 事業部"]),
            "position": random.choice(["PM", "テッククリード", "エンジニア"]),
            "job_id": random.randint(1, len(JOBS_MOCK)),
            "comment": random.choice(comments_mock),
        }
    ]

    workers = ADMIN + [
        {
            "name": generate_random_name(10),
            "date_of_birth": date_of_birth,
            "tel_number": generate_phone_number(),
            "email": f"{generate_random_name(15)}@buttyake-mock.com",
            "password_hash": "password",
            "user_type": "worker",
            "is_authenticated": random.choice([True, False]),
            "type_card_url": "IMG-"
            + generate_random_name(50),  # FIXME: S3 上の一意なファイル名になるかも
            "identity_card_url": "IMG-"
            + generate_random_name(50),  # FIXME: S3 上の一意なファイル名になるかも
            "affiliation_id": random.randint(1, len(COMPANIES_MOCK)),
            "department": random.choice(["Sansan 事業部", "Eight 事業部", "DSOC"]),
            "position": random.choice(["PM", "シニア hoge", "テッククリード", "エンジニア"]),
            "job_id": random.randint(1, len(JOBS_MOCK)),
            "comment": random.choice(comments_mock),
        }
        for _ in range(NUM_MOCK)
    ]

    return workers


# 外部キーなし
insert_mock(University, UNIVERSITIES_MOCK)
insert_mock(Job, JOBS_MOCK)
insert_mock(Company, COMPANIES_MOCK)
db.session.commit()

# 外部キーあり
students_mock = generate_students()
insert_mock(Student, students_mock)
workers_mock = generate_workers()
insert_mock(Worker, workers_mock)
db.session.commit()
