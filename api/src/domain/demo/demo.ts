import { Aggregate } from "../_shared/aggregate";

import type { DemoId } from "./demo-id";

export class Demo extends Aggregate<DemoId> {
    constructor(
        private _title: string,
        id: DemoId,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date | null
    ) {
        super(id, createdAt, updatedAt, deletedAt);
    }

    public title() {
        return this._title;
    }

    public setTitle(title: string) {
        this._title = title;
        this.updateUpdatedAt();
    }
}
