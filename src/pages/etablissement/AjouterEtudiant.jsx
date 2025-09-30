import React, { useState } from "react";
import { useGetEtablisProfileQuery } from "../../backend/features/etablissement/etablisAPI";
import { useRegisterUserMutation } from "../../backend/features/auth/authAPI";
import toast from "react-hot-toast";

export default function AjouterEtudiant() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [filiere, setFiliere] = useState("");
  const [niveau, setNiveau] = useState("");

  const [addUser, { isLoading }] = useRegisterUserMutation();
  const { data: etablissement, isLoading: isLoadingEtab } =
    useGetEtablisProfileQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addUser({
        prenom,
        nom,
        email,
        phone,
        filiere,
        niveau,
        etablissement: etablissement?.id,
      }).unwrap();
      toast.success("Étudiant ajouté ✅");
      setPrenom("");
      setNom("");
      setEmail("");
      setPhone("");
      setFiliere("");
      setNiveau("");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.email || err?.data?.phone || "Erreur ❌");
    }
  };

  if (isLoadingEtab) return <p>Chargement...</p>;

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Ajouter un étudiant</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Prénom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <input
          type="text"
          placeholder="Téléphone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />

        {/* Sélection filière */}
        <select
          value={filiere}
          onChange={(e) => setFiliere(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          required
        >
          <option value="">-- Choisir une filière --</option>
          {etablissement?.filieres?.map((f) => (
            <option key={f.id} value={f.id}>
              {f.nom}
            </option>
          ))}
        </select>

        {/* Sélection niveau */}
        <select
          value={niveau}
          onChange={(e) => setNiveau(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          required
        >
          <option value="">-- Choisir un niveau --</option>
          {etablissement?.niveaux?.map((n) => (
            <option key={n.id} value={n.id}>
              {n.nom}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded-lg text-white font-semibold transition ${
            isLoading ? "bg-gray-400" : "bg-gray-600 hover:bg-gray-700"
          }`}
        >
          {isLoading ? "Ajout..." : "Ajouter l'étudiant"}
        </button>
      </form>
    </div>
  );
}
