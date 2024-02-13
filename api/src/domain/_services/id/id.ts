/**
 * @brief Returns true if the given value is prefixed with the given type.
 * @param value The value to check.
 * @param type The prefix to check.
 * @returns True if the given value is prefixed with the given type.
 */
const isPrefixedValue = <PREFIX extends string>(
    value: string,
    type: PREFIX
): value is `${PREFIX}_${string}` => value.startsWith(type);

export class Id<PREFIX extends string> {
    private readonly _valueWithPrefix: `${PREFIX}_${string}`;

    /**
     * @brief Creates a new id. If the value is not prefixed, it will be prefixed with the given prefix.
     * @param value The value of the id (it can be with or without the prefix)
     * @param type The prefix of the id.
     */
    public constructor(
        value: string | `${PREFIX}_${string}`,
        public readonly type: PREFIX
    ) {
        this._valueWithPrefix = isPrefixedValue(value, type)
            ? value
            : `${type}_${value}`;
    }

    /**
     * @brief Returns true if the id is the same as the given id.
     * @param id The id to compare.
     * @returns True if the id is the same as the given id.
     */
    public isSame(id: Id<PREFIX>) {
        return this._valueWithPrefix === id._valueWithPrefix;
    }

    /**
     * @brief Returns the value of the id with the prefix.
     */
    get value() {
        return this._valueWithPrefix;
    }

    get valueWithoutPrefix() {
        return this._valueWithPrefix.split("_")[1];
    }
}
