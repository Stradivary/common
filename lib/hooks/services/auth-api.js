/* eslint-disable no-alert */
import { useMutation } from '@tanstack/react-query';
import moment from 'moment';
import Config from '../../config';
import {
  browserHistory,
  Checkpoints,
  DEFAULT_REACT_QUERY_OPTIONS,
  loginPrefix,
  POPUP_TYPE,
} from '../../utils';
import { useAuthStore, useModalStore } from '../zustand/stores';
import { apiPost } from '../../axios-client';

/**
 * React Query Mutation references:
 * https://tanstack.com/query/v4/docs/react/guides/mutations
 */

const urls = {
  'auth-sso': '/access-managements/v1/auth/sso',
};

export const getEndpoint = (endpoint) =>
  `${Config.API_HOST}${Config.API_BASEPATH}${urls[endpoint]}`;

export const useExchangeToken = () => {
  const { setUserAuth } = useAuthStore();
  const { setModalState } = useModalStore.getState();
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: async (body) =>
      apiPost(`${getEndpoint('auth-sso')}/exchange-token`, body, 'POST'),
    onSettled: (data, error) => {
      if (
        !data?.status ||
        !data?.data?.status ||
        error?.data ||
        data?.data?.error
      ) {
        setModalState({
          isVisible: true,
          variant: 'business',
          endpoint: `${getEndpoint('auth-sso')}/exchange-token`,
          errorResponse: error,
          actions: [
            {
              type: POPUP_TYPE['popup.userManual'],
              handler: () => {
                browserHistory.push(Checkpoints.index);
                window.location.reload();
              },
            },
            {
              type: POPUP_TYPE['popup.ok'],
              handler: () => {
                browserHistory.push(Checkpoints.index);
                window.location.reload();
              },
            },
          ],
        });
      } else {
        setUserAuth({
          isAuthenticated: true,
          token: data?.data?.data?.token?.unifiedToken,
          userData: data?.data?.data,
          loginDate: moment().format('DD/MM/YYYY - HH:mm:ss'),
        });
        browserHistory.push(Checkpoints.homePage);
      }
    },
  });
};

export const useLogoutSso = () => {
  const { userAuth, logout } = useAuthStore();
  const { setModalState } = useModalStore.getState();
  return useMutation({
    ...DEFAULT_REACT_QUERY_OPTIONS,
    mutationFn: async () =>
      apiPost(`${getEndpoint('auth-sso')}/logout`, {}, 'POST', {
        Authorization: userAuth?.token,
      }),
    onSettled: (data, error) => {
      if (
        !data?.status ||
        !data?.data?.status ||
        error?.data ||
        data?.data?.error
      ) {
        setModalState({
          isVisible: true,
          variant: 'business',
          endpoint: `${getEndpoint('auth-sso')}/exchange-token`,
          errorResponse: error,
        });
        window.location.reload();
      } else {
        logout();
        const redirectUrl = data?.data?.data?.redirectUrl;
        if (redirectUrl) window.location.href = redirectUrl;
        browserHistory.push(loginPrefix);
      }
    },
  });
};
