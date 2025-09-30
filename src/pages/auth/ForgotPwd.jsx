import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForgotPasswordMutation } from "../../backend/features/auth/authAPI";
import toast from "react-hot-toast";

export default function ForgotPwd() {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await forgotPassword({ email }).unwrap();
      toast.success("Un email de réinitialisation a été envoyé ✅");
    } catch (error) {
      console.error("Erreur ❌ :", error);
      toast.error("Impossible d'envoyer l'email. Vérifiez votre adresse.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border-t-8 border-gray-600">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Mot de passe oublié
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            {isLoading ? "Envoi..." : "Envoyer l'email"}
          </button>
        </form>

        <p className="text-gray-600 text-sm mt-6 text-center">
          Retour à la{" "}
          <Link to="/login" className="text-gray-600 hover:underline">
            connexion
          </Link>
        </p>
      </div>
    </div>
  );
}
