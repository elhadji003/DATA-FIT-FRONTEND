import React from "react";
import { useDeleteEtudiantMutation, useGetEtudiantByIdQuery } from "../../backend/features/user/userAPI";
import Loader from "../../components/global/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function DetailsEtudiant() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: etudiant, isLoading, isError } = useGetEtudiantByIdQuery(id);
  const [deleteEtudiant] = useDeleteEtudiantMutation();

  const handleDeleteEtudiant = async () => {
    const deleteConfirm = window.confirm("Voulez-vous vraiment supprimer cet étudiant ?");
    if (deleteConfirm) {
      try {
        await deleteEtudiant(id).unwrap();
        alert("Étudiant supprimé avec succès !");
        navigate(-1); // Retour à la liste après suppression
      } catch (err) {
        alert("Erreur lors de la suppression.");
      }
    }
  };

  if (isLoading) return <Loader />;
  if (isError)
    return <p className="text-red-500">Erreur lors du chargement du profil.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Bouton Retour */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center mb-4 text-gray-700 hover:text-gray-900"
      >
        <ChevronLeft className="mr-2" /> Retour
      </button>

      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-600">
            {etudiant.prenom?.charAt(0)}
            {etudiant.nom?.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{etudiant.prenom} {etudiant.nom}</h1>
            <p className="text-gray-500">{etudiant.email}</p>
            <p className="text-gray-500">{etudiant.phone}</p>
          </div>
        </div>

        {/* Info principale */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded">
            <h2 className="font-semibold text-gray-700">Filière</h2>
            <p className="mt-1 text-gray-800">{etudiant.filiere_nom}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded">
            <h2 className="font-semibold text-gray-700">Niveau</h2>
            <p className="mt-1 text-gray-800">{etudiant.niveau_nom}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded">
            <h2 className="font-semibold text-gray-700">ID Étudiant</h2>
            <p className="mt-1 text-gray-800">{etudiant.id}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded">
            <h2 className="font-semibold text-gray-700">Établissement</h2>
            <p className="mt-1 text-gray-800">{etudiant.etablissement_nom || etudiant.etablissement}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-4">
          <button 
            onClick={() => navigate(`/modifier-etudiant/${etudiant.id}`)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Modifier
          </button>
          <button 
            onClick={handleDeleteEtudiant}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
