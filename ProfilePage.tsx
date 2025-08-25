import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit2, MapPin, Calendar, Award } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuthContext } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { getElementWisdom } from '../theme/elements';
import type { Reflection, Skill } from '../types';

export const ProfilePage: React.FC = () => {
  const { profile } = useAuthContext();
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile) {
      fetchUserData();
    }
  }, [profile]);

  const fetchUserData = async () => {
    if (!profile) return;

    try {
      // Fetch user's reflections
      const { data: reflectionsData } = await supabase
        .from('reflections')
        .select('*')
        .eq('author_id', profile.id)
        .order('created_at', { ascending: false })
        .limit(6);

      // Fetch user's skills
      const { data: skillsData } = await supabase
        .from('skills')
        .select('*')
        .eq('profile_id', profile.id)
        .order('endorsements', { ascending: false });

      setReflections(reflectionsData || []);
      setSkills(skillsData || []);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <p className="text-gray-600">Profile not found</p>
      </div>
    );
  }

  const wisdom = getElementWisdom(profile.element);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8" element={profile.element}>
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex-shrink-0">
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.display_name}
                  className="h-24 w-24 rounded-full object-cover"
                />
              ) : (
                <div className={`h-24 w-24 rounded-full bg-gradient-to-br ${wisdom.gradient} flex items-center justify-center shadow-lg`}>
                  <span className="text-2xl font-bold text-white">
                    {profile.display_name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  {profile.display_name}
                </h1>
                <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${wisdom.gradient} text-white shadow-md`}>
                  {profile.element.charAt(0).toUpperCase() + profile.element.slice(1)}
                </div>
              </div>
              
              <p className="text-gray-600 mb-2">@{profile.username}</p>
              
              {profile.bio && (
                <p className="text-gray-700 mb-4">{profile.bio}</p>
              )}

              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar size={16} />
                  <span>Joined {new Date(profile.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0">
              <Button variant="secondary" element={profile.element}>
                <Edit2 size={16} className="mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Reflections */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Reflections</h2>
              {reflections.length === 0 ? (
                <Card>
                  <div className="text-center py-12">
                    <p className="text-gray-600 mb-4">No reflections shared yet</p>
                    <Button element={profile.element}>
                      Share Your First Reflection
                    </Button>
                  </div>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {reflections.map((reflection) => (
                    <Card key={reflection.id} hoverable>
                      <div className="mb-3">
                        <p className="text-gray-800 text-sm line-clamp-3">
                          {reflection.content_text}
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{new Date(reflection.created_at).toLocaleDateString()}</span>
                        <div className="flex items-center space-x-2">
                          <span>{reflection.likes_count} likes</span>
                          <span>{reflection.comments_count} comments</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skills */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <Award size={18} className="mr-2" />
                  Skills
                </h3>
                <Button size="sm" variant="ghost" element={profile.element}>
                  Add Skill
                </Button>
              </div>

              {skills.length === 0 ? (
                <p className="text-gray-600 text-sm">No skills added yet</p>
              ) : (
                <div className="space-y-2">
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{skill.skill_name}</p>
                        <p className="text-xs text-gray-500 capitalize">{skill.level}</p>
                      </div>
                      <div className="text-xs text-gray-500">
                        {skill.endorsements} endorsements
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Element Info */}
            <Card element={profile.element}>
              <h3 className="font-semibold text-gray-900 mb-3">Your Elemental Path</h3>
              <div className={`p-4 rounded-lg bg-gradient-to-br ${wisdom.gradient}/10 border border-current`}>
                <h4 className="font-medium text-gray-900 mb-2">
                  {wisdom.name} ({wisdom.sanskrit})
                </h4>
                <p className="text-xs text-gray-500 mb-2">
                  {wisdom.chinese} • {wisdom.direction} • {wisdom.season}
                </p>
                <p className="text-sm text-gray-600">
                  {wisdom.lifePath.purpose}
                </p>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500 italic">
                    "{wisdom.lifePath.lesson}"
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-xs font-medium text-gray-700">Sacred Deity:</p>
                  <p className="text-xs text-gray-600">{wisdom.traditions.vedic.deity}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
