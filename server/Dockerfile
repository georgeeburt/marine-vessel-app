FROM node:23-slim AS base

RUN apt-get update -y && apt-get install -y openssl ca-certificates

RUN corepack enable && corepack prepare pnpm@10 --activate

WORKDIR /server

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY ./prisma ./prisma/

RUN pnpm prisma generate

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "pnpm prisma migrate deploy && (pnpm seed || true) && pnpm dev"]