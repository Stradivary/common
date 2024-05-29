import { useMutation, useQuery } from '@tanstack/react-query';
import { DEFAULT_REACT_QUERY_OPTIONS } from '../../utils';
import { apiGet } from '../../axios-client';

const basePath = '/mepro/dataorder';

export const useGetProjectSubscriptions = (query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Project_Subscription_List', query],
    queryFn: async () => {
      const response = await apiGet(
        `${basePath}/project-subscriptions/filterByDynamic`,
        query
      );

      const totalCount = response.headers.get('X-Total-Count');
      return { response, totalCount };
    },
  });
};

export const useGetGiftRequest = (query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Gift_Request_List', query],
    queryFn: async () => {
      const response = await apiGet(
        `${basePath}/gift-requests/filterByDynamic`,
        query
      );

      const totalCount = response.headers.get('X-Total-Count');
      return { response, totalCount };
    },
  });
};

export const useDownloadProjectSubscriptions = () => {
  return useMutation({
    mutationFn: (query = {}) =>
      apiGet(`${basePath}/project-subscriptions/filterByDynamic`, query),
  });
};

export const useDownloadGiftRequest = () => {
  return useMutation({
    mutationFn: (query = {}) =>
      apiGet(`${basePath}/gift-requests/filterByDynamic`, query),
  });
};
