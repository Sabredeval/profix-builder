-- =============================================
-- Profix Builders - Supabase Database Setup
-- Run this in your Supabase SQL Editor
-- (Dashboard > SQL Editor > New Query)
-- =============================================

-- 1. Create the projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  thumbnail TEXT,
  highlights TEXT[] DEFAULT '{}',
  gallery JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Row Level Security on the projects table
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- 3. Allow anyone (anonymous) to READ projects (for the public website)
CREATE POLICY "Allow public read access on projects"
  ON projects
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 4. Allow authenticated users to INSERT projects (admin only)
CREATE POLICY "Allow authenticated insert on projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 5. Allow authenticated users to UPDATE projects (admin only)
CREATE POLICY "Allow authenticated update on projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 6. Allow authenticated users to DELETE projects (admin only)
CREATE POLICY "Allow authenticated delete on projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (true);
