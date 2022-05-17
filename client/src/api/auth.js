import URL from "./urls";
import { api, ErrorHandler } from "./apiRoot";

export const SignIn = async (username, password) => {
    return api.post(URL.AUTH, { username, password })
}
