import URL from "./urls";
import { api, ErrorHandler } from "./apiRoot";

export const GetProjects = async (projectId) => {
    return api.get(URL.PROJECT, { params: { projectId } });
}

export const CreateProject = async (title, description) => {
    return api.post(URL.PROJECT, { projectInfo: { title, description } });
}

export const UpdateProject = async (projectId, projectInfo, projectTypes, projectUrls) => {
    return api.post(URL.PROJECT, { projectId, projectInfo, projectTypes, projectUrls });
}

export const DeleteProject = async (projectId) => {
    return api.delete(URL.PROJECT, { data: { projectId } })
}