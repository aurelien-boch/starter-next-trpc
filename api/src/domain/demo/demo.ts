import { TimeTrackableObject } from "../_shared/time-trackable-object/time-trackable-object";

import type { DemoId } from "./demo-id";

export class Demo extends TimeTrackableObject {
    constructor(
        private _title: string,
        private readonly _id: DemoId,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date | null
    ) {
        super(createdAt, updatedAt, deletedAt);
    }

    public title() {
        return this._title;
    }

    public setTitle(title: string) {
        this._title = title;
        this.updateUpdatedAt();
    }

    public id() {
        return this._id;
    }
}
