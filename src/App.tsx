import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import type { Project } from './types/project';

// Components
import { AnimatedBackground } from './components/AnimatedBackground';
import { FloatingIcons } from './components/FloatingIcons';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { SkillsMarquee } from './components/SkillsMarquee';
import { ExpertiseSection } from './components/ExpertiseSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Array<{ id: string; name: string; slug: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projectsResult, categoriesResult] = await Promise.all([
          supabase.from('projects').select('*').order('created_at', { ascending: false }),
          supabase.from('categories').select('*').order('name', { ascending: true }),
        ]);

        if (projectsResult.error) throw projectsResult.error;
        if (categoriesResult.error) throw categoriesResult.error;

        setProjects(projectsResult.data || []);
        setCategories(categoriesResult.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const scrollToSection = (sectionId: string, sectionName: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(sectionName);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <AnimatedBackground />
      <FloatingIcons />
      <Navigation activeSection={activeSection} onNavigate={scrollToSection} />
      
      <HeroSection
        onScrollToProjects={() => scrollToSection('Projects', 'projects')}
        onScrollToContact={() => scrollToSection('contact', 'contact')}
      />
      
      <SkillsMarquee />
      <ExpertiseSection />
      <ProjectsSection projects={projects} categories={categories} loading={loading} />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
