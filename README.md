# FreeSchool

FreeSchool is a free online school that offers courses to anyone who wants to learn.
We offer courses in a wide range of topics, from computer programming to history to art.
Our goal is to make high-quality education accessible to everyone, regardless of their background or financial situation.

---

## Git installieren und projekt klonen:

```bash
sudo apt update && sudo apt install -y git python3 python3-pip nodejs npm nginx docker.io docker-compose curl

git clone https://github.com/AdamaMX5/FreeSchool.git
cd FreeSchool # && git pull
./build.sh # wird beim ersten Versuch fehlschlagen. Die .env Datei wurde erstellt
nano .env


# Frontend Envirement Variable
cd FreeSchool/frontend	# in den Frontend Ordner gehen
nano .env		# erstellt oder öffnet die .env Datei
VITE_API_BASE_URL=http://domain:8000	# URL, wo das Backend läuft
Strg+X j Enter		# zum Beenden mit Speichern

docker logs freeschool_backend 							# ausgabe anzeigen
docker logs -f freeschool_backend        					# Folgt den Logs in Echtzeit (wie tail -f)
docker exec -it freeschool_db psql -U freeschool -d freeschool -c "\dt"		# Datenbank Tabellenausgabe
```

## Trubbleshoting

# Test Docker:
docker ps
permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get "http://%2Fvar%2Frun%2Fdocker.sock/v1.24/containers/json": dial unix /var/run/docker.sock: connect: permission denied

sudo usermod -aG docker $USER		# Benutzer zur Docker-Gruppe hinzufügen
newgrp docker						# Danach neu anmelden oder diese Session aktualisieren
docker ps

# Docker-Compose komando nicht gefunden:
sudo apt update
sudo apt install docker-compose
docker-compose --version
---

## Installation

To install FreeSchool, download the latest version from our website or GitHub and install the required dependencies:

```bash
pip install fastapi[all]
```

---

## Run Backend Development

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

## Run Frontend Development

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


### you want to run the backend tests with
pytest tests
# before you have to create the test DB:
CREATE USER testuser WITH PASSWORD 'testpass';
CREATE DATABASE test_freeschool OWNER testuser;
GRANT ALL PRIVILEGES ON DATABASE test_freeschool TO testuser;
GRANT CREATE ON SCHEMA public TO testuser;



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
