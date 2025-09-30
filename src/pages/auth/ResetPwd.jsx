import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../backend/features/auth/authAPI";
import toast from "react-hot-toast";

export default function ResetPwd() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const navigate = useNavigate();

  // On récupère id et uuid depuis l'URL
  const { id, uuid } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas ❌");
      return;
    }

    try {
      // On passe les bons paramètres à la mutation
      await resetPassword({
        uid: id,       // correspond à l'ID encodé
        token: uuid,   // correspond au token envoyé par email
        new_password: password,
        re_new_password: confirmPassword,
      }).unwrap();

      toast.success("Mot de passe réinitialisé ✅");
      navigate("/login");
    } catch (error) {
      console.error("Erreur ❌ :", error);
      toast.error("Impossible de réinitialiser le mot de passe.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border-t-8 border-gray-600">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Réinitialiser le mot de passe
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Nouveau mot de passe
            </label>
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-600 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Confirmer mot de passe
            </label>
            <input
              type="password"
              placeholder="Confirmer mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-600 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white py-2 rounded-lg font-semibold transition ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            {isLoading ? "Réinitialisation..." : "Réinitialiser"}
          </button>
        </form>
      </div>
    </div>
  );
}
