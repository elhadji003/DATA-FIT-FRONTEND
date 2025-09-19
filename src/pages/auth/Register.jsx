import React, { useState } from "react";
import StepInformation from "../../components/steps/StepInformation";
import StepLoading from "../../components/steps/StepLoading";
import { useForm, FormProvider } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../backend/features/auth/authAPI";

export default function Register() {
  const methods = useForm({ mode: "onTouched" });
  const { handleSubmit } = methods;

  const [registerUser] = useRegisterMutation();

  const [photoPreview, setPhotoPreview] = useState(null);
  const [showLoading, setShowLoading] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const navigate = useNavigate();

  // Soumission du formulaire
  const onSubmit = async (data) => {
    setShowLoading(true);

    try {
      // Préparer les données du formulaire
      const formData = new FormData();
      formData.append("prenom", data.prenom);
      formData.append("nom", data.nom);
      formData.append("nom_tablissement", data.companyName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);

      if (data.photo && data.photo[0]) {
        formData.append("photo", data.photo[0]);
      }

      // envoi API
      const res = await registerUser(formData).unwrap();
      console.log("User registered successfully:", res);
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      setShowLoading(false);
      return;
    }

    // simuler attente API
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setShowLoading(false);
    alert("Inscription terminée ✅");
    navigate("/dashboardLocaux");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <FormProvider {...methods}>
        {showLoading ? (
          <StepLoading showLoading={showLoading} />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl">
            <StepInformation
              onPhotoChange={handlePhotoChange}
              photoPreview={photoPreview}
            />

            <div className="flex items-center justify-between mt-8">
              <p className="text-gray-600 text-sm">
                Pas encore de compte ?{" "}
                <Link to="/login" className="text-gray-600 hover:underline">
                  Se Connecter
                </Link>
              </p>
              <button
                type="submit"
                disabled={showLoading}
                className={`px-4 py-2 rounded-md text-white ${
                  showLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gray-800 hover:bg-gray-800"
                }`}
              >
                {showLoading ? "Traitement..." : "Inscrire"}
              </button>
            </div>
          </form>
        )}
      </FormProvider>
    </div>
  );
}
