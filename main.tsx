import React from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./AppRouter";   // ✅ FIXED
import { AuthProvider } from "./contexts/AuthContext";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </React.StrictMode>
);
