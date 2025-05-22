import { configureStore } from '@reduxjs/toolkit';
import { studentsApi } from '../services/studentApi';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [studentsApi.reducerPath]: studentsApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(studentsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;