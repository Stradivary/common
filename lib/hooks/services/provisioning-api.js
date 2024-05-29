import { useQuery, useMutation } from '@tanstack/react-query';
import {
  DEFAULT_REACT_QUERY_OPTIONS,
  withId,
  FILE_FORMAT,
  blobToJson,
} from '../../utils';
import { apiGet, apiPost, apiPut } from '../../axios-client';

const basePath = '/provisionings';

export const UseGetOrderingProvisioning = (query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Ordering_Provisioning_List'],
    queryFn: () => apiGet(`${basePath}/v1/ordering-list`, query),
  });
};

export const UseGetOrderingType = (query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Ordering_Type'],
    queryFn: () => apiGet(`${basePath}/v1/order-type`, query),
  });
};

export const useGetEscalation = (orderId, query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Ordering_Escalation', orderId],
    queryFn: () =>
      apiGet(`${basePath}/v1/postpaid-subscriber/${orderId}/escalation`, query),
  });
};

export const useGetRemoveBasicServices = (orderId, query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Ordering_Remove_Basic_Service'],
    queryFn: () =>
      apiGet(`${basePath}/v1/remove-basic-service/${orderId}`, query),
  });
};

export const useGetLead2Cash = (query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Lead2Cash'],
    queryFn: () => apiGet(`${basePath}/v1/lead2cash`, query),
  });
};

export const useGetMassContactManagement = (orderId, query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Ordering_mass_contact_management'],
    queryFn: () =>
      apiGet(`${basePath}/v1/mass-contact-management/${orderId}`, query),
  });
};

export const useGetPrepaidRegistration = (orderId, query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Ordering_Remove_Basic_Service'],
    queryFn: () =>
      apiGet(`${basePath}/v1/prepaid-subscriber/${orderId}/msisdn`, query),
  });
};

export const useGetRemoveOfferNonOU = (query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Ordering_remove_offer_non_ou'],
    queryFn: () => apiGet(`${basePath}/v1/remove-offer-non-ou`, query),
  });
};

export const useGetOrderingSummary = (query, enabled = true) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Ordering_Summary', query],
    queryFn: () => apiGet(`${basePath}/v1/order-summary`, query),
    enabled,
  });
};

export const UseGetOrderingActivitiesList = (query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Ordering_Activities_List', query],
    queryFn: () => apiGet(`${basePath}/v1/retry/history`, query),
  });
};

export const useGetEDetailTransaction = (query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Detail_Transaction'],
    queryFn: () => apiGet(`${basePath}/v1/payment-responsibility`, query),
  });
};

export const UseGetFutureActivation = (query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Ordering_Monitoring_Order_Future_Activation', query],
    queryFn: () => apiGet(`${basePath}/v1/reservation`, query),
    enabled: false,
  });
};

export const UseGetProductDetail = (orderId) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Product_Detail'],
    queryFn: () =>
      apiGet(`${basePath}/v1/postpaid-subscriber/${orderId}/product-detail`),
    // enabled: false,
  });
};

export const UseGetSummaryPostpaidSubscriber = (orderId) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Summary_Postpaid_Subscribe'],
    queryFn: () =>
      apiGet(`${basePath}/v1/postpaid-subscriber/${orderId}/summary`),
    enabled: false,
  });
};

export const UseGetSummaryCreditLimitService = (orderId, query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Credit_Limit_Service'],
    queryFn: () =>
      apiGet(`${basePath}/v1/credit-limit-service/${orderId}/summary`, query),
    enabled: false,
  });
};

export const UseGetCLSListMSISDN = (query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Credit_Limit_Service_MSISDN', query],
    queryFn: () => apiGet(`${basePath}/v1/credit-limit-service`, query),
    enabled: false,
  });
};

export const UseGetSubscriberList = (orderId, query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Postpaid_Subscriber_MSISDN_List', query],
    queryFn: () =>
      apiGet(`${basePath}/v1/postpaid-subscriber/${orderId}`, query),
    enabled: false,
  });
};

const downloadExcell = async (path, query, fileName) => {
  try {
    const response = await apiGet(
      `${basePath}${path}`,
      query,
      null,
      null,
      'blob'
    );
    const blobData = new Blob([response?.data]);
    const formatFile = FILE_FORMAT?.[response?.data?.type] || 'xls';
    const url = window.URL.createObjectURL(blobData);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    a.href = url;
    a.download = `${fileName}${formatFile}`;
    a.click();
    window.URL.revokeObjectURL(url);

    return {
      status: true,
    };
  } catch (error) {
    const message = await blobToJson(error?.data);

    return {
      status: false,
      message:
        message?.error ||
        'Maaf, telah terjadi kesalahan. Silakan coba beberapa saat lagi',
    };
  }
};

export const useGetSubscriberExcel = () => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: async (query) => {
      downloadExcell(
        '/v1/postpaid-subscriber/export-subscriber',
        query,
        `${query.orderId}-${query.orderType}`
      );
    },
  });
};

export const useGetReactivationExcel = () => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: async (orderId) => {
      downloadExcell(`/v1/reactivation/${orderId}/export`, null, `${orderId}`);
    },
  });
};

export const useGetChangeOwnershipExcel = () => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: async (query) => {
      downloadExcell('/v1/change-ownership/export', query, `${query.orderId}`);
    },
  });
};

export const useGetCreditLimitServiceExcel = () => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: async (query) => {
      downloadExcell(
        '/v1/credit-limit-service/export',
        query,
        `${query.orderId}`
      );
    },
  });
};

export const useGetMassContactManagementExcel = () => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: async (query) => {
      downloadExcell(
        `/v1/mass-contact-management/mass-contact/${query.orderId}/download`,
        null,
        `${query.orderId}`
      );
    },
  });
};

export const useGetMassPrepaidRegistrationExcel = () => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: async (orderId) => {
      downloadExcell(
        `/v1/prepaid-subscriber/${orderId}/msisdn/export`,
        null,
        `${orderId}`
      );
    },
  });
};

export const useGetRemoveBasicServiceExcel = () => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: async (orderId) => {
      downloadExcell(
        `/v1/remove-basic-service/${orderId}/export`,
        null,
        `${orderId}`
      );
    },
  });
};

export const useGetLead2CashExcel = () => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: async (query) => {
      downloadExcell(`/v1/lead2cash/export`, query, `${query.orderId}`);
    },
  });
};

export const useGetRemoveOfferExcel = () => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: async (orderId) => {
      downloadExcell(
        `/v1/remove-offer/ou/${orderId}/export`,
        null,
        `${orderId}`
      );
    },
  });
};

export const useGetRemoveOfferNonOuExcel = () => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: async (query) => {
      downloadExcell(
        `/v1/remove-offer-non-ou/export`,
        query,
        `${query.orderId}`
      );
    },
  });
};

export const UseGetChangeOwnershipMSISDN = (query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Change_Ownership_MSISDN_List', query],
    queryFn: () => apiGet(`${basePath}/v1/change-ownership`, query),
    enabled: false,
  });
};

export const UseGetReactivationList = (orderId, query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Reactivation_MSISDN_List', query],
    queryFn: () =>
      apiGet(`${basePath}/v1/reactivation/${orderId}/msisdn`, query),
    enabled: false,
  });
};

export const UseGetSummaryChangeOwnership = (orderId) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Change_Ownership'],
    queryFn: () => apiGet(`${basePath}/v1/change-ownership/${orderId}/summary`),
    enabled: false,
  });
};

export const UseGetReactivation = (orderId) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['reactivation'],
    queryFn: () => apiGet(`${basePath}/v1/reactivation/${orderId}/summary`),
    enabled: false,
  });
};

export const usePutCancelOrderReservation = () => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: (body) =>
      apiPut(`${basePath}/v1/reservation/cancellation`, body),
  });
};

export const useGetExecutedProvisioningSummary = (query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['executed_order', query],
    queryFn: () => apiGet(`${basePath}/v1/order-summary`, query),
  });
};

export const useGetExecutedOrderDetail = (id, query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['executed_order_detail', query],
    queryFn: () => apiGet(withId(id, `${basePath}/v1/msisdn/detail`), query),
  });
};

export const useGetExecutedOrderActivity = (id, query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['executed_order_activity', query],
    queryFn: () => apiGet(withId(id, `${basePath}/v1/msisdn/activity`), query),
  });
};

export const usegetRemoveOfferOu = (orderId, query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['executed_order_activity', query],
    queryFn: () =>
      apiGet(withId(orderId, `${basePath}/v1/remove-offer/ou/`), query),
  });
};

export const useRetryOu = () => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: (body) =>
      apiPost(`${basePath}/v1/offer-removal/ou-retry`, body),
  });
};

export const useGetMassTerminate = (orderId, query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['executed_order_mass_terminate', query],
    queryFn: () => apiGet(`${basePath}/v1/termination/${orderId}`, query),
  });
};

export const useDownloadMassTerminate = () => {
  return useMutation({
    mutationFn: async ({ orderId, fileName }) => {
      try {
        const response = await apiGet(
          `${basePath}/v1/termination/download/${orderId}`,
          null,
          null,
          null,
          'blob'
        );

        const blobData = new Blob([response?.data]);
        const formatFile = FILE_FORMAT?.[response?.data?.type] || 'xls';
        const url = window.URL.createObjectURL(blobData);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style = 'display: none';
        a.href = url;
        a.download = `${fileName}${formatFile}`;
        a.click();
        window.URL.revokeObjectURL(url);

        return {
          status: true,
        };
      } catch (error) {
        const message = await blobToJson(error?.data);

        return {
          status: false,
          message:
            message?.error ||
            'Maaf, telah terjadi kesalahan. Silakan coba beberapa saat lagi',
        };
      }
    },
  });
};

export const useGetMassBlockUnblock = (orderId, query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['mass_block_unblock', query],
    queryFn: () =>
      apiGet(withId(orderId, `${basePath}/v1/mass-block-unblock`), query),
  });
};

export const useGetExportMsisdn = () => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: (orderId) =>
      downloadExcell(
        `/v1/mass-block-unblock/export-msisdn/${orderId}`,
        null,
        `List_MSISDN_Mass_Block_Unblock_${orderId}`
      ),
  });
};

export const useGetDownloadTemplateOther = () => {
  return useMutation({
    mutationFn: () =>
      apiGet(`${basePath}/v1/other/template`, {}, {}, null, 'blob'),
  });
};

export const useGetDownloadTemplateAddOffer = () => {
  return useMutation({
    mutationFn: () =>
      apiGet(
        `${basePath}/v1/postpaid-subscriber/add-offer/template`,
        {},
        {},
        null,
        'blob'
      ),
  });
};

export const useGetDownloadTemplateRemoveOffer = () => {
  return useMutation({
    mutationFn: () =>
      apiGet(`${basePath}/v1/remove-offer/template`, {}, {}, null, 'blob'),
  });
};

export const useGetDownloadTemplatePerso = () => {
  return useMutation({
    mutationFn: () =>
      apiGet(`${basePath}/v1/perso/template`, {}, {}, null, 'blob'),
  });
};

export const useGetDownloadTemplateReactivation = () => {
  return useMutation({
    mutationFn: () =>
      apiGet(`${basePath}/v1/reactivation/template`, {}, {}, null, 'blob'),
  });
};

export const useGetDownloadTemplateTermination = () => {
  return useMutation({
    mutationFn: () =>
      apiGet(`${basePath}/v1/termination/template`, {}, {}, null, 'blob'),
  });
};

export const useGetDownloadTemplatePrepaidRegistration = () => {
  return useMutation({
    mutationFn: (query) =>
      apiGet(
        `${basePath}/v1/prepaid-registration/template`,
        query,
        {},
        null,
        'blob'
      ),
  });
};

export const useGetDownloadTemplateSPTP = () => {
  return useMutation({
    mutationFn: (query) =>
      apiGet(`${basePath}/v1/sptp/template`, query, {}, null, 'blob'),
  });
};

export const usePostUploadFileNonQuotation = () => {
  return useMutation({
    mutationFn: (body) =>
      apiPost(`${basePath}/v1/other/upload-non-quotation`, body, 'POST', {
        'Content-Type': 'multipart/form-data',
      }),
  });
};

export const usePostSubmitOrderingOther = () => {
  return useMutation({
    mutationFn: (body) => apiPost(`${basePath}/v1/other/submit`, body),
  });
};

export const UseGetSummaryRemoveBasicService = (orderId, query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Remove_Basic_Service'],
    queryFn: () =>
      apiGet(`${basePath}/v1/remove-basic-service/${orderId}/summary`, query),
    enabled: false,
  });
};
