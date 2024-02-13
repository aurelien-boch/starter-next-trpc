import "jest";
import { faker } from "@faker-js/faker";

import { Demo } from "../../../src/domain/demo/demo";
import { DemoId } from "../../../src/domain/demo/demo-id";
import { UpdateDeletedObjectError } from "../../../src/domain/_shared/time-trackable-object/exceptions/update-deleted-object-error";

describe("domain/demo/demo", () => {
    let demo: Demo;

    beforeEach(() => {
        demo = new Demo(
            faker.person.bio(),
            new DemoId(faker.string.uuid()),
            faker.date.past({ years: 2 }),
            faker.date.past({ years: 1 }),
            null
        );
    });

    it("Should update demo title", () => {
        const newTitle = faker.person.bio();
        demo.setTitle(newTitle);

        expect(demo.title()).toEqual(newTitle);
    });

    it("Should update updating date when title is updated", () => {
        const newTitle = faker.person.bio();
        demo.setTitle(newTitle);

        expect(demo.updatedAt).not.toStrictEqual(demo.createdAt);
    });

    it("Should throw when updating a deleted object", () => {
        demo.delete();

        expect(() => demo.setTitle(faker.person.bio())).toThrow(
            UpdateDeletedObjectError
        );
    });
});
