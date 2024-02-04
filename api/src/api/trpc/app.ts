import demoRouter from "./controllers/demo/_router";

import { router } from "./index";

export const appRouter = router({ demo: demoRouter });

// Exporting router for frontend
// eslint-disable-next-line import/no-unused-modules
export type AppRouter = typeof appRouter;
