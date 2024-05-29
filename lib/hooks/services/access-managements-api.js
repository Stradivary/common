import { useMutation, useQuery } from '@tanstack/react-query';
import { DEFAULT_REACT_QUERY_OPTIONS } from '../../utils';
import { apiGet } from '../../axios-client';

const basePath = '/access-managements';

export const useGetAccountManager = (query = {}, enabled = true) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    enabled,
    queryKey: ['account_manager', query],
    queryFn: () => apiGet(`${basePath}/v1/account-manager`, query),
    retry: 3,
  });
};

export const useGetAccountManagerDetail = () => {
  return useMutation({
    mutationFn: (userId) =>
      apiGet(`${basePath}/v1/account-manager`, { userId }),
  });
};

export const useGetSolutionEngineer = (query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['solution_engineer', query],
    queryFn: () => apiGet(`${basePath}/v1/user`, query),
  });
};
