FROM node:20.0-alpine3.17 AS base
FROM base AS builder

WORKDIR /app

COPY package.json yarn.lock ./
COPY api/package.json api/tsconfig.json api/tsconfig.json api/
COPY api/src api/src/

RUN yarn install --frozen-lockfile --non-interactive \
    && yarn workspace api run build

FROM base AS runner

WORKDIR /app

COPY --from=builder /app/api/dist ./api/dist
COPY package.json yarn.lock ./
COPY api/package.json api/

RUN yarn install --frozen-lockfile --non-interactive --production \
    && yarn cache clean

CMD ["node", "api/dist/index.js"]
