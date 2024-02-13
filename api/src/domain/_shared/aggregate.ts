import type { Id } from "../_services/id/id";

import { TimeTrackableObject } from "./time-trackable-object/time-trackable-object";

export abstract class Aggregate<
    AggregateId extends Id<string>
> extends TimeTrackableObject {
    protected constructor(
        private readonly _id: AggregateId,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date | null
    ) {
        super(createdAt, updatedAt, deletedAt);
    }

    public id(): AggregateId {
        return this._id;
    }
}
