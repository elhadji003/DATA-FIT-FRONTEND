import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function FormPostule() {
  const { id } = useParams(); // récupère l'id de l'établissement depuis l'URL
  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    tuteurNom: "",
    tuteurPrenom: "",
    tuteurTelephone: "",
    filiere: "",
    niveau: "",
    motivation: "",
  });

  // gestion des inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données envoyées :", form);
    alert("Votre candidature a été envoyée avec succès ✅");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      {/* En-tête */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold text-[#2c3e50]">
          Postuler à l’établissement #{id}
        </h1>
        <p className="text-gray-600 mt-2">
          Remplissez soigneusement ce formulaire pour soumettre votre candidature
        </p>
      </div>

      {/* Formulaire */}
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

        {/* Infos Tuteur */}
        <h2 className="text-xl font-semibold text-[#2c3e50]">
          Informations du tuteur
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="tuteurPrenom"
            placeholder="Prénom du tuteur"
            value={form.tuteurPrenom}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 w-full"
          />
          <input
            type="text"
            name="tuteurNom"
            placeholder="Nom du tuteur"
            value={form.tuteurNom}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 w-full"
          />
          <input
            type="tel"
            name="tuteurTelephone"
            placeholder="Téléphone du tuteur"
            value={form.tuteurTelephone}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 w-full"
          />
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
            <option value="Hotellerie">Hôtellerie</option>
            <option value="Electro-mecanique">Électro-mécanique</option>
            <option value="BTP">BTP</option>
            <option value="Sante">Santé</option>
          </select>

          <select
            name="niveau"
            value={form.niveau}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 w-full"
            required
          >
            <option value="">-- Sélectionnez un niveau --</option>
            <option value="CPI">CPI</option>
            <option value="CAP">CAP</option>
            <option value="BT">BT</option>
            <option value="BTS">BTS</option>
            <option value="Licence">Licence</option>
            <option value="Master">Master</option>
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

        {/* Bouton */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-yellow-400 text-[#2c3e50] font-semibold px-6 py-3 rounded-lg shadow hover:bg-yellow-500 transition"
          >
            Envoyer la candidature
          </button>
        </div>
      </form>
    </div>
  );
}
