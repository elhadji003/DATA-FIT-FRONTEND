import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetApp } from "../../backend/features/auth/resetActions";
import { useLogoutMutation } from "../../backend/features/auth/authAPI";
import { LogOutIcon } from "lucide-react";

const BtnLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutBackend] = useLogoutMutation();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutBackend().unwrap();
      await dispatch(resetApp());
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <div>
      {/* Bouton logout */}
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 rounded text-sm flex items-center gap-2 hover:bg-red-500"
      >
        <LogOutIcon className="w-4 h-4" />
        Déconnexion
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4 text-black">
              Êtes-vous sûr de vouloir vous déconnecter ?
            </h2>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Annuler
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Oui, déconnecter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BtnLogout;
