import type { AggregateRepository } from "../_shared/aggregate-repository";

import type { Demo } from "./demo";

export interface DemoRepository extends AggregateRepository<Demo> {
    listDemo(): Promise<Demo[]>;
}
