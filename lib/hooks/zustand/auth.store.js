import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const initializer = persist(
  (set) => ({
    userAuth: {
      isAuthenticated: false,
      token: null,
      userData: {},
    },

    // MOCK MENU BY USING THIS ON userData above and clear state from localStorage
    // {
    //   user: {
    //     menus: [
    //       {
    //         menu_id: 'HOME',
    //       },
    //       {
    //         menu_id: 'DASH',
    //       },
    //       {
    //         menu_id: 'AGREE',
    //       },
    //       {
    //         menu_id: 'CORP',
    //       },
    //       {
    //         menu_id: 'ORDER',
    //       },
    //       {
    //         menu_id: 'SPLAN',
    //       },
    //       {
    //         menu_id: 'BILCO',
    //       },
    //       {
    //         menu_id: 'TCKET',
    //       },
    //     ],
    //   },
    // },

    savePassword: true,
    setUserAuth: (userAuth) => set(() => ({ userAuth })),
    logout: () =>
      set(() => ({
        userAuth: {
          isAuthenticated: false,
          token: null,
          userData: {},
        },
      })),
  }),
  {
    name: 'zustand-user-auth', // name of the item in the storage (must be unique)
    storage: createJSONStorage(() => localStorage), // can be sessionStorage as well
  }
);

const useStore = create(initializer);

export default useStore;
