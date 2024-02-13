import { QueryClient } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "api/src/api/trpc/app";

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

const api_url = process.env["NEXT_PUBLIC_API_URL"];

if (!api_url) throw new Error("NEXT_PUBLIC_API_URL is not defined");

export const trpcClient = api.createClient({
    links: [
        httpBatchLink({
            url: api_url
        })
    ]
});
