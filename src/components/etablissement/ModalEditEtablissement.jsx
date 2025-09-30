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
    logo: null, // un vrai fichier
    logoPreview: "", // juste pour l’aperçu
  });

  useEffect(() => {
    if (profile) {
      setFormData((prev) => ({
        ...prev,
        nom_etablissement: profile.nom_etablissement || "",
        departement: profile.departement || "",
        logoPreview: profile.logo || "",
      }));
    }
  }, [profile]);

  if (isLoading) return <Loader />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        logo: file,
        logoPreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("nom_etablissement", formData.nom_etablissement);
    fd.append("departement", formData.departement);

    if (formData.logo instanceof File) {
      fd.append("logo", formData.logo); // vrai fichier
    }

    try {
      await updateEtablissement({ data: fd }).unwrap();
      toast.success("Profil mis à jour ✅");
      onClose();
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
            <label className="block mb-1">Logo</label>
            {formData.logoPreview && (
              <img
                src={formData.logoPreview}
                alt="Logo actuel"
                className="h-24 w-24 object-cover rounded-full mb-2 border"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border rounded px-2 py-1"
            />
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
