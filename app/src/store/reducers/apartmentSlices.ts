import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IApartment } from '../../interfaces';
import { getCookie } from '../../helpers/getCookie';

type initialStateType = {
  selectedApartment: IApartment | null;
  isLogined: boolean;
  searchedApartments: IApartment[];
};

const initialState: initialStateType = {
  selectedApartment: null,
  isLogined: Boolean(getCookie('auth-token')),
  searchedApartments: [],
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
});

const apartmentReducer = apartmentSlice.reducer;

export const { setSelectedApartment, setIsLogined, setSearchedApartments } = apartmentSlice.actions;
export default apartmentReducer;
