import { Id } from "../_services/id/id";

export class DemoId extends Id<"DEMO"> {
    constructor(
        value: string | `DEMO_${string}`
    ) {
        super(value, "DEMO");
    }
}
