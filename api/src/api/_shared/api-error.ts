import type { DomainError, DomainErrors } from "../../domain/_shared/domain-error";
import type { ApplicationError, ApplicationErrors } from "../../application/_shared/application-error";
import type { InfrastructureError, InfrastructureErrors } from "../../infrastructure/_shared/infrastructure-error";

//Used by frontend to type parser
// eslint-disable-next-line import/no-unused-modules
export type ErrorCodes = DomainErrors | ApplicationErrors | InfrastructureErrors | "INTERNAL_ERROR";

export class ApiError extends Error {
    static fromUnknownError() {
        return new ApiError("INTERNAL_ERROR", "An unexpected error occurred");
    }

    static fromDomainError(
        { code, additional_client_information }: DomainError
    ) {
        return new ApiError(code, additional_client_information);
    }

    static fromApplicationError(
        { code, additional_client_information }: ApplicationError
    ) {
        return new ApiError(code, additional_client_information);
    }

    static fromInfrastructureError(
        { code, additional_client_information }: InfrastructureError
    ) {
        return new ApiError(code, additional_client_information);
    }

    private constructor(
        public readonly code: ErrorCodes,
        public readonly additional_client_information?: string
    ) {
        super();
    }
}
