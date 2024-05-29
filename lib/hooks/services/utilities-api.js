import { useQueries, useQuery, useMutation } from '@tanstack/react-query';
import { DEFAULT_REACT_QUERY_OPTIONS } from '../../utils';
import { apiGet } from '../../axios-client';

const basePath = '/utilities/v1'; // change agreements to utilities later

/**
 * list available query:
 * https://dansmultipro.sharepoint.com/:x:/s/DSC/ETsVRboO_SJGgoZG_SA2qswBbf-gn4VGuIR1AHvXlNjwGg?e=tjojU5
 */
export const useGetLov = (query, enabled = true) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['Utilities_LOV', query],
    queryFn: () => apiGet(`${basePath}/lov`, query),
    enabled,
  });
};

export const useGetCategoryLovs = (lovs = []) => {
  return useQueries({
    queries: lovs.map((lov) => {
      return {
        ...DEFAULT_REACT_QUERY_OPTIONS,
        queryKey: ['Utilities_LOV', lov],
        queryFn: () => apiGet(`${basePath}/lov`, lov),
      };
    }),
  })
    .map((it) => ({
      data: it?.data?.data?.data,
      category: it?.data?.config?.params?.category,
    }))
    .reduce((acc, curr) => {
      acc[curr.category] = curr.data;
      return acc;
    }, {});
};

export const useGetLovPostalCode = (query, enabled = true) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['utilities_lov_postal_code', query],
    queryFn: () => apiGet(`${basePath}/lov/postal-code`, query),
    enabled,
    retry: 2,
  });
};

export const useGetLovSimcard = (query) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['utilities_lov_simcard', query],
    queryFn: () => apiGet(`${basePath}/lov/simcard`, query),
  });
};

export const useGetJobRoleLov = () => {
  return useMutation({
    mutationFn: (query) => apiGet(`${basePath}/lov`, query),
  });
};
