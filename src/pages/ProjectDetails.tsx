import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Calendar, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Project } from '../types/project';

interface ProjectImage {
  id: string;
  image_url: string;
  is_primary: boolean;
  display_order: number;
}

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [projectImages, setProjectImages] = useState<ProjectImage[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const [projectRes, imagesRes] = await Promise.all([
          supabase.from('projects').select('*').eq('id', id).single(),
          supabase.from('project_images').select('*').eq('project_id', id).order('display_order')
        ]);

        if (projectRes.error) throw projectRes.error;
        setProject(projectRes.data);
        
        if (imagesRes.data && imagesRes.data.length > 0) {
          setProjectImages(imagesRes.data);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [id]);

  const nextImage = () => {
    if (projectImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
    }
  };

  const prevImage = () => {
    if (projectImages.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
    }
  };

  const displayImage = projectImages.length > 0 
    ? projectImages[currentImageIndex].image_url 
    : project?.image;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
        <h1 className="text-3xl font-bold mb-4">Project not found</h1>
        <Link to="/" className="text-blue-400 hover:text-blue-300 flex items-center space-x-2">
          <ArrowLeft size={20} />
          <span>Back to home</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to projects</span>
        </Link>

        <div className="relative h-96 rounded-xl overflow-hidden mb-12 group">
          <img 
            src={displayImage} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
          
          {projectImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-gray-900/80 rounded-full hover:bg-gray-900 transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-gray-900/80 rounded-full hover:bg-gray-900 transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRight size={24} />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {projectImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-blue-400 w-8' : 'bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {projectImages.length > 1 && (
          <div className="grid grid-cols-4 gap-4 mb-8">
            {projectImages.map((img, index) => (
              <button
                key={img.id}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentImageIndex ? 'border-blue-400 scale-105' : 'border-gray-700 hover:border-gray-500'
                }`}
              >
                <img 
                  src={img.image_url} 
                  alt={`${project.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-800 rounded-full text-sm text-blue-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center space-x-6 text-gray-400">
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>{new Date(project.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star size={16} />
                <span>{project.stars} stars</span>
              </div>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {project.description}
            </p>
            <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
              {project.long_description}
            </div>
          </div>

          <div className="flex space-x-4 pt-8">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Github size={20} />
                <span>View on GitHub</span>
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <ExternalLink size={20} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}