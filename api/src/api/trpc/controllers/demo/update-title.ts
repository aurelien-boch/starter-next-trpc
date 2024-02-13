import * as z from "zod";

import { publicProcedure } from "../../index";
import apiErrorConverter from "../../../_shared/api-error-converter";
import parseCustomId from "../../_shared/parse-custom-id";
import { DemoId } from "../../../../domain/demo/demo-id";
import updateDemoTitle from "../../../../application/use-cases/demo/update-demo-title";

const controller = publicProcedure
    .input(
        z.object({
            newTitle: z.string().min(3).max(100),
            demoId: parseCustomId(DemoId)()
        })
    )
    .mutation(
        async ({ ctx, input }) =>
            await apiErrorConverter(ctx)(updateDemoTitle)(input)
    );

export default controller;
