import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api',
        prepareHeaders: (headers, { getState }) => {
        const token =  localStorage.getItem('token');
        console.log(token)
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
      }, }),
    
    tagTypes: ['Post'],  
    endpoints: (build) => ({
        getAllPosts: build.query({
            query: () => ({
                url: '/post',  
                method: 'GET',
            }),
                       providesTags: [{type:"Post"}]
                
      

        }),

        updatePostLikes: build.mutation({
            query: ({ postId, rest }) => ({
                url: `/post/add-like/${postId}`,
                method: 'PUT',
                body: rest,
            }),
            // invalidatesTags: (result, error, { postId }) => [
            //     { type: 'Post', id: postId },

            // ],
        }),
        getAllPostComments: build.query({
            query: (postId) => ({
                url: `/comment/${postId}`, 
                method: 'GET',

            }),
            // providesTags: (result, error, postId) =>
            //     result ? result.map((comment: any) => ({ type: 'Comment', id: comment.id })) : [],  


        }),

        createPostComments: build.mutation({
            query: (body) => ({
                url: '/comment',
                method: 'POST',
                body,
            }),
            invalidatesTags: (result, error, { postId }) => [
            //     { type: 'Comments', id: postId },  
                { type: 'Post', id: postId },]
        }),


    }),
});
export const { useGetAllPostsQuery,
    useUpdatePostLikesMutation,
    useCreatePostCommentsMutation,
    useGetAllPostCommentsQuery
} = postApi