import React from "react";
import { publicRoutes } from "./publicRoutes";
import { Route, Routes } from "react-router-dom";
import { privateRoutes } from "./privateRoutes";
import ProtectRoute from "../components/auth/ProctectRoute";
import LayoutEtablissement from "../layouts/LayoutEtablissement";

export default function AppNavigation() {
  return (
    <Routes>
      {publicRoutes.map(({ path, index, element }, i) => (
        <Route key={i} path={path} index={index} element={element} />
      ))}
      <Route
        element={
          <ProtectRoute allowedRole={["etablissement"]}>
            <LayoutEtablissement />
          </ProtectRoute>
        }
      >
        {privateRoutes.map(({ path, index, element }, i) => (
          <Route key={i} path={path} index={index} element={element} />
        ))}
      </Route>
    </Routes>
  );
}
