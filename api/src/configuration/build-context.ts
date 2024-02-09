import { UuidIdService } from "../infrastructure/services/domain/uuid-id/uuid-id-service";
import { PostgresDemoRepository } from "../infrastructure/persistence/demo/postgres-demo-repository";
import { DemoFactory } from "../domain/demo/demo-factory";
import type { ApiContext } from "../api/_shared/api-context";
import { ConsoleLoggingService } from "../infrastructure/services/application/logging/console-logging-service";

import { pgQuery } from "./database";

const buildContext = (): ApiContext => {
    const idService = new UuidIdService();

    return {
        repositories: {
            demo: new PostgresDemoRepository(pgQuery)
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
