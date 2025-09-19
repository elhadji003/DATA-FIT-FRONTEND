import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../backend/features/auth/authAPI";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../backend/features/auth/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const crendentials = { email, password };

    try {
      const res = await loginUser(crendentials).unwrap();

      console.log("Response", res);
      

      dispatch(setCredentials(res));

      console.log("Utilisateur connecté ✅ :", res);

      // ici tu peux stocker le token si nécessaire
      // localStorage.setItem("token", res.access);

      navigate("/dashboardLocaux"); // redirection après login
    } catch (error) {
      console.error("Erreur de connexion ❌ :", error);
      alert("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border-t-8 border-gray-600">
        {/* Titre */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Se connecter
        </h1>

        {/* Formulaire */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              value={email}
              type="email"
              placeholder="Votre email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-600 outline-none"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Mot de passe
            </label>
            <input
              value={password}
              type="password"
              placeholder="Votre mot de passe"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-600 outline-none"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <Link to="/forgotpwd" className="text-gray-600 hover:underline">
              Mot de passe oublié ?
            </Link>
          </div>

          {/* Bouton */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white py-2 rounded-lg font-semibold transition ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            {isLoading ? "Connexion..." : "Connexion"}
          </button>
        </form>

        {/* Lien inscription */}
        <p className="text-gray-600 text-sm mt-6">
          Pas encore de compte ?{" "}
          <Link to="/register" className="text-gray-600 hover:underline">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}
