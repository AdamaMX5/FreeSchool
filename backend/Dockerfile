FROM python:3.11-slim

WORKDIR /app

# Zuerst Abhängigkeiten installieren (für Caching)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Dann den Rest kopieren
COPY . .

# Alembic Migration
RUN alembic upgrade head

CMD ["gunicorn", "-w 4", "-k uvicorn.workers.UvicornWorker", "main:app", "--bind", "0.0.0.0:8000"]