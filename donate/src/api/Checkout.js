import { API_URLS, api } from './API_ROOT';

export const GetCheckoutId = async (projectId, donateTypeId, countryCode, countryCurrency, paymentMethod) => {
    try {
        const res = await api.post(API_URLS.CHECKOUT, { projectId, donateTypeId, countryCode, countryCurrency, paymentMethod });
        return res?.data?.data
    }
    catch (e) {
        console.error(e)
    }
}