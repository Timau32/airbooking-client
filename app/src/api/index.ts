import axios, { InternalAxiosRequestConfig } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { deleteCookie, getCookie, setCookie } from '../helpers/getCookie';
import { IApartment, IBooking, ICategories, IFavorites, IGlobal, IInfo, ILocations } from '../interfaces';

const authed = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
  withCredentials: true,
});

const requestTemplate = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
  withCredentials: true,
});

interface ILoginResponse {
  refresh: string;
  access: string;
}

const refreshToken = (payload: { refresh: string }) => requestTemplate.post('/auth/token/refresh/', payload);

const signUp = (payload: FormData) =>
  requestTemplate.post('/auth/register/', payload, {
    headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data' },
  });

const signIn = (payload: { identifier: string; password: string }) =>
  requestTemplate.post<ILoginResponse>('/auth/login/', payload);

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
          setCookie('auth-token', freshTokens.data.access, 1);
          freshTokens.data.refresh && setCookie('refresh', freshTokens.data.refresh, 1);
          accessToken = freshTokens.data.access;
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

interface IBookingPayload {
  property: string; // Уникальный идентификатор или название объекта
  start_date: string; // Дата начала в формате YYYY-MM-DD
  end_date: string; // Дата окончания в формате YYYY-MM-DD
  start_time: string; // Время начала в формате HH:mm
  end_time: string; // Время окончания в формате HH:mm
  number_of_guests: number;
}

const getApartments = () => authed.get<IItemsResponse<IApartment[]>>('/properties/all/');
const getApartmentDetail = (slug: string) => authed.get<IApartment>(`/properties/${slug}/`);
const getAbroads = () => authed.get<IItemsResponse<IApartment[]>>(`/properties/abroad/`);

const getFavorites = () => authed.get<IFavorites[]>('/favorites/');
const setFavorite = (slug: string) => authed.post(`/favorites/property/${slug}/`);
const removeFavorite = (slug: string) => authed.delete(`/favorites/property/${slug}/delete/`);
const getPopular = () => authed.get<IItemsResponse<IApartment[]>>('/properties/popular/');

const getCities = () => authed.get<IItemsResponse<ILocations.ICities[]>>('/locations/cities/');

const getCategories = () => authed.get<ICategories[]>('/properties/categories/');

const getContries = () => authed.get<IItemsResponse<ILocations.IContries[]>>('/locations/');
const getRegions = (country_slug: string) =>
  requestTemplate.get<IItemsResponse<ILocations.IRegions[]>>(`/locations/countries/${country_slug}/regions/`);

const bookingApartment = (payload: IBookingPayload) => authed.post<IBooking>(`/bookings/`, payload);
const flexSearch = (payload: string[]) => authed.post<IApartment[]>('/search/flexible/', { search_strings: payload });

const getInfo = () => requestTemplate.get<IInfo[]>('/pages/');
const getInfoDetail = (slug: string) => requestTemplate.get<IInfo>(`/pages/${slug}`);

const sendMessageToSupport = (payload: any) => requestTemplate.post('/support/', payload);
const getGlobalSettings = () => requestTemplate.get<IGlobal>('/settings/');

const getApartmentOccupied = (slug: string) =>
  requestTemplate.get<{ occupied_dates: IBooking[] }>(`/bookings/occupied/${slug}/`);

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
  setFavorite,
  removeFavorite,
  bookingApartment,
  getCategories,
  flexSearch,
  getAbroads,
  getInfo,
  getInfoDetail,
  sendMessageToSupport,
  getGlobalSettings,
  getApartmentOccupied,
};

export default api;
