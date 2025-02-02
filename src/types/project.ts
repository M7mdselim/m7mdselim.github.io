export interface Project {
  id: string;
  title: string;
  description: string;
  long_description: string;
  tags: string[];
  category: string;
  image: string;
  github_url?: string;
  live_url?: string;
  stars: number;
  created_at: string;
  updated_at: string;
}