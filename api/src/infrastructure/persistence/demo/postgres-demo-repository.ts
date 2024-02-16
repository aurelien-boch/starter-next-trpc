import type { DemoRepository } from "../../../domain/demo/demo-repository";
import type { Demo } from "../../../domain/demo/demo";
import type { DemoId } from "../../../domain/demo/demo-id";
import type { pgQuery } from "../../../configuration/database";
import {
    InfrastructureError,
    InfrastructureErrors
} from "../../_shared/infrastructure-error";

import type { DemoDto } from "./demo-dto";
import { hydrateDemo } from "./demo-dto";
import findByIdQuery from "./queries/postgres/find-by-id";
import listDemoQuery from "./queries/postgres/list-demo";
import saveQuery from "./queries/postgres/save";

export class PostgresDemoRepository implements DemoRepository {
    async findById(id: DemoId): Promise<Demo | null> {
        const res = await this.pgQueryFunction<DemoDto>(findByIdQuery, [
            id.valueWithoutPrefix
        ]);
        const demo = res.rows[0];

        return demo ? hydrateDemo(demo) : null;
    }

    async listDemo(): Promise<Demo[]> {
        const res = await this.pgQueryFunction<DemoDto>(listDemoQuery, []);

        return res.rows.map(hydrateDemo);
    }

    async save(aggregate: Demo): Promise<void> {
        const res = await this.pgQueryFunction(saveQuery, [
            aggregate.id().valueWithoutPrefix,
            aggregate.title(),
            aggregate.createdAt(),
            aggregate.updatedAt(),
            aggregate.deletedAt()
        ]);

        if (res.rowCount !== 1)
            throw new InfrastructureError({
                code: InfrastructureErrors.FAILED_TO_SAVE,
                additional_client_information: "Failed to save demo",
                logging_information: JSON.stringify(res)
            });
    }

    constructor(private readonly pgQueryFunction: typeof pgQuery) {}
}
