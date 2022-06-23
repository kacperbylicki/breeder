# Base build
FROM --platform=linux/amd64 node:16-alpine AS base

RUN mkdir -p /app

ENV NODE_ENV base

WORKDIR /app

COPY package.json tsconfig*.json nest-cli.json ./

COPY ./src/ ./src/

RUN yarn

# Development build
FROM --platform=linux/amd64 node:16-alpine AS development

WORKDIR /app

ENV NODE_ENV development

COPY --from=base /app /app

ENTRYPOINT ["yarn", "start:dev"]

# Production build
FROM node:16-alpine AS production

WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --chown=node:node --from=base /app .

RUN yarn --production

USER node

CMD ["node", "lib/main"]