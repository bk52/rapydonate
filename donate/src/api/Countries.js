import { API_URLS, api } from './API_ROOT';

const GetCountries = async () => {
    try {
        const res = await api.get(API_URLS.COUNTRIES, {});
        return res?.data?.data
    }
    catch (e) {
        console.error(e)
    }
}

export default GetCountries;