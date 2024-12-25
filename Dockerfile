# syntax=docker/dockerfile:1

FROM node:lts-alpine AS base

RUN npm install -g npm@latest && npm install -g pnpm@latest

WORKDIR /app

FROM base AS build

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

ADD . /app

ARG NUXT_API_ACCES_LIBRE_KEY
ENV NUXT_API_ACCES_LIBRE_KEY=$NUXT_API_ACCES_LIBRE_KEY

RUN pnpm run build

FROM base

COPY --from=build /app/.output ./.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]