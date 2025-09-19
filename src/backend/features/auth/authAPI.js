import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import { AUTH_API } from "../../enpoint";

export const authApi = createApi({
    reducerPath: "authApi", 
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: `${AUTH_API}login/`,
                method: "POST",
                body: credentials,
            }),
        }),
        register: builder.mutation({
            query: (formData) => ({
                url: `${AUTH_API}register/`,
                method: "POST",
                body: formData,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${AUTH_API}logout/`,
                method: "POST",
            }),
        }),
        changePassword: builder.mutation({
            query: (passwordData) => ({
                url: `${AUTH_API}change-password/`,
                method: "POST",
                body: passwordData,
            }),
        }),
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: `${AUTH_API}forgot-password/`,
                method: "POST",
                body: data,
            }),
        }),
        resetPassword: builder.mutation({   
            query: (uid, token, new_password, re_new_password) => ({
                url: `${AUTH_API}reset-password/`,
                method: "POST",
                body: { uid, token, new_password, re_new_password },
            }),
        }),
        getUserProfile: builder.query({
            query: () => ({
                url: `${AUTH_API}profile/`,
                method: "GET",
            }),
        }),
        updateUserProfile: builder.mutation({   
            query: (profileData) => ({
                url: `${AUTH_API}profile/`,
                method: "PUT",
                body: profileData,
            }),
        }),
        refreshToken: builder.mutation({
            query: (refreshToken) => ({
                url: `${AUTH_API}token/refresh/`,
                method: "POST",
                body: { refresh: refreshToken },
            }),
        }),
    })
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useChangePasswordMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useRefreshTokenMutation,
} = authApi;

