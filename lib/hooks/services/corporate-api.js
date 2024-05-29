import { useQuery, useMutation } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { DEFAULT_REACT_QUERY_OPTIONS } from '../../utils';
import { apiGet, apiPut } from '../../axios-client';

const basePath = '/corporates';

export const useGetCorpSignerList = (query = {}, enabled = false) => {
  const queryData = query;

  Object.keys(queryData).forEach((key) => {
    if (!queryData[key]) {
      delete queryData[key];
    }
  });

  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['detail_subscription', queryData],
    queryFn: () => apiGet(`${basePath}/v1/customer/v4/detail`, queryData),
    enabled,
  });
};

export const useGetHierarchy = (query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['corporates_activity', query],
    queryFn: () => apiGet(`${basePath}/v1/customer/child`, query),
  });
};

export const useGetClsProfileStatus = (idOrder, query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Cls_Profile_Status'],
    queryFn: () =>
      apiGet(`${basePath}/v1/customer/profile/cls/${idOrder}/status`, query),
  });
};

export const useGetPicList = (companyId) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['pic_list', companyId],
    queryFn: () =>
      companyId && apiGet(`${basePath}/v1/customer/pic/list/${companyId}`),
  });
};

export const useGetCustomer = (query, enabled = false) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['corporates_customer', query],
    queryFn: () =>
      apiGet(`${basePath}/v1/customer/customer-by-salesteam`, query),
    enabled,
  });
};

export const useGetCustomerDetail = (customerId, enabled = true) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    enabled,
    queryKey: ['corporates_customer_detail', customerId],
    queryFn: () => apiGet(`${basePath}/v1/customer/${customerId}`),
  });
};

export const usePutUpdateCLS = () => {
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: (body) => apiPut(`${basePath}/v1/customer/profile/cls`, body),
  });
};

export const useGetCustomerSalesTeam = () => {
  return useMutation({
    mutationFn: (query) =>
      apiGet(`${basePath}/v1/customer/customer-by-salesteam`, query),
    retry: 3,
  });
};

// API NOT READY BUP-398
export const useGetPicListUnderCorp = () => {
  return useMutation({
    // mutationFn: (query) => apiGet(`${basePath}/v2/pic/query-crm`, query), // ENABLE ON SPRINT 2
    mutationFn: (query) => apiGet(`${basePath}/v2/pic`, query),
  });
};

export const useGetCorporateActivityList = (query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['corporates_customer_activity', query],
    queryFn: () => apiGet(`${basePath}/v1/customer/activity`, query),
  });
};

export const useGetCorporateAccountManager = (query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['corporate_account_manager', query],
    queryFn: () => apiGet(`${basePath}/v1/customer/account-manager`, query),
  });
};

export const useGetCorporatePic = (query, enabled = false) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['corporate_pic', query],
    queryFn: () => apiGet(`${basePath}/v2/pic`, query),
    enabled,
  });
};

export const useGetCheckPic = (query, enabled = false) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['corporate_check_pic', query],
    queryFn: () => apiGet(`${basePath}/v2/pic/check-pic`, query),
    enabled,
  });
};

export const useGetCorporatePicDetail = (customerId, query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['corporate_pic_detail', query],
    queryFn: () => apiGet(`${basePath}/v1/customer/${customerId}/pic`, query),
  });
};

export const useGetCorporateAddress = (query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['corporate_address', query],
    queryFn: () => apiGet(`${basePath}/v1/customer/address`, query),
  });
};

export const useGetProjectInfoBySubscription = (
  pilotNumber,
  query,
  enabled = true
) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    enabled,
    queryKey: ['project_info_subscription', query],
    queryFn: () => apiGet(`${basePath}/v2/subscriber/${pilotNumber}`, query),
  });
};

export const useGetTeamMember = (query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['team_member', query],
    queryFn: () => apiGet(`${basePath}/v1/customer/team-member`, query),
  });
};

export const useGetPricePlan = (id, query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['price_plan_ou', query],
    enabled: !isEmpty(id),
    queryFn: () =>
      apiGet(`${basePath}/v1/subscriber/active-product/${id}`, query),
  });
};

export const useGetProfileMSISDN = (query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Profile_Info_by_Msisdn', query],
    queryFn: () => apiGet(`${basePath}/v1/subscriber/msisdnprofile`, query),
  });
};

export const useGetProfileCLSbyMsisdn = (query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Cls_Profile_Status_by_Msisdn'],
    queryFn: () => apiGet(`${basePath}/v1/customer/profile/cls`, query),
  });
};

export const useGetEndCustomer = (query = {}, enabled = false) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    enabled,
    queryKey: ['corporate_end_customer', query],
    queryFn: () => apiGet(`${basePath}/v1/customer`, query),
  });
};
