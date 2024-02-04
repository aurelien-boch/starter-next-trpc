import type { DemoRepository } from "../../../domain/demo/demo-repository";
import type { Demo } from "../../../domain/demo/demo";
import type { DemoId } from "../../../domain/demo/demo-id";

export class InMemoryDemoRepository implements DemoRepository {
    private demos: Demo[] = [];

    async findById(id: DemoId): Promise<Demo | null> {
        return this.demos.find(demo => demo.id().isSame(id)) ?? null;
    }

    async save(aggregate: Demo): Promise<void> {
        this.demos = this.demos.filter(demo => !demo.id().isSame(aggregate.id()));
        this.demos.push(aggregate);
    }

    listDemo(): Promise<Demo[]> {
        return Promise.resolve(this.demos);
    }
}
