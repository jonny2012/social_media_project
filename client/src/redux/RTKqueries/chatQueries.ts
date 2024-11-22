import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export interface User {
//     user: any;
//     status: number,
//     token(token: any): { payload: string; type: "auth/setToken"; };
//     id: number | undefined,
//     username: string | undefined,
//     email: string,
//     password: string,
//     fullName: string,
//     profileImage: string,
// }

export const chatApi = createApi({
  reducerPath: "chatAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5003/chat",
    prepareHeaders: (headers, { getState }) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (build) => ({
    getCurrentRoom: build.query({
      query: (id) => ({
        url: `/room/${id}`,
        method: "GET",
      }),
    }),
    getAllRoomMessages: build.query({
      query: (id) => ({
        url: `/room/messages/${id}`,
        method: "GET",
      }),
    }),
    getAllRooms: build.query({
      query: (id) => ({
        url: `/rooms`,
        method: "GET",
      }),
    }),
    // registerUser: build.mutation<any, any>({
    //     query: (body) => ({
    //         url: "/register",
    //         method: "POST",
    //         body
    //     })

    // }),
  }),
});
export const {
  useGetCurrentRoomQuery,
  useGetAllRoomMessagesQuery,
  useGetAllRoomsQuery,
} = chatApi;
