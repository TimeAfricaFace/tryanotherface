import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, DollarSign, Clock, Plus, Search, Heart } from 'lucide-react';

import { Card } from './components/ui/Card';
import { Button } from './components/ui/Button';
import { Input } from './components/ui/Input';
import { Modal } from './components/ui/Modal';

import { useAuthContext } from './contexts/AuthContext';
interface MarketplaceItem {
  id: string;
  seller_id: string;
  seller: {
    display_name: string;
    element: 'fire' | 'water' | 'air' | 'earth';
  };
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  rating: number;
  reviews_count: number;
  created_at: string;
}

const sampleItems: MarketplaceItem[] = [
  {
    id: 'item-1',
    seller_id: 'demo-user-456',
    seller: {
      display_name: 'Water Soul',
      element: 'water',
    },
    title: 'Handcrafted Crystal Healing Set',
    description: 'Beautiful collection of healing crystals including amethyst, rose quartz, and clear quartz. Each crystal has been cleansed and charged under the full moon.',
    price: 89.99,
    images: [
      'https://images.pexels.com/photos/1121123/pexels-photo-1121123.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Crystals & Healing',
    rating: 4.8,
    reviews_count: 24,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'item-2',
    seller_id: 'demo-user-789',
    seller: {
      display_name: 'Earth Keeper',
      element: 'earth',
    },
    title: 'Organic Sage Smudging Bundle',
    description: 'Sustainably harvested white sage bundle perfect for cleansing spaces and spiritual rituals. Grown with love on our sacred land.',
    price: 15.99,
    images: [
      'https://images.pexels.com/photos/6663574/pexels-photo-6663574.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Spiritual Tools',
    rating: 4.9,
    reviews_count: 67,
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 'item-3',
    seller_id: 'demo-user-101',
    seller: {
      display_name: 'Fire Spirit',
      element: 'fire',
    },
    title: 'Meditation Cushion - Fire Element',
    description: 'Handwoven meditation cushion in warm fire colors. Filled with organic buckwheat hulls for perfect support during long meditation sessions.',
    price: 45.00,
    images: [
      'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Meditation',
    rating: 4.7,
    reviews_count: 18,
    created_at: new Date(Date.now() - 259200000).toISOString(),
  },
];

export const MarketplacePage: React.FC = () => {
  const [items, setItems] = useState<MarketplaceItem[]>(sampleItems);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { profile } = useAuthContext();

  const categories = ['all', 'Crystals & Healing', 'Spiritual Tools', 'Meditation', 'Books', 'Art'];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handlePurchase = (itemId: string, price: number) => {
    alert(`Demo: Initiating Stripe checkout for $${price}! In the real app, this would redirect to Stripe payment page.`);
  };

  const handleAddToWishlist = (itemId: string) => {
    alert(`Demo: Added to wishlist! In the real app, this would save to your favorites.`);
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
            Sacred Marketplace
          </motion.h1>
          <p className="text-gray-600">
            Discover spiritual tools, crystals, and handcrafted items from our community
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search for spiritual items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            
            <Button
              onClick={() => setShowCreateModal(true)}
              element={profile?.element}
            >
              <Plus size={18} className="mr-2" />
              Sell Item
            </Button>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} hoverable className="overflow-hidden">
              {/* Image */}
              <div className="aspect-square bg-gray-200 mb-4 rounded-lg overflow-hidden relative">
                {item.images.length > 0 ? (
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag size={48} className="text-gray-400" />
                  </div>
                )}
                <button
                  onClick={() => handleAddToWishlist(item.id)}
                  className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                >
                  <Heart size={16} className="text-gray-600" />
                </button>
              </div>

              {/* Content */}
              <div>
                <div className="mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    by {item.seller.display_name}
                  </p>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center mb-3">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={`${
                          i < Math.floor(item.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {item.rating} ({item.reviews_count})
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <DollarSign size={18} className="text-green-600" />
                    <span className="text-xl font-bold text-green-600">
                      {item.price}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handlePurchase(item.id, item.price)}
                    element={profile?.element}
                  >
                    Buy Now
                  </Button>
                </div>

                <div className="mt-2">
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    {item.category}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <Card className="text-center py-12">
            <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No items found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or category filter.' 
                : 'Be the first to list an item in our marketplace.'}
            </p>
            <Button
              onClick={() => setShowCreateModal(true)}
              element={profile?.element}
            >
              List First Item
            </Button>
          </Card>
        )}
      </div>

      {/* Create Item Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="List Your Item"
        maxWidth="lg"
      >
        <div className="space-y-4">
          <Input label="Item Title" placeholder="e.g. Handcrafted Crystal Healing Set" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Describe your item and its spiritual properties..."
            />
          </div>
          <Input label="Price" type="number" placeholder="89.99" />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              {categories.slice(1).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button
              onClick={() => {
                alert('Demo: Item listed successfully! In the real app, this would save to the database and set up Stripe product.');
                setShowCreateModal(false);
              }}
              element={profile?.element}
              className="flex-1"
            >
              List Item
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
export default MarketplacePage;
