import { DomainError, DomainErrors } from "../../domain-error";

export class UpdateDeletedObjectError extends DomainError {
    constructor() {
        super({
            code: DomainErrors.UPDATE_DELETED_OBJECT,
            additional_client_information: "Cannot update a deleted object",
            logging_information: "Tried to update a deleted object"
        });
    }
}
