# Starter

This is a starter template for a web application using tRPC as backend & Next.js as frontend.
It is a monorepo using yarn workspaces that set up various tools for development such as Jest, ESLint, Docker, TypeScript, etc.


## Getting Started

1. Clone the repository
2. Run `yarn install`
3. Run `docker compose up db` to start the database
4. Run `yarn workspace api run start` to start the tRPC development server
5. Run `yarn workspace frontend run dev` to start the Next.js development server
6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Workspaces
### api

The `api` workspace contains the tRPC backend. The backend is built using tRPC and is located in the `api` directory.

#### Commands
- `yarn workspace api run start` - Start the tRPC development server
- `yarn workspace api run build` - Build the tRPC backend
- `yarn workspace api run test:nodb` - Run tests for the tRPC backend excluding database tests
- `yarn workspace api run test:db` - Run database tests for the tRPC backend
- `yarn workspace api run lint` - Lint the tRPC backend using eslint
- `yarn workspace api run migration:up` - Run database migrations
- `yarn workspace api run migration:down` - Rollback database migrations
- `yarn workspace api run migration:gen` - Create a new database migration

#### Testing

Testing for this backend is done using Jest. The tests are located in the `api/tests` directory.
For database tests to work, a database must be running. There is a docker-compose.db-tests.yml file that can be used to
start database tests (It automatically starts the database and runs the tests).

### frontend

The `frontend` workspace contains the Next.js frontend. The frontend is located in the `frontend` directory.

#### Commands
- `yarn workspace frontend run dev` - Start the Next.js development server
- `yarn workspace frontend run build` - Build the Next.js frontend
- `yarn workspace frontend run lint` - Lint the Next.js frontend using ESLint
- `yarn workspace frontend run typesafe-i18n` - Generate types for i18n translations

#### Translations

Translations are done using `typesafe-i18n`.
The translations are located in the `frontend/src/locales` directory.
To generate types for the translations, run `yarn workspace frontend run typesafe-i18n`.
This will generate types for the
translations.

## Docker compose

The api and frontend workspaces have their own Dockerfiles and can be run using docker compose.
The `docker-compose.yml` file
at the root of the project can be used to start the entire project.
It starts the database, the tRPC backend and the Next.js
frontend.

## Database

The database used in this project is Postgres. There is a dockerfile at the root of this project creating a Postgres database
and automatically running the migrations. The database is started using the `docker-compose.yml` file at the root of the project.

## Learn More

To learn more about tRPC and Next.js, take a look at the following resources:

### tRPC
- [tRPC documentation](https://trpc.io/docs)
- [tRPC GitHub repository](https://github.com/trpc/trpc)

### Next.js
- [Next.js documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub repository](https://github.com/vercel/next.js)

### Typesafe-i18n
- [typesafe-i18n GitHub repository](https://github.com/ivanhofer/typesafe-i18n)
- [typesafe-i18n documentation](https://typesafe-i18n.pages.dev/)

### ESLint
- [ESLint documentation](https://eslint.org/docs/user-guide/getting-started)
- [ESLint GitHub repository](https://github.com/eslint/eslint)

### Jest
- [Jest documentation](https://jestjs.io/docs/getting-started)
- [Jest GitHub repository](https://github.com/jestjs/jest)
