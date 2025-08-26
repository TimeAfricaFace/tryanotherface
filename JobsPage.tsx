import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, DollarSign, Clock, Plus, Search } from 'lucide-react';
import { Card } from './components/ui/Card';
import { Button } from './components/ui/Button';
import { Input } from './components/ui/Input';
import { Modal } from './components/ui/Modal';
import { useAuthContext } from './src/contexts/AuthContext';
import type { Job } from './types';

const sampleJobs: Job[] = [
  {
    id: 'job-1',
    poster_id: 'demo-user-456',
    poster: {
      id: 'demo-user-456',
      email: 'water@tryanotherface.com',
      username: 'water_soul',
      display_name: 'Water Soul',
      bio: 'Flowing with wisdom',
      avatar_url: null,
      element: 'water',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    title: 'Spiritual Life Coach',
    description: 'Seeking an experienced life coach to guide individuals on their spiritual awakening journey. Must have experience with elemental healing and authentic self-discovery practices.',
    skills_required: ['Life Coaching', 'Spiritual Guidance', 'Elemental Healing'],
    location: 'Remote / Global',
    price: 75,
    status: 'open',
    created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: 'job-2',
    poster_id: 'demo-user-789',
    poster: {
      id: 'demo-user-789',
      email: 'earth@tryanotherface.com',
      username: 'earth_keeper',
      display_name: 'Earth Keeper',
      bio: 'Grounded in nature',
      avatar_url: null,
      element: 'earth',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    title: 'Meditation Teacher',
    description: 'Looking for a certified meditation instructor to lead weekly group sessions. Focus on grounding techniques and earth-based mindfulness practices.',
    skills_required: ['Meditation', 'Mindfulness', 'Group Facilitation'],
    location: 'San Francisco, CA',
    price: 50,
    status: 'open',
    created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
];

export const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>(sampleJobs);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { profile } = useAuthContext();

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skills_required.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleApply = (jobId: string) => {
    alert(`Demo: Application sent for job ${jobId}! In the real app, this would send a message to the job poster.`);
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
            Jobs & Opportunities
          </motion.h1>
          <p className="text-gray-600">
            Find meaningful work that aligns with your spiritual journey
          </p>
        </div>

        {/* Search and Create */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search jobs, skills, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            element={profile?.element}
          >
            <Plus size={18} className="mr-2" />
            Post Job
          </Button>
        </div>

        {/* Jobs List */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} hoverable>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Posted by {job.poster.display_name}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-500 to-emerald-500 text-white`}>
                      {job.status === 'open' ? 'Open' : 'Closed'}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills_required.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin size={16} />
                      <span>{job.location}</span>
                    </div>
                    {job.price && (
                      <div className="flex items-center space-x-1">
                        <DollarSign size={16} />
                        <span>${job.price}/hour</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Clock size={16} />
                      <span>{new Date(job.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 md:ml-6">
                  <Button
                    onClick={() => handleApply(job.id)}
                    element={profile?.element}
                    disabled={job.status === 'closed'}
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card className="text-center py-12">
            <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No jobs found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 'Try adjusting your search terms.' : 'Be the first to post a job opportunity.'}
            </p>
            <Button
              onClick={() => setShowCreateModal(true)}
              element={profile?.element}
            >
              Post First Job
            </Button>
          </Card>
        )}
      </div>

      {/* Create Job Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Post a Job"
        maxWidth="lg"
      >
        <div className="space-y-4">
          <Input label="Job Title" placeholder="e.g. Spiritual Life Coach" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Describe the role and requirements..."
            />
          </div>
          <Input label="Location" placeholder="e.g. Remote, San Francisco, CA" />
          <Input label="Hourly Rate (optional)" type="number" placeholder="50" />
          <Input label="Required Skills (comma separated)" placeholder="Life Coaching, Meditation, Healing" />
          
          <div className="flex space-x-3 pt-4">
            <Button
              onClick={() => {
                alert('Demo: Job posted successfully! In the real app, this would save to the database.');
                setShowCreateModal(false);
              }}
              element={profile?.element}
              className="flex-1"
            >
              Post Job
            </Button>
            <Button
              onClick={() => setShowCreateModal(false)}
              variant="secondary"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default JobsPage;
