import create from 'zustand';
import type { State } from '../interfaces/store.interface';
import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import envConfig from '../config/environment.config';
import { persist, devtools } from 'zustand/middleware';

// keys of state to be persisted
const whiteList = ['count'];

const useStoreBase = create<State>()(
  devtools(
    persist(
      (set) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set((state) => ({ count: state.count - 1 })),
      }),
      {
        name: 'bas-persist',
        partialize: (state) => Object.fromEntries(Object.entries(state).filter(([key]) => whiteList.includes(key))),
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
