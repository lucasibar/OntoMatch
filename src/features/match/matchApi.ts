import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../app/store';

interface MatchUser {
  id: string;
  name: string;
  profilePhoto?: string;
  bio?: string;
  lookingFor: string;
  createdAt: string;
}

interface MatchResponse {
  id: string;
  user: MatchUser;
  createdAt: string;
}

interface LikeResponse {
  success: boolean;
  isMatch: boolean;
  message: string;
}

export const matchApi = createApi({
  reducerPath: 'matchApi',
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
    likeUser: builder.mutation<LikeResponse, string>({
      query: (userId) => ({
        url: `/matches/like/${userId}`,
        method: 'POST',
      }),
    }),
    getMyMatches: builder.query<MatchResponse[], void>({
      query: () => '/matches/my-matches',
    }),
    getMyLikes: builder.query<MatchResponse[], void>({
      query: () => '/matches/my-likes',
    }),
  }),
});

export const { 
  useLikeUserMutation, 
  useGetMyMatchesQuery, 
  useGetMyLikesQuery 
} = matchApi; 