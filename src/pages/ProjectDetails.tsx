import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Calendar, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Project } from '../types/project';

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setProject(data);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [id]);

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

        <div className="relative h-96 rounded-xl overflow-hidden mb-12">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-fill"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
        </div>

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