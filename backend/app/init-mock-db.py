from models import db, University


universities_mock = [
    "A 大学",
    "B 大学",
    "C 大学",
    "D 大学",
    "E 大学",
    "F 大学",
]

for name in universities_mock:
    university = University(name=name)
    db.session.add(university)

db.session.commit()
