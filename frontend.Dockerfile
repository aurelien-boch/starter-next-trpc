FROM node:20.0-alpine3.17 AS base
FROM base AS builder

WORKDIR /app

COPY package.json yarn.lock ./
COPY frontend/ frontend/
COPY api/ api/

ENV NEXT_PUBLIC_API_URL=http://localhost:3000/api

RUN yarn workspace frontend install -- --frozen-lockfile
RUN yarn workspace frontend build

FROM base AS runner

WORKDIR /app

COPY package.json yarn.lock ./
COPY frontend/package.json ./frontend/package.json

RUN yarn workspace frontend install -- --frozen-lockfile --production \
    && yarn cache clean

COPY --from=builder /app/frontend/.next ./frontend/.next
COPY --from=builder /app/frontend/public ./frontend/public
COPY --from=builder /app/frontend/next.config.js ./frontend/next.config.js

CMD ["yarn", "workspace", "frontend", "start"]

