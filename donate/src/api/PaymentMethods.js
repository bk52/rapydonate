import { API_URLS, api } from './API_ROOT';

export const GetPaymentMethods = async (countryCode) => {
    try {
        const res = await api.post(API_URLS.PAYMENT_METHODS, { countryCode });
        return res?.data?.data
    }
    catch (e) {
        console.error(e)
    }
}