// features/imports/importsAPI.js
import { createApi } from '@reduxjs/toolkit/query/react';
import { IMPORTS_FICHIER_API } from '../../enpoint';
import { baseQueryWithReauth } from '../auth/baseQuery';

export const importsApi = createApi({
  reducerPath: 'importsApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // Upload fichier
    uploadFile: builder.mutation({
      query: (formData) => ({
        url: `${IMPORTS_FICHIER_API}upload/`,
        method: 'POST',
        body: formData,
      }),
    }),

    getMesImports: builder.query({
        query: () => `${IMPORTS_FICHIER_API}mes-imports/`,
    }),

    // Départements d'un import
    getDepartements: builder.query({
      query: (importId) => `${IMPORTS_FICHIER_API}imports/${importId}/departements/`,
    }),

    // Centres d'un département
    getCentres: builder.query({
      query: (departementId) =>
        `${IMPORTS_FICHIER_API}departements/${departementId}/centres/`,
    }),

    // Filières d'un centre
    getFilieres: builder.query({
      query: (centreId) =>
        `${IMPORTS_FICHIER_API}centres/${centreId}/filieres/`,
    }),

    // Niveaux d'une filière
    getNiveaux: builder.query({
      query: (filiereId) =>
        `${IMPORTS_FICHIER_API}filieres/${filiereId}/niveaux/`,
    }),
  }),
});

export const {
  useUploadFileMutation,
  useGetMesImportsQuery,
  useGetDepartementsQuery,
  useGetCentresQuery,
  useGetFilieresQuery,
  useGetNiveauxQuery,
} = importsApi;
