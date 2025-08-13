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

# Stop and remove any existing containers
echo "Stopping and removing any existing containers..."
docker-compose down --remove-orphans

# Check for .env file and create if missing
if [ ! -f .env ]; then
    echo "Creating .env file with default values..."
    cat > .env <<EOL
# Backend
DATABASE_URL=postgresql://freeschool:sicher123@db:5432/freeschool
SECRET_KEY=$(openssl rand -hex 32)
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# Frontend
VITE_API_BASE_URL=/api
VITE_APP_NAME=FreeSchool

# Nginx
NGINX_PORT=80
EOL
    echo ".env file created with default values"
else
    echo "Using existing .env file"
fi

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
docker volume prune -f

# ===== BUILD AND START =====
echo "Building and starting containers..."
docker-compose up -d --build

# ===== FINAL CHECKS =====
echo "Checking container status..."
docker-compose ps

echo "=== Deployment completed successfully ==="
echo "Application should be available at http://localhost"
