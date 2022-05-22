import URL from "./urls";
import { api, ErrorHandler } from "./apiRoot";

export const SetAccountSettings = async (accountInfo) => {
    return api.post(URL.ACCOUNT, { accountInfo })
}

export const GetAccountSettings = async (accountInfo) => {
    return api.get(URL.ACCOUNT, {})
}
