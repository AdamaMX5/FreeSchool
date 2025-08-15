#!/bin/bash

# todo:
#	Einen separaten Datenbank-Volume Mount verwenden
#	HTTPS via Nginx konfigurieren
#	Resource Limits für Container setzen

# how to use:
#	git pull			# load update
#	chmod +x build.sh	# Ausführbar machen
#	./build.sh			# Ausführen

# ===== INITIAL SETUP =====
echo "=== Starting FreeSchool Deployment ==="


# Check for .env file and create if missing
if [ ! -f .env ]; then
    echo "Creating .env file with default values..."
    cat > .env <<EOL
# ===== ALLGEMEINE KONFIGURATION =====
APP_NAME=FreeSchool
DOMAIN=meinedomain.de

# ===== BACKEND-SPEZIFISCH =====
DB_HOST=db
DB_PORT=5432
DB_USER=freeschool
DB_PASSWORD=sicher123
DB_NAME=freeschool
SECRET_KEY=$(openssl rand -hex 32)
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
SMTP_SERVER=smtp.strato.de
SMTP_PORT=465
SMTP_USERNAME=newsletter@flussmark.de
SMTP_PASSWORD=your_password
FROM_EMAIL=freeschool@flussmark.de
FROM_NAME=FreeSchool

# ===== FRONTEND-SPEZIFISCH =====
VITE_API_BASE_URL=https://api.${DOMAIN}
EOL
    echo ".env file created with default values"
else
    echo "Using existing .env file"
fi

# Stop and remove any existing containers
echo "Stopping and removing any existing containers..."
docker-compose down --remove-orphans


# Check if using local database
DB_URL=$(grep DATABASE_URL .env | cut -d '=' -f2)
if [[ $DB_URL == *"localhost"* || $DB_URL == *"db"* ]]; then
    echo "Local database configuration detected"
    
    # Check if postgres container is already running
    if [ ! "$(docker ps -q -f name=freeschool_db)" ]; then
        echo "Starting PostgreSQL container..."
        docker-compose up -d db
        
        # Wait for database to be ready
        echo "Waiting for database to be ready..."
        while ! docker exec freeschool_db pg_isready -U freeschool; do
            sleep 2
        done
        echo "Database is ready!"
    else
        echo "PostgreSQL container already running"
    fi
else
    echo "External database configuration detected - no local database setup needed"
fi

# Clean up previous builds
echo "Cleaning up previous builds..."
docker-compose rm -f frontend backend
#docker volume prune -f

# ===== BUILD AND START =====
echo "Building and starting containers..."
docker-compose up -d --build

echo "Creating database tables..."
docker exec -it freeschool_backend python create_tables.py

# ===== FINAL CHECKS =====
echo "Checking container status..."
docker-compose ps

echo "=== Deployment completed successfully ==="
echo "Application should be available at http://localhost:8000"

