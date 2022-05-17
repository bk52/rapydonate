const MakeRequest = require('./utilities').makeRequest;

const GetIdentities = async (countryCode) => {
    try {
        const result = await MakeRequest('GET', `/v1/identities/types?country=${countryCode}`);
        if (result?.body?.status?.status === "SUCCESS")
            return result?.body?.data;

        return [];
    }
    catch (e) {
        global.log(e);
    }
}

module.exports = GetIdentities;