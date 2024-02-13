import { initTRPC } from "@trpc/server";

import type { ApiContext } from "../_shared/api-context";

const t = initTRPC.context<ApiContext>().create();

export const router = t.router;

export const publicProcedure = t.procedure.use(async (e) => {
    const { ctx } = e;

    const start = Date.now();
    const result = await e.next();
    const end = Date.now();

    if (result.ok)
        ctx.services.application.logging.info(
            `[${e.type}] ${e.path} - ${end - start}ms - OK`
        );
    else
        ctx.services.application.logging.error(
            `[${e.type}] ${e.path} - ${end - start}ms - ERROR (${JSON.stringify(result.error)})`
        );
    return result;
});
