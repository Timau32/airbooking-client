import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IApartment } from '../../interfaces';

type initialStateType = {
  selectedApartment: IApartment | null;
};

const initialState: initialStateType = {
  selectedApartment: null,
};

const apartmentSlice = createSlice({
  name: 'apartment',
  initialState,
  reducers: {
    setSelectedApartment: (state, action: PayloadAction<IApartment | null>) => {
      state.selectedApartment = action.payload;
    },
  },
});

const apartmentReducer = apartmentSlice.reducer;

export const { setSelectedApartment } = apartmentSlice.actions;
export default apartmentReducer;
