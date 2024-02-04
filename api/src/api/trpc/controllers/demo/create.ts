import * as z from "zod";

import { publicProcedure } from "../../index";
import createDemo from "../../../../application/use-cases/demo/create-demo";
import apiErrorConverter from "../../../_shared/api-error-converter";

const controller = publicProcedure
    .input(
        z.object({
            title: z
                .string()
                .min(3)
                .max(100)
        })
    )
    .mutation(async ({ ctx, input }) => {
        const id = await apiErrorConverter(ctx)(createDemo)(input);

        return id.value;
    });

export default controller;
