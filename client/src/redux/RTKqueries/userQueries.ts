import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "@reduxjs/toolkit/query/react";


export interface User {
    id: number | undefined,
    username: string | undefined,
    email: string,
    password: string
}

export const userApi = createApi({
    reducerPath: "userAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api",   
        prepareHeaders: (headers, { getState }) => {
            const token =  localStorage.getItem('token');
            if (token) {
              headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
          },
     }),
    endpoints: (build) => ({
        getUserProfile: build.query({
            query: (id) => ({
            url:`/user/${id}`,
            method:"GET",  

        })
          }),
        getAllUsersData: build.query({
            query: (body) => ({
                url: '/user',  
                method: 'GET',
            }),
        }),

        updateUserFollowers: build.query({
            query: (body) => ({
                url: '/user',  
                method: 'GET',
            }),
        }),

        searchUsersByName: build.query({
            query: (searchData) => ({
                url: `/search/?name=${searchData}`,  
                method: 'GET',
            }),
        }),
    })
})

 export const {useGetAllUsersDataQuery, useSearchUsersByNameQuery, useGetUserProfileQuery}=userApi
