import { useQuery, useMutation } from '@tanstack/react-query';
import { DEFAULT_REACT_QUERY_OPTIONS, FILE_FORMAT } from '../../utils';
import { apiGet } from '../../axios-client';

const basePath = '/payments';

export const useGetVABank = (query = {}) => {
  return useMutation({
    mutationFn: () => apiGet(`${basePath}/v1/virtual-account/bank`, query),
  });
};

export const useGetVATaxInvoice = (query = {}, enabled = false) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['va_tax_invoice', query],
    queryFn: () => apiGet(`${basePath}/v1/virtual-account/tax-invoice`, query),
    enabled,
  });
};

export const useGetVAInvoice = (query = {}, enabled = false) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['va_invoice', query],
    queryFn: () => apiGet(`${basePath}/v1/virtual-account/invoice`, query),
    enabled,
  });
};

export const useGetVASummary = (vaId, query = {}, enabled = false) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['va_summary', query],
    queryFn: () =>
      apiGet(`${basePath}/v1/virtual-account/${vaId}/summary`, query),
    enabled,
  });
};

export const useGetVABalance = (query = {}, enabled = false) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['va_balance', query],
    queryFn: () => apiGet(`${basePath}/v1/virtual-account/balance`, query),
    enabled,
  });
};

export const useGetVAOutstandingPayment = (query = {}, enabled = false) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['va_invoice', query],
    queryFn: () =>
      apiGet(`${basePath}/v1/virtual-account/outstanding-payment`, query),
    enabled,
  });
};

export const useDownloadVAOutstandingPayment = () => {
  return useMutation({
    mutationFn: async ({ query, filename }) => {
      try {
        const response = await apiGet(
          `${basePath}/v1/virtual-account/outstanding-payment/download`,
          query,
          null,
          null,
          'blob'
        );
        const blobData = new Blob([response?.data]);
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
      } catch (error) {
        return {
          status: false,
          message:
            error.Error ||
            'Maaf, telah terjadi kesalahan. Silakan coba beberapa saat lagi',
        };
      }
    },
  });
};

export const useGetInvoicePaymentHistory = (query = {}, enabled = false) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['invoice_payment_history', query],
    queryFn: () => apiGet(`${basePath}/v1/invoice/historical-payment`, query),
    enabled,
  });
};

export const useGetAutoBookPaymentHistory = (query = {}, enabled = false) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['auto_book_payment_history', query],
    queryFn: () =>
      apiGet(`${basePath}/v1/invoice/auto/book-payment/history`, query),
    enabled,
  });
};

export const useGetLogToggleAutoBookPaymentHistory = (
  query = {},
  enabled = false
) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['log_toggle_auto_book_payment_history', query],
    queryFn: () =>
      apiGet(`${basePath}/v1/invoice/data-log-toggle-detail`, query),
    enabled,
  });
};

export const useGetPaymentHistory = (query = {}, enabled = false) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['payment_history', query],
    queryFn: () =>
      apiGet(`${basePath}/v1/virtual-account/payment-history/v2`, query),
    enabled,
  });
};
