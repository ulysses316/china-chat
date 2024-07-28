FROM node:20.14

WORKDIR /app

COPY package*.json .

RUN corepack enable pnpm

ARG MONGODB_URI
ENV MONGODB_URI=${MONGODB_URI}

RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]
