import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../app/store';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
  bio?: string;
  lookingFor: string;
  createdAt: string;
}

interface MatchUser {
  id: string;
  name: string;
  profilePhoto?: string;
  bio?: string;
  lookingFor: string;
  createdAt: string;
}

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProfile: builder.query<UserProfile, void>({
      query: () => '/users/me',
    }),
    getPotentialMatches: builder.query<MatchUser[], void>({
      query: () => '/users/matches',
    }),
  }),
});

export const { useGetProfileQuery, useGetPotentialMatchesQuery } = usersApi; 