
export const SetSettings = (settings) => {
    localStorage.setItem("rapydSettings", JSON.stringify(settings));
}

export const GetSettings = () => {
    let settings = null;
    const localData = localStorage.getItem("rapydSettings");
    if (localData) {
        settings = JSON.parse(localData);
    }
    return settings;
}

export const ClearSettings = () => {
    localStorage.removeItem("settings");
}
