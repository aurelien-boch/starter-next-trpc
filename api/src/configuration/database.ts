import type { QueryResultRow } from "pg";
import { Pool } from "pg";

import env from "./env";

const pg = new Pool({
    port: env.POSTGRES_PORT,
    host: env.POSTGRES_HOST,
    database: env.POSTGRES_DATABASE,
    password: env.POSTGRES_PASSWORD,
    user: env.POSTGRES_USER,
    // eslint-disable-next-line no-console
    log: console.log // This is a hack to get the queries logged to the console
});

export const pgQuery = async <RowType extends QueryResultRow>(query: string, values: unknown[] = []) => {
    const client = await pg.connect();

    try {
        return await client.query<RowType>(query, values);
    } finally {
        client.release();
    }
};

// This is only used in tests (or will be used in graceful shutdown)
// eslint-disable-next-line import/no-unused-modules
export const disconnectPg = async () => {
    await pg.end();
};
