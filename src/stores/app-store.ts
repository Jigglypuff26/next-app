import { create, StateCreator } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

export const APP_LOCAL_STORAGE_NAME = 'app-storege';

type AppStateTypes = {
  version: string;
}

type AppActionsTypes = {
  changeVersion: (theme: string) => void
}

type IAppStoreTypes = AppStateTypes & AppActionsTypes

const defaultInitState: AppStateTypes = {
  version: '0'
}

const appStore: StateCreator<
  IAppStoreTypes,
  [['zustand/devtools', never], ['zustand/persist', unknown]]
> = ((set) => ({
    ...defaultInitState,
    changeVersion: (value) => set(() => ({ version: value }), false, 'changeVersion'), // set(сама функция, флаг реплейс если ставим true то стор полностью перезапишется поэтомму ставим false чтобы менялсось то что нам нужно, имя экшена для отображения в devtools)
}))

const useAppStore = create<IAppStoreTypes>()(
  devtools(
    persist(appStore, {
      name: APP_LOCAL_STORAGE_NAME, // имя хранилища
      storage: createJSONStorage(() => localStorage), // Указываем с каким хранилищем работаем
      partialize: (state) => ({
          theme: state.version
      }) // в поле partialize указываем что будет хранится в локал localStorage
    })
  )
);

// Селекторы
export const useAppStoreData = () => useAppStore((state) => state);
export const useChangeVersion = () => useAppStore.getState().changeVersion;