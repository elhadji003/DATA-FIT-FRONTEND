import React from "react";
import {
  Building2,
  Megaphone,
  UserCheck,
  School,
  BarChart3,
  Upload,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useGetListeEtablissementsQuery } from "../../backend/features/etablissement/etablisAPI";

// Hero
function Hero() {
  return (
    <section className="bg-[#2c3e50] text-white py-20 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Bienvenue sur la plateforme des{" "}
        <span className="text-yellow-400">CFPT</span> de Thiés
      </h1>
      <div className="flex justify-center items-center text-3xl mb-4 flex-wrap gap-2">
        <p>
          <strong className="text-yellow-400">C</strong>enter de
        </p>
        <p>
          <strong className="text-yellow-400">F</strong>ormation
        </p>
        <p>
          <strong className="text-yellow-400">P</strong>rofessionnelle et
        </p>
        <p>
          <strong className="text-yellow-400">T</strong>echnique
        </p>
      </div>
      <p className="text-lg max-w-2xl mx-auto mb-8">
        "La plateforme qui facilite la gestion des données et améliore la
        visibilité des centres."
      </p>
      <Link
        to="/register"
        className="px-6 py-3 bg-yellow-400 text-[#2c3e50] font-semibold rounded-lg shadow hover:bg-yellow-500 transition"
      >
        Créer un compte
      </Link>
    </section>
  );
}

// Sections principales (Centre, Annonces, Demande)
function MainSections() {
  const sections = [
    {
      icon: <Building2 className="w-10 h-10 text-yellow-500 mb-4" />,
      title: "Centre de formation",
      desc: "Découvrez tous les centres partenaires et leurs formations.",
    },
    {
      icon: <Megaphone className="w-10 h-10 text-yellow-500 mb-4" />,
      title: "Annonces",
      desc: "Accédez aux annonces publiées par les centres.",
    },
    {
      icon: <UserCheck className="w-10 h-10 text-yellow-500 mb-4" />,
      title: "Demande d'inscription",
      desc: "Postulez facilement aux formations qui vous intéressent.",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 text-center">
        {sections.map((s, i) => (
          <div
            key={i}
            className="flex flex-col items-center bg-white p-8 rounded-xl shadow hover:shadow-lg transition"
          >
            {s.icon}
            <h3 className="text-xl font-semibold mt-2">{s.title}</h3>
            <p className="text-gray-600 text-center mt-2">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Stats
function Stats({ stats }) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-8 rounded-xl shadow">
            <h2 className="text-2xl font-bold text-[#2c3e50]">{s.value}</h2>
            <p className="text-gray-600">{s.label}</p>
            <div className="px-4 py-2 rounded-md bg-[#2c3e50] text-white mt-4">
              <Link to={s.href}>Voir</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Features
function Features() {
  const features = [
    {
      icon: <School className="w-10 h-10 text-yellow-500 mb-4" />,
      title: "Gestion des écoles",
      desc: "Administrez vos écoles et vos étudiants facilement.",
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-yellow-500 mb-4" />,
      title: "Rapports & Analyses",
      desc: "Suivez vos performances avec des statistiques claires.",
    },
    {
      icon: <Upload className="w-10 h-10 text-yellow-500 mb-4" />,
      title: "Import de données",
      desc: "Importez vos fichiers Excel ou CSV en quelques clics.",
    },
  ];

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center text-[#2c3e50] mb-12">
        Fonctionnalités principales
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="flex flex-col items-center bg-white p-6 rounded-xl shadow"
          >
            {f.icon}
            <h3 className="text-lg font-semibold">{f.title}</h3>
            <p className="text-gray-600 text-center mt-2">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// CTA
function CTA() {
  return (
    <section className="bg-[#2c3e50] text-white py-16 text-center">
      <h2 className="text-3xl font-bold mb-6">
        Prêt à simplifier la gestion de vos établissements ?
      </h2>
      <Link
        to="/register"
        className="px-8 py-3 bg-yellow-400 text-[#2c3e50] font-semibold rounded-lg shadow hover:bg-yellow-500 transition"
      >
        Créer un compte
      </Link>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="mb-4 md:mb-0">© 2025 Piod. Tous droits réservés.</p>
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
    </footer>
  );
}

// Page principale
export default function Acceuil() {
  const { data, isLoading } = useGetListeEtablissementsQuery();
  const etablissements = data?.results || [];

  const stats = [
    { value: "08", label: "Entreprises gérées", href: "/les-etablissements" },
    {
      value: data?.count || 0,
      label: "Établissements",
      href: "/les-etablissements",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-700 text-xl">
        Chargement des données...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <MainSections />
      <Stats stats={stats} />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}
