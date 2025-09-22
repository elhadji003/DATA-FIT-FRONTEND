import React from "react";

export default function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center w-full h-full py-10">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-[#2c3e50] rounded-full animate-spin"></div>
    </div>
  );
}
