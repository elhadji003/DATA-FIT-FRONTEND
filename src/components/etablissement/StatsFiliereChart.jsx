import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetStatsFiliereQuery } from "../../backend/features/postuler/postulerAPI";
import Loader from "../global/Loader";

export default function StatsFiliereChart() {
  const { data, isLoading, error } = useGetStatsFiliereQuery();

  if (isLoading) return <Loader />;
  if (error) return <p>Erreur lors du chargement des stats</p>;

  const chartData = data.map((item) => ({
    filiere: item.filiere__nom,
    total: item.total,
  }));

  return (
    <div className="w-full h-80 p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold mb-4">
        Filières les plus demandées
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="filiere" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="total" fill="#4ade80" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
