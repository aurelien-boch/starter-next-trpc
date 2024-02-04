import type { UseCase } from "../../_shared/use-case";
import type { DemoId } from "../../../domain/demo/demo-id";

type DemoCreateParams = {
    title: string;
}

const useCase: UseCase<DemoCreateParams, DemoId> = (context) => async ({ title }) => {
    const aggregate = context.factories.demo.create({ title });

    await context.repositories.demo.save(aggregate);
    return aggregate.id();
};

export default useCase;
