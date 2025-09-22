import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Acceuil from "../pages/home/Acceuil";
import FormPostule from "../pages/etablissement/FormPostule";
import LesEtablissements from "../pages/etablissement/LesEtablissements";

export const publicRoutes = [
  { path: "/", element: <Acceuil /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/les-etablissements", element: <LesEtablissements /> },
  { path: "/postuler/:id", element: <FormPostule /> },
];
