import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { get } from 'lodash';
import { apiGet, apiPost, apiPut } from '../../axios-client';
import { DEFAULT_REACT_QUERY_OPTIONS, blobToJson } from '../../utils';

const basePath = '/cases';

export const useGetCaseList = (query = {}, enabled = true) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['case_list_v4', query],
    queryFn: () => apiGet(`${basePath}/v4`, query),
    enabled,
  });
};

export const useGetCaseListV6 = (query = {}, enabled = true) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['case_list_v6', query],
    queryFn: () => apiGet(`${basePath}/v6`, query),
    enabled,
  });
};

export const useGetCaseDetailV4 = (caseId, enabled = true) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['case_detail_v4'],
    queryFn: () => apiGet(`${basePath}/v4/${caseId}`),
    enabled,
  });
};

export const useGetCaseEscalationList = (isEnabled = false) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['case_escalation_list'],
    queryFn: () => apiGet(`${basePath}/v1/escalation`),
    enabled: isEnabled,
  });
};

export const useGetLovList = (query = {}, isEnabled = false) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['lov_list', query],
    queryFn: () => apiGet(`${basePath}/v1/get-lov`, query),
    enabled: isEnabled,
  });
};

export const usePutEscalate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: (body) => apiPut(`${basePath}/v1/escalate`, body),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['case_detail_v4'],
      });
    },
  });
};

export const UseGetReservationInfo = (query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['case_reservation_info', query],
    queryFn: () => apiGet(`${basePath}/v1/ticket/reservation/info`, query),
  });
};

export const useGetTicketPool = (queryParams, isEnabled = true) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['get_ticket_pool', queryParams],
    queryFn: () => apiGet(`${basePath}/v1/ticket/pool`, queryParams),
    enabled: isEnabled,
  });
};

export const usePostCreateCase = () => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: (body) => apiPost(`/cases/v1`, body),
  });
};
export const usePostCreateCaseV2 = () => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: (body) => apiPost(`/cases/v2`, body),
  });
};
export const usePostCreateCaseNote = () => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: (body) => apiPost(`/cases/v1/add-case-notes`, body),
  });
};

export const usePutUpdateCaseStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: (payload) => apiPut(`/cases/v1/update-case`, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['case_detail_v4'],
      });
    },
  });
};

export const useUploadFileNote = () => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: (body) =>
      apiPost(`${basePath}/v1/ticket/case-notes/file`, body, 'POST', {
        'Content-Type': 'multipart/form-data',
      }),
  });
};

export const useGetCases = (query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['corporates_case', query],
    queryFn: () => apiGet(`${basePath}/v6`, query),
  });
};

export const useGetLovKipMasterList = (isEnabled = false, query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['kip_master_list', query],
    queryFn: () => apiGet(`${basePath}/v1/kip-master-list`, query),
    enabled: isEnabled,
  });
};

// use api case v5 on jira, but there is api case detail v4, need discussion later, because there is some different response
export const useGetCaseDetailV5 = (caseId) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['case_detail_v5', caseId],
    queryFn: () => apiGet(`${basePath}/v5/${caseId}`),
  });
};

export const useGetFileCase = (caseId) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['case_file', caseId],
    queryFn: () =>
      apiGet(`${basePath}/v1/ticket/case-notes/file?caseId=${caseId}`),
  });
};

export const useGetKipList = (query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['kip_list', query],
    queryFn: () => apiGet(`${basePath}/v4/kip-list`, query),
  });
};

export const useGetCaseMsisdnList = () => {
  return useMutation({
    mutationFn: async (ticketId) => {
      try {
        const response = await apiGet(
          `${basePath}/v1/msisdn-list/download?caseId=${ticketId}`,
          null,
          null,
          null,
          'blob'
        );
        const fileName =
          get(response.headers, 'content-disposition')?.split('filename=')[1] ||
          'msisdn_list.xlsx';
        const blobData = new Blob([response?.data]);
        const url = window.URL.createObjectURL(blobData);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style = 'display: none';
        a.href = url;
        a.download = `${fileName}`;
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
