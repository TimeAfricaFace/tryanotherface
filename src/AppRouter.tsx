import Layout from '../Layout';

import OnboardingPage   from './pages/OnboardingPage';
import FeedPage         from './pages/FeedPage';
import ProfilePage      from './pages/ProfilePage';
import JobsPage         from './pages/JobsPage';
import HousingPage      from './pages/HousingPage';
import MarketplacePage  from './pages/MarketplacePage';
import SettingsPage     from './pages/SettingsPage';

import { useAuthContext } from './contexts/AuthContext';
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/onboarding" replace />;
  }

  if (!profile) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (user && profile) {
    return <Navigate to="/feed" replace />;
  }

  return <>{children}</>;
};

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <PublicRoute>
                <OnboardingPage />
              </PublicRoute>
            }
          />
          <Route
            path="/onboarding"
            element={
              <PublicRoute>
                <OnboardingPage />
              </PublicRoute>
            }
          />
          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <FeedPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs"
            element={
              <ProtectedRoute>
                <JobsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/housing"
            element={
              <ProtectedRoute>
                <HousingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/marketplace"
            element={
              <ProtectedRoute>
                <MarketplacePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};
export default AppRouter;
