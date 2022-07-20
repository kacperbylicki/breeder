# Base build
FROM --platform=linux/amd64 node:16-alpine AS base

RUN mkdir -p /app

WORKDIR /app

COPY package.json ./

COPY ./src/ ./src/

RUN yarn

# Development build
FROM --platform=linux/amd64 node:16-alpine AS development

WORKDIR /app

COPY --from=base /app /app

ENTRYPOINT ["yarn", "dev"]