FROM python:3.11-slim

# Systemabhängigkeiten
RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc python3-dev && \
    rm -rf /var/lib/apt/lists/*

# Benutzer erstellen
RUN useradd -m appuser && \
    mkdir /app && \
    chown appuser:appuser /app

WORKDIR /app
USER appuser

# Abhängigkeiten installieren
COPY --chown=appuser:appuser requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

# App kopieren
COPY --chown=appuser:appuser . .

CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "main:app", "--bind", "0.0.0.0:8000"]