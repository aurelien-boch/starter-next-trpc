export enum ApplicationErrors {
    DEMO_NOT_FOUND = "DEMO_NOT_FOUND"
}

type ApplicationErrorParams = {
    code: ApplicationErrors;
    additional_client_information?: string;
    logging_information?: string;
};

export class ApplicationError extends Error {
    public readonly code: ApplicationErrors;
    public readonly additional_client_information: string | undefined;
    public readonly logging_information: string | undefined;

    constructor({
        code,
        additional_client_information,
        logging_information
    }: ApplicationErrorParams) {
        super();

        this.code = code;
        this.additional_client_information = additional_client_information;
        this.logging_information = logging_information;
    }
}
