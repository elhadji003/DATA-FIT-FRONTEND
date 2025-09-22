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
      <h3 className="text-lg font-semibold mb-4">
        Informations sur l'établissement
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Nom de l'établissement */}
        <div className="col-span-full">
          <label className="block text-sm">Nom de l'établissement</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded"
            {...register("nom_etablissement", {
              required: "Le nom de l'établissement est requis",
            })}
          />
          {errors.nom_etablissement && (
            <p className="text-red-500 text-sm mt-1">
              {errors.nom_etablissement.message}
            </p>
          )}
        </div>

        {/* Département*/}
        <div>
          <label className="block text-sm">Département</label>
          <input
            type="text"
            placeholder="Ex: Dakar, Thiès, Saint-Louis..."
            className="mt-1 block w-full p-2 border rounded"
            {...register("departement", {
              required: "La Département est requise",
            })}
          />
          {errors.departement && (
            <p className="text-red-500 text-sm mt-1">
              {errors.departement.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm">Email</label>
          <input
            type="email"
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

        {/* Téléphone */}
        <div>
          <label className="block text-sm">Téléphone</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border rounded"
            {...register("phone", { required: "Le téléphone est requis" })}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Logo / Photo */}
        <div>
          <label className="block text-sm">Logo / Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={onPhotoChange}
            className="mt-1 block w-full p-2 rounded bg-gray-100 "
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
