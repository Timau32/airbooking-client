import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';
import { pushUps } from '../../helpers';

const fetchGlobalSettings = createAsyncThunk('global/fetchAll', async (payload, thunkApi) => {
  try {
    const response = await api.getGlobalSettings();
    return response.data;
  } catch (Err) {
    console.log(Err);
    return thunkApi.rejectWithValue(pushUps.DEFAULT_FETCH_ERROR);
  }
});

export default fetchGlobalSettings;
