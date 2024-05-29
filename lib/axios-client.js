import axios from 'axios';
import Config from './config';
import useStore from './hooks/zustand/auth.store';
import useModalStore from './hooks/zustand/modal-error-surrounding.store';

const TIMEOUT = 30 * 1000; // miliseconds
// TODO: using env when go production
const BASE_URL = Config.API_HOST + Config.API_BASEPATH;

const throwingError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    throw error.response;
  }

  if (!error.request) {
    // eslint-disable-next-line no-console
    console.error('unexpected error', error);
  }

  const err = new axios.AxiosError();
  err.response = {
    status: 500,
    data: 'Unexpected error',
  };

  throw err.response;
};

const makeCallApi = ({
  baseURL,
  url = '',
  method = 'GET',
  params = {},
  data = {},
  headers = {},
  responseType = null,
  timeout = TIMEOUT,
  handleError = true,
}) => {
  const authToken = useStore.getState().userAuth.token;
  const { logout } = useStore.getState();
  const callApi = axios.create({
    baseURL: baseURL || BASE_URL,
    timeout,
  });

  const customHeders = {
    CHANNELID: 'WEB',
    Authorization: authToken ? `Bearer ${authToken}` : undefined,
  };

  const errResponseCode = (error) => {
    const { setModalState } = useModalStore.getState();
    const errorStatus = error.response ? error.response.status : null;
    const errorResponse = error.response ? error.response : null;
    const {
      baseURL: errorBaseURL,
      url: errorUrl,
      params: errorParams,
    } = error.response.config;

    // Take the part of the baseURL after the proxy URL
    const proxyIndex = errorBaseURL.indexOf('http://localhost:4000/');
    const baseURLWithoutProxy =
      proxyIndex !== -1
        ? errorBaseURL.substring(proxyIndex + 'http://localhost:4000/'.length)
        : errorBaseURL;

    const paramsArray = Object.entries(errorParams);

    const paramsString = paramsArray
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    const endpoint = `${baseURLWithoutProxy}${errorUrl}?${paramsString}`;

    if (errorStatus && errorStatus >= 500) {
      setModalState({
        isVisible: true,
        variant: 'technical',
        endpoint,
        errorResponse,
      });
    } else if (errorStatus && errorStatus >= 400) {
      setModalState({
        isVisible: true,
        variant: 'business',
        endpoint,
        errorResponse,
      });
    } else {
      setModalState({
        isVisible: false,
        variant: '',
        endpoint: '',
        errorResponse: '',
      });
    }
  };

  const handleErrorResponse = (error) => {
    // You can comment or use function below for error handling based on status code
    if (error?.response?.data?.message === 'jwt expired') {
      logout();
    }
    errResponseCode(error);
    if (handleError) {
      throwingError(error);
    }
    return Promise.reject(error);
  };

  callApi.interceptors.request.use(
    (conf) => {
      const config = conf;
      config.headers = {
        ...config.headers,
        'Content-Type': 'application/json',
        ...headers,
        ...customHeders,
      };
      return config;
    },
    (error) => Promise.reject(error)
  );

  callApi.interceptors.response.use(
    (response) => response,
    (error) => handleErrorResponse(error)
  );

  return callApi({
    url,
    method,
    params,
    data,
    responseType,
  });
};

// use this for 'POST', 'PUT', 'DELETE', and 'PATCH'
export const apiPost = (
  url,
  body = {},
  method = 'POST',
  headers = {},
  baseUrl = null,
  responseType = null
) => {
  return makeCallApi({
    method,
    url,
    data: body,
    baseURL: baseUrl,
    headers,
    responseType,
  });
};

export const apiGet = (
  url,
  query = {},
  headers = {},
  baseUrl = null,
  responseType = null
) => {
  return makeCallApi({
    method: 'GET',
    url,
    params: query,
    baseURL: baseUrl,
    headers,
    responseType,
  });
};

export const apiDelete = (url, body = {}, headers = {}) => {
  return makeCallApi({
    method: 'DELETE',
    url,
    data: body,
    headers,
  });
};

export const apiPut = (
  url,
  body = {},
  method = 'PUT',
  headers = {},
  baseUrl = null
) => {
  return makeCallApi({
    method,
    url,
    data: body,
    baseURL: baseUrl,
    headers,
  });
};
