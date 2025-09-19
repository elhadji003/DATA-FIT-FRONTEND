import { createApi } from "@reduxjs/toolkit/query/react";
import { USER_API } from "../../enpoint";
import { baseQueryWithReauth } from "../auth/baseQuery";

export const userApi = createApi({
    reducerPath: "userApi", 
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getUserProfile: builder.query({
            query: () => ({
                url: `${USER_API}profile/`,
                method: "GET",
            }),
        }),
        updateUserProfile: builder.mutation({   
            query: (profileData) => ({
                url: `${USER_API}profile/update/`,
                method: "PUT",
                body: profileData,
            }),
        }),
    })
});

export const {
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
} = userApi;

