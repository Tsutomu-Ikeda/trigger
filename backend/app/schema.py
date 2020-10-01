from flask_marshmallow import Marshmallow

from app import app
from models import (
    Student,
    Worker,
    Match,
)


ma = Marshmallow(app)


class StudentSchema(ma.Schema):
    class Meta:
        fields = ()


class WorkerSchema(ma.Schema):
    class Meta:
        fields = ("id", "email")


class UniversitySchema(ma.Schema):
    class Meta:
        fields = ("id", "name")


class CompanySchema(ma.Schema):
    class Meta:
        fields = ("id", "name")


class MatchSchema(ma.Schema):
    class Meta:
        fields = (
            "id",
            "name",
            "speaker_id",
            "listener_id",
            "is_matched",
            "is_done_meeting",
            "is_done_payment",
        )


student_schema = StudentSchema()
students_schema = StudentSchema(many=True)
worker_schema = WorkerSchema()
workers_schema = WorkerSchema(many=True)
university_schema = UniversitySchema()
universities_schema = UniversitySchema(many=True)
company_schema = CompanySchema()
companies_schema = CompanySchema(many=True)
match_schema = MatchSchema()
matches_schema = MatchSchema(many=True)