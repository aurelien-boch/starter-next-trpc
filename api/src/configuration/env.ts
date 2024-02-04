import * as z from "zod";

const env = z.object({
    port: z.coerce.number().min(0).max(65535),
    clientUrl: z.string().url()
}).parse(process.env);


export default env;
