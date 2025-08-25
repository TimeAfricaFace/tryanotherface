import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import type { Reflection } from '../../types';
import { getElementWisdom } from '../../theme/elements';

interface ReflectionCardProps {
  reflection: Reflection;
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
}

export const ReflectionCard: React.FC<ReflectionCardProps> = ({
  reflection,
  onLike,
  onComment,
}) => {
  const [isLiked, setIsLiked] = useState(reflection.user_has_liked);
  const [likesCount, setLikesCount] = useState(reflection.likes_count);
  const wisdom = getElementWisdom(reflection.element);

  const handleLike = async () => {
    if (onLike) {
      await onLike(reflection.id);
      setIsLiked(!isLiked);
      setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    }
  };

  const handleComment = () => {
    if (onComment) {
      onComment(reflection.id);
    }
  };

  return (
    <Card className="mb-6" hoverable element={reflection.element}>
      {/* Author Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {reflection.author.avatar_url && (
            <img
              src={reflection.author.avatar_url}
              alt={reflection.author.display_name}
              className="h-10 w-10 rounded-full"
            />
          )}
          <div>
            <h4 className="font-semibold text-gray-900">
              {reflection.author.display_name}
            </h4>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(reflection.created_at), { addSuffix: true })}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${wisdom.gradient} text-white shadow-md`}>
            {wisdom.name} • {wisdom.sanskrit}
          </div>
          <button className="p-1 text-gray-400 hover:text-gray-600">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
          {reflection.content_text}
        </p>
      </div>

      {/* Media */}
      {reflection.media_urls && reflection.media_urls.length > 0 && (
        <div className="mb-4">
          <div className="grid gap-2">
            {reflection.media_urls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Media ${index + 1}`}
                className="rounded-lg max-h-96 w-full object-cover"
              />
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleLike}
            className={`flex items-center space-x-2 transition-colors ${
              isLiked ? 'text-red-500' : 'text-gray-500 hover:text-gray-700'
            }`}
            style={{
              color: isLiked ? wisdom.primary : undefined,
            }}
          >
            <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
            <span className="text-sm font-medium">{likesCount}</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleComment}
            className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <MessageCircle size={18} />
            <span className="text-sm font-medium">{reflection.comments_count}</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Share2 size={18} />
            <span className="text-sm font-medium">Share</span>
          </motion.button>
        </div>
      </div>
    </Card>
  );
};