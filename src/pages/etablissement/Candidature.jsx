import React, { useState } from "react";
import {
  useDeleteCandidatureMutation,
  useGetCandidaturesQuery,
  useUpdateStatutMutation,
} from "../../backend/features/postuler/postulerAPI";
import Loader from "../../components/global/Loader";
import ModalDetailCandidature from "../../components/etablissement/ModalDetailCandidature";
import toast from "react-hot-toast";

export default function Candidatures() {
  const { data, isLoading, isError } = useGetCandidaturesQuery();
  const [updateStatut] = useUpdateStatutMutation();
  const [deleteCandidature] = useDeleteCandidatureMutation();

  const [selectedCandidature, setSelectedCandidature] = useState(null);

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <p className="text-center text-red-500 py-10">Erreur de chargement ❌</p>
    );

  const candidatures = data?.results || [];

  const handleStatutChange = async (id, newStatut) => {
    try {
      await updateStatut({ id, statut: newStatut }).unwrap();
    } catch (err) {
      console.log("Erreur lors de la mise à jour :", err);
    }
  };


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette candidature ?"
    );
    if (!confirmDelete) return; // si l'utilisateur annule, on sort

    try {
      await deleteCandidature(id).unwrap(); // appel à la mutation RTK
      toast.success("Candidature supprimée avec succès !");
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
      toast.error("Impossible de supprimer la candidature. Réessayez.");
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <h1 className="text-3xl font-bold text-center text-[#2c3e50] mb-6">
        Liste des candidatures
      </h1>

      {candidatures.length === 0 ? (
        <p className="text-center text-gray-500">
          Aucune candidature pour le moment.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-md">
            <thead className="bg-[#2c3e50] text-white">
              <tr>
                <th className="py-3 px-4 text-left">Nom</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Téléphone</th>
                <th className="py-3 px-4 text-left">Établissement</th>
                <th className="py-3 px-4 text-left">Filière</th>
                <th className="py-3 px-4 text-left">Niveau</th>
                <th className="py-3 px-4 text-left">PH</th>
                <th className="py-3 px-4 text-left">Statut</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {candidatures.map((c) => (
                <tr key={c.id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-2 px-4">
                    {c.prenom} {c.nom}
                  </td>
                  <td className="py-2 px-4">{c.email}</td>
                  <td className="py-2 px-4">{c.telephone}</td>
                  <td className="py-2 px-4">{c.etablissementNom}</td>
                  <td className="py-2 px-4">{c.filiereNom}</td>
                  <td className="py-2 px-4">{c.niveauNom}</td>
                  <td className="py-2 px-4">{c.phs ? "Oui" : "Non"}</td>
                  <td className="py-2 px-4">
                    <select
                      value={c.statut}
                      onChange={(e) => handleStatutChange(c.id, e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      <option value="en_attente">En attente</option>
                      <option value="acceptee">Acceptée</option>
                      <option value="rejettee">Rejetée</option>
                    </select>
                  </td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      onClick={() => setSelectedCandidature(c)}
                    >
                      Voir
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(c.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ModalDetailCandidature
        candidature={selectedCandidature}
        onClose={() => setSelectedCandidature(null)}
      />
    </div>
  );
}
