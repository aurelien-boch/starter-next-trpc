import type { DemoFactory } from "../../domain/demo/demo-factory";
import type { DemoRepository } from "../../domain/demo/demo-repository";
import type { IdService } from "../../domain/_services/id/id-service";
import type { LoggingService } from "../services/logging/logging-service";

type Factories = {
    demo: DemoFactory;
};

type Services = {
    domain: {
        id: IdService;
    };
    application: {
        logging: LoggingService;
    };
};

type Repositories = {
    demo: DemoRepository;
};

export type Context = {
    factories: Factories;
    services: Services;
    repositories: Repositories;
};
