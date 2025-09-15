#!/bin/bash

# todo:
#	Einen separaten Datenbank-Volume Mount verwenden
#	HTTPS via Nginx konfigurieren
#	Resource Limits für Container setzen

# how to use:
#	git pull			# load update
#	./build.sh			# Ausführen

# ===== INITIAL SETUP =====
echo "=== Starting FreeSchool Deployment ==="


# Check for .env file and create if missing
if [ ! -f .env ]; then
    echo "Creating .env file with default values..."
    cat > .env <<EOL
# ===== ALLGEMEINE KONFIGURATION =====
APP_NAME=FreeSchool
DOMAIN=localhost

# ===== BACKEND-SPEZIFISCH =====
DB_HOST=db
DB_PORT=5432
DB_USER=freeschool
DB_PASSWORD=sicher123
DB_NAME=freeschool
API_BASE_URL=http://{DOMAIN}:8000
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

# ===== NGINX REVERSE PROXY SETUP =====
echo "=== Configuring Nginx Reverse Proxy ==="
# Nginx Konfiguration erstellen
sudo tee /etc/nginx/sites-available/freischule > /dev/null << 'EOL'
# HTTP redirect to HTTPS
server {
    listen 80;
    server_name freischule.flussmark.de api.freischule.flussmark.de;
    return 301 https://$server_name$request_uri;
}

# HTTPS Configuration - Frontend
server {
    listen 443 ssl;
    server_name freischule.flussmark.de;
    
    ssl_certificate /etc/letsencrypt/live/freischule.flussmark.de/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/freischule.flussmark.de/privkey.pem;
    
    location / {
        proxy_pass http://localhost:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# HTTPS Configuration - Backend API
server {
    listen 443 ssl;
    server_name api.freischule.flussmark.de;
    
    ssl_certificate /etc/letsencrypt/live/freischule.flussmark.de/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/freischule.flussmark.de/privkey.pem;
    
    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        proxy_connect_timeout 300;
        proxy_send_timeout 300;
        proxy_read_timeout 300;
        send_timeout 300;
    }
}
EOL

# Konfiguration aktivieren
if [ ! -f /etc/nginx/sites-enabled/freischule ]; then
    sudo ln -s /etc/nginx/sites-available/freischule /etc/nginx/sites-enabled/
fi

# Default Konfiguration deaktivieren (falls vorhanden)
if [ -f /etc/nginx/sites-enabled/default ]; then
    sudo rm /etc/nginx/sites-enabled/default
fi

# Nginx Konfiguration testen
echo "Testing Nginx configuration..."
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "Nginx configuration is valid"
    sudo systemctl reload nginx
    echo "Nginx reloaded successfully"
else
    echo "ERROR: Nginx configuration test failed"
    exit 1
fi

# ===== SSL CERTIFICATE SETUP =====
echo "=== Setting up SSL Certificate ==="

# Certbot installieren falls nicht vorhanden
if ! command -v certbot &> /dev/null; then
    echo "Installing Certbot..."
    sudo apt update
    sudo apt install -y certbot python3-certbot-nginx
fi

# Zertifikat erstellen oder erneuern
if [ -d "/etc/letsencrypt/live/freischule.flussmark.de" ]; then
    echo "Renewing SSL certificate..."
    sudo certbot renew --quiet
else
    echo "Creating SSL certificate..."
    sudo certbot certonly --standalone -d freischule.flussmark.de -d api.freischule.flussmark.de --non-interactive --agree-tos -m freischule@flussmark.de
fi


# ===== FINAL CHECKS =====
echo "Checking container status..."
docker-compose ps

echo "=== Deployment completed successfully ==="
echo "Application should be available at http://localhost:80"

