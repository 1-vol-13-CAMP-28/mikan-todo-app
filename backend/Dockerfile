FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1

WORKDIR /usr/src/app/backend
RUN adduser --system --shell /bin/bash nonroot && \
    pip install --no-cache-dir --upgrade poetry pysu

COPY pyproject.toml ./
COPY poetry.lock ./

RUN poetry install --no-cache

EXPOSE 8000
CMD poetry run uvicorn api.main:app --reload --host 0.0.0.0 --port 8000
