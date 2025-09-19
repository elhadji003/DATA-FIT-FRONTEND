import React from "react";
import { Building2, School, BarChart3, Upload } from "lucide-react";
import { Link } from "react-router-dom";

export default function Acceuil() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#2c3e50] text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Bienvenue sur <span className="text-yellow-400">Data CFP FIT</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          L'application qui vous permet de gérer vos{" "}
          <strong>entreprises</strong> et vos{" "}
          <strong>écoles de formation</strong> efficacement et simplement.
        </p>
        <Link
          to={"/login"}
          className="px-6 py-3 bg-yellow-400 text-[#2c3e50] font-semibold rounded-lg shadow hover:bg-yellow-500 transition"
        >
          Commencer maintenant
        </Link>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
          <div className="bg-white p-8 rounded-xl shadow">
            <h2 className="text-2xl font-bold text-[#2c3e50]">08</h2>
            <p className="text-gray-600">Entreprises gérées</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow">
            <h2 className="text-2xl font-bold text-[#2c3e50]">16</h2>
            <p className="text-gray-600">Écoles de formation</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center text-[#2c3e50] mb-12">
          Fonctionnalités principales
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow">
            <Building2 className="w-10 h-10 text-yellow-500 mb-4" />
            <h3 className="text-lg font-semibold">Gestion des entreprises</h3>
            <p className="text-gray-600 text-center mt-2">
              Centralisez toutes vos données d'entreprise.
            </p>
          </div>
          <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow">
            <School className="w-10 h-10 text-yellow-500 mb-4" />
            <h3 className="text-lg font-semibold">Gestion des écoles</h3>
            <p className="text-gray-600 text-center mt-2">
              Administrez vos écoles et vos étudiants facilement.
            </p>
          </div>
          <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow">
            <BarChart3 className="w-10 h-10 text-yellow-500 mb-4" />
            <h3 className="text-lg font-semibold">Rapports & Analyses</h3>
            <p className="text-gray-600 text-center mt-2">
              Suivez vos performances avec des statistiques claires.
            </p>
          </div>
          <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow">
            <Upload className="w-10 h-10 text-yellow-500 mb-4" />
            <h3 className="text-lg font-semibold">Import de données</h3>
            <p className="text-gray-600 text-center mt-2">
              Importez vos fichiers Excel ou CSV en quelques clics.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#2c3e50] text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Prêt à simplifier la gestion de vos établissements ?
        </h2>
        <Link
          to={"/register"}
          className="px-8 py-3 bg-yellow-400 text-[#2c3e50] font-semibold rounded-lg shadow hover:bg-yellow-500 transition"
        >
          Créer un compte
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">© 2025 Piod. Tous droits réservés.</p>
          <div>
            <form className="flex">
              <input
                type="email"
                placeholder="Votre email"
                className="px-4 py-2 rounded-l-lg border border-gray-400 focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="submit"
                className="bg-yellow-400 text-[#2c3e50] px-4 py-2 rounded-r-lg font-semibold hover:bg-yellow-500 transition"
              >
                S'inscrire
              </button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
}
