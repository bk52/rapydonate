const MakeRequest = require('./utilities').makeRequest;

const PaymentMethodsByCountry = async (countryCode) => {
    try {
        const result = await MakeRequest('GET', `/v1/payment_methods/country?country=${countryCode}`);
        if (result?.body?.status?.status === "SUCCESS")
            return result?.body?.data;

        return [];
    }
    catch (e) {
        global.log(e);
    }
}

const IsMethodAvailable = async (countryCode, paymentMethod) => {
    try {
        let res = false;
        const result = await MakeRequest('GET', `/v1/payment_methods/country?country=${countryCode}`);
        if (result?.body?.status?.status === "SUCCESS") {
            const filtered = result?.body?.data.filter(item => item.category === paymentMethod)
            if (filtered.length > 0) res = true;
        }

        return res;
    }
    catch (e) {
        global.log(e);
    }
}

module.exports = {
    PaymentMethodsByCountry,
    IsMethodAvailable
};