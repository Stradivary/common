import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAgreementFormStore = create(
  persist(
    (set) => ({
      formStep1: {},
      formStep2: {},
      formStep3: {},
      formStep4: {},

      paymentInfoTemp: [],
      paymentInformationData: {},

      shouldUpdateDynamicSection: false,

      setShouldUpdateDynamicSection: (value) =>
        set(() => ({ shouldUpdateDynamicSection: value })),

      storeFormStep1: (values) => set(() => ({ formStep1: { ...values } })),
      storeFormStep2: (values) => set(() => ({ formStep2: { ...values } })),
      storeFormStep3: (values) => set(() => ({ formStep3: { ...values } })),
      storeFormStep4: (values) => set(() => ({ formStep4: { ...values } })),

      storePaymentInformationData: (values) => {
        set(() => ({
          paymentInformationData: values,
        }));
      },
      resetPaymentInformationData: () =>
        set(() => ({
          paymentInformationData: {},
        })),
      storePaymentInfoTemp: (values) =>
        set(() => ({
          paymentInfoTemp: values,
        })),
      resetPaymentInfoTemp: () =>
        set(() => ({
          paymentInfoTemp: [],
        })),

      resetForm: () =>
        set(() => ({
          formStep1: {},
          formStep2: {},
          formStep3: {},
          formStep4: {},
          paymentInformationData: {},
          paymentInfoTemp: [],
          shouldUpdateDynamicSection: false,
        })),
    }),
    {
      name: 'zustand-agreement-form', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // can be sessionStorage as well
    }
  )
);

export default useAgreementFormStore;
