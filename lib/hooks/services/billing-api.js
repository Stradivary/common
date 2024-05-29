import { useMutation, useQuery } from '@tanstack/react-query';
import { DEFAULT_REACT_QUERY_OPTIONS, FILE_FORMAT } from '../../utils';
import { apiGet, apiPost } from '../../axios-client';

const basePath = '/billings/v1';

const handleBlobData = ({ response, filename }) => {
  const blobData = new Blob([response.data]);
  const formatFile = FILE_FORMAT?.[response?.data?.type] || '';

  if (!formatFile) {
    throw new Error();
  }

  const url = window.URL.createObjectURL(blobData);
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';
  a.href = url;
  a.download = `${filename}${formatFile}`;
  a.click();
  window.URL.revokeObjectURL(url);

  return {
    status: true,
  };
};

export const useGetBARList = (query, enabled = true) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Get_BAR_List', query],
    queryFn: () => apiGet(`${basePath}/search/bar-list`, query),
    enabled,
  });
};

export const useGetBillingArrangement = (query, enabled = true) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Get_Billing_Arrangement', query],
    queryFn: () => apiGet(`${basePath}/search/billing-arrangement`, query),
    enabled,
  });
};

export const useGetCustomerLedger = (query, enabled = true) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Get_Customer_Ledger', query],
    queryFn: () => apiGet(`${basePath}/search/ledger`, query),
    enabled,
  });
};

export const useGetAccountHeader = (query, enabled = true) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Get_Account_Header', query],
    queryFn: () => apiGet(`${basePath}/search/account`, query),
    enabled,
  });
};

export const useGetSearchPayment = (query, enabled = true) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Get_Search_Payment', query],
    queryFn: () => apiGet(`${basePath}/search`, query),
    enabled,
  });
};

export const useGetPph23History = (projectId) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['pph23_history', projectId],
    queryFn: () =>
      apiGet(`${basePath}/wapu/project-pph23-history/${projectId}`),
  });
};

export const useGetSplitBillTemplate = (query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Get_Split_Bill_Template', query],
    queryFn: () => apiGet(`${basePath}/split-bill/templates`, query),
  });
};

export const useGetBillingSearch = (query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Get_Billing_Search', query],
    queryFn: () => apiGet(`${basePath}/search`, query),
  });
};

export const useGetSplitBillProjectDetail = (query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Get_Split_Project_Detail', query],
    queryFn: () => apiGet(`${basePath}/split-bill/project-detail`, query),
  });
};

export const useGetLOVSplitBill = (queryParams, isEnabled = true) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['get_value_pool', queryParams],
    queryFn: () => apiGet(`${basePath}/split-bill/lov`, queryParams),
    enabled: isEnabled,
  });
};

export const useGetSearchLedger = (query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Get_Billing_Ledger', query],
    queryFn: () => apiGet(`${basePath}/search/ledger`, query),
  });
};

export const usegetSearchMemo = (query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Get_Billing_Ledger', query],
    queryFn: () => apiGet(`${basePath}/search/memo`, query),
  });
};

export const useGetServiceHistoryMSISDN = (query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Get_Service_History_MSISDN', query],
    queryFn: () => apiGet(`${basePath}/split-bill/msisdn-history`, query),
  });
};

export const useGetInvoiceList = (query = {}, enabled = false) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['billing_invoice_list', query],
    queryFn: () => apiPost(`${basePath}/invoice/invoice-list`, query),
    enabled,
  });
};

export const useDownloadFinalInvoice = () => {
  return useMutation({
    mutationFn: async ({ query, filename }) => {
      try {
        const response = await apiGet(
          `${basePath}/invoice/generate-final-invoice`,
          query,
          null,
          null,
          'blob'
        );

        return handleBlobData({ response, filename });
      } catch (error) {
        return {
          status: false,
          message:
            error?.Error ||
            'Maaf, telah terjadi kesalahan. Silakan coba beberapa saat lagi',
        };
      }
    },
  });
};

export const useDownloadDetailInvoice = () => {
  return useMutation({
    mutationFn: async ({ query, filename, isExcel }) => {
      try {
        const response = await apiGet(
          `${basePath}/invoice/download/file-detail-invoice${
            isExcel ? '-excel' : ''
          }`,
          query,
          null,
          null,
          'blob'
        );

        return handleBlobData({ response, filename });
      } catch (error) {
        return {
          status: false,
          message:
            error?.Error ||
            'Maaf, telah terjadi kesalahan. Silakan coba beberapa saat lagi',
        };
      }
    },
  });
};

export const usePokeDetailInvoice = () => {
  return useMutation({
    mutationFn: (payload) =>
      apiPost(`${basePath}/invoice/poke/file-detail-invoice`, payload),
  });
};

export const useDownloadPaymentReceipt = (bookedPaymentId) => {
  return useMutation({
    mutationFn: async ({ query, filename }) => {
      try {
        const response = await apiGet(
          `${basePath}/invoice/download-payment-receipt/${bookedPaymentId}`,
          query,
          null,
          null,
          'blob'
        );

        return handleBlobData({ response, filename });
      } catch (error) {
        return {
          status: false,
          message:
            error?.Error ||
            'Maaf, telah terjadi kesalahan. Silakan coba beberapa saat lagi',
        };
      }
    },
  });
};

export const useGetWapuCorporateAccountHistory = (
  corporateId,
  query = {},
  enabled = false
) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    enabled,
    queryKey: ['billing_wapu_corporate_account_history', corporateId, query],
    queryFn: () =>
      apiGet(
        `${basePath}/wapu/corporate-account-history/${corporateId}`,
        query
      ),
  });
};

export const useGetInvoiceDetail = (query = {}, enabled = false) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['invoice_detail', query],
    queryFn: () => apiGet(`${basePath}/invoice/book-payment/detail`, query),
    enabled,
  });
};
