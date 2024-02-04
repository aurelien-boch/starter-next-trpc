import "jest";
import { describe } from "node:test";

import { faker } from "@faker-js/faker";

import { DemoId } from "../../../src/domain/demo/demo-id";

describe("domain/demo/demo-id", () => {
    it("Should create a new id with the given value", () => {
        const id1 = faker.string.uuid();
        const id2 = faker.string.uuid();

        const demoId = new DemoId(id1);

        expect(demoId).toStrictEqual(new DemoId(id1));
        expect(demoId).not.toStrictEqual(new DemoId(id2));
    });
});
