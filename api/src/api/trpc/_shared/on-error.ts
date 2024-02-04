import { ZodError } from "zod";
import type { createHTTPServer } from "@trpc/server/adapters/standalone";

import { ApiError } from "../../_shared/api-error";

type OnErrorFn = Parameters<typeof createHTTPServer>[0]["onError"];

const onError: OnErrorFn = ({ error }) => {
    if (error.cause instanceof ZodError) {
        const { issues } = error.cause;

        error.message = JSON.stringify({
            code: "INVALID_INPUT",
            additional_information: JSON.stringify(issues)
        });
    }
    else if (error.cause instanceof ApiError) {
        const { code, additional_client_information } = error.cause;

        error.message = JSON.stringify({
            code,
            additional_information: additional_client_information
        });
    }
};

export default onError;
