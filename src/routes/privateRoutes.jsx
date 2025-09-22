import Administration from "../pages/etablissement/Administration";
import AjouterFilieresNiveaux from "../pages/etablissement/AjouterFilieresNiveaux";
import Candidature from "../pages/etablissement/Candidature";
import DashboardEtablis from "../pages/etablissement/DashboardEtablis";
import ImporterFichier from "../pages/etablissement/ImporterFichier";
import MonProfile from "../pages/etablissement/MonProfile";

export const privateRoutes = [
  { path: "/dashboardEtablissement", element: <DashboardEtablis /> },
  { path: "/administration", element: <Administration /> },
  { path: "/candidatures", element: <Candidature /> },
  { path: "/importerFichier", element: <ImporterFichier /> },
  { path: "/mon-profile", element: <MonProfile /> },
  { path: "/crud/fileres/niveaux", element: <AjouterFilieresNiveaux /> },
];
