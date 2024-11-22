import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface User {
  id: number | undefined;
  username: string | undefined;
  email: string;
  password: string;
}

export const userApi = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (build) => ({
    updateUserFollowers: build.mutation({
      query: (followerId) => ({
        url: "/user/follow",
        method: "PUT",
        body: followerId,
      }),
      invalidatesTags: ["User"],
    }),
    updateProfileImage: build.mutation({
      query: (formData: FormData) => ({
        url: "/user/profile-image",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
    checkFollow: build.query({
      query: (id) => ({
        url: `/user/check-follow/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getUserProfile: build.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getAllUsersData: build.query({
      query: (body) => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    searchUsersByName: build.query({
      query: (searchData) => ({
        url: `/search/?name=${searchData}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllUsersDataQuery,
  useSearchUsersByNameQuery,
  useGetUserProfileQuery,
  useCheckFollowQuery,
  useUpdateUserFollowersMutation,
} = userApi;
