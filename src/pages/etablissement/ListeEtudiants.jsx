import React, { useState } from "react";
import toast from "react-hot-toast";

const filieres = ["Électricien", "Menuisier", "Mécanicien", "Informatique", "Plombier"];

// Simulation de 10 étudiants (2 par filière pour l’exemple)
const fakeEtudiants = Array.from({ length: 25 }, (_, i) => {
  const filiere = filieres[i % filieres.length];
  return {
    id: i + 1,
    prenom: `Prenom${i + 1}`,
    nom: `Nom${i + 1}`,
    filiere,
    telephone: `77${Math.floor(1000000 + Math.random() * 9000000)}`,
  };
});

export default function ListeEtudiants() {
  const [activeFiliere, setActiveFiliere] = useState(filieres[0]);

  const etudiantsFiltres = fakeEtudiants.filter((e) => e.filiere === activeFiliere);

  const handleDelete = (id) => {
    toast.success(`Suppression de l'étudiant ID: ${id}`);
  };

  const handleView = (id) => {
    toast.success(`Voir détails étudiant ID: ${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Liste des Étudiants</h1>

      {/* Tabs */}
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-md shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-2 text-left">Prénom</th>
              <th className="p-2 text-left">Nom</th>
              <th className="p-2 text-left">Filière</th>
              <th className="p-2 text-left">Téléphone</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {etudiantsFiltres.map((etudiant) => (
              <tr key={etudiant.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{etudiant.prenom}</td>
                <td className="p-2">{etudiant.nom}</td>
                <td className="p-2">{etudiant.filiere}</td>
                <td className="p-2">{etudiant.telephone}</td>
                <td className="p-2 flex gap-2 justify-center">
                  <button
                    onClick={() => handleView(etudiant.id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Voir
                  </button>
                  <button
                    onClick={() => handleDelete(etudiant.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
            {etudiantsFiltres.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
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
