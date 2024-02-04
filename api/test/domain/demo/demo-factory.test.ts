import "jest";
import { faker } from "@faker-js/faker";

import { DemoFactory } from "../../../src/domain/demo/demo-factory";
import { MockIdService } from "../../_mocks/application/services/id-service";
import { DemoId } from "../../../src/domain/demo/demo-id";


describe("domain/demo/demo-factory", () => {
    let idService: MockIdService = new MockIdService();
    let factory: DemoFactory = new DemoFactory(idService);

    beforeEach(() => {
        idService = new MockIdService();
        factory = new DemoFactory(idService);
    });

    it("Should create a new demo with the given title", () => {
        const title = faker.person.bio();
        const demo = factory.create({
            title
        });

        expect(demo.title()).toEqual(title);
    });

    it("Should use the id generator to create a new id", () => {
        const id = faker.string.uuid();
        idService.setNextId(id);
        const demo = factory.create({
            title: "Title"
        });

        expect(demo.id()).toStrictEqual(new DemoId(id));
    });
});
