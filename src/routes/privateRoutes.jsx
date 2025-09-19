import Administration from "../pages/locaux/Administration";
import Candidature from "../pages/locaux/Candidature";
import DashboardLocaux from "../pages/locaux/DashboardLocaux";
import ImporterFichier from "../pages/locaux/ImporterFichier";
import MonProfile from "../pages/locaux/MonProfile";

export const privateRoutes = [
  { path: "/dashboardLocaux", element: <DashboardLocaux /> },
  { path: "/administration", element: <Administration /> },
  { path: "/candidatures", element: <Candidature /> },
  { path: "/importerFichier", element: <ImporterFichier /> },
  { path: "/mon-profile", element: <MonProfile /> },
];
