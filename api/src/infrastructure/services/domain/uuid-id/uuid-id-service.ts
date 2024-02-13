import { v4 as uuidV4 } from "uuid";

import type {
    IdService,
    IdConstraint
} from "../../../../domain/_services/id/id-service";

export class UuidIdService implements IdService {
    generate<Type extends typeof IdConstraint>(
        BaseClass: Type
    ): InstanceType<Type> {
        const result = new BaseClass(uuidV4());

        return result as InstanceType<Type>;
    }
}
