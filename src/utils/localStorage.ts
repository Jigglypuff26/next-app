import { AppSettingsType, localStorageNameTypes, UserSettingsType } from "@/shared/local.storage.type";

export const setLocalStorage = (name: localStorageNameTypes, body: object) => {
    localStorage.setItem(name, JSON.stringify(body));
};

export const removeLocalStorage = (name: localStorageNameTypes) => {
    localStorage.removeItem(name);
};

export const getLocalStorage = (name: localStorageNameTypes) => {
    const store = localStorage.getItem(name);
    if (store) {
        return JSON.parse(store);
    }

    return null;
};

export const getAppLocalStorage = (): AppSettingsType | null => {
    const store = localStorage.getItem('App');
    if (store) {
        return JSON.parse(store);
    }

    return null;
}

export const getUserLocalStorage = (): UserSettingsType | null => {
    const store = localStorage.getItem('App');
    if (store) {
        return JSON.parse(store);
    }

    return null;
}
