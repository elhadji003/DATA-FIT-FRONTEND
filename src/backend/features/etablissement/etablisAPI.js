import { createApi } from "@reduxjs/toolkit/query/react";
import { USER_API } from "../../enpoint";
import { baseQueryWithReauth } from "../auth/baseQuery";

export const etablisApi = createApi({
  reducerPath: "etablisApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Etablissements"],
  endpoints: (builder) => ({
    getEtablisProfile: builder.query({
      query: () => ({
        url: `${USER_API}profile/etablissement/`,
      }),
      providesTags: ["Etablissements"]
    }),

    updateEtablisrProfile: builder.mutation({
      query: ({ data }) => ({
        url: `${USER_API}profile/etablissement/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Etablissements"],
    }),


    getEtablisDetail: builder.query({
      query: (id) => ({
        url: `${USER_API}etablissements/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Etablissements", id }],
    }),

    getListeEtablissements: builder.query({
      query: (page = 1) => ({
        url: `${USER_API}etablissements/listes/?page=${page}`,
        method: "GET",
      }),
      providesTags: ["Etablissements"],
    }),
  }),
});

export const {
  useGetEtablisProfileQuery,
  useGetEtablisDetailQuery,
  useUpdateEtablisrProfileMutation,
  useGetListeEtablissementsQuery,
} = etablisApi;
