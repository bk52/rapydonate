const MakeRequest = require('./utilities').makeRequest;

const PAYMENT_TYPES = [
    { title: 'Card', value: 'card' },
    { title: 'Cash', value: 'cash' },
    { title: 'Bank Transfer', value: 'bank_transfer' },
    { title: 'Bank Redirect', value: 'bank_redirect' },
    { title: 'eWallet', value: 'ewallet' },
]

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

const PaymentMethodsCategoryByCountry = async (countryCode) => {
    try {
        const result = await MakeRequest('GET', `/v1/payment_methods/country?country=${countryCode}`);
        if (result?.body?.status?.status === "SUCCESS") {
            let categories = [];
            let data = [];
            result?.body?.data.map((item) => {
                if (!categories.includes(item.category)) {
                    categories.push(item.category);
                    const pM = PAYMENT_TYPES.filter(x => x.value == item.category)[0];
                    data.push(pM);
                }
            })
            return data;
        }

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
    PaymentMethodsCategoryByCountry,
    IsMethodAvailable
};