
import type { DemoRepository } from "../../../../src/domain/demo/demo-repository";
import type { Demo } from "../../../../src/domain/demo/demo";
import type { DemoId } from "../../../../src/domain/demo/demo-id";

export class DemoMockRepository implements DemoRepository {
    private demos: Demo[] = [];

    findById(id: DemoId): Promise<Demo | null> {
        return Promise.resolve(this.demos.find(e => e.id().isSame(id)) || null);
    }

    listDemo(): Promise<Demo[]> {
        return Promise.resolve(this.demos);
    }

    save(aggregate: Demo): Promise<void> {
        this.demos = this.demos.filter(e => !e.id().isSame(aggregate.id()));
        this.demos.push(aggregate);
        return Promise.resolve();
    }

    clear() {
        this.demos = [];
    }
}
