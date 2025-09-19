import React from "react";

export default function StepLoading({ showLoading }) {
  if (!showLoading) return null; // rien n'affiche si false

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto flex flex-col items-center justify-center border-t-8 border-gray-600">
      <svg
        className="animate-spin h-10 w-10 text-gray-600 mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <p className="text-gray-700 font-medium">Traitement en cours...</p>
    </div>
  );
}
