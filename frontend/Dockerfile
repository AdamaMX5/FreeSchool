FROM node:23-alpine as builder

# 1. Git und Python für node-gyp installieren
RUN apk add --no-cache git python3 make g++

WORKDIR /app

# 2. Temporär auf npm registry wechseln (falls GitHub Probleme macht)
RUN npm config set registry https://registry.npmjs.org/

# 3. Husky im Container deaktivieren (keine Git-Hooks im Build nötig)
ENV HUSKY=0

# 4. Pakete installieren
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps --no-optional --ignore-scripts

# 5. Rest kopieren und builden
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
