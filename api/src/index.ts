import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";

import buildContext from "./configuration/build-context";
import env from "./configuration/env";
import type { ApiContext } from "./api/_shared/api-context";
import onError from "./api/trpc/_shared/on-error";
import { appRouter } from "./api/trpc/app";

const cacheContext = (context: ApiContext) => async (): Promise<ApiContext> => context;

(async () => {
    const context = buildContext();
    const tRPCServer = createHTTPServer({
        middleware: cors({
            origin: env.CLIENT_URL
        }),
        onError,
        router: appRouter,
        createContext: cacheContext(context)
    });

    tRPCServer.listen(env.PORT);
    context.services.application.logging.log(`tRPC server started on port ${env.PORT}`);
})();
