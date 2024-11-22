import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Post", "Likes", "Comments"],
  endpoints: (build) => ({
    getAllPosts: build.query({
      query: () => ({
        url: "/post",
        method: "GET",
      }),
      providesTags: [{ type: "Post" }, { type: "Comments" }],
    }),
    createPost: build.mutation({
      query: (formData: FormData) => ({
        url: `/post`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Post" }],
    }),
    updatePostLikes: build.mutation({
      query: (body) => ({
        url: `/post/add-like/${body.postId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "Post" }],
    }),
    updatePostUnlike: build.mutation({
      query: (postId) => ({
        url: `/post/remove-like/${postId}`,
        method: "PUT",
      }),
      invalidatesTags: [{ type: "Post" }],
    }),
    getAllPostComments: build.query({
      query: (postId) => ({
        url: `/comment/${postId}`,
        method: "GET",
      }),
      providesTags: [{ type: "Comments" }],
    }),
    userNotifications: build.query({
      query: (currentUserId) => ({
        url: `/notification/${currentUserId}`,
        method: "GET",
      }),
      // providesTags: (result, error, postId) =>
      //     result ? result.map((comment: any) => ({ type: 'Comment', id: comment.id })) : [],
    }),

    createPostComments: build.mutation({
      query: (body) => ({
        url: "/comment",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Comments" }],
    }),
  }),
});
export const {
  useGetAllPostsQuery,
  useCreatePostMutation,
  useUpdatePostLikesMutation,
  useUpdatePostUnlikeMutation,
  useCreatePostCommentsMutation,
  useGetAllPostCommentsQuery,
  useUserNotificationsQuery,
} = postApi;
