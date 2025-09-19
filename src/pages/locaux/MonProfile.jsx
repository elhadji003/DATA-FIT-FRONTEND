import React from "react";
import { useGetUserProfileQuery } from "../../backend/features/user/userAPI";
import ChangePasswordForm from "../../components/auth/ChangePasswordForm";

export default function MonProfile() {
  const { data: profile } = useGetUserProfileQuery();

  return (
    <div className="flex max-sm:flex-col gap-4">
      <div className="w-6/12 max-sm:w-full bg-gray-100 shadow-md rounded-md px-4 py-2 border-t-8 border-gray-800">
        <h1 className="text-center text-2xl font-bold">Mon Profile</h1>
        <div className="mt-4 mb-6">
          {profile?.full_name && (
            <p className="bg-white px-2 py-2 rounded-md space-x-4 mb-2">
              <span>Prénom(s) et Nom : </span>
              <span className="font-bold">{profile.full_name}</span>
            </p>
          )}
          {profile?.email && (
            <p className="bg-white px-2 py-2 rounded-md space-x-4 mb-2">
              <span>Email : </span>
              <span className="font-bold">{profile.email}</span>
            </p>
          )}
          {profile?.nom_etablissement ? (
            <p className="bg-white px-2 py-2 rounded-md space-x-4 mb-2">
              <span>Nom Etablissement : </span>
              <span className="font-bold">
                {profile.nom_etablissement || "Non Definit"}
              </span>
            </p>
          ) : (
            <p className="bg-white px-2 py-2 rounded-md space-x-4 mb-2">
              <span>Nom Etablissement : </span>
              <span className="font-bold">Non Definit</span>
            </p>
          )}

          {profile?.phone && (
            <p className="bg-white px-2 py-2 rounded-md space-x-4 mb-2">
              <span>Téléphone : </span>
              <span className="font-bold">{profile.phone}</span>
            </p>
          )}
        </div>
        <div className="flex gap-3">
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
