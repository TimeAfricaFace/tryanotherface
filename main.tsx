import React from "react";
import { createRoot } from "react-dom/client";

// ✅ no need for "./src", just point directly
import AppRouter from "./AppRouter";
import { AuthProvider } from "./contexts/AuthContext";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </React.StrictMode>
);
