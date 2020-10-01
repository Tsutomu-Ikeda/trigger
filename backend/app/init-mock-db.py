import random
import string
from datetime import date, datetime

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
from _datetime import date


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
    {"name": "フロントエンドエンジニア"},
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


def generate_models(Model, mock_data: list):
    models = [Model(**mock) for mock in mock_data]
    return models


def generate_students(univertiy_ids):
    """100 人分の学生モック
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
            "affiliation_id": random.choice(univertiy_ids),
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
            "affiliation_id": random.choice(univertiy_ids),
        }
        for _ in range(NUM_MOCK)
    ]

    return students


def generate_workers(company_ids, job_ids):
    """100 人分の社会人モック
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
            "email": "pytwbf201830@gmail.com",
            "password_hash": "password",
            "user_type": "worker",
            "is_authenticated": True,
            "type_card_url": "IMG-"
            + generate_random_name(50),  # FIXME: S3 上の一意なファイル名になるかも
            "identity_card_url": "IMG-"
            + generate_random_name(50),  # FIXME: S3 上の一意なファイル名になるかも
            "department": random.choice(["Sansan 事業部", "Eight 事業部"]),
            "position": random.choice(["PM", "テッククリード", "エンジニア"]),
            "comment": random.choice(comments_mock),
            "affiliation_id": random.choice(company_ids),
            "job_id": random.choice(job_ids),
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
            "department": random.choice(["Sansan 事業部", "Eight 事業部", "DSOC"]),
            "position": random.choice(["PM", "シニア hoge", "テッククリード", "エンジニア"]),
            "comment": random.choice(comments_mock),
            "affiliation_id": random.choice(company_ids),
            "job_id": random.choice(job_ids),
        }
        for _ in range(NUM_MOCK)
    ]

    return workers


def generate_matches(listener_ids, speaker_ids):
    matches = []
    matches += [
        {
            "date": datetime(2020, 10, 1, 10, 00),
            "speaker_id": random.choice(speaker_ids),
            "listener_id": random.choice(listener_ids),
            # "meeting_length": 60,
            "is_matched": bool(random.getrandbits(1)),
            "is_done_meeting": bool(random.getrandbits(1)),
            "is_done_payment": bool(random.getrandbits(1)),
        }
        for i in range(NUM_MOCK)
    ]
    return matches


# universities, jobs, companies モデルの生成
universities = generate_models(University, UNIVERSITIES_MOCK)
jobs = generate_models(Job, JOBS_MOCK)
companies = generate_models(Company, COMPANIES_MOCK)
db.session().add_all(universities)
db.session().add_all(jobs)
db.session().add_all(companies)

jobs = Job.query.all()
job_ids = [job.id for job in jobs]
universities = University.query.all()
university_ids = [univ.id for univ in universities]
comapnies = Company.query.all()
company_ids = [co.id for co in companies]

# student, workers モデルの生成
students_mock = generate_students(university_ids)
student_models = generate_models(Student, students_mock)
workers_mock = generate_workers(company_ids, job_ids)
worker_models = generate_models(Worker, workers_mock)
db.session().add_all(student_models)
db.session().add_all(worker_models)
db.session.commit()

# matches モデルの生成
listeners = Student.query.all()
listener_ids = [listener.id for listener in listeners]
speakers = Worker.query.all()
speaker_ids = [speaker.id for speaker in speakers]
matches_mock = generate_matches(listener_ids, speaker_ids)
match_models = generate_models(Match, matches_mock)
db.session().add_all(match_models)
db.session.commit()
