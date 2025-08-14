FROM python:3.11-slim

# Arbeitsverzeichnis erstellen
WORKDIR /app

# Systemabhängigkeiten
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*
echo "=== System packages installed ==="

# Abhängigkeiten installieren
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir --system -r requirements.txt
echo "=== Pip packages installed ==="

# pip Tools ausgeben, dass gunicorn installiert ist
RUN pip list	
pip show fastapi gunicorn uvicorn
which python
which pip

# Benutzer erstellen
RUN adduser --disabled-password --gecos "" appuser
# Besitz ändern und zu Benutzer wechseln
RUN chown -R appuser:appuser /app
USER appuser
echo "=== use Appuser ==="

# App kopieren
COPY --chown=appuser:appuser . .
echo "=== API copyed ==="

# Startbefehl
echo "=== gunicorn GO! ==="
CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "main:app", "--bind", "0.0.0.0:8000"]