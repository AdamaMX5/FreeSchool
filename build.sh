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

# Function to load environment variables
load_env() {
    if [ -f .env ]; then
        # Backup original values
        OLD_DOMAIN="$DOMAIN" 2>/dev/null || true
        
        # Load .env file
        set -a
        source .env
        set +a
        
        # Use old domain if new one is not set
        DOMAIN="${DOMAIN:-$OLD_DOMAIN}"
        DOMAIN="${DOMAIN:-localhost}"
        
        echo "Loaded domain: $DOMAIN"
    else
        DOMAIN="localhost"
    fi
}

# Load existing environment if available
load_env

# Check for .env file and create if missing
if [ ! -f .env ]; then
    echo "Creating .env file with default values..."
    
    # Generate secure random values
    SECRET_KEY=$(openssl rand -hex 32)
    
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
API_BASE_URL=http://localhost:8000
SECRET_KEY=$SECRET_KEY
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
SMTP_SERVER=smtp.strato.de
SMTP_PORT=465
SMTP_USERNAME=newsletter@flussmark.de
SMTP_PASSWORD=your_password
FROM_EMAIL=freeschool@flussmark.de
FROM_NAME=FreeSchool

# ===== FRONTEND-SPEZIFISCH =====
VITE_API_BASE_URL=http://localhost:8000
EOL
    echo ".env file created with default values"
    
    # Prompt admin to edit the file
    echo ""
    echo "=== IMPORTANT ==="
    echo "Please edit the .env file with your actual domain and configuration values:"
    echo "nano .env"
    echo ""
    echo "Key values to update:"
    echo "- DOMAIN: Your actual domain (e.g., freischule.info)"
    echo "- DB_PASSWORD: Secure database password"
    echo "- SMTP_PASSWORD: Your email password"
    echo "- API_BASE_URL: Your actual API URL"
    echo "- VITE_API_BASE_URL: Your actual frontend API URL"
    echo ""
    read -p "Press Enter after you have edited the .env file, or Ctrl+C to cancel..."
    
    # Reload environment with new values
    load_env
else
    echo "Using existing .env file"
    # Ensure domain is loaded
    load_env
fi

# Replace placeholders with actual domain values
echo "Configuring domain: $DOMAIN"

# Update API_BASE_URL if it contains placeholder
if grep -q "{DOMAIN}" .env; then
    sed -i "s|{DOMAIN}|$DOMAIN|g" .env
    echo "Updated API_BASE_URL placeholder"
fi

# Update VITE_API_BASE_URL if it contains placeholder
if grep -q 'VITE_API_BASE_URL=.*\${DOMAIN}' .env; then
    sed -i "s|VITE_API_BASE_URL=.*|VITE_API_BASE_URL=https://api.$DOMAIN|g" .env
    echo "Updated VITE_API_BASE_URL placeholder"
fi

# Reload environment with final values
load_env

echo "Final configuration:"
echo "- Domain: $DOMAIN"
echo "- API Base URL: $API_BASE_URL"
echo "- Frontend API URL: $VITE_API_BASE_URL"

# Stop and remove any existing containers
echo "Stopping and removing any existing containers..."
docker-compose down --remove-orphans

# Check if using local database
DB_URL=$(grep DATABASE_URL .env 2>/dev/null | cut -d '=' -f2 || echo "")
if [[ -z "$DB_URL" || $DB_URL == *"localhost"* || $DB_URL == *"db"* ]]; then
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

# ===== SSL CERTIFICATE SETUP ===== (FRÜHER!)
echo "=== Setting up SSL Certificate ==="

# Only setup SSL if not using localhost
if [ "$DOMAIN" != "localhost" ]; then
    # Certbot installieren falls nicht vorhanden
    if ! command -v certbot &> /dev/null; then
        echo "Installing Certbot..."
        sudo apt update
        sudo apt install -y certbot python3-certbot-nginx
    fi

    # Zertifikat erstellen oder erneuern
    if [ -d "/etc/letsencrypt/live/$DOMAIN" ]; then
        echo "Renewing SSL certificate for $DOMAIN..."
        sudo certbot renew --quiet
    else
        echo "Creating SSL certificate for $DOMAIN..."
        sudo certbot certonly --standalone -d $DOMAIN -d api.$DOMAIN --non-interactive --agree-tos -m freischule@flussmark.de
    fi
else
    echo "Skipping SSL setup for localhost"
fi

# ===== BUILD AND START =====
echo "Building and starting containers..."
docker-compose up -d --build

echo "Creating database tables..."
docker exec -it freeschool_backend python create_tables.py

# ===== NGINX REVERSE PROXY SETUP =====
if [ "$DOMAIN" != "localhost" ]; then
    echo "=== Configuring Nginx Reverse Proxy for $DOMAIN ==="
    
    # Nginx Konfiguration erstellen
    sudo tee /etc/nginx/sites-available/freischule > /dev/null << EOL
# HTTP redirect to HTTPS
server {
    listen 80;
    server_name $DOMAIN api.$DOMAIN;
    return 301 https://\$server_name\$request_uri;
}

# HTTPS Configuration - Frontend
server {
    listen 443 ssl;
    server_name $DOMAIN;
    
    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}

# HTTPS Configuration - Backend API
server {
    listen 443 ssl;
    server_name api.$DOMAIN;
    
    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    
    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
		
		proxy_redirect http://localhost:8000/ https://api.$DOMAIN/;
		proxy_redirect http://\$host:8000/ https://\$host/;
        
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
else
    echo "Skipping Nginx setup for localhost"
fi

# ===== FINAL CHECKS =====
echo "Checking container status..."
docker-compose ps

echo "=== Deployment completed successfully ==="
if [ "$DOMAIN" != "localhost" ]; then
    echo "Application should be available at:"
    echo "- Frontend: https://$DOMAIN"
    echo "- Backend API: https://api.$DOMAIN"
else
    echo "Application should be available at http://localhost:8080"
    echo "Backend API should be available at http://localhost:8000"
fi
