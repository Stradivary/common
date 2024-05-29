import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const handleAddProductCatalog = (prevState, product) => {
  const exists = prevState.selectedProductCatalog.some(
    (item) => item.offerId === product.offerId
  );
  if (!exists)
    return {
      selectedProductCatalog: [
        ...prevState.selectedProductCatalog,
        product,
      ].filter((e) => e),
    };

  const tempProducts = [...prevState.selectedProductCatalog];
  const updatedProductIdx = tempProducts?.findIndex(
    (data) => data.offerId === product.offerId
  );
  tempProducts?.splice(updatedProductIdx, 1, product);

  return { selectedProductCatalog: tempProducts };
};

const handleDeleteProductCatalog = (prevState, product) => ({
  selectedProductCatalog: prevState.selectedProductCatalog.filter(
    (e) => e && e.offerId !== product
  ),
});

const initializer = create(
  persist(
    (set) => ({
      opportunityDetail: {},
      refetchOpptyDetail: null,
      selectedProductCatalog: [],
      productCatalogDetail: {},

      storeOpptyDetail: (values) =>
        set(() => ({ opportunityDetail: { ...values } })),

      resetOpptyDetail: () =>
        set(() => ({
          opportunityDetail: {},
        })),

      storeProductCatalogDetail: (product) =>
        set(() => ({
          productCatalogDetail: product,
        })),

      clearProductCatalogDetail: () =>
        set(() => ({ productCatalogDetail: {} })),

      addProductCatalog: (product) =>
        set((prevState) => handleAddProductCatalog(prevState, product)),

      deleteProductCatalog: (product) =>
        set((prevState) => handleDeleteProductCatalog(prevState, product)),

      clearProductCatalog: () => set(() => ({ selectedProductCatalog: [] })),

      storeRefetchOpptyDetail: (refetch) =>
        set(() => ({ refetchOpptyDetail: refetch })), // Removed unnecessary object wrapping
    }),
    {
      name: 'zustand-opportunity', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // can be sessionStorage as well
    }
  )
);

export default initializer;
