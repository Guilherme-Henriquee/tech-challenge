# ---- Build stage ----
FROM node:18-alpine AS build
WORKDIR /app

# VITE_API_URL precisa existir em build-time, pois o Vite "embute" as
# variaveis de ambiente no bundle estatico durante o build.
ARG VITE_API_URL=http://localhost:3001
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---- Runtime stage (Nginx serving the static build) ----
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
