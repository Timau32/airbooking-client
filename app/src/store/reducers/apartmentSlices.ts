import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IApartment, ICategories, IGlobal, IInfo, ILocations } from '../../interfaces';
import { getCookie } from '../../helpers/getCookie';
import { fetchInfo, fetchSearchData } from '../creators/searchActions';
import fetchGlobalSettings from '../creators/globalActions';

type initialStateType = {
  selectedApartment: IApartment | null;
  isLogined: boolean;
  searchedApartments: IApartment[];
  categories: ICategories[];
  cities: ILocations.ICities[];
  info: IInfo[];
  isLoadingInfo: boolean;
  globalSettings: IGlobal | null;
};

const initialState: initialStateType = {
  selectedApartment: null,
  isLogined: Boolean(getCookie('auth-token')),
  searchedApartments: [],
  categories: [],
  cities: [],
  info: [],
  isLoadingInfo: false,
  globalSettings: null,
};

const apartmentSlice = createSlice({
  name: 'apartment',
  initialState,
  reducers: {
    setSelectedApartment: (state, action: PayloadAction<IApartment | null>) => {
      state.selectedApartment = action.payload;
    },

    setIsLogined: (state, action: PayloadAction<boolean>) => {
      state.isLogined = action.payload;
    },

    setSearchedApartments: (state, action: PayloadAction<IApartment[]>) => {
      state.searchedApartments = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      fetchSearchData.fulfilled,
      (
        state,
        action: PayloadAction<{ searched: IApartment[]; categories: ICategories[]; cities: ILocations.ICities[] }>
      ) => {
        state.categories = action.payload.categories;
        state.cities = action.payload.cities;
        state.searchedApartments = action.payload.searched;
      }
    );

    builder.addCase(fetchInfo.pending, (state) => {
      state.isLoadingInfo = true;
    });

    builder.addCase(fetchInfo.fulfilled, (state, action: PayloadAction<IInfo[]>) => {
      state.isLoadingInfo = false;
      state.info = action.payload;
    });

    builder.addCase(fetchInfo.rejected, (state) => {
      state.isLoadingInfo = false;
    });

    builder.addCase(fetchGlobalSettings.fulfilled, (state, action: PayloadAction<IGlobal>) => {
      state.globalSettings = action.payload;
    });
  },
});

const apartmentReducer = apartmentSlice.reducer;

export const { setSelectedApartment, setIsLogined, setSearchedApartments } = apartmentSlice.actions;
export default apartmentReducer;
