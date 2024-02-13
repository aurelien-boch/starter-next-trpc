import type {
    IdConstraint,
    IdService
} from "../../../../src/domain/_services/id/id-service";

export class MockIdService implements IdService {
    private static readonly baseId: string =
        "00000000-0000-0000-0000-000000000000";
    private nextId: string | undefined;

    public setNextId(nextId: string): void {
        this.nextId = nextId;
    }

    generate<Type extends typeof IdConstraint>(
        BaseClass: Type
    ): InstanceType<Type> {
        const res = new BaseClass(this.nextId ?? MockIdService.baseId);

        return res as InstanceType<Type>;
    }
}
