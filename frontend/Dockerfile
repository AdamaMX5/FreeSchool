FROM node:23-alpine as builder

# Install dependencies
RUN apk add --no-cache git python3 make g++

WORKDIR /app

# Configure npm
RUN npm config set registry https://registry.npmjs.org/
ENV HUSKY=0

# Pakete installieren
COPY package.json ./
RUN npm install --legacy-peer-deps --no-optional --ignore-scripts
RUN npx rollup --version || npm install rollup@latest --no-save

# Rest kopieren
COPY . .

# Build the app with production mode
ENV NODE_ENV=production
RUN npm run build

FROM nginx:alpine

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Ensure nginx can access the files
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html
