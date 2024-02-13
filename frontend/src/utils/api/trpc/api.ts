import { QueryClient } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "api/src/api/trpc/app";

import env from "@/utils/env";

export const api = createTRPCReact<AppRouter>();
export type RouterOutput = inferRouterOutputs<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
});

export const trpcClient = api.createClient({
    links: [
        httpBatchLink({
            url: env.nextPublicApiUrl
        })
    ]
});
