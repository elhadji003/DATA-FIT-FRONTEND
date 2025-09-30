import {
  Archive,
  BellIcon,
  Edit,
  Mail,
  User2,
  Users2,
  Menu,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Notifications from "./Notifications";
import { useGetEtablisProfileQuery } from "../../backend/features/etablissement/etablisAPI";

export default function Header() {
  const user = useSelector((state) => state.auth.user);
  const { data: profileEtablissement } = useGetEtablisProfileQuery();

  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
    return <Loader />;
  }

  const iconClass =
    "bg-gray-800 px-2 py-1 rounded-md cursor-pointer transform transition-transform duration-200 hover:scale-110";

  return (
    <div className="mt-4 bg-gradient-to-l from-gray-700 to-gray-500 p-4 text-white rounded-md m-4">
      <div className="flex justify-between items-center">
        {/* Left: User info */}
        <div className="flex items-center gap-4">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.full_name || user.email}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-xl">
              {user.prenom?.[0] || user.email[0]}
            </div>
          )}

          <div className="flex flex-col">
            <p className="font-semibold">{profileEtablissement?.nom_etablissement}</p>
            <p className="text-sm mb-1">Email: {user.email}</p>
            <Link to={`mon-profile`} className="hidden sm:inline-block">
              <Edit size={20} />
            </Link>
          </div>
        </div>

        {/* Right: Icons */}
        <div className="hidden md:flex items-center gap-4">
          <span className={iconClass}>
            <Notifications etabId={profileEtablissement?.id} />
          </span>
          <span>|</span>
          <span className={iconClass}>
            <Link to={"listeEtudiants"}>
              <User2 />
            </Link>
          </span>
          <span className={iconClass}>
            <Link to={"listePersonnels"}>
              <Users2 />
            </Link>
          </span>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col mt-2 gap-2">
          <Link
            to={`mon-profile`}
            className="flex items-center gap-2 px-2 py-1 hover:bg-gray-800 rounded-md"
          >
            <Edit size={20} /> Mon profil
          </Link>
          <div className="flex gap-2">
            <span className={iconClass}>
              <Notifications etabId={user.id} />
            </span>
            <span>|</span>
            <span className={iconClass}>
              <User2 />
            </span>
            <span className={iconClass}>
              <Users2 />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
