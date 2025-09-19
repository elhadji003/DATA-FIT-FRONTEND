import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 mt-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
        
        {/* Gauche - Branding */}
        <div className="text-center md:text-left max-w-sm">
          <h2 className="text-xl font-bold mb-3">Piod ~ Dev</h2>
          <p className="text-gray-400 text-sm">
            Abonnez-vous à notre newsletter pour recevoir des mises à jour
            régulières. <br />
            Zéro spam, promis.
          </p>
        </div>

        {/* Droite - Newsletter */}
        <div className="w-full max-w-md">
          <form className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="email"
              placeholder="Votre adresse e-mail"
              className="w-full flex-1 px-4 py-2 border border-gray-400 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400  "
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
            >
              S'abonner
            </button>
          </form>
        </div>
      </div>

      {/* Texte en bas */}
      <div className="text-center text-gray-500 text-sm mt-8">
        © {new Date().getFullYear()} Piod. Tous droits réservés.
      </div>
    </footer>
  );
}
