import type { BaseTranslation } from "../i18n-types";

import actions from "./actions";
import errors from "./errors";
import fields from "./fields";
import utils from "./utils";

const enUS: BaseTranslation = {
    errors,
    fields,
    actions,
    utils,
    hello: "Hello"
};

export default enUS;
