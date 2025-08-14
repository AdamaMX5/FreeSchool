FROM python:3.11-slim

# Systemabhängigkeiten
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*
RUN echo "=== System packages installed ==="

# Virtuelle Umgebung erstellen
ENV VIRTUAL_ENV=/opt/venv
RUN python -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Arbeitsverzeichnis
WORKDIR /app

# Abhängigkeiten installieren
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt && \
    echo "=== Pip packages installed ==="

# Debug: Pfade und Installation prüfen
RUN echo "PATH: $PATH" && \
    find / -name gunicorn 2>/dev/null && \
    pip list && \
    pip show fastapi gunicorn uvicorn && \
    which python && \
    which pip

# Benutzer erstellen
RUN adduser --disabled-password --gecos "" appuser && \
    chown -R appuser:appuser /app
USER appuser

# App kopieren
COPY --chown=appuser:appuser . .
RUN echo "=== App copied ==="

# Startbefehl
RUN echo "=== gunicorn GO! ==="
CMD ["sh", "-c", "python -c 'import asyncio; from database import create_tables; asyncio.run(create_tables())']
CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "main:app", "--bind", "0.0.0.0:8000"]