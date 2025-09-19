import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

// ✅ StepSecurity.js
export default function StepSecurity() {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const [show, setShow] = useState(false);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto border-t-8 border-gray-600">
      <h3 className="text-lg font-semibold mb-4">Sécurité</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm">Mot de passe</label>
          <input
            type={show ? "text" : "password"}
            className="mt-1 block w-full p-2 border rounded"
            {...register("password", {
              required: "Le mot de passe est requis",
              minLength: {
                value: 6,
                message: "Au moins 6 caractères",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm">Confirmer Mot de passe</label>
          <input
            type={show ? "text" : "password"}
            className="mt-1 block w-full p-2 border rounded"
            {...register("confirmPassword", {
              required: "La confirmation du mot de passe est requise",
              validate: (value) =>
                value === watch("password") || "Les mots de passe ne correspondent pas",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 col-span-2">
          <input
            type="checkbox"
            id="showPassword"
            checked={show}
            onChange={() => setShow(!show)}
          />
          <label htmlFor="showPassword" className="text-sm">
            Afficher les mots de passe
          </label>
        </div>
      </div>
    </div>
  );
}
