FROM node:20.9.0-alpine3.17 as Builder

WORKDIR /app
COPY package.json yarn.lock tsconfig.json app.ts ./
COPY src ./src/

RUN yarn install --frozen-lockfile && yarn build

FROM node:20.9.0-alpine3.17

WORKDIR /api
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production && yarn cache clean
COPY --from=Builder /app/dist .

CMD ["node", "app.js"]
