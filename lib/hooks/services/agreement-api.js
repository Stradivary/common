import { useQuery, useMutation } from '@tanstack/react-query';
import {
  DEFAULT_REACT_QUERY_OPTIONS,
  FILE_FORMAT,
  blobToJson,
} from '../../utils';
import { apiGet, apiPost, apiDelete } from '../../axios-client';

const basePath = '/agreements';

export const useGetAgreementDetail = (query, enabled = true) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    enabled,
    queryKey: ['agreements_detail', query],
    queryFn: () => apiGet(`${basePath}/v1/detail`, query),
  });
};

export const useGetAgreementAmendement = (query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['get_agreement_amendement', query],
    queryFn: () => apiGet(`${basePath}/v1/amendment/list`, query),
  });
};

export const useGetAgreementCorporate = (query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['agreement_corporate_list', query],
    queryFn: () => apiGet(`${basePath}/v1/detail/corporate`, query),
  });
};

export const useGetAgreementProject = (query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['agreement_project_list', query],
    queryFn: () => apiGet(`${basePath}/v1/detail/project`, query),
  });
};

export const useGetAgreementOpportunity = (query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['agreement_opportunity_list', query],
    queryFn: () => apiGet(`${basePath}/v1/detail/opportunity`, query),
  });
};

export const useGetAgreementSolution = (query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['agreement_solution_list', query],
    queryFn: () => apiGet(`${basePath}/v1/detail/solution`, query),
  });
};

export const useGetAgreementDocument = (query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['agreement_document_list', query],
    queryFn: () => apiGet(`${basePath}/v1/detail/document`, query),
  });
};

export const useGetAgreementMasterV2List = (query = {}, isEnabled = false) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['agreement_master_v2_list', query],
    queryFn: () => apiGet(`${basePath}/v2/master`, query),
    enabled: isEnabled,
  });
};

export const useSubmitEcontract = () => {
  return useMutation({
    mutationFn: (payload) =>
      apiPost(`${basePath}/v1/econtract/submit`, payload),
  });
};

// get list of econtract on circulation or signed
export const useGetEContractList = (query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['econtract_list', query],
    queryFn: () => apiGet(`${basePath}/v2/econtract/list`, query),
  });
};

export const useSubmitEcontractDraft = () => {
  return useMutation({
    mutationFn: (payload) => apiPost(`${basePath}/v1/econtract/draft`, payload),
  });
};

// get econtract draft list
export const useGetEContractDraft = (query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['econtract_draft_list', query],
    queryFn: () => apiGet(`${basePath}/v1/econtract/draft`, query),
  });
};

// delete econtract draft
export const useDeleteEContractDraft = () => {
  return useMutation({
    mutationFn: ({ opportunityId, draftId }) =>
      apiDelete(`${basePath}/v1/econtract/draft/${opportunityId}/${draftId}`),
  });
};

// econtract detail still draft
export const useGetEcontractDraftDetail = (draftId, enabled = false) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['econtract_view_draft', draftId],
    queryFn: () => apiGet(`${basePath}/v1/econtract/draft/${draftId}`),
    enabled,
  });
};

// econtract detail on circulation or signed
export const useGetEcontractDetail = (agreementId, enabled = false) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['econtract_view_submitted', agreementId],
    queryFn: () =>
      apiGet(`${basePath}/v1/econtract/query-detail/${agreementId}`),
    enabled,
  });
};

export const useGetListActivityHistory = (
  agreementId,
  query = {},
  enabled = true
) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    enabled,
    queryKey: ['econtract_activity', agreementId, query],
    queryFn: () =>
      apiGet(`${basePath}/v1/econtract/activity-history/${agreementId}`, query),
  });
};

export const useDownloadActivityHistory = () => {
  return useMutation({
    mutationFn: (agreementId) =>
      apiGet(
        `${basePath}/v1/econtract/donwload-activity-history/${agreementId}`
      ),
  });
};

export const useDownloadLogActivity = () => {
  return useMutation({
    mutationFn: ({ agreementId, query = {} }) =>
      apiGet(
        `${basePath}/v1/econtract/download-log-detail/${agreementId}`,
        query
      ),
  });
};

export const usePostEcontractPayment = () => {
  return useMutation({
    mutationFn: (payload) =>
      apiPost(`${basePath}/v1/econtract/payment`, payload),
  });
};

export const useDeleteEcontractPayment = () => {
  return useMutation({
    mutationFn: (payload) =>
      apiDelete(`${basePath}/v1/econtract/payment`, payload),
  });
};

export const usePostUploadSupportDoc = () => {
  return useMutation({
    mutationFn: (payload) =>
      apiPost(
        `${basePath}/v1/econtract/supporting-document/upload`,
        payload,
        'POST',
        {
          'Content-Type': 'multipart/form-data',
        }
      ),
  });
};

export const useGetSupportingDocEcontract = () => {
  return useMutation({
    mutationFn: (query) =>
      apiGet(`${basePath}/v1/econtract/supporting-document-filename`, query),
  });
};

export const useDownloadSupportingDocEcontract = () => {
  return useMutation({
    mutationFn: (query) =>
      apiGet(`${basePath}/v1/econtract/supporting-document/download`, query),
  });
};

export const useDownloadTemplateEcontract = (query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['download_econtract_template', query],
    queryFn: () => apiGet(`${basePath}/v1/econtract/template`, query),
  });
};

export const useDownloadOtherDoc = (query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['download_econtract_other_doc', query],
    queryFn: () => apiGet(`${basePath}/v1/econtract/others-document`, query),
  });
};

export const useGetEcontractDraftSupportingDocument = (
  draftId,
  enabled = true
) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['econtract_draft_document'],
    queryFn: () =>
      apiGet(`${basePath}/v1/econtract/draft/supporting-document/${draftId}`),
    enabled,
  });
};

export const useSubmitEcontractDraftSupportingDocument = () => {
  return useMutation({
    mutationFn: (payload) =>
      apiPost(`${basePath}/v1/econtract/draft/supporting-document`, payload),
  });
};

export const useGetEcontractPayment = (
  opptyId,
  query = {},
  enabled = false
) => {
  const { paymentInfoIdList, ...rest } = query || {};
  const paymentIdIntoArray =
    (paymentInfoIdList &&
      paymentInfoIdList?.map((id) => `&paymentInfoIdList=${id}`)) ||
    [];
  const finalPaymentIdArray =
    paymentInfoIdList?.length === 1
      ? `${paymentIdIntoArray}${paymentIdIntoArray}`
      : paymentIdIntoArray?.join('');
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['econtract_payment_information', opptyId, query],
    enabled,
    queryFn: () =>
      query &&
      apiGet(
        `${basePath}/v1/econtract/payment?opportunityId=${opptyId}${finalPaymentIdArray}`,
        rest
      ),
  });
};

export const useGetQuoteDetail = (quoteId) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    enabled: false,
    queryKey: ['quote_detail', quoteId],
    queryFn: () => apiGet(`${basePath}/quote/detail/${quoteId}`),
  });
};

export const useSubmitQuotationEcontract = () => {
  return useMutation({
    mutationFn: (payload) =>
      apiPost(`${basePath}/v1/econtract/prt-quotation`, payload),
  });
};

export const useDeleteQuotationEcontract = () => {
  return useMutation({
    mutationFn: (payload) =>
      apiDelete(
        `${basePath}/v1/econtract/prt-quotation/${payload.quotationId}`,
        payload
      ),
  });
};

export const useGetQuotationEcontractOpptyByPaymentInfo = (
  opptyId,
  query,
  enabled = false
) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['quotation_list_by_payment_info', opptyId, query],
    enabled,
    queryFn: () =>
      opptyId &&
      query &&
      apiGet(`${basePath}/v1/econtract/prt-quotation/${opptyId}`, query),
  });
};

export const useGetCollectionTreatmentHistory = () => {
  return useMutation({
    mutationFn: (query) =>
      apiGet(`${basePath}/collection-treatment-approval/history`, query),
  });
};

export const useGetEcontractDocumentList = (query, enabled = false) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['econtract_document_list', query.documentType],
    enabled,
    queryFn: () =>
      apiGet(`${basePath}/v1/econtract/collab-tools/document/list`, query),
  });
};

// get document detail and section without html
export const useGetEcontractDocumentDetail = (documentId, enabled = false) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['econtract_document_detail', documentId],
    enabled,
    queryFn: () =>
      apiGet(
        `${basePath}/v1/econtract/collab-tools/document/detail/${documentId}`
      ),
  });
};

export const useGenerateEcontractDocumentPks = () => {
  return useMutation({
    mutationFn: (payload) =>
      apiPost(`${basePath}/v1/econtract/generate/document-pks`, payload),
  });
};

export const useGenerateEcontractDocumentKbOtp = () => {
  return useMutation({
    mutationFn: (payload) =>
      apiPost(`${basePath}/v1/econtract/generate/document-kb-otp`, payload),
  });
};

export const useGenerateEcontractDocumentKbPaper = () => {
  return useMutation({
    mutationFn: (payload) =>
      apiPost(`${basePath}/v1/econtract/generate/document-kb-paper`, payload),
  });
};

export const useDownloadDocument = () => {
  return useMutation({
    mutationFn: async ({ docId, filename }) => {
      // example file download, for testing :
      // http://localhost:4000/https://file-examples.com/storage/fec71f2ebe65d8e339e8b9c/2017/02/file-sample_100kB.doc

      try {
        const response = await apiGet(
          `${basePath}/v1/document/${docId}`,
          null,
          null,
          null,
          'blob'
        );
        const blobData = new Blob([response?.data]);
        const formatFile = FILE_FORMAT?.[response?.data?.type] || '';
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

export const usePreviewDocument = () => {
  return useMutation({
    mutationFn: async ({ docId, filename }) => {
      try {
        const response = await apiGet(
          `${basePath}/v1/document/${docId}`,
          null,
          null,
          null,
          'blob'
        );
        const blobData = new Blob([response?.data]);
        const formatFile = FILE_FORMAT?.[response?.data?.type] || '';
        const url = window.URL.createObjectURL(blobData);
        return { url, filename, formatFile };
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

export const useGetCollectionTreatment = (transactionId, query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['collection_treatment', transactionId, query],
    queryFn: () =>
      transactionId &&
      apiGet(
        `${basePath}/v1/econtract/historical-collection-treatment/${transactionId}`,
        query
      ),
  });
};

export const usePostSubmitNonEContract = () => {
  return useMutation({
    mutationFn: (payload) =>
      apiPost(`${basePath}/v1/econtract/submit-non-econtract`, payload),
  });
};

export const useGetTelkomselSigner = (query, enabled = false) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['econtract_tsel_signer', query],
    enabled,
    queryFn: () => apiGet(`${basePath}/v1/econtract/tsel-signer`, query),
  });
};

export const useDownloadKTPSigner = () => {
  return useMutation({
    mutationFn: async ({ signerId, filename }) => {
      try {
        const response = await apiGet(
          `${basePath}/v1/econtract/download/ktp-signer/${signerId}`,
          null,
          null,
          null,
          'blob'
        );

        const blobData = new Blob([response?.data]);
        const formatFile = FILE_FORMAT?.[response?.data?.type] || '';

        if (!formatFile) {
          return {
            status: false,
            message: 'Invalid file format',
          };
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

export const useDownloadMainAgreementDoc = () => {
  return useMutation({
    mutationFn: async (filename) => {
      try {
        const response = await apiGet(
          `${basePath}/v1/document/download/${filename}`,
          null,
          null,
          null,
          'blob'
        );

        const blobData = new Blob([response?.data]);
        const formatFile = FILE_FORMAT?.[response?.data?.type] || '';

        if (!formatFile) {
          return {
            status: false,
            message: 'Invalid file format',
          };
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

export const useGetNonEContractDetail = (opportunityId, enabled = false) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['non_econtract_digital', opportunityId],
    enabled,
    queryFn: () =>
      apiGet(`${basePath}/v1/econtract/non-econtract/${opportunityId}`),
  });
};

export const useGetEcontractDraftPayment = () => {
  return useMutation({
    mutationFn: (query) =>
      query.opportunityId && apiGet(`${basePath}/v1/econtract/payment`, query),
  });
};
