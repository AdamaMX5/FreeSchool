FROM python:3.11-slim

# Arbeitsverzeichnis erstellen
WORKDIR /app

# Systemabhängigkeiten
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Abhängigkeiten installieren
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir --system -r requirements.txt
	
# Benutzer erstellen
#RUN adduser --disabled-password --gecos "" appuser
# Besitz ändern und zu Benutzer wechseln
#RUN chown -R appuser:appuser /app
#USER appuser

# App kopieren
COPY --chown=appuser:appuser . .

# Startbefehl
CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "main:app", "--bind", "0.0.0.0:8000"]