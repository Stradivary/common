import { useMutation, useQuery } from '@tanstack/react-query';
import { DEFAULT_REACT_QUERY_OPTIONS } from '../../utils';
import { apiGet, apiPost } from '../../axios-client';

const basePath = '/projects';

export const useGetProjectBilling = (projectId) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['project_detail_billing', projectId],
    queryFn: () => apiGet(`${basePath}/v1/${projectId}/billing-arrangement`),
  });
};

export const useGetProjectDetail = (projectId, query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['project_detail', projectId],
    queryFn: () => apiGet(`${basePath}/v3/${projectId}`, query),
  });
};

export const useGetProjectDetailV7 = (projectId, isEnabled = false) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['project_detail_v7', projectId],
    queryFn: () => apiGet(`${basePath}/v7/mevo/${projectId}`),
    enabled: isEnabled,
  });
};

export const useGetProductsNonCPQ = (projectId, query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['project_detail_meo', { ...query, projectId }],
    queryFn: () => apiGet(`${basePath}/v1/meo-project/${projectId}`, query),
  });
};

export const useGetProjectBundle = (quoteId) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    enabled: false,
    queryKey: ['project_bundles', quoteId],
    queryFn: () => apiGet(`${basePath}/v1/bundles?quoteId=${quoteId}`),
  });
};

export const useGetProjectBundleList = (bundleId) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    enabled: false,
    queryKey: ['project_bundle_list', bundleId],
    queryFn: () => apiGet(`${basePath}/v1/offers?bundleId=${bundleId}`),
  });
};

export const useGetProjectServiceTemplate = (quoteId) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    enabled: false,
    queryKey: ['project_service_templates', quoteId],
    queryFn: () =>
      apiGet(`${basePath}/v1/services-template?quoteId=${quoteId}`),
  });
};

export const useGetServicesTemplate = (query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['services_template'],
    queryFn: () => apiGet(`${basePath}/v1/services-template`, query),
    enabled: false,
  });
};

export const useGetProjectLatestQuote = (projectId) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['project_latest_quote', projectId],
    queryFn: () => apiGet(`${basePath}/v1/${projectId}/latest-quote`),
  });
};

export const useGetProjectList = (query = {}, isEnabled = true) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['project_list', query],
    queryFn: () => apiGet(`${basePath}/v4`, query),
    enabled: isEnabled,
  });
};

export const useGetProjectPIC = (projectId, query, enabled = true) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    enabled,
    queryKey: ['project_pic', { ...query, projectId }],
    queryFn: () => apiGet(`${basePath}/v1/${projectId}/pic`, query),
    retry: 2,
  });
};
export const useGetProjectPICMutate = () => {
  return useMutation({
    mutationFn: (data, query) =>
      apiGet(`${basePath}/v1//${data?.projectId}/pic`, query),
  });
};

export const useGetProjectPICDetail = (
  projectId,
  picId,
  query,
  enabled = true
) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    enabled,
    queryKey: ['project_pic_detail', { ...query, projectId, picId }],
    queryFn: () => apiGet(`${basePath}/v1/${projectId}/pic/${picId}`, query),
  });
};

export const useGetProjectV4Subscription = (query, enabled = true) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    enabled,
    queryKey: ['project_subscription', { ...query }],
    queryFn: () => apiGet(`${basePath}/v4/subscription`, query),
    retry: 1,
  });
};

export const UseGetProjectOrdering = (projectId, query, enabled = true) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    enabled,
    queryKey: ['project_ordering', query],
    queryFn: () => apiGet(`${basePath}/v1/${projectId}/ordering-list`, query),
  });
};

export const useGetProjectMevoFlag = (query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['project_mevo_flag'],
    queryFn: () => apiGet(`${basePath}/v1/mevo-flag`, query),
  });
};

export const usePostSubmitOrderingSim = () => {
  return useMutation({
    mutationFn: ({ projectId, payload }) =>
      apiPost(`${basePath}/v1/${projectId}/order/simcard`, payload),
  });
};

export const usePostSubmitOrderingSPTP = () => {
  return useMutation({
    mutationFn: ({ projectId, payload }) =>
      apiPost(`${basePath}/v1/${projectId}/order/sptp`, payload),
  });
};

export const useGetProjectDetailWithAgreement = (projectId) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['project_detail_with_agreement', projectId],
    queryFn: () => apiGet(`${basePath}/v2/${projectId}/with-agreement`),
  });
};
