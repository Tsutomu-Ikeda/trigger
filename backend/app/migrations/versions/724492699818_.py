"""empty message

Revision ID: 724492699818
Revises: 
Create Date: 2020-09-30 17:29:45.064857

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '724492699818'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('companies',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('jobs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('universities',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('students',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=False),
    sa.Column('date_of_birth', sa.DateTime(), nullable=False),
    sa.Column('tel_number', sa.String(length=11), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('passowrd', sa.String(length=120), nullable=False),
    sa.Column('certificate_url', sa.String(length=120), nullable=False),
    sa.Column('user_type', sa.String(length=20), nullable=False),
    sa.Column('affiliation_id', sa.Integer(), nullable=True),
    sa.Column('is_authenticated', sa.Boolean(), nullable=False),
    sa.Column('type_card_url', sa.String(length=120), nullable=True),
    sa.Column('identity_card_url', sa.String(length=120), nullable=True),
    sa.Column('created_at', mysql.TIMESTAMP(), nullable=False),
    sa.Column('cupdated_at', mysql.TIMESTAMP(), nullable=False),
    sa.ForeignKeyConstraint(['affiliation_id'], ['universities.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('certificate_url'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('identity_card_url'),
    sa.UniqueConstraint('tel_number'),
    sa.UniqueConstraint('type_card_url')
    )
    op.create_table('workers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=False),
    sa.Column('date_of_birth', sa.Date(), nullable=False),
    sa.Column('tel_number', sa.String(length=11), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('passowrd', sa.String(length=120), nullable=False),
    sa.Column('certificate_url', sa.String(length=120), nullable=False),
    sa.Column('user_type', sa.String(length=20), nullable=False),
    sa.Column('affiliation_id', sa.Integer(), nullable=True),
    sa.Column('job', sa.Integer(), nullable=True),
    sa.Column('department', sa.String(length=120), nullable=True),
    sa.Column('postions', sa.String(length=120), nullable=True),
    sa.Column('is_authenticated', sa.Boolean(), nullable=False),
    sa.Column('type_card_url', sa.String(length=120), nullable=True),
    sa.Column('identity_card_url', sa.String(length=120), nullable=True),
    sa.Column('created_at', mysql.TIMESTAMP(), nullable=False),
    sa.Column('cupdated_at', mysql.TIMESTAMP(), nullable=False),
    sa.Column('comment', sa.String(length=80), nullable=True),
    sa.ForeignKeyConstraint(['affiliation_id'], ['companies.id'], ),
    sa.ForeignKeyConstraint(['job'], ['jobs.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('certificate_url'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('identity_card_url'),
    sa.UniqueConstraint('tel_number'),
    sa.UniqueConstraint('type_card_url')
    )
    op.create_table('matches',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('date', sa.DateTime(), nullable=True),
    sa.Column('speaker_id', sa.Integer(), nullable=True),
    sa.Column('listener_id', sa.Integer(), nullable=True),
    sa.Column('meeting_length', sa.Integer(), nullable=True),
    sa.Column('audio_url', sa.String(length=120), nullable=True),
    sa.Column('is_matched', sa.Boolean(), nullable=True),
    sa.Column('is_done_meeting', sa.Boolean(), nullable=True),
    sa.Column('is_done_payment', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['listener_id'], ['students.id'], ),
    sa.ForeignKeyConstraint(['speaker_id'], ['workers.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('audio_url')
    )
    op.drop_table('test')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('test',
    sa.Column('id', mysql.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('name', mysql.VARCHAR(length=64), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    op.drop_table('matches')
    op.drop_table('workers')
    op.drop_table('students')
    op.drop_table('universities')
    op.drop_table('jobs')
    op.drop_table('companies')
    # ### end Alembic commands ###
