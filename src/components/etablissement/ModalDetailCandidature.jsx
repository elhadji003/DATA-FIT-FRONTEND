import React from "react";

export default function ModalDetailCandidature({ candidature, onClose }) {
  if (!candidature) return null;

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 max-h-[80vh] overflow-y-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b mb-4 p-4">
          <h2 className="text-xl font-semibold">
            Détails de {candidature.prenom} {candidature.nom}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-black text-2xl font-bold"
          >
            ✖
          </button>
        </div>

        {/* Contenu */}
        <div className="grid grid-cols-2 gap-4">
          <p>
            <strong>Email:</strong> {candidature.email}
          </p>
          <p>
            <strong>Téléphone:</strong> {candidature.telephone}
          </p>
          <p>
            <strong>Établissement:</strong> {candidature.etablissementNom}
          </p>
          <p>
            <strong>Filière:</strong> {candidature.filiereNom}
          </p>
          <p>
            <strong>Niveau:</strong> {candidature.niveauNom}
          </p>
          <p>
            <strong>PH:</strong> {candidature.phs ? "Oui" : "Non"}
          </p>
          <p className="col-span-2">
            <strong>Tuteur:</strong> {candidature.tuteur_prenom}{" "}
            {candidature.tuteur_nom}
          </p>
          <p className="col-span-2">
            <strong>Téléphone Tuteur:</strong> {candidature.tuteur_telephone}
          </p>
          <p className="col-span-2 bg-gray-300 px-4 py-2 rounded-md ">
            <strong>Motivation:</strong> {candidature.motivation}
          </p>
          <p className="col-span-2">
            <strong>Statut:</strong> {candidature.statut}
          </p>
          <p className="col-span-2">
            <strong>Date de candidature:</strong>{" "}
            {new Date(candidature.date_postule).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
