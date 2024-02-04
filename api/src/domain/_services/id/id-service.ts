import { Id } from "./id";

export class IdConstraint extends Id<string> {
    constructor(value: string | `${string}_${string}`) {
        super(value, "type");
    }
}

export interface IdService {
    generate<Type extends typeof IdConstraint>(BaseClass: Type): InstanceType<Type>;
}
