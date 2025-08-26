import ReflectionCard from './components/reflections/ReflectionCard';
import ReflectionForm from './ReflectionForm';
import { Button } from './components/ui/Button';
import { Modal } from './components/ui/Modal';
import { Card } from './components/ui/Card';
import { supabase } from './lib/supabase';
import { useAuthContext } from './contexts/AuthContext';
import type { Reflection, Element } from './types';
const elementFilters = [
  { value: 'all', label: 'All Elements', color: 'gray' },
  { value: 'fire', label: 'Fire', color: 'orange' },
  { value: 'water', label: 'Water', color: 'blue' },
  { value: 'air', label: 'Air', color: 'indigo' },
  { value: 'earth', label: 'Earth', color: 'green' },
];

export const FeedPage: React.FC = () => {
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { profile } = useAuthContext();

  useEffect(() => {
    fetchReflections();
  }, [selectedFilter]);

  const fetchReflections = async () => {
    try {
      let query = supabase
        .from('reflections')
        .select(`
          *,
          author:profiles(*)
        `)
        .eq('visibility', 'public')
        .order('created_at', { ascending: false });

      if (selectedFilter !== 'all') {
        query = query.eq('element', selectedFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Transform data to match our types
      const transformedReflections: Reflection[] = data.map((item: any) => ({
        ...item,
        likes_count: 0, // We'll implement this later
        comments_count: 0, // We'll implement this later
        user_has_liked: false, // TODO: Check if current user has liked
      }));

      setReflections(transformedReflections);
    } catch (error) {
      console.error('Error fetching reflections:', error);
      // Set empty array on error to show "no reflections" message
      setReflections([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (reflectionId: string) => {
    if (!profile) return;

    try {
      // Check if already liked
      const { data: existingLike } = await supabase
        .from('likes')
        .select('id')
        .eq('user_id', profile.id)
        .eq('reflection_id', reflectionId)
        .single();

      if (existingLike) {
        // Unlike
        await supabase
          .from('likes')
          .delete()
          .eq('user_id', profile.id)
          .eq('reflection_id', reflectionId);
      } else {
        // Like
        await supabase
          .from('likes')
          .insert({
            user_id: profile.id,
            reflection_id: reflectionId,
          });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleComment = (reflectionId: string) => {
    // TODO: Navigate to reflection detail with comments
    console.log('Comment on reflection:', reflectionId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 pb-20 md:pb-8">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 mb-2"
          >
            Reflections Feed
          </motion.h1>
          <p className="text-gray-600">
            Discover authentic moments from your community
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6" padding="sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter size={18} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter by element:</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {elementFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedFilter === filter.value
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </Card>

        {/* Create Reflection */}
        <ReflectionForm onSuccess={() => fetchReflections()} />

        {/* Reflections */}
        <div>
          {reflections.length === 0 ? (
            <Card className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No reflections yet
              </h3>
              <p className="text-gray-600 mb-6">
                Be the first to share your authentic self with the community.
              </p>
              <Button
                onClick={() => setShowCreateModal(true)}
                element={profile?.element}
              >
                <Plus size={18} className="mr-2" />
                Create First Reflection
              </Button>
            </Card>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {reflections.map((reflection) => (
                <motion.div
                  key={reflection.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <ReflectionCard
                    reflection={reflection}
                    onLike={handleLike}
                    onComment={handleComment}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile Create Button */}
      <button
        onClick={() => setShowCreateModal(true)}
        className="md:hidden fixed bottom-20 right-4 z-30 bg-purple-500 hover:bg-purple-600 text-white rounded-full p-4 shadow-lg transition-colors"
      >
        <Plus size={24} />
      </button>

      {/* Create Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Share a Reflection"
        maxWidth="lg"
      >
        <ReflectionForm
          onSuccess={() => {
            setShowCreateModal(false);
            fetchReflections();
          }}
        />
      </Modal>
    </div>
  );
};
export default FeedPage;
