import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';
import { 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  FolderPlus,
  Save,
  X,
  Upload
} from 'lucide-react';
import type { Project } from '../types/project';

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [projectImages, setProjectImages] = useState<File[]>([]);
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    long_description: '',
    category: '',
    image: '',
    github_url: '',
    live_url: '',
    tags: '',
    stars: 0
  });

  const [newCategory, setNewCategory] = useState({ name: '', slug: '' });

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/admin/login');
        return;
      }

      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (!roleData) {
        navigate('/admin/login');
        return;
      }

      setIsAdmin(true);
      fetchData();
    } catch (error) {
      console.error('Error checking admin access:', error);
      navigate('/admin/login');
    }
  };

  const fetchData = async () => {
    try {
      const [projectsRes, categoriesRes] = await Promise.all([
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('categories').select('*').order('name')
      ]);

      if (projectsRes.data) {
        const typedProjects = projectsRes.data.map(p => ({
          ...p,
          github_url: p.github_url || undefined,
          live_url: p.live_url || undefined,
          stars: p.stars || 0
        }));
        setProjects(typedProjects as Project[]);
      }
      if (categoriesRes.data) setCategories(categoriesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const handleImageUpload = async (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    setProjectImages(prev => [...prev, ...fileArray]);
  };

  const removeImage = (index: number) => {
    setProjectImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadingImages(true);
    
    try {
      const projectData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()),
      };

      let projectId = editingProject?.id;

      // Create or update project
      if (editingProject) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProject.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('projects')
          .insert([projectData])
          .select()
          .single();
        if (error) throw error;
        projectId = data.id;
      }

      // Upload images to storage and create records
      if (projectImages.length > 0 && projectId) {
        for (let i = 0; i < projectImages.length; i++) {
          const file = projectImages[i];
          const fileExt = file.name.split('.').pop();
          const fileName = `${projectId}-${Date.now()}-${i}.${fileExt}`;
          const filePath = `${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('project-images')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data: urlData } = supabase.storage
            .from('project-images')
            .getPublicUrl(filePath);

          await supabase.from('project_images').insert({
            project_id: projectId,
            image_url: urlData.publicUrl,
            is_primary: i === 0,
            display_order: i
          });
        }
      }

      setShowProjectForm(false);
      setEditingProject(null);
      setProjectImages([]);
      resetForm();
      fetchData();
    } catch (error: any) {
      alert('Error: ' + error.message);
    } finally {
      setUploadingImages(false);
    }
  };

  const handleSubmitCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        const { error } = await supabase
          .from('categories')
          .update(newCategory)
          .eq('id', editingCategory.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('categories')
          .insert([newCategory]);
        if (error) throw error;
      }
      
      setShowCategoryForm(false);
      setEditingCategory(null);
      setNewCategory({ name: '', slug: '' });
      fetchData();
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      fetchData();
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setNewCategory({ name: category.name, slug: category.slug });
    setShowCategoryForm(true);
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      fetchData();
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      long_description: project.long_description,
      category: project.category,
      image: project.image,
      github_url: project.github_url || '',
      live_url: project.live_url || '',
      tags: project.tags.join(', '),
      stars: project.stars
    });
    setShowProjectForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      long_description: '',
      category: '',
      image: '',
      github_url: '',
      live_url: '',
      tags: '',
      stars: 0
    });
  };

  if (loading || !isAdmin) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      {/* Header */}
      <header className="bg-[#111827] border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-cyan-400">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Action Buttons */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => {
              setShowProjectForm(true);
              setEditingProject(null);
              resetForm();
            }}
            className="flex items-center space-x-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors"
          >
            <Plus size={20} />
            <span>Add Project</span>
          </button>
          <button
            onClick={() => setShowCategoryForm(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors"
          >
            <FolderPlus size={20} />
            <span>Add Category</span>
          </button>
        </div>

        {/* Categories Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-white">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div key={cat.id} className="bg-[#111827] border border-gray-700/50 p-4 rounded-lg flex flex-col">
                <div className="flex-1">
                  <p className="font-medium text-white">{cat.name}</p>
                  <p className="text-sm text-gray-400">{cat.slug}</p>
                </div>
                <div className="flex space-x-2 mt-3">
                  <button
                    onClick={() => handleEditCategory(cat)}
                    className="p-1.5 bg-cyan-500 hover:bg-cyan-600 rounded transition-colors"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="p-1.5 bg-red-500 hover:bg-red-600 rounded transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Table */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-white">Projects ({projects.length})</h2>
          <div className="bg-[#111827] border border-gray-700/50 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1f2937]">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-white">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-white">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-white">Stars</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-[#1f2937]/50">
                      <td className="px-6 py-4 text-white">{project.title}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">
                          {project.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white">{project.stars}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditProject(project)}
                            className="p-2 bg-cyan-500 hover:bg-cyan-600 rounded transition-colors"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="p-2 bg-red-500 hover:bg-red-600 rounded transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Project Form Modal */}
      {showProjectForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-[#111827] border border-gray-700/50 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h2>
                <button
                  onClick={() => {
                    setShowProjectForm(false);
                    setEditingProject(null);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmitProject} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0a0f1a] border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Description</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0a0f1a] border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Long Description</label>
                  <textarea
                    required
                    value={formData.long_description}
                    onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0a0f1a] border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                    rows={5}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Category</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0a0f1a] border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                  >
                    <option value="">Select a category</option>
                    {categories.filter(cat => cat.slug !== 'all').map((cat) => (
                      <option key={cat.id} value={cat.slug}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Main Image URL</label>
                  <input
                    type="url"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0a0f1a] border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Additional Images</label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-[#0a0f1a] hover:bg-[#111827] transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e.target.files)}
                          className="hidden"
                        />
                      </label>
                    </div>
                    
                    {projectImages.length > 0 && (
                      <div className="grid grid-cols-3 gap-3">
                        {projectImages.map((file, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={14} />
                            </button>
                            {index === 0 && (
                              <span className="absolute bottom-1 left-1 px-2 py-0.5 bg-cyan-500 text-xs rounded text-white">
                                Primary
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Tags (comma-separated)</label>
                  <input
                    type="text"
                    required
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="React, TypeScript, Node.js"
                    className="w-full px-4 py-2 bg-[#0a0f1a] border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Stars</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.stars}
                    onChange={(e) => setFormData({ ...formData, stars: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 bg-[#0a0f1a] border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">GitHub URL (optional)</label>
                  <input
                    type="url"
                    value={formData.github_url}
                    onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0a0f1a] border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Live URL (optional)</label>
                  <input
                    type="url"
                    value={formData.live_url}
                    onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0a0f1a] border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={uploadingImages}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors text-white"
                >
                  {uploadingImages ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      <span>{editingProject ? 'Update Project' : 'Create Project'}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Category Form Modal */}
      {showCategoryForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-[#111827] border border-gray-700/50 rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </h2>
                <button
                  onClick={() => {
                    setShowCategoryForm(false);
                    setEditingCategory(null);
                    setNewCategory({ name: '', slug: '' });
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmitCategory} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Category Name</label>
                  <input
                    type="text"
                    required
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0a0f1a] border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Slug (URL-friendly)</label>
                  <input
                    type="text"
                    required
                    value={newCategory.slug}
                    onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value.toLowerCase() })}
                    placeholder="e.g., mobile-apps"
                    className="w-full px-4 py-2 bg-[#0a0f1a] border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white placeholder-gray-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors text-white"
                >
                  <Save size={20} />
                  <span>{editingCategory ? 'Update Category' : 'Create Category'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
