import { Theme } from "./theme.type"

export type localStorageNameTypes = 'App' | 'User';

export type AppSettingsType = {
    name: 'App'
    body: {
        theme: Theme
    };
}

export type UserSettingsType = {
    name: 'User'
    body: {
        userName: string
    };
}
