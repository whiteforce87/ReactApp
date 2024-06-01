# Stage 1: Build the React app
FROM node:18.19.1-alpine AS build

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Kullanıcıya ait olan tüm dosyaları kopyala
COPY --chown=appuser:appgroup package.json ./
COPY --chown=appuser:appgroup package-lock.json ./

ENV CI=false

RUN npm install

COPY --chown=appuser:appgroup . .

RUN npm run build

# Stage 2: Serve the built app with nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]