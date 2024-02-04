import type { Id } from "../../domain/_services/id/id";

import type { Context } from "./context";


//returning sth else than an id isnt fully implemented yet
export type UseCase<Params, Return extends void | Id<string> = void> = (context: Context) => (params: Params) => Promise<Return>;
