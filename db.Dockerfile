FROM postgres:16-alpine

COPY api/package.json api/tsconfig.json api/
COPY api/migrations api/migrations
COPY yarn.lock package.json ./

RUN apk add --no-cache --virtual .build-deps \
    nodejs \
    yarn \
    && yarn workspace api install --frozen-lockfile --non-interactive \
    && mkdir -p api/src/ \
    && touch api/src/index.ts \
    && yarn workspace api build \
    && rm -rf node_modules api/node_modules \
    && yarn install --frozen-lockfile --non-interactive --production \
    && yarn cache clean \
    && apk del yarn \
    && rm -rf /var/cache/apk/* \
    && chmod -R 777 /node_modules \
    && chmod -R 777 /api \
    && chmod -R 777 /package.json \
    && chmod -R 777 /yarn.lock

COPY scripts/run-migration-on-docker-db.sh /docker-entrypoint-initdb.d/1.sh
