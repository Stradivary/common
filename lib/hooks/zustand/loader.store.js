import { create } from 'zustand';

const useStore = create((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set(() => ({ isLoading })),
}));

export default useStore;
