# syntax=docker/dockerfile:1

ARG NODE_VERSION=21.0.0

ARG PORT=3000

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /

FROM base as build

COPY package.json /
COPY pnpm-lock.yaml /

# Install pnpm
RUN npm install -g pnpm

# Install all depencies
RUN pnpm install

ADD . /

# Add ARG
ARG NUXT_API_ENTREPRISES_GOUV


# Add ENV
ENV NUXT_API_ENTREPRISES_GOUV=$NUXT_API_ENTREPRISES_GOUV

RUN pnpm run build

FROM base

EXPOSE $PORT

COPY --from=build /.output /.output

CMD ["node", ".output/server/index.mjs"]