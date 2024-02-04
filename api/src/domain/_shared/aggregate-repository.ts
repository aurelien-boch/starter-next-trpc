import type { Id } from "../_services/id/id";

import type { Aggregate } from "./aggregate";

export interface AggregateRepository<
    Agg extends Aggregate<Id<string>>,
    AggregateId = Agg extends Aggregate<infer AggregateId> ? AggregateId : never
> {
    save(aggregate: Agg): Promise<void>;
    findById(id: AggregateId): Promise<Agg | null>;
}
