import demoRouter from "./controllers/demo/_router";
import heartbeatController from "./controllers/heartbeat";

import { router } from "./index";

export const appRouter = router({ demo: demoRouter, heartbeat: heartbeatController });

// Exporting router for frontend
// eslint-disable-next-line import/no-unused-modules
export type AppRouter = typeof appRouter;
