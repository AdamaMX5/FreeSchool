# FreeSchool

FreeSchool is a free online school that offers courses to anyone who wants to learn.
We offer courses in a wide range of topics, from computer programming to history to art.
Our goal is to make high-quality education accessible to everyone, regardless of their background or financial situation.

---

## Git installieren und projekt klonen:

```bash
sudo apt update && sudo apt install -y git python3 python3-pip nodejs npm nginx
git clone https://github.com/AdamaMX5/FreeSchool.git
cd FreeSchool
```

---

## Installation

To install FreeSchool, download the latest version from our website or GitHub and install the required dependencies:

```bash
pip install fastapi[all]
```

---

## Umgebungsvariablen setzen

# Backend
DATABASE_URL=postgresql://user:password@db:5432/freeschool
SECRET_KEY=your-super-secret-key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# Frontend (wird via docker-compose.yml injiziert)
VITE_API_BASE_URL=/api
VITE_APP_NAME=FreeSchool

# Nginx (optional)
NGINX_PORT=80

---

## Run Backend

Start the server with:

```bash
uvicorn main:app --reload
```

Or, in PyCharm, set up a run/debug configuration:

- **Script**: `C:/Users/Kurt/Python/FreeSchool/main.py`  
- **Parameters** (example): `uvicorn main:app --reload --host 127.0.0.1 --port 8000 --workers 1`

Alternatively, run from the command line:

```bash
uvicorn main:app --reload --host 127.0.0.1 --port 8000 --workers 1
```

---

## Run Frontend

From the frontend directory, start the dev server:

```bash
cd C:\Users\Kurt\Python\FreeSchool\frontend
npm run dev
```

---

## Wenn die SQL Datenbank nicht aktuell ist nutze Alembic

To update the SQL database, use Alembic.

1. Install Alembic:

```bash
pip install alembic
```

2. Navigate to the directory containing your Alembic configuration (usually where `alembic.ini` is) and run:

```bash
alembic upgrade head
```

---

### Wenn wir die Modelle erweitert haben und noch keine version dafür existiert

Create a new migration script:

```bash
alembic revision --autogenerate -m "Add new models"
```

This will create a new migration script in the migrations directory. Review and edit the script if necessary, then apply it with:

```bash
alembic upgrade head
```

---

If you want a German-only version or additional sections (Usage, Contributing, License, etc.), tell me and I’ll add them.
