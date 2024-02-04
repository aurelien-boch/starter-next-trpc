import * as z from "zod";

import { publicProcedure } from "../../index";
import deleteDemo from "../../../../application/use-cases/demo/delete-demo";
import apiErrorConverter from "../../../_shared/api-error-converter";
import parseCustomId from "../../_shared/parse-custom-id";
import { DemoId } from "../../../../domain/demo/demo-id";

const controller = publicProcedure
    .input(
        z.object({
            demoId: parseCustomId(DemoId)()
        })
    )
    .mutation(async ({ ctx, input }) => {
        await apiErrorConverter(ctx)(deleteDemo)(input);
    });

export default controller;
