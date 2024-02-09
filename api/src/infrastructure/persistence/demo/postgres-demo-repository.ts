import type { DemoRepository } from "../../../domain/demo/demo-repository";
import type { Demo } from "../../../domain/demo/demo";
import type { DemoId } from "../../../domain/demo/demo-id";
import type { pgQuery } from "../../../configuration/database";
import { InfrastructureError, InfrastructureErrors } from "../../_shared/infrastructure-error";

import type { DemoDto } from "./demo-dto";
import { hydrateDemo } from "./demo-dto";


export class PostgresDemoRepository implements DemoRepository {
    async findById(_id: DemoId): Promise<Demo | null> {
        const res = await this.pgQueryFunction<DemoDto>(
            `
                select
                    id,
                    title,
                    created_at,
                    updated_at,
                    deleted_at
                from
                    demo
                where
                    id = $1
            `,
            [_id.valueWithoutPrefix]
        );
        const demo = res.rows[0];

        return demo ? hydrateDemo(demo) : null;
    }

    async listDemo(): Promise<Demo[]> {
        const res = await this.pgQueryFunction<DemoDto>(
            `
                select
                    id,
                    title,
                    created_at,
                    updated_at,
                    deleted_at
                from
                    demo
                where
                    deleted_at is null
            `,
            []
        );

        return res.rows.map(hydrateDemo);
    }

    async save(aggregate: Demo): Promise<void> {
        const res = await this.pgQueryFunction(
            `
                insert into
                    demo
                    (
                        id,
                        title,
                        created_at,
                        updated_at,
                        deleted_at
                    )
                values
                    (
                        $1,
                        $2,
                        $3,
                        $4,
                        $5
                    )
                on conflict (id) do update set (title, updated_at, deleted_at) = ($2, $4, $5);
            `,
            [
                aggregate.id().valueWithoutPrefix,
                aggregate.title(),
                aggregate.createdAt(),
                aggregate.updatedAt(),
                aggregate.deletedAt()
            ]
        );

        if (res.rowCount !== 1)
            throw new InfrastructureError({
                code: InfrastructureErrors.FAILED_TO_SAVE,
                additional_client_information: "Failed to save demo",
                logging_information: JSON.stringify(res)
            });
    }

    constructor(
        private readonly pgQueryFunction: typeof pgQuery
    ) {
    }
}
