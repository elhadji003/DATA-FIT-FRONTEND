import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useChangePasswordMutation } from "../../backend/features/auth/authAPI";

const ChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      await changePassword(data).unwrap();
      toast.success("Mot de passe modifié avec succès");
      reset();
    } catch (err) {
      if (err?.data?.old_password) {
        toast.error(err.data.old_password);
      } else if (err?.data?.new_password) {
        toast.error(err.data.new_password[0]);
      } else {
        toast.error("Erreur lors du changement de mot de passe");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-md m-auto"
    >
      <div>
        <label className="float-start">Ancien mot de passe</label>
        <input
          type={showPassword ? "text" : "password"}
          {...register("old_password", { required: "Champ requis" })}
          className="w-full p-3 border rounded-xl outline-none"
        />
        {errors.old_password && (
          <p className="text-red-500 text-sm">{errors.old_password.message}</p>
        )}
      </div>

      <div>
        <label className="float-start">Nouveau mot de passe</label>
        <input
          type={showPassword ? "text" : "password"}
          {...register("new_password", { required: "Champ requis" })}
          className="w-full p-3 border rounded-xl outline-none"
        />
        {errors.new_password && (
          <p className="text-red-500 text-sm">{errors.new_password.message}</p>
        )}
      </div>

      <div className="text-start space-x-4">
        <input
          type="checkbox"
          id="showPassword"
          checked={showPassword}
          className="text-gray-600"
          onChange={() => setShowPassword((prev) => !prev)}
        />
        <label htmlFor="showPassword">Afficher le mot de passe</label>
      </div>

      <button
        type="submit"
        className={`w-full bg-gray-800 text-white py-3 rounded-xl flex justify-center items-center`}
      >
        {isLoading ? (
          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        ) : (
          "Changer le mot de passe"
        )}
      </button>
    </form>
  );
};

export default ChangePasswordForm;
