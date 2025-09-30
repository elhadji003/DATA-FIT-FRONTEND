import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetListeEtablissementsQuery } from "../../backend/features/etablissement/etablisAPI";
import Loader from "../../components/global/Loader";
import { ChevronLeft } from "lucide-react";

export default function LesEtablissements() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

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
      {/* Header */}
      <h1 className="text-3xl font-bold text-center bg-[#2c3e50] text-white px-4 py-6 mb-4 uppercase shadow">
        Les établissements
      </h1>

      <button
        onClick={() => navigate(-1)}
        className="mx-4 flex items-center gap-2 mb-4 bg-gray-300 px-4 py-2 rounded-md cursor-pointer"
      >
        <ChevronLeft />
        Retour
      </button>

      {/* Barre de recherche */}
      <div className="max-w-lg mx-auto mb-12">
        <input
          type="text"
          placeholder="🔍 Rechercher par nom ou département..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-3 border border-gray-300 rounded-full shadow focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
        />
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {filteredEtablissements.length > 0 ? (
          filteredEtablissements.map((etab) => (
            <div
              key={etab.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 border-t-4 border-yellow-400 flex flex-col"
            >
              {/* Header avec image de fond */}
              <div className="relative w-full rounded-t-2xl overflow-hidden h-40">
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${
                      etab.background_url || etab.logo || "/default-bg.jpg"
                    })`,
                  }}
                />
                {/* Overlay pour lisibilité */}
                <div className="absolute inset-0 bg-black opacity-20"></div>

                {/* Cercle avec initiales ou nom */}
                <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-50">
                  <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center text-xl font-bold text-gray-800 shadow-lg border-4 border-white">
                    {etab.nom_etablissement?.slice(0, 2).toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Infos principales */}
              <div className="flex-1 p-6 mt-12">
                <h2 className="text-xl font-bold text-center text-[#2c3e50] mb-4">
                  {etab.nom_etablissement}
                </h2>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">📍 Département :</span>{" "}
                  {etab.departement}
                </p>
                <p className="text-gray-600 mb-2 line-clamp-1">
                  <span className="font-semibold">📚 Filières :</span>{" "}
                  {etab.filieres.map((f) => f.nom).join(", ") || "Aucune"}
                </p>
                <p className="text-gray-600 mb-2 line-clamp-1">
                  <span className="font-semibold">🎓 Niveaux :</span>{" "}
                  {etab.niveaux.map((n) => n.nom).join(", ") || "Aucun"}
                </p>
              </div>

              {/* Bouton Postuler */}
              <div className="p-6 pt-0">
                <Link
                  to={`/postuler/${etab.id}`}
                  className="block w-full text-center px-4 py-3 bg-yellow-400 text-[#2c3e50] font-semibold rounded-full shadow hover:bg-yellow-500 transition"
                >
                  ✨ Postuler
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
      <div className="flex justify-center gap-6 mt-12">
        <button
          disabled={!data?.previous}
          onClick={() => setPage(page - 1)}
          className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          ⬅️ Précédent
        </button>
        <button
          disabled={!data?.next}
          onClick={() => setPage(page + 1)}
          className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Suivant ➡️
        </button>
      </div>
    </div>
  );
}
