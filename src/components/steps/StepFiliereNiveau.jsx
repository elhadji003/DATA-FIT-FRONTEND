import React from "react";
import { useFormContext } from "react-hook-form";

export default function StepFiliereNiveau() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto border-t-8 border-gray-600">
      <h3 className="text-lg font-semibold mb-4">Filières & Niveaux</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Filières */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Filières
          </label>
          <input
            type="text"
            placeholder="Ex: ELECTRICITE, FROID CLIM, MENUISERIE..."
            className="mt-1 block w-full p-2 border rounded"
            {...register("filieres", {
              required: "La filière est obligatoire",
              setValueAs: (v) =>
                typeof v === "string"
                  ? v
                      .split(",")
                      .map((f) => f.trim())
                      .filter(Boolean)
                  : [],
            })}
          />
          {errors.filieres && (
            <p className="text-red-500 text-sm mt-1">
              {errors.filieres.message}
            </p>
          )}
        </div>

        {/* Niveaux */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Niveaux
          </label>
          <input
            type="text"
            placeholder="Ex: CAP 1, CAP 2, CAP 3..."
            className="mt-1 block w-full p-2 border rounded"
            {...register("niveaux", {
              required: "Le niveau est obligatoire",
              setValueAs: (v) =>
                typeof v === "string"
                  ? v
                      .split(",")
                      .map((n) => n.trim())
                      .filter(Boolean)
                  : [],
            })}
          />
          {errors.niveaux && (
            <p className="text-red-500 text-sm mt-1">
              {errors.niveaux.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
