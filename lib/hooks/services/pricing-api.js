import { useQuery, useMutation } from '@tanstack/react-query';
import { DEFAULT_REACT_QUERY_OPTIONS } from '../../utils';
import { apiDelete, apiGet, apiPost, apiPut } from '../../axios-client';

const basePath = '/pricing';

export const usePostPricingQuote = (quoteId) => {
  return useMutation({
    mutationFn: (payload) =>
      apiPost(`${basePath}/quote/${quoteId}/feedback`, payload),
  });
};

export const useGetQuoteEcontractList = (opptyId, query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['quote_econtract', opptyId, query],
    queryFn: () => apiGet(`${basePath}/quote/e-contract/${opptyId}`, query),
  });
};

export const useGetQuotationDetail = () => {
  return useMutation({
    mutationFn: (quoteId) =>
      apiGet(`${basePath}/quote/e-contract/detail/${quoteId}`),
  });
};

export const useGetDenomList = (bundleId, offerId, query, enabled = true) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['project_denom_list', { ...query, bundleId, offerId }],
    enabled,
    queryFn: () =>
      bundleId &&
      offerId &&
      query?.subsetMenuId &&
      apiGet(`${basePath}/bundle/${bundleId}/product/${offerId}/denom`, query),
  });
};

export const useGetSelectedDenomList = (bundleId, offerId, query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['get_selected_denom_list', { ...query, bundleId, offerId }],
    queryFn: () =>
      bundleId &&
      offerId &&
      apiGet(`${basePath}/bundle/${bundleId}/offer/${offerId}/old`, query),
  });
};

// use in service ordering
export const useGetQuoteDetailOrdering = (quoteId, query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['get_quote_cpq', query],
    queryFn: () => apiGet(`${basePath}/quote/${quoteId}/old`, query),
  });
};

export const useGetQuoteBundleOrdering = (bundleId, query) => {
  const isEnabled = !!bundleId;
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['get_bundle_cpq', bundleId],
    queryFn: () => apiGet(`${basePath}/bundle/${bundleId}/old`, query),
    enabled: isEnabled,
  });
};

export const useGetBundleQuoteDetail = () => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: (bundleId) => apiGet(`${basePath}/bundle/${bundleId}/old`),
  });
};

export const useValidateOffer = () => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: (bundleId) => apiPut(`${basePath}/bundle/${bundleId}`),
  });
};

export const useUpdateQuoteCommitmentPeriod = () => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: (query) =>
      apiPut(
        `${basePath}/bundle/${query.bundleId}/product/${query.offerId}`,
        query
      ),
  });
};

export const useQuoteChangePrice = () => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: (query) =>
      apiPut(
        `${basePath}/bundle/${query.bundleId}/product/${query.offerId}`,
        query
      ),
  });
};

export const useDeleteAlacarte = () => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: (query) =>
      apiDelete(
        `${basePath}/bundle/${query.bundleId}/product/${query.offerId}`,
        query
      ),
  });
};

export const useAddQuoteBundleOrdering = () => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: (body) => apiPost(`${basePath}/bundle`, body),
  });
};

export const useDeleteBundleQuotattion = () => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: (bundleId) => apiDelete(`${basePath}/bundle/${bundleId}`),
  });
};

export const useUpdateBundleQuotation = () => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: (query) => apiPut(`${basePath}/bundle/`, query),
  });
};

export const useSaveAndContinueStep = () => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: (query) =>
      apiPut(`${basePath}/quote/${query.quoteId}/step`, query),
  });
};

export const useGetProjectQuotation = (opptyId) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['project_quotation', opptyId],
    queryFn: () => apiGet(`${basePath}/quote/v2/${opptyId}?step=activation`),
  });
};

// intended to be used with loop
export const useGetProjectQuotationLoop = () => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: (opportunityId) =>
      apiGet(`${basePath}/quote/v2/${opportunityId}?step=activation`),
  });
};

export const useGetCatalogProduct = (bundleId, query, enabled = true) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['get_catalog_product', bundleId, query],
    queryFn: () => apiGet(`${basePath}/bundle/${bundleId}/catalog/v2`, query),
    enabled,
  });
};

export const useGetCatalogMenu = (
  bundleId,
  query,
  isQuery = false,
  enabled = true
) => {
  if (isQuery) {
    return useQuery({
      ...DEFAULT_REACT_QUERY_OPTIONS,
      queryKey: ['get_catalog_menu', bundleId, query],
      queryFn: () =>
        apiGet(`${basePath}/bundle/${bundleId}/catalog-menu`, query),
      enabled,
    });
  }

  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: (queryParams) =>
      apiGet(`${basePath}/bundle/${bundleId}/catalog-menu`, queryParams),
  });
};

export const useGetSolutionCategory = () => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: (queryParams) =>
      apiGet(`${basePath}/bundle/catalog-menu`, {
        flag: 'industry',
        ...queryParams,
      }),
  });
};

export const useSubmitQuotationBundleList = () => {
  return useMutation({
    mutationFn: (payload) => {
      const { body, bundleId } = payload;
      return apiPost(`${basePath}/bundle/${bundleId}/catalog`, body);
    },
  });
};

export const useGetSolutionType = (enabled = true) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['solution_type_category'],
    queryFn: () =>
      apiGet(`${basePath}/bundle/catalog-menu`, {
        menuLevelId: 'ML1_FAM_B2B',
      }),
    enabled,
  });
};

export const useGetSolutionTypeSubCategory = () => {
  return useMutation({
    mutationFn: (query) => apiGet(`${basePath}/bundle/catalog-menu`, query),
  });
};

export const useAddCustomDenom = (bundleId) => {
  return useMutation({
    mutationFn: (payload) =>
      apiPost(`${basePath}/bundle/${bundleId}/offer`, payload),
  });
};

export const useAddAdditionalDenom = (bundleId) => {
  return useMutation({
    mutationFn: (payload) =>
      apiPost(`${basePath}/bundle/${bundleId}/offer`, payload),
  });
};

export const useGetQuotationList = (opptyId, query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['quotation_list', opptyId, query],
    queryFn: () =>
      apiGet(`${basePath}/opportunity/${opptyId}/ui`, {
        refresh_cache: 0,
        ...query,
      }),
  });
};

export const usePostQuotation = () => {
  return useMutation({
    mutationFn: ({ payload }) => apiPost(`${basePath}/quote/`, payload),
  });
};

export const useUpdateQuotation = () => {
  return useMutation({
    mutationFn: ({ quoteId, payload }) =>
      apiPut(`${basePath}/quote/edit/${quoteId}`, payload),
  });
};

export const useDeleteQuotation = (opportunityId) => {
  return useMutation({
    mutationFn: ({ quoteId }) =>
      apiDelete(`${basePath}/opportunity/${opportunityId}/quote/${quoteId}`),
  });
};

export const useGetDiscountList = (quoteId, query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['discount_list'],
    queryFn: () => apiGet(`${basePath}/discount/${quoteId}/ui`, query),
  });
};

export const useGetDiscountCatalog = () => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: ({ bundleId, query }) =>
      apiGet(`${basePath}/bundle/${bundleId}/catalog?`, query),
  });
};

export const usePostDiscount = (bundleId) => {
  return useMutation({
    mutationFn: ({ payload }) =>
      apiPost(`${basePath}/bundle/${bundleId}/catalog`, payload),
  });
};

export const useDeleteDiscount = (bundleId) => {
  return useMutation({
    mutationFn: ({ offerId }) =>
      apiDelete(`${basePath}/bundle/${bundleId}/product/${offerId}`),
  });
};

export const useGetServiceTemplateList = (quoteId, query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['service_template_list'],
    queryFn: () =>
      apiGet(`${basePath}/quote/${quoteId}/service-template`, query),
  });
};

export const usePostServiceTemplate = (quoteId) => {
  return useMutation({
    mutationFn: ({ payload }) =>
      apiPost(`${basePath}/quote/${quoteId}/service-template`, payload),
  });
};

export const usePutServiceTemplate = (quoteId) => {
  return useMutation({
    mutationFn: ({ templateId, payload }) =>
      apiPut(
        `${basePath}/quote/${quoteId}/service-template/${templateId}`,
        payload
      ),
  });
};

export const useDeleteServiceTemplate = (quoteId) => {
  return useMutation({
    mutationFn: ({ templateId }) =>
      apiDelete(`${basePath}/quote/${quoteId}/service-template/${templateId}`),
  });
};

export const useGetLOVPricePlan = () => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['lov_price_plan'],
    queryFn: () => apiGet(`${basePath}/plan`),
  });
};

export const useGetLOVCls = () => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['lov_cls'],
    queryFn: () => apiGet(`${basePath}/cls`),
  });
};

export const useGetLOVAddOnService = () => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['lov_add_on_service'],
    queryFn: () => apiGet(`${basePath}/plan/add-on-service`),
  });
};

export const useGetLOVBillingCateogry = (opportunityId) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['lov_flagging_type'],
    queryFn: () =>
      apiGet(`${basePath}/plan/flagging-type?projectId=${opportunityId}`),
  });
};

export const useGetLOVBillingLevel = (opportunityId) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['lov_flagging_level'],
    queryFn: () =>
      apiGet(`${basePath}/plan/flagging-level?projectId=${opportunityId}`),
  });
};

export const useGetLOVMonthlyUsage = () => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: ({ pricePlanId }) =>
      apiGet(`${basePath}/plan/${pricePlanId}/usage`),
  });
};

export const usePostValidateServiceTemplate = (quoteId) => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: ({ payload }) =>
      apiPost(
        `${basePath}/quote/${quoteId}/validate-service-template`,
        payload
      ),
  });
};

export const useDownloadQuoteOffer = (quoteId) => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: ({ payload }) =>
      apiPost(
        `${basePath}/quote/${quoteId}/old/pdf`,
        payload,
        'POST',
        {},
        null,
        'blob'
      ),
  });
};

export const useSendEmailQuoteOffer = (quoteId) => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: ({ payload }) =>
      apiPost(`${basePath}/quote//${quoteId}/old/pdf/send`, payload),
  });
};

export const useSubmitAddSubSetOffer = () => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: ({ query, payload }) =>
      apiPost(
        `${basePath}product/${query.produckId}/subset-menu?offerId=${query.offerId}&catalogCode=DEVICELIST`,
        payload
      ),
  });
};

export const usePutQuotation = (quoteId) => {
  return useMutation({
    mutationFn: () => apiPut(`${basePath}/quote/${quoteId}`),
  });
};

export const useGetSubsetMenu = (offerId, query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['detail_subscription', query],
    queryFn: () => apiGet(`${basePath}/product/${offerId}/subset-menu`, query),
  });
};

export const useGetSubset = (offerId, isEnabled, query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    enabled: isEnabled,
    queryKey: ['subset_list', query],
    queryFn: () => apiGet(`${basePath}/product/${offerId}/subset`, query),
  });
};

export const useGetApprovalQouteDiscount = (query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['quote_discount', query],
    queryFn: () => apiGet(`${basePath}/quote/approval/quote-discount`, query),
  });
};

export const useDeleteDenom = () => {
  return useMutation({
    mutationFn: ({ bundleId, offerId, customOfferId }) =>
      apiDelete(
        `${basePath}/bundle/${bundleId}/product/${offerId}?customOfferId=${customOfferId}`
      ),
  });
};

export const useGetQuoteBundleOrderingV2 = (bundleId, query) => {
  const isEnabled = !!bundleId;
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['get_bundle_cpq', bundleId, query.limit],
    queryFn: () => apiGet(`${basePath}/bundle/${bundleId}/old/v2`, query),
    enabled: isEnabled,
  });
};

export const useGetCustomDenomDetail = () => {
  return useMutation({
    mutationFn: ({ customOfferId, bundleId }) =>
      apiGet(`${basePath}/custom-offer/${customOfferId}?bundleId=${bundleId}`),
  });
};

export const useUpdateCustomDenom = () => {
  return useMutation({
    mutationFn: ({ customOfferId, bundleId, payload }) =>
      apiPut(
        `${basePath}/custom-offer/${customOfferId}?bundleId=${bundleId}`,
        payload
      ),
  });
};
