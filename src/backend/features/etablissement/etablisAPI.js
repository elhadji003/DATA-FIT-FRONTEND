import { createApi } from "@reduxjs/toolkit/query/react";
import { USER_API } from "../../enpoint";
import { baseQueryWithReauth } from "../auth/baseQuery";

export const etablisApi = createApi({
    reducerPath: "etablisApi", 
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getEtablisProfile: builder.query({
            query: () => ({
                url: `${USER_API}profile/etablissement/`,
                method: "GET",
            }),
        }),
        updateEtablisrProfile: builder.mutation({   
            query: (profileData) => ({
                url: `${USER_API}profile/etablissement/update/`,
                method: "PUT",
                body: profileData,
            }),
        }),
        getListeEtablissements: builder.query({   
            query: (page=1) => ({
                url: `${USER_API}etablissements/listes/?page${page}`,
                method: "GET"
            }),
        }),
    })
});

export const {
    useGetEtablisProfileQuery,
    useUpdateEtablisrProfileMutation,
    useGetListeEtablissementsQuery,
} = etablisApi;

