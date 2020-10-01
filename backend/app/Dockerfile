FROM python:3.8-slim

LABEL  maintainer "nukopy <pytwbf201830@gmail.com>"

WORKDIR /app

# install packages
RUN set -ex \
    && apt-get update \
    && apt-get install -y --no-install-recommends build-essential \
    && pip install -U --no-cache-dir poetry \
    && rm -rf /var/lib/apt/lists/*

# for ER diagram
# eralchemy -i $DB_URL -o buttyake-ER-diagram.pdf
RUN set -ex \
    && apt update \
    && apt install -y graphviz libgraphviz-dev \
    && pip install eralchemy

# install Python packages
COPY poetry.lock pyproject.toml ./
RUN poetry config virtualenvs.create false \
    && poetry install

COPY ./ ./

ENV PYTHONPATH /app