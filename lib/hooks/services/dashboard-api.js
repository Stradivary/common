import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueries,
} from '@tanstack/react-query';
import { DEFAULT_REACT_QUERY_OPTIONS } from '../../utils';
import { apiGet } from '../../axios-client';

const basePath = '/dashboards';

export const useGetLicenseStock = (query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['License_Stock_List'],
    queryFn: () => apiGet(`${basePath}/v1/license-stock`, query),
    enabled: true,
  });
};

export const UseGetLicenseStockV2 = (query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['License_Stock_List_V2'],
    queryFn: () => apiGet(`${basePath}/v2/license-stock`, query),
    enabled: true,
  });
};

export const useGetListNotaDinas = (query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Nota_Dinas_List', query],
    queryFn: () => apiGet(`${basePath}/v1/nota-dinas`, query),
  });
};

export const useGetDetailNotaDinas = (notaId) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Detail_Nota_Dinas', notaId],
    queryFn: () => apiGet(`${basePath}/v1/nota-dinas/${notaId}`),
    enabled: false,
  });
};

export const useGetProductCatalogList = (query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Product_Catalog_List'],
    queryFn: () => apiGet(`${basePath}/v1/confluence/list-product`, query),
  });
};

export const useGetProductHTML = (pageId, query, enabled) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Product_Html', pageId, query],
    queryFn: () =>
      apiGet(`${basePath}/v1/confluence/product-html/${pageId}`, query),
    enabled,
  });
};

export const useGetTokenTableauDashboard = (query, enabled = true) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    enabled,
    queryKey: ['dashboard_tableau', query],
    queryFn: () => apiGet(`${basePath}/v1/tableau/secure-ticket`, query),
  });
};

export const useGetContractExpired = (page, query) => {
  return useInfiniteQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: [`Expired_Contract_List`, query],
    queryFn: ({ pageParam }) =>
      apiGet(`${basePath}/v1/homepage/contract/expired`, {
        ...query,
        page: pageParam,
      }),
    getNextPageParam: () => {
      return page + 1;
    },
  });
};

export const useGetBlockedMsisdn = (page, query) => {
  return useInfiniteQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: [`Blocked_Msisdn_Infinite_List`, query],
    queryFn: ({ pageParam }) =>
      apiGet(`${basePath}/v1/homepage/msisdn/blocking`, {
        ...query,
        page: pageParam,
      }),
    getNextPageParam: () => {
      return page + 1;
    },
  });
};

export const useGetBlockedMsisdnList = (id, query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: [`Blocked_Msisdn_List`, query],
    queryFn: () =>
      apiGet(`${basePath}/v1/homepage/msisdn/blocking/${id}`, query),
  });
};

export const useGetRanking = (query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Dashboard_Ranking'],
    queryFn: () => apiGet(`${basePath}/v1/homepage/segment`, query),
  });
};

export const useGetOpportunity = (query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Dashboard_Opportunity'],
    queryFn: () => apiGet(`${basePath}/v1/homepage/opportunity`, query),
  });
};

export const useGetLeads = (query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Dashboard_Leads'],
    queryFn: () => apiGet(`${basePath}/v1/homepage/lead`, query),
  });
};

export const useGetOrderMonitor = (query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Dashboard_Order_Monitor'],
    queryFn: () => apiGet(`${basePath}/v1/homepage/order-monitor`, query),
  });
};

export const useGetDownloadBlockedMsisdn = (id) => {
  return useMutation({
    mutationFn: (query) =>
      apiGet(
        `${basePath}/v1/homepage/msisdn/blocking/${id}/download`,
        query,
        {},
        null,
        'blob'
      ),
  });
};

export const useGetApprovalDigitalContractContract = (query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Approval_Contract'],
    queryFn: () =>
      apiGet(`${basePath}/v1/homepage/approval/digital-contract`, query),
  });
};

export const useGetDashboardTicket = (query = {}, isEnabled = true) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['dashboard_ticket'],
    queryFn: () => apiGet(`${basePath}/v1/homepage/ticket`, query),
    enabled: isEnabled,
  });
};

export const useGetDownloadContractExpired = () => {
  return useMutation({
    mutationFn: (query) =>
      apiGet(
        `${basePath}/v1/homepage/contract/expired/download`,
        query,
        {},
        null,
        'blob'
      ),
  });
};

export const useGetDownloadBlockingMsisdnList = () => {
  return useMutation({
    mutationFn: (query) =>
      apiGet(
        `${basePath}/v1/homepage/msisdn/blocking/download`,
        query,
        {},
        null,
        'blob'
      ),
  });
};

export const useGetExpiredContractCount = (lovs = []) => {
  return useQueries({
    queries: lovs.map((lov) => {
      return {
        ...DEFAULT_REACT_QUERY_OPTIONS,
        queryKey: ['ExpiredContractCount', lov],
        queryFn: () => apiGet(`${basePath}/v1/homepage/contract/expired`, lov),
      };
    }),
  })
    .map((it) => ({
      data: it?.data?.data?.data?.totalRecord,
      category: it?.data?.config?.params?.hasExpired,
    }))
    .reduce((acc, curr) => {
      acc[curr.category] = curr.data;
      return acc;
    }, {});
};
