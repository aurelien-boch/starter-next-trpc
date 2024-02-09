import * as z from "zod";

const env = z.object({
    PORT: z.coerce.number().min(0).max(65535),
    CLIENT_URL: z.string().url(),
    POSTGRES_HOST: z.string(),
    POSTGRES_PORT: z.coerce.number().min(0).max(65535),
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_DATABASE: z.string()
}).parse(process.env);


export default env;
