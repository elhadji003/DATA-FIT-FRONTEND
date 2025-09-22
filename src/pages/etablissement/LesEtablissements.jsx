import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetListeEtablissementsQuery } from "../../backend/features/etablissement/etablisAPI";
import Loader from "../../components/global/Loader";

export default function LesEtablissements() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetListeEtablissementsQuery(page);

  const etablissements = data?.results || [];

  if (isLoading) return <Loader />;

  // Filtrage
  const filteredEtablissements = etablissements.filter(
    (etab) =>
      etab.nom_etablissement.toLowerCase().includes(search.toLowerCase()) ||
      etab.departement.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center bg-[#2c3e50] text-white px-4 py-6 mb-8 uppercase">
        Les établissements
      </h1>

      {/* Barre de recherche */}
      <div className="max-w-md mx-auto mb-10">
        <input
          type="text"
          placeholder="Rechercher par nom ou Département ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        />
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEtablissements.length > 0 ? (
          filteredEtablissements.map((etab, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition border-t-4 border-[#2c3e50] flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-bold text-[#2c3e50] mb-2">
                  {etab.nom_etablissement}
                </h2>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">Département :</span>{" "}
                  {etab.departement}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">Filières :</span>{" "}
                  {etab.filieres.join(", ")}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Niveaux :</span>{" "}
                  {etab.niveaux.join(", ")}
                </p>
              </div>

              {/* Bouton Postuler */}
              <div className="mt-4">
                <Link
                  to={`/postuler/${etab.id}`} // ⚠️ ici il faut que ton serializer renvoie l'ID !
                  className="inline-block px-4 py-2 bg-yellow-400 text-[#2c3e50] font-semibold rounded-lg shadow hover:bg-yellow-500 transition"
                >
                  Postuler
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            Aucun établissement trouvé
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          disabled={!data?.previous}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Précédent
        </button>
        <button
          disabled={!data?.next}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
