import { UuidIdService } from "../infrastructure/services/domain/uuid-id/uuid-id-service";
import { InMemoryDemoRepository } from "../infrastructure/persistence/demo/in-memory-demo-repository";
import { DemoFactory } from "../domain/demo/demo-factory";
import type { ApiContext } from "../api/_shared/api-context";
import { ConsoleLoggingService } from "../infrastructure/services/application/logging/console-logging-service";

const buildContext = (): ApiContext => {
    const idService = new UuidIdService();

    return {
        repositories: {
            demo: new InMemoryDemoRepository()
        },
        factories: {
            demo: new DemoFactory(idService)
        },
        services: {
            application: {
                logging: new ConsoleLoggingService()
            },
            domain: {
                id: idService
            },
            api: null as never
        }
    };
};

export default buildContext;
