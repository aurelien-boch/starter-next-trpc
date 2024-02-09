/* eslint-disable @typescript-eslint/naming-convention */
import type { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`
        CREATE TABLE IF NOT EXISTS demo
        (
            id         uuid not null PRIMARY KEY,
            title      text not null,
            created_at timestamp not null,
            updated_at timestamp not null,
            deleted_at timestamp
        );
    `);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`
        DROP TABLE IF EXISTS demo;
    `);
}
