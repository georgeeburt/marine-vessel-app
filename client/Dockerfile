FROM node:23-slim AS base

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /client

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

EXPOSE 5173

CMD ["pnpm", "dev", "--host", "0.0.0.0"]