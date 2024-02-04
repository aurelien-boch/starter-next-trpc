import { DomainError, DomainErrors } from "../../domain-error";

export class DeleteAlreadyDeletedObjectError extends DomainError {
    constructor() {
        super({
            code: DomainErrors.DELETE_ALREADY_DELETED_OBJECT,
            additional_client_information: "Cannot delete an already deleted object",
            logging_information: "Tried to delete an already deleted object"
        });
    }
}
