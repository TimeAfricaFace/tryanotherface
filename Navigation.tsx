import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, MapPin, ShoppingBag, Settings, LogOut } from 'lucide-react';
import { useAuthContext } from '../../contexts/AuthContext';
import { getElementStyles } from '../../theme/colors';

const navItems = [
  { path: '/feed', icon: Home, label: 'Feed' },
  { path: '/profile', icon: User, label: 'Profile' },
  { path: '/jobs', icon: Briefcase, label: 'Jobs' },
  { path: '/housing', icon: MapPin, label: 'Housing' },
  { path: '/marketplace', icon: ShoppingBag, label: 'Marketplace' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export const Navigation: React.FC = () => {
  const location = useLocation();
  const { profile, signOut } = useAuthContext();
  
  const elementStyles = profile?.element ? getElementStyles(profile.element) : null;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/feed" className="flex items-center space-x-2">
            <img 
              src="/file_000000009c24624693dc549194d4cb7a.png" 
              alt="Try Another Face" 
              className="h-10 w-auto"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? elementStyles
                          ? `bg-gradient-to-r ${elementStyles.gradient} text-white`
                          : 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              {profile?.avatar_url && (
                <img
                  src={profile.avatar_url}
                  alt={profile.display_name}
                  className="h-8 w-8 rounded-full"
                />
              )}
              <span className="hidden md:block text-sm font-medium text-gray-700">
                {profile?.display_name}
              </span>
            </div>
            
            <button
              onClick={handleSignOut}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-5 gap-1 p-2">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center py-2 px-1 rounded-lg ${
                  isActive
                    ? elementStyles
                      ? `bg-gradient-to-r ${elementStyles.gradient} text-white`
                      : 'bg-gray-900 text-white'
                    : 'text-gray-400'
                }`}
              >
                <Icon size={20} />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};