import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../auth/baseQuery";
import { POSTULER_API } from "../../enpoint";

export const postulerApi = createApi({
  reducerPath: "postulerApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Postuler", "Candidatures"],
  endpoints: (builder) => ({
    // POST : créer une candidature
    postuler: builder.mutation({
      query: (data) => ({
        url: `${POSTULER_API}candidatures/postuler/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Postuler"],
    }),

    // Switch 
    updateStatut: builder.mutation({
        query: ({ id, statut }) => ({
            url: `${POSTULER_API}candidatures/${id}/update-statut/`,
            method: "PATCH",
            body: { statut },
        }),
        invalidatesTags: ["Candidature"],
    }),

    // GET : toutes les candidatures
    getCandidatures: builder.query({
      query: () => `${POSTULER_API}candidatures/`,
      providesTags: ["Candidatures"],
    }),

    // Supprimer Candidature
    deleteCandidature: builder.mutation({
      query: (candidatureId) => ({
        url: `${POSTULER_API}candidatures/${candidatureId}/delete/`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Candidatures", "StatsFiliere"],
    }),

    // GET : candidatures par établissement
    getCandidaturesParEtab: builder.query({
      query: (etab_id) => `${POSTULER_API}candidatures/etablissement/${etab_id}/`,
      providesTags: ["Candidatures"],
    }),

    // GET : détail d’une candidature
    getCandidature: builder.query({
      query: (id) => `${POSTULER_API}candidatures/${id}/`,
      providesTags: ["Candidatures"],
    }),
    getNotifications: builder.query({
      query: (etablissementId) => `${POSTULER_API}notifications/${etablissementId}/`
    }),
    markNotificationsAsRead: builder.mutation({
      query: (etabId) => ({
        url: `${POSTULER_API}notifications/${etabId}/mark-as-read/`,
        method: "POST",
      }),
      invalidatesTags: ["Notifications"],
    }),
    getStatsFiliere: builder.query({
      query: () => `${POSTULER_API}stats/filiere/`,
      providesTags: ["StatsFiliere"],
    }),
  }),
});

// Export des hooks
export const {
  usePostulerMutation,
  useUpdateStatutMutation,
  useGetCandidaturesQuery,
  useDeleteCandidatureMutation,
  useGetCandidaturesParEtabQuery,
  useGetCandidatureQuery,
  useGetNotificationsQuery,
  useMarkNotificationsAsReadMutation,
  useGetStatsFiliereQuery,
} = postulerApi;
