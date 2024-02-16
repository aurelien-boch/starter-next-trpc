import type { Id } from "../_services/id/id";

export interface BaseRepository<Agg, AggregateId extends Id<string>> {
    save(aggregate: Agg): Promise<void>;
    findById(id: AggregateId): Promise<Agg | null>;
}
