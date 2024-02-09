FROM node:20.0-alpine3.17 as builder

WORKDIR /app

COPY package.json yarn.lock ./
COPY api/package.json api/tsconfig.base.json api/tsconfig.build.json api/
COPY api/src api/src/

RUN yarn install --frozen-lockfile --non-interactive \
    && yarn workspace api run build

FROM node:20.0-alpine3.17

WORKDIR /app

COPY --from=builder /app/api/dist ./api/dist
COPY package.json yarn.lock ./
COPY api/package.json api/

RUN yarn install --frozen-lockfile --non-interactive --production \
    && yarn cache clean

CMD ["node", "api/dist/index.js"]
