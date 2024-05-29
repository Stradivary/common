import { create } from 'zustand';

const useStore = create((set) => ({
  econtractDetail: {},
  activeDocument: {},
  activityHistory: [],

  storeEcontractDetail: (values) =>
    set(() => ({
      econtractDetail: values,
    })),
  storeActiveDocument: (values) =>
    set(() => ({
      activeDocument: values,
    })),
  storeActivityHistory: (values) =>
    set(() => ({
      activityHistory: values,
    })),
  resetData: () =>
    set(() => ({
      econtractDetail: {},
      activeDocument: {},
      activityHistory: [],
    })),
}));

export default useStore;
