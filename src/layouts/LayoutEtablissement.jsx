import React from "react";
import NavbarEtablissement from "../components/users/NavbarEtablissement";
import { Outlet } from "react-router-dom";
import Header from "../components/global/Header";

export default function LayoutEtablissement() {
  return (
    <div>
      <NavbarEtablissement />
      <Header />
      <main className="px-4">
        <Outlet />
      </main>
    </div>
  );
}
