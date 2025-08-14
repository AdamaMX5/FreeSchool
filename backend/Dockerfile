FROM python:3.11-slim

# Arbeitsverzeichnis erstellen
WORKDIR /app

# Systemabhängigkeiten
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Debug: System-Pakete bestätigen
RUN echo "=== System packages installed ==="

# Abhängigkeiten installieren
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir --system -r requirements.txt && \
    echo "=== Pip packages installed ==="

# Debug: Pfade und Installation prüfen
RUN echo "PATH: $PATH" && \
    find / -name gunicorn 2>/dev/null && \
    pip list && \
    pip show fastapi gunicorn uvicorn && \
    which python && \
    which pip

# Benutzer erstellen
RUN adduser --disabled-password --gecos "" appuser

# Besitz ändern und zu Benutzer wechseln
RUN chown -R appuser:appuser /app
USER appuser

# Debug: User bestätigen
RUN echo "=== Now running as appuser ==="

# App kopieren
COPY --chown=appuser:appuser . .
RUN echo "=== App copied ==="

# Startbefehl
CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "main:app", "--bind", "0.0.0.0:8000"]