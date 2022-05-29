
export const SetSettings = (settings) => {
    localStorage.setItem("rapydSettings", settings);
}

export const GetSettings = () => {
    return localStorage.getItem("rapydSettings");
}

export const ClearSettings = () => {
    localStorage.removeItem("settings");
}
