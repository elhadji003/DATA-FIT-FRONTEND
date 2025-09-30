import { createApi } from "@reduxjs/toolkit/query/react";
import { USER_API } from "../../enpoint";
import { baseQueryWithReauth } from "../auth/baseQuery";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        // Profil de l'utilisateur
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

        // Étudiants
        getListesEtudiantByEtablis: builder.query({
            query: () => `${USER_API}etudiants/`,
        }),
        getEtudiantById: builder.query({
            query: (id) => `${USER_API}etudiants/${id}/`,
        }),
        addEtudiant: builder.mutation({
            query: (formData) => ({
                url: `${USER_API}etudiants/`,
                method: "POST",
                body: formData,
            }),
        }),
        updateEtudiant: builder.mutation({
            query: ({ id, ...updateData }) => ({
                url: `${USER_API}etudiants/${id}/`,
                method: "PATCH",
                body: updateData,
            }),
        }),
        deleteEtudiant: builder.mutation({
            query: (id) => ({
                url: `${USER_API}etudiants/${id}/`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
    useGetListesEtudiantByEtablisQuery,
    useGetEtudiantByIdQuery,
    useAddEtudiantMutation,
    useUpdateEtudiantMutation,
    useDeleteEtudiantMutation
} = userApi;


