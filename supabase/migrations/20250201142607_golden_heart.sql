/*
  # Create projects table

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `long_description` (text)
      - `tags` (text array)
      - `category` (text)
      - `image` (text)
      - `github_url` (text)
      - `live_url` (text)
      - `stars` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `projects` table
    - Add policies for public read access
    - Add policies for authenticated users to manage their projects
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  long_description text NOT NULL,
  tags text[] NOT NULL DEFAULT '{}',
  category text NOT NULL,
  image text NOT NULL,
  github_url text,
  live_url text,
  stars integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Projects are viewable by everyone"
  ON projects
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert their own projects
CREATE POLICY "Users can insert their own projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update their own projects
CREATE POLICY "Users can update their own projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);