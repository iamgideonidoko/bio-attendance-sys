import create from 'zustand';
import type { State } from '../interfaces/store.interface';
import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import envConfig from '../config/environment.config';
import { persist, devtools } from 'zustand/middleware';

// keys of state to be persisted
const whiteList: Array<keyof State> = ['staffInfo', 'tokens', 'isAuthenticated'];

const useStoreBase = create<State>()(
  devtools(
    persist(
      (set) => ({
        count: 0,
        staffInfo: null,
        tokens: null,
        isAuthenticated: false,
        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set((state) => ({ count: state.count - 1 })),
        loginStaff: ({ accessToken, refreshToken, staff }) =>
          set(() => ({ staffInfo: staff, tokens: { accessToken, refreshToken }, isAuthenticated: true })),
        logoutStaff: () => set({ isAuthenticated: false, tokens: null, staffInfo: null }),
      }),
      {
        name: 'bas-persist',
        partialize: (state) =>
          Object.fromEntries(Object.entries(state).filter(([key]: Array<keyof State>) => whiteList.includes(key))),
      },
    ),
  ),
);

export const persistApi = useStoreBase.persist;

if (envConfig.isDev) {
  mountStoreDevtool('Store', useStoreBase);
}

const useStore = createSelectorFunctions(useStoreBase);

export default useStore;
