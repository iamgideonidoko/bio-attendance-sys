import create from 'zustand';
import type { State } from '../interfaces/store.interface';
import { createSelectorFunctions } from 'auto-zustand-selectors-hook';

const useStoreBase = create<State>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

const useStore = createSelectorFunctions(useStoreBase);

export default useStore;
