import { z } from "zod";

import type { IdConstraint } from "../../../domain/_services/id/id-service";

const parseCustomId = <IdType extends typeof IdConstraint>(idType: IdType) => {
    const prefixType = new idType("").type;

    return () => z
        .string()
        .refine(
            s => s.split("_").length === 2,
            "Invalid format. An id should be constituted of a prefix and a value separated by an underscore"
        )
        .refine(
            s => s.split("_")[0] === prefixType,
            `Invalid prefix. The prefix should be ${prefixType}`
        )
        .refine(
            s => {
                const id = s.split("_")[1];

                return z.string().uuid().safeParse(id).success;
            },
            "Invalid id. The value should be a valid uuid"
        )
        .transform(s => new idType(s) as InstanceType<IdType>);
};

export default parseCustomId;
