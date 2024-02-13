import * as envVar from "env-var";

const env = {
    nextPublicApiUrl: envVar.get("NEXT_PUBLIC_API_URL").required().asUrlString()
};

export default env;
