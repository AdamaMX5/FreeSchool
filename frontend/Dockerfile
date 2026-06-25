FROM node:23-alpine as builder

ARG APP_VERSION
ENV APP_VERSION=$APP_VERSION

RUN apk add --no-cache git python3 make g++

WORKDIR /app

RUN npm config set registry https://registry.npmjs.org/
ENV HUSKY=0

COPY package.json ./
RUN npm install --legacy-peer-deps

COPY . .

ENV NODE_ENV=production
RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

RUN chown -R nginx:nginx /usr/share/nginx/html &&     chmod -R 755 /usr/share/nginx/html
