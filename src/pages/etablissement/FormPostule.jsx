import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetEtablisDetailQuery } from "../../backend/features/etablissement/etablisAPI";
import Loader from "../../components/global/Loader";
import { usePostulerMutation } from "../../backend/features/postuler/postulerAPI";
import toast from "react-hot-toast";
import { ChevronLeft } from "lucide-react";

export default function FormPostule() {
  const { id } = useParams(); // id établissement
  const { data, isLoading, isError } = useGetEtablisDetailQuery(id);
  const navigate = useNavigate();

  const [postuler, { isLoading: isSubmitting }] = usePostulerMutation();

  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    tuteur_nom: "",
    tuteur_telephone: "",
    tuteur_prenom: "",
    filiere: "",
    niveau: "",
    motivation: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postuler({ ...form, etablissement: id }).unwrap();
      toast.success("Votre candidature a été envoyée ✅");
      setForm({
        prenom: "",
        nom: "",
        email: "",
        telephone: "",
        tuteur_prenom: "",
        tuteur_nom: "",
        tuteur_telephone: "",
        filiere: "",
        niveau: "",
        motivation: "",
      });
    } catch (error) {
      console.log("Erreur :", error);
      toast.error("Une erreur est survenue ❌");
    }
  };

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <p className="text-center py-10 text-red-500">Erreur de chargement ❌</p>
    );

  const filieres = data?.filieres || [];
  const niveaux = data?.niveaux || [];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <button
        onClick={() => navigate(-1)}
        className="mx-4 flex items-center gap-2 mb-4 bg-gray-300 px-4 py-2 rounded-md cursor-pointer"
      >
        <ChevronLeft />
        Retour
      </button>
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold text-[#2c3e50]">
          Postuler à l’établissement {data.nom_etablissement}
        </h1>
        <p className="text-gray-600 mt-2">Département : {data.departement}</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8 space-y-6"
      >
        {/* Infos personnelles */}
        <h2 className="text-xl font-semibold text-[#2c3e50]">
          Informations personnelles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="prenom"
            placeholder="Prénom"
            value={form.prenom}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 w-full"
            required
          />
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={form.nom}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 w-full"
            required
          />
          <input
            type="tel"
            name="telephone"
            placeholder="Téléphone"
            value={form.telephone}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 w-full"
            required
          />
        </div>

        {/* Infos tuteur */}
        <h2 className="text-xl font-semibold text-[#2c3e50]">
          Informations du tuteur
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="tuteur_telephone"
            placeholder="Prénom du tuteur"
            value={form.tuteur_telephone}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 w-full"
          />
          <input
            type="text"
            name="tuteur_nom"
            placeholder="Nom du tuteur"
            value={form.tuteur_nom}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 w-full"
          />
          <input
            type="tel"
            name="tuteur_prenom"
            placeholder="Téléphone du tuteur"
            value={form.tuteur_prenom}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 w-full"
          />
          <input
            type="checkbox"
            name="phs"
            checked={form.phs}
            onChange={(e) => setForm({ ...form, phs: e.target.checked })}
            className="w-4 h-4"
          />
          <label className="text-gray-700">
            Je suis une personne en situation de handicap
          </label>
        </div>

        {/* Filière & Niveau */}
        <h2 className="text-xl font-semibold text-[#2c3e50]">
          Cursus souhaité
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="filiere"
            value={form.filiere}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 w-full"
            required
          >
            <option value="">-- Sélectionnez une filière --</option>
            {filieres.map((f) => (
              <option key={f.id} value={f.id}>
                {f.nom}
              </option>
            ))}
          </select>

          <select
            name="niveau"
            value={form.niveau}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 w-full"
            required
          >
            <option value="">-- Sélectionnez un niveau --</option>
            {niveaux.map((n) => (
              <option key={n.id} value={n.id}>
                {n.nom}
              </option>
            ))}
          </select>
        </div>

        {/* Lettre de motivation */}
        <h2 className="text-xl font-semibold text-[#2c3e50]">
          Lettre de motivation
        </h2>
        <textarea
          name="motivation"
          placeholder="Écrivez ici votre lettre de motivation..."
          value={form.motivation}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2 w-full h-40"
          required
        />

        <div className="text-center">
          <button
            type="submit"
            className="bg-yellow-400 text-[#2c3e50] font-semibold px-6 py-3 rounded-lg shadow hover:bg-yellow-500 transition"
          >
            {isSubmitting ? "Envoi..." : "Envoyer la candidature"}
          </button>
        </div>
      </form>
    </div>
  );
}
