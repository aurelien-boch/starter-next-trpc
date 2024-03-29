import { router } from "../../index";

import createController from "./create";
import updateTitleController from "./update-title";
import deleteDemoController from "./delete";
import listDemosController from "./list";

const _router = router({
    create: createController,
    updateTitle: updateTitleController,
    delete: deleteDemoController,
    list: listDemosController
});

export default _router;
