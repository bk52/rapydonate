import URL from "./urls";
import { api, ErrorHandler } from "./apiRoot";

export const GetDonations = async (projectId) => {
    return api.get(URL.DONATION, { params: { projectId } });
}
