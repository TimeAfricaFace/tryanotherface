import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          username: string;
          display_name: string;
          bio: string | null;
          avatar_url: string | null;
          element: 'fire' | 'water' | 'air' | 'earth';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          username: string;
          display_name: string;
          bio?: string | null;
          avatar_url?: string | null;
          element: 'fire' | 'water' | 'air' | 'earth';
        };
        Update: {
          username?: string;
          display_name?: string;
          bio?: string | null;
          avatar_url?: string | null;
          element?: 'fire' | 'water' | 'air' | 'earth';
        };
      };
      reflections: {
        Row: {
          id: string;
          author_id: string;
          content_text: string;
          media_urls: string[] | null;
          element: 'fire' | 'water' | 'air' | 'earth';
          visibility: 'public' | 'private';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          author_id: string;
          content_text: string;
          media_urls?: string[] | null;
          element: 'fire' | 'water' | 'air' | 'earth';
          visibility?: 'public' | 'private';
        };
        Update: {
          content_text?: string;
          media_urls?: string[] | null;
          visibility?: 'public' | 'private';
        };
      };
    };
  };
};
