export enum InfrastructureErrors {
    FAILED_TO_SAVE = "FAILED_TO_SAVE",
}

type InfrastructureErrorParams = {
  code: InfrastructureErrors,
  additional_client_information?: string;
  logging_information?: string;
}

export class InfrastructureError extends Error {
    public readonly code: InfrastructureErrors;
    public readonly additional_client_information: string | undefined;
    public readonly logging_information: string | undefined;

    constructor({ code, additional_client_information, logging_information }: InfrastructureErrorParams) {
        super();

        this.code = code;
        this.additional_client_information = additional_client_information;
        this.logging_information = logging_information;
    }
}
