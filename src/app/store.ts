import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import matchReducer from '../features/match/matchSlice';
import { authApi } from '../features/auth/authApi';
import { usersApi } from '../features/user/userApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    match: matchReducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 