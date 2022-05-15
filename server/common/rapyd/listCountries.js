const MakeRequest = require('./utilities').makeRequest;

const GetCountries = async () => {
    try {
        const result = await MakeRequest('GET', '/v1/data/countries');
        if (result?.body?.status?.status === "SUCCESS")
            return result?.body?.data;

        return [];
    }
    catch (e) {
        global.log(e);
    }
}

module.exports = GetCountries;