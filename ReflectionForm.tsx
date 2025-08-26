import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Image, Video, Mic, X } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useAuthContext } from '../../contexts/AuthContext';
import { supabase } from '../supabase';
import { getElementWisdom } from '../../theme/elements';
import type { Element } from '../../types';

const schema = yup.object({
  content: yup.string().required('Please share your reflection'),
  visibility: yup.string().oneOf(['public', 'private']).required(),
});

interface ReflectionFormProps {
  onSuccess?: () => void;
}

const reflectionPrompts = [
  "What mask did you wear today that you're ready to let go of?",
  "How did your element guide you through a recent challenge?",
  "What truth about yourself are you discovering?",
  "Share a moment when you felt most authentic today.",
  "What would your younger self think of who you're becoming?",
];

// Enhanced spiritual prompts based on elemental wisdom
const getElementalPrompts = (element: Element) => {
  const wisdom = getElementWisdom(element);
  const basePrompts = [
    `How did your ${wisdom.name} element guide you through a recent challenge?`,
    `What truth about yourself are you discovering on your ${wisdom.name} path?`,
    `Share a moment when you embodied the essence of ${wisdom.sanskrit} today.`,
    `How are you living your ${wisdom.name} element's purpose: "${wisdom.lifePath.purpose}"?`,
    `What wisdom from the ${wisdom.direction} direction speaks to you now?`,
  ];
  return [...basePrompts, ...reflectionPrompts];
};
export const ReflectionForm: React.FC<ReflectionFormProps> = ({ onSuccess }) => {
  const { profile } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [currentPrompt] = useState(() => {
    const prompts = profile ? getElementalPrompts(profile.element) : reflectionPrompts;
    return prompts[Math.floor(Math.random() * prompts.length)];
  }
  );

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      visibility: 'public',
    },
  });

  const contentValue = watch('content');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async (files: File[]): Promise<string[]> => {
    const urls: string[] = [];
    
    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `reflections/${profile?.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      urls.push(data.publicUrl);
    }

    return urls;
  };

  const onSubmit = async (data: any) => {
    if (!profile) return;

    try {
      setLoading(true);

      let mediaUrls: string[] = [];
      if (selectedFiles.length > 0) {
        mediaUrls = await uploadFiles(selectedFiles);
      }

      const { error } = await supabase
        .from('reflections')
        .insert({
          author_id: profile.id,
          content_text: data.content,
          media_urls: mediaUrls.length > 0 ? mediaUrls : null,
          element: profile.element,
          visibility: data.visibility,
        });

      if (error) throw error;

      reset();
      setSelectedFiles([]);
      onSuccess?.();
    } catch (error) {
      console.error('Error creating reflection:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return null;
  }

  return (
    <Card className="mb-6" element={profile.element}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-start space-x-3">
          {profile.avatar_url && (
            <img
              src={profile.avatar_url}
              alt={profile.display_name}
              className="h-10 w-10 rounded-full flex-shrink-0"
            />
          )}
          
          <div className="flex-1">
            <div className="mb-3">
              <p className="text-sm text-gray-600 italic mb-2 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border-l-4 border-purple-300">
                <span className="font-medium">Spiritual Reflection:</span> "{currentPrompt}"
              </p>
              <textarea
                {...register('content')}
                placeholder={`Share your authentic ${profile.element} wisdom...`}
                rows={4}
                className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
              )}
            </div>

            {/* File Previews */}
            {selectedFiles.length > 0 && (
              <div className="mb-3">
                <div className="flex flex-wrap gap-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                        <span className="text-sm text-gray-600">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <label className="cursor-pointer text-gray-500 hover:text-gray-700">
                  <Image size={20} />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
                
                <label className="cursor-pointer text-gray-500 hover:text-gray-700">
                  <Video size={20} />
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
                
                <label className="cursor-pointer text-gray-500 hover:text-gray-700">
                  <Mic size={20} />
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>

                <select
                  {...register('visibility')}
                  className="text-sm border-none bg-transparent text-gray-600"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>

              <Button
                type="submit"
                loading={loading}
                disabled={!contentValue?.trim()}
                element={profile.element}
              >
                Share Reflection
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Card>
  );
};
export default ReflectionForm;
