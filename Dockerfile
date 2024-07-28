FROM node:20.14

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el package.json y pnpm-lock.yaml (si lo tienes)
COPY package*.json .

# Habilitar pnpm
RUN corepack enable pnpm

ARG MONGODB_URI
ENV MONGODB_URI=${MONGODB_URI}

# Instalar las dependencias del proyecto
RUN pnpm install

# Copiar el resto de la aplicación
COPY . .

# Construir la aplicación Next.js
# RUN pnpm build

# Exponer el puerto en el que la aplicación correrá
EXPOSE 3000

# Comando para ejecutar la aplicación en modo de producción
CMD ["pnpm", "dev"]
