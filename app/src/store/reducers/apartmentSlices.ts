import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IApartment, ICategories, ILocations } from '../../interfaces';
import { getCookie } from '../../helpers/getCookie';
import { fetchSearchData } from '../creators/searchActions';

type initialStateType = {
  selectedApartment: IApartment | null;
  isLogined: boolean;
  searchedApartments: IApartment[];
  categories: ICategories[];
  cities: ILocations.ICities[];
};

const initialState: initialStateType = {
  selectedApartment: null,
  isLogined: Boolean(getCookie('auth-token')),
  searchedApartments: [],
  categories: [],
  cities: [],
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
  },
});

const apartmentReducer = apartmentSlice.reducer;

export const { setSelectedApartment, setIsLogined, setSearchedApartments } = apartmentSlice.actions;
export default apartmentReducer;
