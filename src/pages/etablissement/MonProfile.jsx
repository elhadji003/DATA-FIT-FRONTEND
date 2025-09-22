import React from "react";
import { useGetEtablisProfileQuery } from "../../backend/features/etablissement/etablisAPI";
import ChangePasswordForm from "../../components/auth/ChangePasswordForm";

export default function MonProfile() {
  const { data: profile } = useGetEtablisProfileQuery();

  const isEtablissement = profile?.role === "etablissement";

  return (
    <div className="flex max-sm:flex-col gap-4">
      <div className="w-6/12 max-sm:w-full bg-gray-100 shadow-md rounded-md px-4 py-2 border-t-8 border-gray-800">
        <h1 className="text-center text-2xl font-bold">Mon Profil</h1>
        <div className="mt-4 mb-6 space-y-2">
          {profile?.nom_etablissement && (
            <p className="bg-white px-2 py-2 rounded-md">
              <span>Nom complet : </span>
              <span className="font-bold">{profile.nom_etablissement}</span>
            </p>
          )}

          {profile?.departement && (
            <p className="bg-white px-2 py-2 rounded-md">
              <span>Département : </span>
              <span className="font-bold">{profile.departement}</span>
            </p>
          )}

          <p className="bg-white px-2 py-2 rounded-md">
            <span>Filières : </span>
            <span className="font-bold">
              {profile?.filieres?.join(", ") || "Aucune"}
            </span>
          </p>

          {profile?.phone && (
            <p className="bg-white px-2 py-2 rounded-md">
              <span>Téléphone : </span>
              <span className="font-bold">{profile.phone}</span>
            </p>
          )}

          {isEtablissement && (
            <>
              <p className="bg-white px-2 py-2 rounded-md">
                <span>Nom Etablissement : </span>
                <span className="font-bold">
                  {profile.nom_etablissement || "Non Défini"}
                </span>
              </p>
              <p className="bg-white px-2 py-2 rounded-md">
                <span>Département : </span>
                <span className="font-bold">
                  {profile.departement || "Non Défini"}
                </span>
              </p>
              <p className="bg-white px-2 py-2 rounded-md">
                <span>Filières : </span>
                <span className="font-bold">
                  {profile.filieres?.join(", ") || "Aucune"}
                </span>
              </p>
              <p className="bg-white px-2 py-2 rounded-md">
                <span>Niveaux : </span>
                <span className="font-bold">
                  {profile.niveaux?.join(", ") || "Aucun"}
                </span>
              </p>
              {profile.logo && (
                <div className="mt-2">
                  <span>Logo : </span>
                  <img
                    src={profile.logo}
                    alt="Logo Etablissement"
                    className="h-16 w-16 object-cover rounded-md border"
                  />
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex gap-3 mt-4">
          <button className="bg-gray-800 px-4 py-2 rounded-md text-white">
            Modifier
          </button>
          <button className="bg-red-500 px-4 py-2 rounded-md text-white">
            Supprimer
          </button>
        </div>
      </div>

      <div className="w-6/12 max-sm:w-full bg-gray-100 shadow-md rounded-md px-4 py-2 border-t-8 border-gray-800">
        <h1 className="text-center text-2xl font-bold mb-2">
          Modifier mon mot de passe
        </h1>
        <ChangePasswordForm />
      </div>
    </div>
  );
}
