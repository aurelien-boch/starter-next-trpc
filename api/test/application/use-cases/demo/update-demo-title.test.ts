import "jest";

import { faker } from "@faker-js/faker";

import { DemoMockRepository } from "../../../_mocks/infrastructure/persistence/demo-mock-repository";
import { DemoId } from "../../../../src/domain/demo/demo-id";
import { Demo } from "../../../../src/domain/demo/demo";
import updateTitle from "../../../../src/application/use-cases/demo/update-demo-title";
import type { Context } from "../../../../src/application/_shared/context";
import {
    ApplicationError,
    ApplicationErrors
} from "../../../../src/application/_shared/application-error";
import { UpdateDeletedObjectError } from "../../../../src/domain/_shared/time-trackable-object/exceptions/update-deleted-object-error";

const mockDemo = (demoId: DemoId) =>
    new Demo(
        faker.person.bio(),
        demoId,
        faker.date.past({ years: 2 }),
        faker.date.past({ years: 1 }),
        null
    );

describe("application/use-cases/demo/update-demo-title", () => {
    const demoRepository: DemoMockRepository = new DemoMockRepository();
    let demoId: DemoId;
    const context: Context = {
        repositories: { demo: demoRepository }
    } as unknown as Context;

    beforeEach(() => {
        demoRepository.clear();
        demoId = new DemoId(faker.string.uuid());
        demoRepository.save(mockDemo(demoId));
    });

    it("Should update the title of the demo", async () => {
        const oldTitle = await demoRepository
            .findById(demoId)
            .then((e) => e?.title() || null);
        const newTitle = faker.person.bio();

        await updateTitle(context)({ newTitle, demoId });

        const fetchedNewTitle = await demoRepository
            .findById(demoId)
            .then((e) => e?.title() || null);
        expect(fetchedNewTitle).toBe(newTitle);
        expect(fetchedNewTitle).not.toBe(oldTitle);
    });

    it("Should throw an error when trying to update the title of a non-existing demo", async () => {
        const nonExistingDemoId = new DemoId(faker.string.uuid());
        const newTitle = faker.person.bio();

        await expect(
            updateTitle(context)({ newTitle, demoId: nonExistingDemoId })
        ).rejects.toThrow(
            new ApplicationError({
                code: ApplicationErrors.DEMO_NOT_FOUND,
                additional_client_information: "Demo not found",
                logging_information: `Demo not found with id: ${demoId}`
            })
        );
    });

    it("Should throw an error when trying to update the title of a deleted demo", async () => {
        const deletedDemo = await demoRepository.findById(demoId);
        deletedDemo?.delete();
        await demoRepository.save(deletedDemo!);
        const newTitle = faker.person.bio();

        await expect(
            updateTitle(context)({ newTitle, demoId })
        ).rejects.toThrow(UpdateDeletedObjectError);
    });
});
