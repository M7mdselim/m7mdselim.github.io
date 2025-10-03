-- Create a table for project images to support multiple images per project
CREATE TABLE IF NOT EXISTS public.project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT fk_project
    FOREIGN KEY (project_id)
    REFERENCES public.projects(id)
    ON DELETE CASCADE
);

-- Enable RLS on project_images
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;

-- Create policies for project_images
CREATE POLICY "Project images are viewable by everyone"
ON public.project_images
FOR SELECT
USING (true);

CREATE POLICY "Only admins can insert project images"
ON public.project_images
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update project images"
ON public.project_images
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete project images"
ON public.project_images
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for better performance
CREATE INDEX idx_project_images_project_id ON public.project_images(project_id);
CREATE INDEX idx_project_images_display_order ON public.project_images(display_order);

-- Create storage policies for project images bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for project-images bucket
CREATE POLICY "Project images are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'project-images');

CREATE POLICY "Admins can upload project images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'project-images' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update project images"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'project-images' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete project images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'project-images' 
  AND has_role(auth.uid(), 'admin'::app_role)
);