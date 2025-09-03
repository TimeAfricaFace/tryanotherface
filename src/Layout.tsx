// src/Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import { useAuthContext } from "./contexts/AuthContext"; // ← correct path

const Layout: React.FC = () => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      {user && <Navigation />}
      <main className={user ? "pt-16" : ""}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
