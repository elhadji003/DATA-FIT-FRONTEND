import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Acceuil from "../pages/home/Acceuil";
import FormPostule from "../pages/etablissement/FormPostule";
import LesEtablissements from "../pages/etablissement/LesEtablissements";
import ForgotPwd from "../pages/auth/ForgotPwd";
import ResetPwd from "../pages/auth/ResetPwd";

export const publicRoutes = [
  { path: "/", element: <Acceuil /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgotpwd", element: <ForgotPwd /> },
  { path: "/reset-password/:id/:uuid/", element: <ResetPwd /> },
  { path: "/les-etablissements", element: <LesEtablissements /> },
  { path: "/postuler/:id", element: <FormPostule /> },
];
