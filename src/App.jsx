import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppNavigation from "./routes/AppNavigation";

export default function App() {
  return (
    <Router>
      <AppNavigation />
    </Router>
  );
}
