import { useFormContext } from "react-hook-form";

// ✅ StepInformation.js
export default function StepInformation({
  onPhotoChange,
  photoPreview,
  className,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div
      className={`p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto border-t-8 border-gray-600 ${className}`}
    >
      <h3 className="text-lg font-semibold mb-4">Informations personnelles</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm">Prénom</label>
          <input
            className="mt-1 block w-full p-2 border rounded"
            {...register("prenom", { required: "Le prénom est requis" })}
          />
          {errors.prenom && (
            <p className="text-red-500 text-sm mt-1">{errors.prenom.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm">Nom</label>
          <input
            className="mt-1 block w-full p-2 border rounded"
            {...register("nom", { required: "Le nom est requis" })}
          />
          {errors.nom && (
            <p className="text-red-500 text-sm mt-1">{errors.nom.message}</p>
          )}
        </div>
        <div className="col-span-full">
          <label className="block text-sm">
            Nom de l'Entreprise ou Etablissement
          </label>
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded"
            {...register("companyName", {
              required: "Le nom de l'entreprise est requis",
            })}
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.companyName.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm">Email</label>
          <input
            className="mt-1 block w-full p-2 border rounded"
            {...register("email", {
              required: "L'email est requis",
              pattern: { value: /^\S+@\S+$/i, message: "Email invalide" },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm">Téléphone</label>
          <input
            className="mt-1 block w-full p-2 border rounded"
            {...register("phone", { required: "Le téléphone est requis" })}
          />
            {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
        </div>
        <div>
          <label className="block text-sm">Photo (profil)</label>
          <input
            type="file"
            accept="image/*"
            onChange={onPhotoChange}
            className="mt-1 block w-full"
          />
          {photoPreview && (
            <img
              src={photoPreview}
              alt="preview"
              className="mt-2 w-28 h-28 object-cover rounded-full border"
            />
          )}
        </div>
      </div>
    </div>
  );
}
