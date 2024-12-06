import { configureStore } from '@reduxjs/toolkit';
import apartmentReducer from './reducers/apartmentSlices';

const rootReducer = {
  apartment: apartmentReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
