import "jest";
import { faker } from "@faker-js/faker";

import { PostgresDemoRepository } from "../../../../src/infrastructure/persistence/demo/postgres-demo-repository";
import { disconnectPg, pgQuery } from "../../../../src/configuration/database";
import { DemoId } from "../../../../src/domain/demo/demo-id";
import { Demo } from "../../../../src/domain/demo/demo";
import { hydrateDemo } from "../../../../src/infrastructure/persistence/demo/demo-dto";
import type { DemoDto } from "../../../../src/infrastructure/persistence/demo/demo-dto";

describe("/infrastructure/persistence/demo/postgres-demo-repository", () => {
    const repository = new PostgresDemoRepository(pgQuery);
    let demo: Demo;

    beforeEach(async () => {
        await pgQuery("delete from demo where true");

        demo = new Demo(
            faker.person.bio(),
            new DemoId(faker.string.uuid()),
            faker.date.past({ years: 2 }),
            faker.date.past({ years: 1 }),
            null
        );
        await repository.save(demo);
    });

    afterAll(async () => {
        await pgQuery("delete from demo where true");
        await disconnectPg();
    });
    describe("findById", () => {
        it("Should return null if not found", async () => {
            const demo = await repository.findById(
                new DemoId(faker.string.uuid())
            );

            expect(demo).toBeNull();
        });

        it("Should return the demo if found", async () => {
            const foundDemo = await repository.findById(demo.id());

            expect(foundDemo).toEqual(demo);
        });
    });

    describe("listDemo", () => {
        it("Should return an empty array if no demos are found", async () => {
            await pgQuery("delete from demo where true");

            const demos = await repository.listDemo();

            expect(demos).toEqual([]);
        });

        it("Should return all the demos", async () => {
            const demo2 = new Demo(
                faker.person.bio(),
                new DemoId(faker.string.uuid()),
                faker.date.past({ years: 2 }),
                faker.date.past({ years: 1 }),
                null
            );
            await repository.save(demo2);

            const demos = await repository.listDemo();

            expect(demos).toEqual([demo, demo2]);
        });
    });

    describe("save", () => {
        it("Should save the demo", async () => {
            const demo = new Demo(
                faker.person.bio(),
                new DemoId(faker.string.uuid()),
                faker.date.past({ years: 2 }),
                faker.date.past({ years: 1 }),
                null
            );
            await repository.save(demo);

            const fetchedDemo = await pgQuery<DemoDto>(
                "select * from demo where id = $1",
                [demo.id().valueWithoutPrefix]
            )
                .then((res) => res.rows[0])
                .then((res) => (res ? hydrateDemo(res) : null));

            expect(fetchedDemo).toEqual(demo);
        });

        it("Should update the demo if it already exists", async () => {
            const newTitle = faker.person.bio();
            demo.setTitle(newTitle);
            await repository.save(demo);

            const fetchedDemo = await pgQuery<DemoDto>(
                "select * from demo where id = $1",
                [demo.id().valueWithoutPrefix]
            )
                .then((res) => res.rows[0])
                .then((res) => (res ? hydrateDemo(res) : null));

            expect(fetchedDemo?.title()).toEqual(newTitle);
        });
    });
});
