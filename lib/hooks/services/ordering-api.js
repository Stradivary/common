import { useMutation, useQuery } from '@tanstack/react-query';
import { DEFAULT_REACT_QUERY_OPTIONS } from '../../utils';
import { apiGet, apiPost, apiPut } from '../../axios-client';

const basePath = '/orders';

export const useGetDetailSubscription = (query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['detail_subscription', query],
    queryFn: () => apiGet(`${basePath}/v1/pic-order/subscriptions`, query),
  });
};

export const useGetOrderCase = (query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['order_case', query],
    queryFn: () => apiGet(`${basePath}/v1/pic-order/cases`, query),
  });
};

export const useGetOrderSummary = (orderId) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['order_summary', orderId],
    queryFn: () => apiGet(`${basePath}/v1/pic-order/order-detail/${orderId}`),
  });
};

export const useGet2FA = (email) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['2fa', email],
    queryFn: () => apiGet(`${basePath}/v1/pic-order/two-fa`, { email }),
  });
};

export const useGetOrderList = (query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['order_list', query],
    queryFn: () => apiGet(`${basePath}/v1/pic-order/order-list`, query),
  });
};

export const useGetOrderPicSummary = (id) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['pic_order_summary', id],
    queryFn: () =>
      id &&
      apiGet(
        `${basePath}/v1/pic-order/preparation-summary?orderRequestId=${id}`
      ),
  });
};

export const useGetOrderingInfoByProjectId = (id) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['orderinng_info_by_project_id', id],
    queryFn: () => id && apiGet(`${basePath}/v1/project/${id}`),
  });
};

export const usePostUploadFileWithQuotation = () => {
  return useMutation({
    mutationFn: (body) =>
      apiPost(
        `${basePath}/v1/sfa-order/upload-template-order-with-quotation`,
        body,
        'POST',
        {
          'Content-Type': 'multipart/form-data',
        }
      ),
  });
};

export const useGetDownloadTemplateWithQuotation = () => {
  return useMutation({
    mutationFn: (query) =>
      apiGet(
        `${basePath}/v1/sfa-order/download-template-order-with-quotation`,
        query,
        {},
        null,
        'blob'
      ),
  });
};

export const usePutSubmitOrderingWithQuotation = () => {
  return useMutation({
    mutationFn: (payload) =>
      apiPut(`${basePath}/v1/sfa-order/submit-order`, payload),
  });
};
