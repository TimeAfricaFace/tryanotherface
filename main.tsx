import React from "react";
import { createRoot } from "react-dom/client";

// point to files inside /src
import AppRouter from "./src/AppRouter";
import { AuthProvider } from "./src/contexts/AuthContext";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </React.StrictMode>
);
