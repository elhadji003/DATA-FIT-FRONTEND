import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../auth/baseQuery";
import { PROGRAMMES_API } from "../../enpoint";

export const programmesApi = createApi({
  reducerPath: "programmesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Filieres", "Niveaux"],
  endpoints: (builder) => ({
    // === FILIERES ===
    getFilieres: builder.query({
      query: () => `${PROGRAMMES_API}filieres/`,
      providesTags: ["Filieres"],
    }),
    addFiliere: builder.mutation({
      query: (newFiliere) => ({
        url: `${PROGRAMMES_API}filieres/`,
        method: "POST",
        body: newFiliere,
      }),
      invalidatesTags: ["Filieres"],
    }),
    updateFiliere: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${PROGRAMMES_API}filieres/${id}/`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Filieres"],
    }),
    deleteFiliere: builder.mutation({
      query: (id) => ({
        url: `${PROGRAMMES_API}filieres/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Filieres"],
    }),

    // === NIVEAUX ===
    getNiveaux: builder.query({
      query: () => `${PROGRAMMES_API}niveaux/`,
      providesTags: ["Niveaux"],
    }),
    addNiveau: builder.mutation({
      query: (newNiveau) => ({
        url: `${PROGRAMMES_API}niveaux/`,
        method: "POST",
        body: newNiveau,
      }),
      invalidatesTags: ["Niveaux"],
    }),
    updateNiveau: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${PROGRAMMES_API}niveaux/${id}/`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Niveaux"],
    }),
    deleteNiveau: builder.mutation({
      query: (id) => ({
        url: `${PROGRAMMES_API}niveaux/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Niveaux"],
    }),
  }),
});

// === HOOKS auto-générés ===
export const {
  useGetFilieresQuery,
  useAddFiliereMutation,
  useUpdateFiliereMutation,
  useDeleteFiliereMutation,
  useGetNiveauxQuery,
  useAddNiveauMutation,
  useUpdateNiveauMutation,
  useDeleteNiveauMutation,
} = programmesApi;
