# Etapa 1: Build de Astro
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Etapa 2: Servidor estático
FROM node:20-alpine AS runner

WORKDIR /app
RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 4321
CMD ["serve", "dist", "-l", "4321"]