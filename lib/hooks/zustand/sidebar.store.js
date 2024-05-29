import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const initializer = persist(
  (set) => ({
    minimize: true,
    setMinimize: (minimize) => set(() => ({ minimize: minimize.minimize })),
  }),
  {
    name: 'zustand-sidebar', // name of the item in the storage (must be unique)
    getStorage: () => createJSONStorage(() => localStorage), // can be sessionStorage as well
  }
);

export default create(initializer);
