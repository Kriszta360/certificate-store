FROM node:22-alpine AS build
WORKDIR /app

COPY ["certificate-frontend/package*.json", "./"]
RUN npm install

COPY certificate-frontend/ .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/certificate-frontend/browser /usr/share/nginx/html

EXPOSE 80