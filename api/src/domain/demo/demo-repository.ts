import type { BaseRepository } from "../_shared/base-repository";

import type { Demo } from "./demo";
import type { DemoId } from "./demo-id";

export interface DemoRepository extends BaseRepository<Demo, DemoId> {
    listDemo(): Promise<Demo[]>;
}
