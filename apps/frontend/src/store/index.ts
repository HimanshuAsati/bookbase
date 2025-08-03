import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from './slices/exampleSlice';

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    // add other slices here later
  },
});

// Infer types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
