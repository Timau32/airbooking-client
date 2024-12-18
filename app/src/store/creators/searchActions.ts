import { createAsyncThunk } from '@reduxjs/toolkit';
import { pushUps } from '../../helpers';
import api from '../../api';
import { RootState } from '..';

export const fetchSearchData = createAsyncThunk('search/fetchFlex', async (payload: string, thunkApi) => {
  try {
    const { categories, cities } = (thunkApi.getState() as RootState).apartment;

    const searchTerm = payload === 'all' ? [''] : payload.split(' ').filter((str) => Boolean(str));
    const response = (await api.flexSearch(searchTerm)).data;
    const citiesResponse = categories.length ? cities : (await api.getCities()).data.results;
    const categoriesResponse = cities.length ? categories : (await api.getCategories()).data;

    return { searched: response, cities: citiesResponse, categories: categoriesResponse };
  } catch (err) {
    console.log(err);
    return thunkApi.rejectWithValue(pushUps.DEFAULT_FETCH_ERROR);
  }
});

export const fetchInfo = createAsyncThunk('fetch/info', async (payload, thunkApi) => {
  try {
    const response = await api.getInfo();

    return response.data;
  } catch (err) {
    console.log(err);

    return thunkApi.rejectWithValue('Oops sorry');
  }
});
