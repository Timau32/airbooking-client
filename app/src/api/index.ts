// @ts-nocheck
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { getCookie, setCookie } from '../helpers/getCookie';
import { IApartment, ILocations } from '../interfaces';

const authed = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API || 'https://houseagency.3730051-ri35659.twc1.net/api',
  withCredentials: true,
});

interface ILoginResponse  {
  refresh: string;
  access: string
}

const refreshToken = (payload: { refresh: string }) => authed.post('/auth/token/refresh/', payload);

const signUp = (payload: FormData) =>
  authed.post('/auth/register/', payload, {
    headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data' },
  });

const signIn = (payload: { identifier: string; password: string }) => authed.post<ILoginResponse>('/auth/login/', payload);

const requestTemplate = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API || 'https://houseagency.3730051-ri35659.twc1.net/api',
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
      const refresh = getCookie('refresh');
      if (refresh) {
        try {
          const freshTokens = await refreshToken({ refresh });
          setCookie('auth-token', freshTokens.data.access_token, 1);
          freshTokens.data.refresh && setCookie('refresh', freshTokens.data.refresh, 1);
          accessToken = freshTokens.data.access_token;
        } catch (error) {
          Promise.reject('Error refreshing tokens');
          deleteCookie('auth-token');
          deleteCookie('refresh');
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

interface IItemsResponse<T> {
  results: T;
  prev: string | null;
  next: string | null;
  count: number;
}

const getApartments = () => requestTemplate.get<IItemsResponse<IApartment[]>>('/properties/all/');
const getApartmentDetail = (slug: string) => requestTemplate.get<IApartment>(`/properties/${slug}/`);
const getFavorites = () => authed.get('/favorites/');
const getPopular = () => requestTemplate.get<IItemsResponse<IApartment[]>>('/properties/popular/');

const getCities = () =>
  requestTemplate.get<IItemsResponse<ILocations.ICities[]>>('/locations/cities/');

const getContries = () => requestTemplate.get<IItemsResponse<ILocations.IContries[]>>('/locations/');
const getRegions = (country_slug: string) =>
  requestTemplate.get<IItemsResponse<ILocations.IRegions[]>>(`/locations/countries/${country_slug}/regions/`);

const api = {
  refreshToken,
  signIn,
  signUp,
  getApartments,
  getApartmentDetail,
  getFavorites,
  getCities,
  getContries,
  getRegions,
  getPopular,
};

export default api;
