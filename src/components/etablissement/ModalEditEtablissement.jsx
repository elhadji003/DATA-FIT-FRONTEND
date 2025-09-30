// components/etablissement/ModalEditEtablissement.jsx
import React, { useState, useEffect } from "react";
import {
  useGetEtablisProfileQuery,
  useUpdateEtablisrProfileMutation,
} from "../../backend/features/etablissement/etablisAPI";
import Loader from "../global/Loader";
import toast from "react-hot-toast";

export default function ModalEditEtablissement({ onClose }) {
  const { data: profile, isLoading } = useGetEtablisProfileQuery();
  const [updateEtablissement] = useUpdateEtablisrProfileMutation();

  const [formData, setFormData] = useState({
    nom_etablissement: "",
    departement: "",
    filieres_ids: [],
    niveaux_ids: [],
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        nom_etablissement: profile.nom_etablissement || "",
        departement: profile.departement || "",
        filieres_ids: profile.filieres?.map((f) => f.id) || [],
        niveaux_ids: profile.niveaux?.map((n) => n.id) || [],
      });
    }
  }, [profile]);

  if (isLoading) return <Loader />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (name, values) => {
    setFormData((prev) => ({ ...prev, [name]: values }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEtablissement({ id: profile.id, ...formData }).unwrap();
      toast.success("Profil mis à jour ✅");
      onClose(); // ferme le modal après succès
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la mise à jour ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <h2 className="text-xl font-bold mb-4">Modifier mon établissement</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Nom de l'établissement</label>
            <input
              type="text"
              name="nom_etablissement"
              value={formData.nom_etablissement}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block mb-1">Département</label>
            <input
              type="text"
              name="departement"
              value={formData.departement}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block mb-1">Filières</label>
            <select
              multiple
              value={formData.filieres_ids}
              onChange={(e) =>
                handleMultiSelectChange(
                  "filieres_ids",
                  Array.from(e.target.selectedOptions, (opt) =>
                    parseInt(opt.value)
                  )
                )
              }
              className="w-full border rounded px-2 py-1"
            >
              {profile.filieres?.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.nom}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">Niveaux</label>
            <select
              multiple
              value={formData.niveaux_ids}
              onChange={(e) =>
                handleMultiSelectChange(
                  "niveaux_ids",
                  Array.from(e.target.selectedOptions, (opt) =>
                    parseInt(opt.value)
                  )
                )
              }
              className="w-full border rounded px-2 py-1"
            >
              {profile.niveaux?.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.nom}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
            >
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
