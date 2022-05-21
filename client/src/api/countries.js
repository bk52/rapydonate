import URL from "./urls";
import { api, ErrorHandler } from "./apiRoot";

const Countries = async () => {
    return api.get(URL.COUNTRIES)
}

export default Countries;
