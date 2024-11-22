import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface User {
  user: any;
  status: number;
  token(token: any): { payload: string; type: "auth/setToken" };
  id: number | undefined;
  username: string | undefined;
  email: string;
  password: string;
  fullName: string;
  profileImage: string;
}
// const baseQuery = fetchBaseQuery({
//   baseUrl: "https://your-api-url.com",
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth.token;
//     if (token) {
//       headers.set("Authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

export const authApi = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/auth" }),

  endpoints: (build) => ({
    getLoginUser: build.mutation<User, Partial<User>>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
    registerUser: build.mutation<any, any>({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetLoginUserMutation, useRegisterUserMutation } = authApi;
