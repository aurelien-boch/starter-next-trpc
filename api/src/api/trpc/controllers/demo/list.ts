import * as z from "zod";

import { publicProcedure } from "../../index";
import { dehydrateDemo } from "../../../../infrastructure/persistence/demo/demo-dto";

const controller = publicProcedure
    .input(
        z.object({
            filters: z.object({
                includeDeleted: z.boolean().optional()
            })
        })
    )
    .query(async ({ ctx, input }) => {
        const res = await ctx.repositories.demo.listDemo();

        if (input.filters.includeDeleted === true)
            return res.map(dehydrateDemo);
        else return res.filter((e) => !e.isDeleted()).map(dehydrateDemo);
    });

export default controller;
