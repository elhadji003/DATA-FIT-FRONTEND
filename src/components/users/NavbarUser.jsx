import React, { useState } from "react";
import { Link } from "react-router-dom";
import BtnLogout from "../auth/BtnLogout";
import { Menu, X } from "lucide-react"; // icônes pour hamburger

export default function NavbarUser() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-600 text-white px-4 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="uppercase font-bold text-2xl animate-pulse">
          Data CFP FIT
        </h1>

        {/* Menu desktop */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            to="dashboardLocaux"
            className="px-4 py-2 rounded-md hover:bg-gray-800"
          >
            Dashboard
          </Link>
          <Link
            to="administration"
            className="px-4 py-2 rounded-md hover:bg-gray-800"
          >
            Administration
          </Link>
          <Link
            to="candidatures"
            className="px-4 py-2 rounded-md hover:bg-gray-800"
          >
            Candidature
          </Link>
          <Link
            to="importerFichier"
            className="px-4 py-2 rounded-md hover:bg-gray-800"
          >
            Importer
          </Link>
          <BtnLogout />
        </div>

        {/* Hamburger mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden flex flex-col mt-2 gap-2">
          <Link
            to="dashboardLocaux"
            className="px-4 py-2 rounded-md hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="administration"
            className="px-4 py-2 rounded-md hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Administration
          </Link>
          <Link
            to="candidatures"
            className="px-4 py-2 rounded-md hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Candidature
          </Link>
          <Link
            to="importerFichier"
            className="px-4 py-2 rounded-md hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Importer
          </Link>
          <BtnLogout />
        </div>
      )}
    </nav>
  );
}
