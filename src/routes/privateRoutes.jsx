import Administration from "../pages/etablissement/Administration";
import AjouterEtudiant from "../pages/etablissement/AjouterEtudiant";
import AjouterFilieresNiveaux from "../pages/etablissement/AjouterFilieresNiveaux";
import Candidature from "../pages/etablissement/Candidature";
import DashboardEtablis from "../pages/etablissement/DashboardEtablis";
import DetailsEtudiant from "../pages/etablissement/DetailsEtudiant";
import ImporterFichier from "../pages/etablissement/ImporterFichier";
import ListeEtudiants from "../pages/etablissement/ListeEtudiants";
import ListePersonnels from "../pages/etablissement/ListePersonnels";
import MonProfile from "../pages/etablissement/MonProfile";

export const privateRoutes = [
  { path: "/dashboardEtablissement", element: <DashboardEtablis /> },
  { path: "/administration", element: <Administration /> },
  { path: "/candidatures", element: <Candidature /> },
  { path: "/importerFichier", element: <ImporterFichier /> },
  { path: "/mon-profile", element: <MonProfile /> },
  { path: "/crud/fileres/niveaux", element: <AjouterFilieresNiveaux /> },
  { path: "/listeEtudiants", element: <ListeEtudiants /> },
  { path: "/listePersonnels", element: <ListePersonnels /> },
  { path: "/ajouterEtudiant", element: <AjouterEtudiant /> },
  { path: "/etudiant/:id", element: <DetailsEtudiant /> },
];
