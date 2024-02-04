import "jest";
import { faker } from "@faker-js/faker";

import { TimeTrackableObject } from "../../../../src/domain/_shared/time-trackable-object/time-trackable-object";
import {
    UpdateDeletedObjectError
} from "../../../../src/domain/_shared/time-trackable-object/exceptions/update-deleted-object-error";
import {
    DeleteAlreadyDeletedObjectError
} from "../../../../src/domain/_shared/time-trackable-object/exceptions/delete-already-deleted-object-error";

class PublicTimeTrackableObject extends TimeTrackableObject {
    public override updateUpdatedAt(): void {
        super.updateUpdatedAt();
    }
}

describe("domain/_shared/time-trackable-object", () => {
    let timeTrackableObject: PublicTimeTrackableObject;

    beforeEach(() => {
        timeTrackableObject = new PublicTimeTrackableObject(
            faker.date.past({ years: 1 }),
            faker.date.recent(),
            null
        );
    });

    it("It should update last update time when calling updateUpdatedAt", () => {
        const oldUpdatedAt = timeTrackableObject.updatedAt();
        timeTrackableObject.updateUpdatedAt();
        const newUpdatedAt = timeTrackableObject.updatedAt();

        expect(newUpdatedAt).not.toEqual(oldUpdatedAt);
    });

    it("It should throw an error when calling updateUpdatedAt on a deleted object", () => {
        timeTrackableObject.delete();

        expect(() => timeTrackableObject.updateUpdatedAt()).toThrow(UpdateDeletedObjectError);
    });

    it("Should delete the object when calling delete", () => {
        timeTrackableObject.delete();

        expect(timeTrackableObject.deletedAt()).not.toBeNull();
    });

    it("It should throw an error when deleting an already deleted object", () => {
        timeTrackableObject.delete();

        expect(() => timeTrackableObject.delete()).toThrow(DeleteAlreadyDeletedObjectError);
    });
});
