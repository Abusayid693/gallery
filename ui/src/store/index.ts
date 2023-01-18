import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import filterReducer from "./filters";
import stateReducer from './state';

export const store = configureStore({
  reducer: {
    sate: stateReducer,
    filters: filterReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
