import { useQuery } from '@tanstack/react-query';
import { DEFAULT_REACT_QUERY_OPTIONS } from '../../utils';
import { apiGet } from '../../axios-client';

const basePath = '/mepro/accountmgm';

export const useGetPicMenuAccess = (query = {}) => {
  return useQuery({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    queryKey: ['pic_menu_access', query],
    queryFn: () => apiGet(`${basePath}/v1/menu-access`, query),
  });
};
