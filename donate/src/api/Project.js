import { API_URLS, api } from './API_ROOT';

export const GetProject = async (projectId) => {
    try {
        const res = await api.post(API_URLS.URLS, { projectId });
        return res?.data?.project
    }
    catch (e) {
        console.error(e)
    }
}
