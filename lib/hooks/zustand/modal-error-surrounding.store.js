import { create } from 'zustand';
import { POPUP_TYPE } from '../../utils';

const useStore = create((set) => ({
  isVisible: false,
  variant: '',
  endpoint: '',
  errorResponse: null,
  actions: [
    { type: POPUP_TYPE['popup.userManual'], handler: () => {} },
    { type: POPUP_TYPE['popup.ok'], handler: () => {} },
  ],

  setModalState: (newState, newEndpoint, errorResponse, actions) =>
    set((state) => ({
      ...state,
      ...newState,
      ...newEndpoint,
      ...errorResponse,
      ...actions,
    })),
  resetModalState: () =>
    set({
      isVisible: false,
      variant: '',
      endpoint: '',
      errorResponse: null,
      actions: [
        { type: POPUP_TYPE['popup.userManual'], handler: () => {} },
        { type: POPUP_TYPE['popup.ok'], handler: () => {} },
      ],
    }),
}));

export default useStore;
