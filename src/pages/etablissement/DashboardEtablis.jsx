import React from "react";
import { Users, GraduationCap, Building2, Layers } from "lucide-react"; // icônes jolies
import {
  useGetFilieresQuery,
  useGetNiveauxQuery,
} from "../../backend/features/programmes/programmesAPI";
import StatsFiliereChart from "../../components/etablissement/StatsFiliereChart";

export default function DashboardEtablis() {
  const { data: filieres = [], isLoading: loadingFilieres } =
    useGetFilieresQuery();
  const { data: niveaux = [], isLoading: loadingNiveaux } =
    useGetNiveauxQuery();

  // TODO: remplacer par tes vraies queries quand dispo
  const { data: etudiants = [], isLoading: loadingEtudiants } = {
    data: [],
    isLoading: false,
  };
  const { data: personnels = [], isLoading: loadingPersonnels } = {
    data: [],
    isLoading: false,
  };

  const stats = [
    {
      title: "Étudiants",
      value: etudiants.count || "0",
      icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
      color: "bg-blue-100",
    },
    {
      title: "Personnel",
      value: personnels.count || "0",
      icon: <Users className="w-8 h-8 text-emerald-600" />,
      color: "bg-emerald-100",
    },
    {
      title: "Filières",
      value: filieres.count,
      icon: <Building2 className="w-8 h-8 text-purple-600" />,
      color: "bg-purple-100",
    },
    {
      title: "Niveaux",
      value: niveaux.count,
      icon: <Layers className="w-8 h-8 text-orange-600" />,
      color: "bg-orange-100",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Bienvenue sur votre Tableau de Bord
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 rounded-xl shadow-md bg-white border"
          >
            <div>
              <p className="text-gray-500">{stat.title}</p>
              <h2 className="text-3xl font-bold">{stat.value}</h2>
            </div>
            <div className={`p-3 rounded-lg ${stat.color}`}>{stat.icon}</div>
          </div>
        ))}
      </div>
      <StatsFiliereChart/>
    </div>
  );
}
