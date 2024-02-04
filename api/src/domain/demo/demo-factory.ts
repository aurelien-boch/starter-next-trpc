import type { IdService } from "../_services/id/id-service";

import { Demo } from "./demo";
import { DemoId } from "./demo-id";

type DemoCreateParams = {
    title: string;
}

export class DemoFactory {
    constructor(
        private readonly _idService: IdService
    ) {
    }

    public create(params: DemoCreateParams) {
        return new Demo(
            params.title,
            this._idService.generate(DemoId),
            new Date(),
            new Date(),
            null
        );
    }
}
