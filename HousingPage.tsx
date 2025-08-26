import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, MapPin, DollarSign, Calendar, Plus, Search, Filter } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from './components/ui/Button';
import { Input } from './components/ui/Input';
import { Modal } from './components/ui/Modal';
import { useAuthContext } from './contexts/AuthContext';
import type { HousingListing } from './types';

const sampleListings: HousingListing[] = [
  {
    id: 'house-1',
    lister_id: 'demo-user-456',
    lister: {
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
    title: 'Peaceful Meditation Retreat Space',
    description: 'Beautiful 2-bedroom cottage surrounded by nature. Perfect for spiritual practitioners seeking a quiet space for meditation and reflection. Includes meditation garden and crystal healing room.',
    location: 'Sedona, Arizona',
    price: 1200,
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    element_tag: 'water',
    coordinates: { lat: 34.8697, lng: -111.7610 },
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'house-2',
    lister_id: 'demo-user-789',
    lister: {
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
    title: 'Urban Sanctuary Loft',
    description: 'Modern loft in the heart of the city with rooftop garden and yoga studio. Ideal for earth-element practitioners who want to stay connected to nature while in an urban environment.',
    location: 'Portland, Oregon',
    price: 1800,
    images: [
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    element_tag: 'earth',
    coordinates: { lat: 45.5152, lng: -122.6784 },
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
];

export const HousingPage: React.FC = () => {
  const [listings, setListings] = useState<HousingListing[]>(sampleListings);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedElement, setSelectedElement] = useState<string>('all');
  const { profile } = useAuthContext();

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesElement = selectedElement === 'all' || listing.element_tag === selectedElement;
    
    return matchesSearch && matchesElement;
  });

  const handleContact = (listingId: string) => {
    alert(`Demo: Message sent to listing owner! In the real app, this would open a private messaging thread.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 pb-20 md:pb-8">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 mb-2"
          >
            Sacred Spaces
          </motion.h1>
          <p className="text-gray-600">
            Find housing that supports your spiritual journey
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search by location, title, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedElement}
              onChange={(e) => setSelectedElement(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Elements</option>
              <option value="fire">Fire</option>
              <option value="water">Water</option>
              <option value="air">Air</option>
              <option value="earth">Earth</option>
            </select>
            
            <Button
              onClick={() => setShowCreateModal(true)}
              element={profile?.element}
            >
              <Plus size={18} className="mr-2" />
              List Space
            </Button>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Card key={listing.id} hoverable className="overflow-hidden">
              {/* Image */}
              <div className="aspect-video bg-gray-200 mb-4 rounded-lg overflow-hidden">
                {listing.images.length > 0 ? (
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Home size={48} className="text-gray-400" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {listing.title}
                  </h3>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-${listing.element_tag === 'fire' ? 'orange' : listing.element_tag === 'water' ? 'blue' : listing.element_tag === 'air' ? 'indigo' : 'green'}-500 to-${listing.element_tag === 'fire' ? 'red' : listing.element_tag === 'water' ? 'teal' : listing.element_tag === 'air' ? 'blue' : 'emerald'}-500 text-white`}>
                    {listing.element_tag?.charAt(0).toUpperCase() + listing.element_tag?.slice(1)}
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {listing.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin size={16} />
                    <span>{listing.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign size={16} />
                    <span>${listing.price}/month</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Listed {new Date(listing.created_at).toLocaleDateString()}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => handleContact(listing.id)}
                    element={profile?.element}
                  >
                    Contact
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <Card className="text-center py-12">
            <Home size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No listings found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedElement !== 'all' 
                ? 'Try adjusting your search or filters.' 
                : 'Be the first to list a sacred space.'}
            </p>
            <Button
              onClick={() => setShowCreateModal(true)}
              element={profile?.element}
            >
              List First Space
            </Button>
          </Card>
        )}
      </div>

      {/* Create Listing Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="List Your Sacred Space"
        maxWidth="lg"
      >
        <div className="space-y-4">
          <Input label="Title" placeholder="e.g. Peaceful Meditation Retreat Space" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Describe your space and what makes it special..."
            />
          </div>
          <Input label="Location" placeholder="e.g. Sedona, Arizona" />
          <Input label="Monthly Rent" type="number" placeholder="1200" />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Element Tag
            </label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option value="fire">Fire</option>
              <option value="water">Water</option>
              <option value="air">Air</option>
              <option value="earth">Earth</option>
            </select>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button
              onClick={() => {
                alert('Demo: Listing created successfully! In the real app, this would save to the database.');
                setShowCreateModal(false);
              }}
              element={profile?.element}
              className="flex-1"
            >
              List Space
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
export default HousingPage;
