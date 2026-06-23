# Etapa 1: Construir el Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
# Copiar dependencias y código
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Etapa 2: Preparar el Backend y servir
FROM node:20-alpine
WORKDIR /app/backend
# Copiar dependencias del backend
COPY backend/package*.json ./
RUN npm install --omit=dev
COPY backend/ ./

# Copiar el frontend ya construido (dist) desde la Etapa 1
COPY --from=frontend-builder /app/frontend/dist /app/frontend/dist

# Exponer el puerto donde corre Express
EXPOSE 5000

# Comando para iniciar la aplicación
CMD ["node", "server.js"]
