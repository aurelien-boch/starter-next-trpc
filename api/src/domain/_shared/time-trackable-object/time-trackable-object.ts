import { UpdateDeletedObjectError } from "./exceptions/update-deleted-object-error";
import { DeleteAlreadyDeletedObjectError } from "./exceptions/delete-already-deleted-object-error";

/**
 * @description
 * TimeTrackableObject is a base class for domain objects that need to track their creation, update and deletion times.
 */
export class TimeTrackableObject {
    /**
     * @param _createdAt The date and time when the object was created (should be set to UTC timezone)
     * @param _updatedAt The date and time when the object was last updated (should be set to UTC timezone)
     * @param _deletedAt The date and time when the object was deleted (should be set to UTC timezone)
     * or null if the object has not been deleted
     */
    constructor(
        private readonly _createdAt: Date,
        private _updatedAt: Date,
        private _deletedAt: Date | null
    ) {}

    /**
     * @description
     * Returns the date and time when the object was created at UTC timezone
     */
    public createdAt() {
        return this._createdAt;
    }

    /**
     * @description
     * Returns the date and time when the object was last updated at UTC timezone
     */
    public updatedAt() {
        return this._updatedAt;
    }

    /**
     * @description
     * Returns the date and time when the object was deleted at UTC timezone
     * or null if the object has not been deleted
     */
    public deletedAt() {
        return this._deletedAt;
    }

    /**
     * @description
     * Returns true if the object has been deleted, otherwise returns false
     */
    public isDeleted() {
        return this._deletedAt !== null;
    }

    /**
     * @description
     * Deletes the object. If the object has already been deleted, it throws a DeleteAlreadyDeletedObjectError.
     * @throws DeleteAlreadyDeletedObjectError
     */
    public delete() {
        if (this.isDeleted())
            throw new DeleteAlreadyDeletedObjectError();
        else
            this._deletedAt = new Date();
    }

    /**
     * @description
     * Updates the date and time when the object was last updated to the current date and time at UTC timezone.
     * If the object has been deleted, it throws an UpdateDeletedObjectError.
     * @protected
     * @throws UpdateDeletedObjectError
     */
    protected updateUpdatedAt() {
        if (this.isDeleted())
            throw new UpdateDeletedObjectError();
        else
            this._updatedAt = new Date();
    }
}
