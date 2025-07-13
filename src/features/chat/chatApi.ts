import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../app/store';

interface ChatUser {
  id: string;
  name: string;
  profilePhoto?: string;
}

interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  createdAt: string;
}

interface Chat {
  id: string;
  matchId: string;
  otherUser: ChatUser;
  lastMessage?: {
    content: string;
    senderId: string;
    createdAt: string;
  };
  messageCount: number;
  createdAt: string;
}

interface ChatDetail {
  id: string;
  matchId: string;
  otherUser: ChatUser;
  messages: Message[];
  createdAt: string;
}

export const chatApi = createApi({
  reducerPath: 'chatApi',
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
    getMyChats: builder.query<Chat[], void>({
      query: () => '/chats',
    }),
    getChat: builder.query<ChatDetail, string>({
      query: (chatId) => `/chats/${chatId}`,
    }),
    getChatByMatchId: builder.query<ChatDetail, string>({
      query: (matchId) => `/chats/match/${matchId}`,
    }),
    sendMessage: builder.mutation<Message, { chatId: string; content: string }>({
      query: ({ chatId, content }) => ({
        url: `/chats/${chatId}/messages`,
        method: 'POST',
        body: { content },
      }),
    }),
    getMessages: builder.query<Message[], string>({
      query: (chatId) => `/chats/${chatId}/messages`,
    }),
  }),
});

export const { 
  useGetMyChatsQuery, 
  useGetChatQuery, 
  useGetChatByMatchIdQuery,
  useSendMessageMutation, 
  useGetMessagesQuery 
} = chatApi; 