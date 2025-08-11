FROM node:18-alpine as builder

WORKDIR /app

# 1. Nur Abhängigkeiten kopieren (für Caching)
COPY package.json package-lock.json ./

# 2. Install mit Legacy-Peer-Deps als Fallback
RUN npm ci --legacy-peer-deps || \
    (echo "Fallback zu npm install..." && npm install --legacy-peer-deps)

# 3. Rest kopieren
COPY . .

# 4. Build
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html