import React from "react";
import NavbarUser from "../components/users/NavbarUser";
import { Outlet } from "react-router-dom";
import Header from "../components/global/Header";

export default function LayoutUser() {
  return (
    <div>
      <NavbarUser />
      <Header />
      <main className="px-4">
        <Outlet />
      </main>
    </div>
  );
}
