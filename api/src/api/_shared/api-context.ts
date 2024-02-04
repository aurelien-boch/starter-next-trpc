import type { Context } from "../../application/_shared/context";

export type ApiContext = {
    services: {
        api: never;
    } & Context["services"];
} & Context;
