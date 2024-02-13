import type { Context } from "../../application/_shared/context";
import type { UseCase } from "../../application/_shared/use-case";
import { DomainError } from "../../domain/_shared/domain-error";
import { ApplicationError } from "../../application/_shared/application-error";
import { InfrastructureError } from "../../infrastructure/_shared/infrastructure-error";
import type { Id } from "../../domain/_services/id/id";

import { ApiError } from "./api-error";

const convertErrorToApiError = (context: Context, error: unknown) => {
    if (error instanceof DomainError) {
        context.services.application.logging.log(
            `Domain error handled. Error: ${JSON.stringify(error)}`
        );
        return ApiError.fromDomainError(error);
    } else if (error instanceof ApplicationError) {
        context.services.application.logging.log(
            `Application error handled. Error: ${JSON.stringify(error)}`
        );
        return ApiError.fromApplicationError(error);
    } else if (error instanceof InfrastructureError) {
        context.services.application.logging.error(
            `Infrastructure error handled. Error: ${JSON.stringify(error)}`
        );
        return ApiError.fromInfrastructureError(error);
    } else {
        context.services.application.logging.error(
            `Unknown error handled. Error: ${JSON.stringify(error)}`
        );
        return ApiError.fromUnknownError();
    }
};

const apiErrorConverter =
    (context: Context) =>
    <T, R extends void | Id<string> = void>(useCase: UseCase<T, R>) =>
    async (params: T) => {
        try {
            return await useCase(context)(params);
        } catch (error: unknown) {
            throw convertErrorToApiError(context, error);
        }
    };

export default apiErrorConverter;
