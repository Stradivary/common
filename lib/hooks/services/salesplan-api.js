import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DEFAULT_REACT_QUERY_OPTIONS } from '../../utils';
import { apiGet, apiPost, apiPut } from '../../axios-client';

const basePath = '/sales-plans';

export const useGetOpportunityList = (query = {}, enabled = false) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Opportunity_List', query],
    queryFn: () => apiGet(`${basePath}/v4/opportunity`, query),
    enabled,
  });
};

export const useGetPriceQuoteList = (query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Price_Quote_Monit_List', query],
    queryFn: () => apiGet(`${basePath}/v1/opportunity/price-monitor`, query),
  });
};

export const UseGetQuotation = (opptyId) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    enabled: false,
    queryKey: ['sales-plan-quotation', opptyId],
    queryFn: () => apiGet(`${basePath}/v1/opportunity/quote-list/${opptyId}`),
  });
};

export const useGetOpptyDetail = (opptyId) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['oppty_detail', opptyId],
    queryFn: () => opptyId && apiGet(`${basePath}/v3/opportunity/${opptyId}`),
  });
};

export const useGetOpptyActivityStatus = (enabled = false) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['oppty_detail_activity_status'],
    queryFn: () => apiGet(`${basePath}/v1/opportunity/activity-status`),
    enabled,
  });
};

export const useGetOpptyActivityType = (enabled = false) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['oppty_detail_activity_type'],
    queryFn: () => apiGet(`${basePath}/v1/opportunity/activity-type`),
    enabled,
  });
};

export const useGetOptyActivityList = (query, enabled = false) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['opty_activity_list', query],
    queryFn: () => apiGet(`${basePath}/v1/opportunity/activities`, query),
    enabled,
  });
};

export const usePostOpptyActivty = (opptyId) => {
  return useMutation({
    mutationFn: (payload) =>
      apiPost(`${basePath}/v1/opportunity/${opptyId}/activity`, payload),
  });
};

export const usePutOpptyActivty = (opptyId) => {
  return useMutation({
    mutationFn: ({ payload, activityId }) =>
      apiPut(
        `${basePath}/v1/opportunity/${opptyId}/activity/${activityId}`,
        payload
      ),
  });
};

export const usePutTargetRevenue = (opptyId) => {
  return useMutation({
    mutationFn: (payload) =>
      apiPut(`${basePath}/v1/opportunity/${opptyId}/target-revenue`, payload),
  });
};

export const useGetOptyStageList = (query = {}, enabled = false) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Opty_Stage_List', query],
    queryFn: () => apiGet(`${basePath}/v2/opportunity/stage`, query),
    enabled,
  });
};

export const useGetLeadList = (query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Get_Lead_List'],
    queryFn: () => apiGet(`${basePath}/v4/lead`, query),
  });
};

export const usePutLead = (leadId) => {
  return useMutation({
    mutationFn: ({ payload }) =>
      apiPut(`${basePath}/v1/lead/${leadId}`, payload),
  });
};

export const usePutLeadStage = (leadId) => {
  return useMutation({
    mutationFn: ({ payload }) =>
      apiPut(`${basePath}/v1/lead/${leadId}/action`, payload),
  });
};

export const useGetLeadDetail = (idLead, query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Get_Lead_Detail'],
    queryFn: () => apiGet(`${basePath}/v4/lead/${idLead}`, query),
    retry: 3,
  });
};

export const useGetLeadActivityQuery = (idLead, query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Get_ActivityQuery'],
    queryFn: () => apiGet(`${basePath}/v1/lead/activity/${idLead}`, query),
  });
};

export const usePostLeadActivty = (Id) => {
  return useMutation({
    mutationFn: (payload) =>
      apiPost(`${basePath}/v1/lead/${Id}/activity`, payload),
  });
};

export const usePutLeadActivty = (Id) => {
  return useMutation({
    mutationFn: ({ payload, activityId }) =>
      apiPut(`${basePath}/v1/lead/${Id}/activity/${activityId}`, payload),
  });
};

export const useGetOpptyAvailability = () => {
  return useMutation({
    mutationFn: (query) =>
      apiGet(`${basePath}/v1/opportunity/availability`, query),
  });
};

export const usePostCreatOpty = () => {
  return useMutation({
    mutationFn: (payload) => apiPost(`${basePath}/v2/opportunity`, payload),
  });
};

export const usePostUploadSupportFile = () => {
  return useMutation({
    mutationFn: (payload) =>
      apiPost(`${basePath}/v1/opportunity/upload-support-file`, payload),
  });
};

export const useUpdateRealizationDate = () => {
  return useMutation({
    mutationFn: ({ opportunityId, ...payload }) =>
      apiPut(
        `${basePath}/v2/opportunity/realization-date/${opportunityId}`,
        payload
      ),
  });
};

export const useUpdateOpportunity = () => {
  return useMutation({
    mutationFn: (payload) => apiPost(`${basePath}/v2/opportunity`, payload),
  });
};

export const useGetSummaryMultipleLeads = (orderId, enabled = true) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    enabled,
    queryKey: ['summary_multiple_leads', orderId],
    queryFn: () => apiGet(`${basePath}/v1/lead/multi-lead/summary/${orderId}`),
  });
};

export const usePostRetrySummaryMultipleLeads = (orderId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => apiPost(`${basePath}/v1/lead/multi-lead/retry`, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['summary_multiple_leads', orderId],
      });
    },
  });
};

export const useGetDetailMultipleLeads = (orderId, query, enabled = true) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    enabled,
    queryKey: ['detail_multiple_leads', { ...query, orderId }],
    queryFn: () =>
      apiGet(`${basePath}/v1/lead/multi-lead/detail/${orderId}`, query),
  });
};

export const useGetOpportunityAuditLog = (opportunityId, query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Opportunity_Audit_Log', query],
    queryFn: () =>
      apiGet(`${basePath}/v1/opportunity/audit-log/${opportunityId}`, query),
  });
};

export const usePostOpportunityAuditLog = (opportunityId) => {
  return useMutation({
    mutationFn: (payload) =>
      apiPost(`${basePath}/v1/opportunity/audit-log/${opportunityId}`, payload),
  });
};

export const useGetLeadsStageList = (query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['leads_stage_list', query],
    queryFn: () => apiGet(`${basePath}/v4/lead/stage`, query),
  });
};

export const useGetMultipleLeadsList = (query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['multiple_leads_list', query],
    queryFn: () => apiGet(`${basePath}/v1/lead/multi-lead`, query),
  });
};

export const useGetDownloadMultipleLeadsDetail = () => {
  return useMutation({
    mutationFn: (orderId) =>
      apiGet(
        `${basePath}/v1/lead/multi-lead/${orderId}/download`,
        {},
        {},
        null,
        'blob'
      ),
  });
};

export const useGetTemplateUploadMultipleLeads = () => {
  return useMutation({
    mutationFn: (query) =>
      apiGet(
        `${basePath}/v1/lead/multi-lead/template`,
        query,
        {},
        null,
        'blob'
      ),
  });
};

export const usePostUploadMultipleLeads = () => {
  return useMutation({
    mutationFn: (payload) =>
      apiPost(`${basePath}/v1/lead/multi-lead/upload`, payload, 'POST', {
        'Content-Type': 'multipart/form-data',
      }),
  });
};

export const useGetUploadedMultipleLeads = (redisId) => {
  return useMutation({
    mutationFn: (query) =>
      apiGet(`${basePath}/v1/lead/multi-lead/upload/${redisId}`, query),
  });
};

export const useGetDownloadUploadedMultipleLeads = (redisId) => {
  return useMutation({
    mutationFn: (query) =>
      apiGet(
        `${basePath}/v1/lead/multi-lead/upload/${redisId}/download`,
        query
      ),
  });
};

export const usePostSingleLead = () => {
  return useMutation({
    mutationFn: (payload) => apiPost(`${basePath}/v1/lead`, payload),
  });
};

export const usePostSubmitMultipleLeads = () => {
  return useMutation({
    mutationFn: (payload) => apiPost(`${basePath}/v1/lead/multi-lead`, payload),
  });
};
