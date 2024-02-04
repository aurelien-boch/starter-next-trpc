import "jest";

import { faker } from "@faker-js/faker";

import { DemoMockRepository } from "../../../_mocks/infrastructure/persistence/demo-mock-repository";
import { DemoId } from "../../../../src/domain/demo/demo-id";
import { Demo } from "../../../../src/domain/demo/demo";
import deleteDemo from "../../../../src/application/use-cases/demo/delete-demo";
import type { Context } from "../../../../src/application/_shared/context";
import {
    DeleteAlreadyDeletedObjectError
} from "../../../../src/domain/_shared/time-trackable-object/exceptions/delete-already-deleted-object-error";

const mockDemo = (demoId: DemoId) => new Demo(
    faker.person.bio(),
    demoId,
    faker.date.past({ years: 2 }),
    faker.date.past({ years: 1 }),
    null
);

describe("application/use-cases/demo/delete-demo", () => {
    const demoRepository: DemoMockRepository = new DemoMockRepository();
    let demoId: DemoId;
    const context: Context = { repositories: { demo: demoRepository } } as unknown as Context;

    beforeEach(() => {
        demoRepository.clear();
        demoId = new DemoId(faker.string.uuid());
        demoRepository.save(mockDemo(demoId));
    });

    it("Should delete the demo", async () => {
        await deleteDemo(context)({ demoId });

        const fetchedDemo = await demoRepository.findById(demoId);
        expect(fetchedDemo?.isDeleted()).toBe(true);
    });

    it("Should throw an error when trying to delete a non-existing demo", async () => {
        const nonExistingDemoId = new DemoId(faker.string.uuid());

        await expect(deleteDemo(context)({ demoId: nonExistingDemoId })).rejects.toThrow();
    });

    it("Should throw an error when trying to delete a deleted demo", async () => {
        const deletedDemo = await demoRepository.findById(demoId);
        deletedDemo?.delete();
        await demoRepository.save(deletedDemo!);

        await expect(deleteDemo(context)({ demoId })).rejects.toThrow(DeleteAlreadyDeletedObjectError);
    });
});
