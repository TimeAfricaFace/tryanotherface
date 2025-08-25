/*
  # Safe Schema Update for Try Another Face (TAF)
  
  This migration safely creates the database schema by checking for existing objects first.
  
  1. New Tables (if not exists)
    - `profiles` - User profiles with elemental identity
    - `reflections` - User posts/reflections with media support
    - `comments` - Comments on reflections
    - `likes` - Like system for reflections
    - `jobs` - Job postings board
    - `skills` - User skills with endorsements
    - `housing_listings` - Housing rental/sale listings
    - `admin_reports` - Content moderation reports

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Secure user data access
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types only if they don't exist
DO $$ BEGIN
    CREATE TYPE element_type AS ENUM ('fire', 'water', 'air', 'earth');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE visibility_type AS ENUM ('public', 'private');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE skill_level AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE report_status AS ENUM ('pending', 'resolved', 'dismissed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE target_type AS ENUM ('reflection', 'user', 'comment', 'job', 'housing');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE job_status AS ENUM ('open', 'closed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  element element_type NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reflections table
CREATE TABLE IF NOT EXISTS reflections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content_text TEXT NOT NULL,
  media_urls JSONB,
  element element_type NOT NULL,
  visibility visibility_type DEFAULT 'public',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reflection_id UUID REFERENCES reflections(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Likes table
CREATE TABLE IF NOT EXISTS likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  reflection_id UUID REFERENCES reflections(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, reflection_id)
);

-- Jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  poster_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  skills_required JSONB DEFAULT '[]',
  location TEXT,
  price DECIMAL(10,2),
  status job_status DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  skill_name TEXT NOT NULL,
  level skill_level DEFAULT 'beginner',
  endorsements INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id, skill_name)
);

-- Housing listings table
CREATE TABLE IF NOT EXISTS housing_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lister_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  images JSONB DEFAULT '[]',
  element_tag element_type,
  coordinates JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin reports table
CREATE TABLE IF NOT EXISTS admin_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  target_type target_type NOT NULL,
  target_id UUID NOT NULL,
  reason TEXT NOT NULL,
  status report_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE reflections ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE housing_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_reports ENABLE ROW LEVEL SECURITY;

-- Create policies (drop existing ones first to avoid conflicts)

-- Profiles policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Reflections policies
DROP POLICY IF EXISTS "Public reflections are viewable by everyone" ON reflections;
CREATE POLICY "Public reflections are viewable by everyone" ON reflections
  FOR SELECT USING (visibility = 'public' OR author_id = auth.uid());

DROP POLICY IF EXISTS "Users can insert their own reflections" ON reflections;
CREATE POLICY "Users can insert their own reflections" ON reflections
  FOR INSERT WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "Users can update their own reflections" ON reflections;
CREATE POLICY "Users can update their own reflections" ON reflections
  FOR UPDATE USING (auth.uid() = author_id);

DROP POLICY IF EXISTS "Users can delete their own reflections" ON reflections;
CREATE POLICY "Users can delete their own reflections" ON reflections
  FOR DELETE USING (auth.uid() = author_id);

-- Comments policies
DROP POLICY IF EXISTS "Comments are viewable by everyone" ON comments;
CREATE POLICY "Comments are viewable by everyone" ON comments
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert comments" ON comments;
CREATE POLICY "Authenticated users can insert comments" ON comments
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can update their own comments" ON comments;
CREATE POLICY "Users can update their own comments" ON comments
  FOR UPDATE USING (auth.uid() = author_id);

DROP POLICY IF EXISTS "Users can delete their own comments" ON comments;
CREATE POLICY "Users can delete their own comments" ON comments
  FOR DELETE USING (auth.uid() = author_id);

-- Likes policies
DROP POLICY IF EXISTS "Likes are viewable by everyone" ON likes;
CREATE POLICY "Likes are viewable by everyone" ON likes
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert likes" ON likes;
CREATE POLICY "Authenticated users can insert likes" ON likes
  FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own likes" ON likes;
CREATE POLICY "Users can delete their own likes" ON likes
  FOR DELETE USING (auth.uid() = user_id);

-- Jobs policies
DROP POLICY IF EXISTS "Jobs are viewable by everyone" ON jobs;
CREATE POLICY "Jobs are viewable by everyone" ON jobs
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert jobs" ON jobs;
CREATE POLICY "Authenticated users can insert jobs" ON jobs
  FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = poster_id);

DROP POLICY IF EXISTS "Users can update their own jobs" ON jobs;
CREATE POLICY "Users can update their own jobs" ON jobs
  FOR UPDATE USING (auth.uid() = poster_id);

DROP POLICY IF EXISTS "Users can delete their own jobs" ON jobs;
CREATE POLICY "Users can delete their own jobs" ON jobs
  FOR DELETE USING (auth.uid() = poster_id);

-- Skills policies
DROP POLICY IF EXISTS "Skills are viewable by everyone" ON skills;
CREATE POLICY "Skills are viewable by everyone" ON skills
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own skills" ON skills;
CREATE POLICY "Users can insert their own skills" ON skills
  FOR INSERT WITH CHECK (auth.uid() = profile_id);

DROP POLICY IF EXISTS "Users can update their own skills" ON skills;
CREATE POLICY "Users can update their own skills" ON skills
  FOR UPDATE USING (auth.uid() = profile_id);

DROP POLICY IF EXISTS "Users can delete their own skills" ON skills;
CREATE POLICY "Users can delete their own skills" ON skills
  FOR DELETE USING (auth.uid() = profile_id);

-- Housing listings policies
DROP POLICY IF EXISTS "Housing listings are viewable by everyone" ON housing_listings;
CREATE POLICY "Housing listings are viewable by everyone" ON housing_listings
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert housing listings" ON housing_listings;
CREATE POLICY "Authenticated users can insert housing listings" ON housing_listings
  FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = lister_id);

DROP POLICY IF EXISTS "Users can update their own housing listings" ON housing_listings;
CREATE POLICY "Users can update their own housing listings" ON housing_listings
  FOR UPDATE USING (auth.uid() = lister_id);

DROP POLICY IF EXISTS "Users can delete their own housing listings" ON housing_listings;
CREATE POLICY "Users can delete their own housing listings" ON housing_listings
  FOR DELETE USING (auth.uid() = lister_id);

-- Admin reports policies
DROP POLICY IF EXISTS "Reports are viewable by their creators" ON admin_reports;
CREATE POLICY "Reports are viewable by their creators" ON admin_reports
  FOR SELECT USING (auth.uid() = reporter_id);

DROP POLICY IF EXISTS "Authenticated users can insert reports" ON admin_reports;
CREATE POLICY "Authenticated users can insert reports" ON admin_reports
  FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = reporter_id);

-- Create indexes for performance (only if they don't exist)
CREATE INDEX IF NOT EXISTS idx_reflections_author_id ON reflections(author_id);
CREATE INDEX IF NOT EXISTS idx_reflections_created_at ON reflections(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reflections_element ON reflections(element);
CREATE INDEX IF NOT EXISTS idx_reflections_visibility ON reflections(visibility);

CREATE INDEX IF NOT EXISTS idx_comments_reflection_id ON comments(reflection_id);
CREATE INDEX IF NOT EXISTS idx_comments_author_id ON comments(author_id);

CREATE INDEX IF NOT EXISTS idx_likes_reflection_id ON likes(reflection_id);
CREATE INDEX IF NOT EXISTS idx_likes_user_id ON likes(user_id);

CREATE INDEX IF NOT EXISTS idx_jobs_poster_id ON jobs(poster_id);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);

CREATE INDEX IF NOT EXISTS idx_skills_profile_id ON skills(profile_id);

CREATE INDEX IF NOT EXISTS idx_housing_lister_id ON housing_listings(lister_id);
CREATE INDEX IF NOT EXISTS idx_housing_created_at ON housing_listings(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_reports_status ON admin_reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON admin_reports(created_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at (drop existing ones first)
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS update_reflections_updated_at ON reflections;
CREATE TRIGGER update_reflections_updated_at BEFORE UPDATE ON reflections
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();