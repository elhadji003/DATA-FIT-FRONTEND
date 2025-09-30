import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetListesEtudiantByEtablisQuery } from "../../backend/features/user/userAPI";
import Loader from "../../components/global/Loader";

export default function ListeEtudiants() {
  const { data, isLoading, isError } = useGetListesEtudiantByEtablisQuery();

  // 🔹 Récupère les étudiants depuis results
  const etudiants = data?.results || [];

  // 🔹 Création dynamique des filières
  const filieres = Array.from(
    new Set(etudiants.map((e) => e.filiere_nom))
  ).filter(Boolean);

  const [activeFiliere, setActiveFiliere] = useState(filieres[0] || "");

  // 🔹 Filtrage par nom de filière
  const etudiantsFiltres = etudiants.filter(
    (e) => e.filiere_nom === activeFiliere
  );

  useEffect(() => {
    if (!activeFiliere && filieres.length > 0) {
      setActiveFiliere(filieres[0]);
    }
  }, [filieres, activeFiliere]);

  if (isLoading) return <Loader />;
  if (isError) return <p>Erreur lors du chargement des étudiants</p>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Liste des Étudiants</h1>
        <div className="px-4 py-2 bg-emerald-600 rounded-md text-white">
          <Link to="/ajouterEtudiant">Ajouter Étudiant</Link>
        </div>
      </div>

      {/* Tabs pour filières */}
      <div className="flex gap-2 mb-6 border-b">
        {filieres.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFiliere(f)}
            className={`px-4 py-2 rounded-t-md font-medium ${
              activeFiliere === f
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table des étudiants */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-md shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-2 text-left">Prénom</th>
              <th className="p-2 text-left">Nom</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Téléphone</th>
              <th className="p-2 text-left">Filière</th>
              <th className="p-2 text-left">Niveau</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {etudiantsFiltres.map((etudiant) => (
              <tr key={etudiant.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{etudiant.prenom}</td>
                <td className="p-2">{etudiant.nom}</td>
                <td className="p-2">{etudiant.email}</td>
                <td className="p-2">{etudiant.phone}</td>
                <td className="p-2">{etudiant.filiere_nom}</td>
                <td className="p-2">{etudiant.niveau_nom}</td>
                <td className="p-2 flex gap-2 justify-center">
                  <Link
                    to={`/etudiant/${etudiant.id}`}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Voir
                  </Link>
                </td>
              </tr>
            ))}
            {etudiantsFiltres.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  Aucun étudiant dans cette filière
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
