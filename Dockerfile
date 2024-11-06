# Etapa de construcción
FROM node:18-alpine as build

WORKDIR /app

# Actualizar npm a la versión 10.9.0
RUN npm install -g npm@10.9.0

# Copiar y instalar dependencias
COPY package*.json ./

# Limpia y reinstala dependencias si es necesario
RUN npm install

COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
