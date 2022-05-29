import { API_URLS, api } from './API_ROOT';

export const SendDonation = async (projectId, donateId, projectUrl, username, message = '') => {
    try {
        const res = await api.post(API_URLS.DONATE, { projectId, donateId, projectUrl, username, message });
        return res?.data
    }
    catch (e) {
        console.error(e)
    }
}
