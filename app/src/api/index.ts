// @ts-nocheck
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const authed = axios.create({
  baseURL:
    window.REACT_APP_SERVER_API !== 'REPLACE_REACT_APP_SERVER_API'
      ? window.REACT_APP_SERVER_API
      : process.env.REACT_APP_SERVER_API || 'https://houseagency.3730051-ri35659.twc1.net/api',
  withCredentials: true,
});

const refreshToken = (payload: { refresh: string }) => authed.post('/auth/token/refresh/', payload);

const signUp = (payload: FormData) =>
  authed.post('/auth/register/', payload, {
    headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data' },
  });

const signIn = (payload: { identifier: string; password: string }) => authed.post('/auth/login/', payload);

const requestTemplate = axios.create({
  baseURL:
    window.REACT_APP_SERVER_API !== 'REPLACE_REACT_APP_SERVER_API'
      ? window.REACT_APP_SERVER_API
      : process.env.REACT_APP_SERVER_API || 'https://houseagency.3730051-ri35659.twc1.net/api',
  withCredentials: true,
});

authed.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  let accessToken = getCookie('auth-token');
  let decodeInfo: any;
  if (accessToken) {
    try {
      decodeInfo = jwtDecode(accessToken);
    } catch (error) {
      Promise.reject('Error decoding token');
    }
    const expTime = decodeInfo?.exp && decodeInfo.exp * 1000;
    const curTime = new Date().getTime();

    if (expTime && expTime - curTime <= 50000) {
      const refresh = getCookie('refresh_token');
      if (refresh_token) {
        try {
          const freshTokens = await refreshToken({ refresh });
          setCookie('auth-token', freshTokens.data.access_token, 1);
          freshTokens.data.refresh_token && setCookie('refresh_token', freshTokens.data.refresh_token, 1);
          accessToken = freshTokens.data.access_token;
        } catch (error) {
          Promise.reject('Error refreshing tokens');
          deleteCookie('auth-token');
          deleteCookie('refresh_token');
          window.location.href = `/`;
        }
      }
    }

    config.headers!.Authorization = `Bearer ${accessToken}`;
  } else {
    setCookie('auth-token', '', 1);
  }
  return config;
});

const api = {
  refreshToken,
  signIn,
  signUp,
};

export default api;
