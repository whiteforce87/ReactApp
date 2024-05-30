# Stage 1: Build the React app
FROM node:18.19.1-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

USER appuser

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN chown -R appuser:appgroup /app

ENV CI=false

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the built app with nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]