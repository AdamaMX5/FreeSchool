FROM node:18-alpine as builder

# 1. Git und Python für node-gyp installieren
RUN apk add --no-cache git python3 make g++

WORKDIR /app

# 2. Temporär auf npm registry wechseln (falls GitHub Probleme macht)
RUN npm config set registry https://registry.npmjs.org/

# 3. Pakete installieren
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps --no-optional || \
    (echo "Fallback zu npm install..." && npm install --legacy-peer-deps --no-optional)

# 4. Rest kopieren und builden
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf