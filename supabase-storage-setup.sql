-- =============================================
-- Profix Builders - Storage Bucket Setup
-- Run this in your Supabase SQL Editor
-- AFTER running supabase-setup.sql
-- =============================================

-- 1. Create the storage bucket for project images
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Allow anyone to VIEW/DOWNLOAD images (public read)
CREATE POLICY "Allow public read access on project-images"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'project-images');

-- 3. Allow authenticated users to UPLOAD images
CREATE POLICY "Allow authenticated upload to project-images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'project-images');

-- 4. Allow authenticated users to UPDATE/REPLACE images
CREATE POLICY "Allow authenticated update on project-images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'project-images');

-- 5. Allow authenticated users to DELETE images
CREATE POLICY "Allow authenticated delete on project-images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'project-images');
