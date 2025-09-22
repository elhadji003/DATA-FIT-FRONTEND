import React, { useState } from "react";
import {
  useGetFilieresQuery,
  useAddFiliereMutation,
  useDeleteFiliereMutation,
  useGetNiveauxQuery,
  useAddNiveauMutation,
  useDeleteNiveauMutation,
} from "../../backend/features/programmes/programmesAPI";
import toast from "react-hot-toast";

export default function AjouterFilieresNiveaux() {
  // === RTK Query hooks ===
  const { data: filieres = [], isLoading: loadingFilieres } =
    useGetFilieresQuery();
  const { data: niveaux = [], isLoading: loadingNiveaux } =
    useGetNiveauxQuery();

  const [addFiliere] = useAddFiliereMutation();
  const [deleteFiliere] = useDeleteFiliereMutation();
  const [addNiveau] = useAddNiveauMutation();
  const [deleteNiveau] = useDeleteNiveauMutation();

  // === Local state pour inputs ===
  const [newFiliere, setNewFiliere] = useState("");
  const [newNiveau, setNewNiveau] = useState("");

  // === Handlers ===
  const handleAddFiliere = async () => {
    if (!newFiliere.trim()) return;
    try {
      await addFiliere({ nom: newFiliere }).unwrap();
      toast.success("Filière ajoutée !");
      setNewFiliere("");
    } catch (err) {
      toast.error("Erreur lors de l'ajout de la filière");
      console.error(err);
    }
  };

  const handleDeleteFiliere = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Voulez-vous vraiment supprimer cette filière ?"
      );
      if (!confirmDelete) return; // Si l'utilisateur annule, on sort

      await deleteFiliere(id).unwrap(); // Appel à la mutation RTK Query
      toast.success("Filière supprimée !");
    } catch (err) {
      toast.error("Erreur lors de la suppression de la filière");
      console.error(err);
    }
  };

  const handleAddNiveau = async () => {
    if (!newNiveau.trim()) return;
    try {
      await addNiveau({ nom: newNiveau }).unwrap();
      toast.success("Niveau ajouté !");
      setNewNiveau("");
    } catch (err) {
      toast.error("Erreur lors de l'ajout du niveau");
      console.error(err);
    }
  };

  const handleDeleteNiveau = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Voulez-vous vraiment supprimer ce niveau"
      );
      if (!confirmDelete) return;
      await deleteNiveau(id).unwrap();
      toast.success("Niveau supprimé !");
    } catch (err) {
      toast.error("Erreur lors de la suppression du niveau");
      console.error(err);
    }
  };

  return (
    <div className="flex items-start justify-around gap-8 p-6 bg-white rounded-lg shadow-md">
      {/* === Filières === */}
      <div className="w-1/2 flex flex-col justify-between">
        <div className="mb-3">
          <h3 className="text-lg font-semibold"> Filières</h3>
          <p className="text-gray-600">
            Nombre de filieres <strong>{filieres.count}</strong>{" "}
          </p>
        </div>
        <div className="flex gap-2 mt-auto mb-3">
          <input
            type="text"
            placeholder="Nouvelle filière"
            value={newFiliere}
            onChange={(e) => setNewFiliere(e.target.value)}
            className="flex-1 border p-2 rounded"
          />
          <button
            onClick={handleAddFiliere}
            disabled={!newFiliere.trim()}
            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Ajouter
          </button>
        </div>
        {loadingFilieres ? (
          <p>Chargement...</p>
        ) : (
          <ul className="mb-3 max-h-96 overflow-y-auto">
            {filieres?.results?.map((f) => (
              <li
                key={f.id}
                className="flex items-center justify-between border p-2 rounded mb-2"
              >
                {f.nom}
                <button
                  onClick={() => handleDeleteFiliere(f.id)}
                  className="text-red-500 hover:underline"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* === Niveaux === */}
      <div className="w-1/2 flex flex-col justify-between">
        <div className="mb-3">
          <h3 className="text-lg font-semibold"> Niveaux</h3>
          <p className="text-gray-600">
            Nombre de Niveaux <strong>{filieres.count}</strong>{" "}
          </p>
        </div>
        <div className="flex gap-2 mt-auto mb-3">
          <input
            type="text"
            placeholder="Nouveau niveau"
            value={newNiveau}
            onChange={(e) => setNewNiveau(e.target.value)}
            className="flex-1 border p-2 rounded"
          />
          <button
            onClick={handleAddNiveau}
            disabled={!newNiveau.trim()}
            className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            Ajouter
          </button>
        </div>
        {loadingNiveaux ? (
          <p>Chargement...</p>
        ) : (
          <ul className="mb-3 max-h-96 overflow-y-auto">
            {niveaux?.results?.map((n) => (
              <li
                key={n.id}
                className="flex items-center justify-between border p-2 rounded mb-2"
              >
                {n.nom}
                <button
                  onClick={() => handleDeleteNiveau(n.id)}
                  className="text-red-500 hover:underline"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
