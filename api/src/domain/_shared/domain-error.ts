export enum DomainErrors {
    UPDATE_DELETED_OBJECT = "UPDATE_DELETED_OBJECT",
    DELETE_ALREADY_DELETED_OBJECT = "DELETE_ALREADY_DELETED_OBJECT",
}

type DomainErrorParams = {
  code: DomainErrors,
  additional_client_information?: string;
  logging_information?: string;
}

export class DomainError extends Error {
    public readonly code: DomainErrors;
    public readonly additional_client_information: string | undefined;
    public readonly logging_information: string | undefined;

    constructor({ code, additional_client_information, logging_information }: DomainErrorParams) {
        super();

        this.code = code;
        this.additional_client_information = additional_client_information;
        this.logging_information = logging_information;
    }
}
