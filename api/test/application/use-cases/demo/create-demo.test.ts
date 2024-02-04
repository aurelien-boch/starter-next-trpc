import "jest";

import { faker } from "@faker-js/faker";

import { DemoMockRepository } from "../../../_mocks/infrastructure/persistence/demo-mock-repository";
import type { Context } from "../../../../src/application/_shared/context";
import createDemo from "../../../../src/application/use-cases/demo/create-demo";
import { DemoFactory } from "../../../../src/domain/demo/demo-factory";
import { MockIdService } from "../../../_mocks/application/services/id-service";

describe("application/use-cases/demo/delete-demo", () => {
    const demoRepository: DemoMockRepository = new DemoMockRepository();
    const context: Context = {
        repositories: {
            demo: demoRepository
        },
        factories: {
            demo: new DemoFactory(new MockIdService())
        }
    } as unknown as Context;

    beforeEach(() => {
        demoRepository.clear();
    });

    it("Should create a demo using factory", async () => {
        const title = faker.person.bio();
        const id = await createDemo(context)({ title });

        const fetchedDemo = await demoRepository.findById(id);
        expect(fetchedDemo?.isDeleted()).toBe(false);
        expect(fetchedDemo?.title()).toBe(title);
    });
});
