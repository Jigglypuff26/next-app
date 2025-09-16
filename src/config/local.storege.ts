import {
    AppSettingsType,
    UserSettingsType
} from "@/shared/local.storage.type";

export const INITIAL_APP_STORAGE: AppSettingsType = {
    name: 'App',
    body: {
        theme: 'light'
    }
}

export const INITIAL_USER_STORAGE: UserSettingsType = {
    name: 'User',
    body: {
        userName: ''
    }
}
