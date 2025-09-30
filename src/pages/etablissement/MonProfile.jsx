// MonProfile.jsx
import React, { useState } from "react";
import { useGetEtablisProfileQuery } from "../../backend/features/etablissement/etablisAPI";
import ChangePasswordForm from "../../components/auth/ChangePasswordForm";
import ModalEditEtablissement from "../../components/etablissement/ModalEditEtablissement";

export default function MonProfile() {
  const { data: profile } = useGetEtablisProfileQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

          {profile?.phone && (
            <p className="bg-white px-2 py-2 rounded-md">
              <span>Téléphone : </span>
              <span className="font-bold">{profile.phone}</span>
            </p>
          )}

          {profile?.email && (
            <p className="bg-white px-2 py-2 rounded-md">
              <span>Address Email : </span>
              <span className="font-bold">{profile.email}</span>
            </p>
          )}
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-700 px-4 py-2 rounded-md text-white cursor-pointer hover:bg-gray-800"
          >
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

      {isModalOpen && (
        <ModalEditEtablissement onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
