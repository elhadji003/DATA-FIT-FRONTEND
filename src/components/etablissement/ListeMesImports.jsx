import React, { useState } from "react";
import {
  useGetMesImportsQuery,
  useGetDepartementsQuery,
  useGetCentresQuery,
  useGetFilieresQuery,
  useGetNiveauxQuery,
} from "../../backend/features/importsFichier/importsAPI";

export default function ListeMesImports() {
  const { data: imports, isLoading: loadingImports } = useGetMesImportsQuery();
  const [selectedImport, setSelectedImport] = useState(null);

  // Données dépendantes
  const { data: departements } = useGetDepartementsQuery(selectedImport?.id, {
    skip: !selectedImport,
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📂 Mes fichiers importés</h2>

      {loadingImports ? (
        <p>Chargement...</p>
      ) : (
        <select
          className="border rounded p-2 mb-4"
          onChange={(e) =>
            setSelectedImport(
              imports?.results.find(
                (imp) => imp.id === parseInt(e.target.value)
              )
            )
          }
        >
          <option value="">-- Sélectionner un import --</option>
          {imports?.results.map((imp) => (
            <option key={imp.id} value={imp.id}>
              {imp.nom}
            </option>
          ))}
        </select>
      )}

      {selectedImport && departements && (
        <table className="w-full border-collapse border text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Département</th>
              <th className="border p-2">Centre</th>
              <th className="border p-2">Filière</th>
              <th className="border p-2">Niveau</th>
            </tr>
          </thead>
          <tbody>
            {departements?.results.map((dept) => (
              <DepartementRows key={dept.id} departement={dept} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function DepartementRows({ departement }) {
  const { data: centres } = useGetCentresQuery(departement.id);

  if (!centres) return null;

  return centres?.results.flatMap((centre) => (
    <CentreRows key={centre.id} departement={departement} centre={centre} />
  ));
}

function CentreRows({ departement, centre }) {
  const { data: filieres } = useGetFilieresQuery(centre.id);

  if (!filieres) return null;

  return filieres?.results.flatMap((filiere) => (
    <FiliereRows
      key={filiere.id}
      departement={departement}
      centre={centre}
      filiere={filiere}
    />
  ));
}

function FiliereRows({ departement, centre, filiere }) {
  const { data: niveaux } = useGetNiveauxQuery(filiere.id);

  if (!niveaux) return null;

  return niveaux?.results.map((niveau) => (
    <tr key={niveau.id}>
      <td className="border p-2">{departement.nom}</td>
      <td className="border p-2">{centre.nom}</td>
      <td className="border p-2">{filiere.nom}</td>
      <td className="border p-2">{niveau.nom}</td>
    </tr>
  ));
}
