import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Palette, Download, Trash2, Save } from 'lucide-react';
import { Card } from './components/ui/Card';
import { Button } from './components/ui/Button';
import { Input } from './components/ui/Input';
import { useAuthContext } from './contexts/AuthContext';

export const SettingsPage: React.FC = () => {
  const { profile, signOut } = useAuthContext();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    displayName: profile?.display_name || '',
    bio: profile?.bio || '',
    email: profile?.email || '',
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  const handleSave = () => {
    alert('Demo: Settings saved successfully! In the real app, this would update your profile in the database.');
  };

  const handleExportData = () => {
    alert('Demo: Data export initiated! In the real app, this would generate a downloadable file with all your data.');
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Demo: Account deletion initiated! In the real app, this would permanently delete your account and all data.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 mb-2"
          >
            Settings
          </motion.h1>
          <p className="text-gray-600">
            Manage your account and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card padding="sm">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-purple-100 text-purple-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={18} />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className={`h-16 w-16 rounded-full bg-gradient-to-br from-${profile?.element === 'fire' ? 'orange' : profile?.element === 'water' ? 'blue' : profile?.element === 'air' ? 'indigo' : 'green'}-500 to-${profile?.element === 'fire' ? 'red' : profile?.element === 'water' ? 'teal' : profile?.element === 'air' ? 'blue' : 'emerald'}-500 flex items-center justify-center`}>
                      <span className="text-xl font-bold text-white">
                        {profile?.display_name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{profile?.display_name}</h3>
                      <p className="text-gray-600">@{profile?.username}</p>
                      <p className="text-sm text-gray-500 capitalize">{profile?.element} Element</p>
                    </div>
                  </div>

                  <Input
                    label="Display Name"
                    value={formData.displayName}
                    onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                  />

                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      rows={4}
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Tell others about your spiritual journey..."
                    />
                  </div>

                  <Button onClick={handleSave} element={profile?.element}>
                    <Save size={18} className="mr-2" />
                    Save Changes
                  </Button>
                </div>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Reflection Comments</h3>
                      <p className="text-sm text-gray-600">Get notified when someone comments on your reflections</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Job Applications</h3>
                      <p className="text-sm text-gray-600">Get notified when someone applies to your job postings</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Housing Inquiries</h3>
                      <p className="text-sm text-gray-600">Get notified about housing listing inquiries</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Marketplace Orders</h3>
                      <p className="text-sm text-gray-600">Get notified about marketplace purchases and sales</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>

                  <Button onClick={handleSave} element={profile?.element}>
                    Save Preferences
                  </Button>
                </div>
              </Card>
            )}

            {activeTab === 'privacy' && (
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Privacy & Data</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Profile Visibility</h3>
                      <p className="text-sm text-gray-600">Make your profile visible to other users</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Show Element</h3>
                      <p className="text-sm text-gray-600">Display your elemental identity on your profile</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-medium text-gray-900 mb-4">Data Management</h3>
                    
                    <div className="space-y-3">
                      <Button
                        onClick={handleExportData}
                        variant="secondary"
                        className="w-full justify-start"
                      >
                        <Download size={18} className="mr-2" />
                        Export My Data
                      </Button>

                      <Button
                        onClick={handleDeleteAccount}
                        variant="secondary"
                        className="w-full justify-start text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={18} className="mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'appearance' && (
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Appearance</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Current Element Theme</h3>
                    <div className={`p-4 rounded-lg bg-gradient-to-br from-${profile?.element === 'fire' ? 'orange' : profile?.element === 'water' ? 'blue' : profile?.element === 'air' ? 'indigo' : 'green'}-500 to-${profile?.element === 'fire' ? 'red' : profile?.element === 'water' ? 'teal' : profile?.element === 'air' ? 'blue' : 'emerald'}-500 text-white`}>
                      <h4 className="font-semibold capitalize">{profile?.element} Element</h4>
                      <p className="text-sm opacity-90">
                        Your interface is themed with {profile?.element} colors and energy
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Font Size</h3>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option>Small</option>
                      <option selected>Medium</option>
                      <option>Large</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Reduce Motion</h3>
                      <p className="text-sm text-gray-600">Minimize animations and transitions</p>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>

                  <Button onClick={handleSave} element={profile?.element}>
                    Save Appearance Settings
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;
