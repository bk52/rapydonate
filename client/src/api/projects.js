import URL from "./urls";
import { api, ErrorHandler } from "./apiRoot";

export const GetProjects = async () => {
    return api.get(URL.PROJECT);
}

export const CreateProject = async (title, description) => {
    return api.post(URL.PROJECT, { title, description });
}

export const DeleteProject = async (projectId) => {
    return api.delete(URL.PROJECT, { data: { projectId } })
}