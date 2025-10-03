
  import { useState, useEffect } from 'react';

  import { Facebook, Instagram, Menu, X } from "lucide-react"; // Import icons if not already
  import { 
    Brain, 
    Layout, 
    Monitor, 
    Github, 
    Linkedin, 
    Mail,
    ChevronRight,
    ExternalLink,
    Code2,
    Terminal,
    Star,
    Award,
    Coffee
  } from 'lucide-react';
  import { Link } from 'react-router-dom';
  import { supabase } from './lib/supabase';
  import type { Project } from './types/project';
  import { FaWhatsapp } from "react-icons/fa";


  function App() {
    const [activeSection, setActiveSection] = useState('about');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isScrolled, setIsScrolled] = useState(false);
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Array<{ id: string; name: string; slug: string }>>([]);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projectsResult, categoriesResult] = await Promise.all([
          supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false }),
          supabase
            .from('categories')
            .select('*')
            .order('name', { ascending: true })
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

    const stats = [
      { icon: Award, label: "Degree", value: "Bachelor's of Computer Science" },
      { icon: Coffee, label: "Projects Completed", value: "10+" },
      { icon: Star, label: "Military Status", value: "Completed" }
      
      
    ];

    const filteredProjects = selectedCategory === 'all' 
      ? projects 
      : projects.filter(project => project.category === selectedCategory);


      

      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [message, setMessage] = useState('');
      const [menuOpen, setMenuOpen] = useState(false);

    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        // Encode the message for the WhatsApp URL
        const encodedMessage = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
    
        // WhatsApp API URL with the message
        const whatsappUrl = `https://wa.me/+201155003537?text=${encodedMessage}`; // Replace with your phone number
    
        // Open WhatsApp with the prefilled message
        window.open(whatsappUrl, '_blank');





        
      };

      const handleContactClick = () => {
        const contactSection = document.getElementById('contact');
        
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        setActiveSection('contact');
      };


      const handleAboutClick = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
        setActiveSection('about');
      };

      const handleProjectClick = () => {
        const contactSection = document.getElementById('Projects');
        
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        setActiveSection('projects');
      };

      const handleExperienceClick = () => {
        const contactSection = document.getElementById('Work');
        
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        setActiveSection('experience');
      };


    


    return (
      <div id = "about" className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Header/Navigation */}
  <header
    className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-gray-900/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
    }`}
  >
    <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
      
      {/* Logo */}
      <div className="text-2xl font-bold group cursor-pointer" onClick={handleAboutClick}>
        <span className="text-blue-400 group-hover:text-white transition-colors"> Selim's </span>
        <span className="group-hover:text-blue-400 transition-colors">Portfolio</span>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-white focus:outline-none"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Navigation Links */}
      <div
        className={`absolute md:static top-16 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent transition-all duration-300 ${
          menuOpen ? "block" : "hidden"
        } md:flex md:space-x-6 items-center text-center md:text-left`}
      >
        <button
          onClick={() => {
            handleAboutClick();
            setMenuOpen(false);
          }}
          className={`capitalize block md:inline-block py-3 md:py-0 ${
            activeSection === "about" ? "text-blue-400" : "text-gray-300 hover:text-white"
          } transition-colors`}
        >
          about
        </button>
        <button
          onClick={() => {
            handleExperienceClick();
            setMenuOpen(false);
          }}
          className={`capitalize block md:inline-block py-3 md:py-0 ${
            activeSection === "experience" ? "text-blue-400" : "text-gray-300 hover:text-white"
          } transition-colors`}
        >
          experience
        </button>
        <button
          onClick={() => {
            handleProjectClick();
            setMenuOpen(false);
          }}
          className={`capitalize block md:inline-block py-3 md:py-0 ${
            activeSection === "projects" ? "text-blue-400" : "text-gray-300 hover:text-white"
          } transition-colors`}
        >
          projects
        </button>
        <button
          onClick={() => {
            handleContactClick();
            setMenuOpen(false);
          }}
          className={`capitalize block md:inline-block py-3 md:py-0 ${
            activeSection === "contact" ? "text-blue-400" : "text-gray-300 hover:text-white"
          } transition-colors`}
        >
          contact
        </button>
      </div>
    </nav>
  </header>


        {/* Hero Section */}
        <section className="min-h-screen flex items-center pt-16 px-4 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 h-[990px] md:h-full bg-gray-900/80 backdrop-blur-sm">  </div>
          <div className="max-w-6xl mx-auto relative">
            
            <div className="flex flex-col items-start space-y-6">
              
              <div className="inline-block">
                
                <span className="text-blue-400 text-lg font-medium px-4 py-2 border border-blue-400/30 rounded-full">
                  Software Engineer
                </span>

                
              </div>

              
              <div className="flex flex-col md:flex-row items-center md:items-start justify-between w-full">
    {/* Profile Image (Above on Mobile, Right on Larger Screens) */}
    <div className="flex-shrink-0 mb-6 md:mb-0 md:ml-8 order-first md:order-last">
      <img
        src="https://swgmyybkpqjlkiiecxvc.supabase.co/storage/v1/object/sign/PortofolioBucket/profile.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJQb3J0b2ZvbGlvQnVja2V0L3Byb2ZpbGUuanBnIiwiaWF0IjoxNzM4NzczNzA5LCJleHAiOjE4OTY0NTM3MDl9.Lnq5y9U5-EMHbntq6tOfY8CNJ7DBYHUlIZJKCFYPIlk" // Replace with your actual image URL
        alt="Mohammed Selim"
        className="w-40 h-40 md:w-52 md:h-52 rounded-full border-4 border-blue-400 shadow-lg"
      />
    </div>

    {/* Left Section: Text Content */}
    <div className="flex flex-col items-center md:items-start text-left md:text-left space-y-6">
      <h1 className="text-6xl font-bold leading-tight">
        Hi, I'm <span className="text-blue-400">Mohammed Selim</span>  
        <br />
        I Build Intelligent Solutions
      </h1>
      <p className="text-xl text-gray-300 max-w-2xl">
        Specializing in AI Development, Frontend Engineering, and Digital Applications. 
        Turning complex problems into elegant solutions.
      </p>
    </div>
  </div>



            
          <div className="flex space-x-4 pt-4">
        <button 
          onClick={handleContactClick} 
          className="group bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-lg font-medium flex items-center space-x-2 transition-all hover:scale-105"
        >
          <span>Get in touch</span>
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
        <Link 
          to="#projects" 
          onClick={handleProjectClick} 
          className="group px-8 py-4 rounded-lg font-medium border border-gray-600 hover:border-blue-400 transition-all hover:scale-105"
        >
          View Projects
        </Link>
      </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gray-800/50 p-8 rounded-xl hover:bg-gray-800 transition-all hover:scale-105">
                  <stat.icon className="w-12 h-12 text-blue-400 mb-4" />
                  <p className="text-4xl font-bold mb-2">{stat.value}</p>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        

        {/* Expertise Section */}
        <section className="py-20 bg-gray-800/50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-16 text-center">Areas of Expertise</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group bg-gray-900/50 p-8 rounded-xl hover:bg-gray-900 transition-all hover:-translate-y-2">
                <div className="relative">
                  <Brain className="w-16 h-16 text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
                  <div className="absolute -inset-1 bg-blue-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">AI Development</h3>
                <p className="text-gray-300 leading-relaxed">
                  Building intelligent systems using TensorFlow, PyTorch, and implementing cutting-edge machine learning algorithms.
                </p>
              </div>
              <div className="group bg-gray-900/50 p-8 rounded-xl hover:bg-gray-900 transition-all hover:-translate-y-2">
                <div className="relative">
                  <Layout className="w-16 h-16 text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
                  <div className="absolute -inset-1 bg-blue-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Frontend Development</h3>
                <p className="text-gray-300 leading-relaxed">
                  Creating responsive and interactive web applications using React, MUI , HTML , CSS , Node.js and modern web technologies.
                </p>
              </div>
              <div className="group bg-gray-900/50 p-8 rounded-xl hover:bg-gray-900 transition-all hover:-translate-y-2">
                <div className="relative">
                  <Monitor className="w-16 h-16 text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
                  <div className="absolute -inset-1 bg-blue-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Digital Applications</h3>
                <p className="text-gray-300 leading-relaxed">
                  Developing Digital applications using C# windows Form Application and native technologies.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* Programming Languages Section */}
  <section className="py-20 bg-gray-800/50">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-4xl font-bold mb-16 text-center">Programming Skills</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: "Python", level: "Advanced", icon: Code2 },        
          { name: "HTML , CSS , JS ", level: "Advanced", icon: Terminal },
          { name: "React.js", level: "Intermediate", icon: Code2 },
          { name: "C#", level: "Intermediate", icon: Monitor },
          { name: "SQL", level: "Intermediate", icon: Code2 },
          { name: "Java", level: "Beginner", icon: Code2 },
        ].map((skill, index) => (
          <div key={index} className="bg-gray-900/50 p-8 rounded-xl hover:bg-gray-900 transition-all hover:-translate-y-2">
            <skill.icon className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-2xl font-semibold">{skill.name}</h3>
            <p className="text-gray-400">{skill.level}</p>
          </div>
        ))}
      </div>
    </div>
  </section>


        {/* Projects Section */}
        <section id="Projects" className="py-20">
          <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-center">Featured Projects</h2>
          <div className="flex justify-center space-x-4 mb-12 flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCategory === category.slug
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
            {loading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {filteredProjects.map((project) => (
                <Link 
                      key={project.id}
                      to={`/project/${project.id}`}
                    className={`group relative bg-gray-800/50 rounded-xl overflow-hidden transition-all duration-300 hover:ring-2 hover:ring-blue-400`}
                  >
                    <div className="relative h-48">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gray-900/60 group-hover:bg-gray-900/40 transition-colors" />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h3>
                        <ExternalLink className="text-blue-400 hover:text-blue-300" />
                      </div>
                      <p className="text-gray-300 mb-4">{project.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, tagIndex) => (
                            <span 
                              key={tagIndex}
                              className="px-3 py-1 bg-gray-700 rounded-full text-sm text-blue-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center space-x-4 text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Star size={16} />
                            <span>{project.stars}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
        


        {/* Experience Timeline */}
        <section id = "Work" className="py-20 bg-gray-800/50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-16 text-center">Work Experience</h2>
            <div className="space-y-12">
              
              <div className="relative pl-8 border-l-2 border-blue-400 group">
                <div className="absolute w-4 h-4 bg-blue-400 rounded-full -left-[9px] top-0 group-hover:scale-150 transition-transform" />
                <div className="mb-1 text-blue-400 font-medium">2024 - 2025</div>
                <h3 className="text-2xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                  Software Engineer and Technical Support - Police Club Dareldyafa (Military Duties)
                </h3>
                <p className="text-gray-300 leading-relaxed">
                Developed and deployed 6 Windows application forms to streamline internal processes. Provided technical support, maintained IT infrastructure, and optimized system performance within a structured military environment.
                </p>
              </div>


              <div className="relative pl-8 border-l-2 border-blue-400 group">
                <div className="absolute w-4 h-4 bg-blue-400 rounded-full -left-[9px] top-0 group-hover:scale-150 transition-transform" />
                <div className="mb-1 text-blue-400 font-medium">2022 - FreeLance</div>
                <h3 className="text-2xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                  Exam's Invigilator - British Council (FreeLance)
                </h3>
                <p className="text-gray-300 leading-relaxed">
                Supervised exams at the British Council, ensuring compliance with regulations and maintaining exam integrity. Enhanced communication skills, professionalism, and English fluency in a multicultural environment.
                </p>
              </div>
              
            </div>
          </div>
        </section>


        

      {/* Contact Section */}
  <section  id="contact" className="py-20">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-4xl font-bold mb-16 text-center">Get in Touch</h2>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            I'm always interested in hearing about new projects and opportunities.
            Whether you have a question or just want to say hi, I'll try my best
            to get back to you!
          </p>
          <div className="space-y-6">
            <a 
              href="mailto:MohammedSaleem330@gmail.com" 
              className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors group"
            >
              <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-blue-400/10 transition-colors">
                <Mail size={24} className="group-hover:text-blue-400 transition-colors" />
              </div>
              <span>mohammedsaleem330@gmail.com</span>
            </a>

            <a 
              href="https://wa.me/+201155003537" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors group"
            >
              <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-blue-400/10 transition-colors">
              <FaWhatsapp size={24} className="group-hover:text-blue-400 transition-colors" />
              </div>
              <span>+201155003537</span>
            </a>
    
  
            <a 
              href="https://github.com/M7mdSelim" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors group"
            >
              <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-blue-400/10 transition-colors">
                <Github size={24} className="group-hover:text-blue-400 transition-colors" />
              </div>
              <span>M7mdSelim</span>
            </a>


            
            <a 
              href="https://www.linkedin.com/in/mohammed-selim-1673021a1/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors group"
            >
              <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-blue-400/10 transition-colors">
                <Linkedin size={24} className="group-hover:text-blue-400 transition-colors" />
              </div>
              <span>Linkedin</span>
            </a>


          

          </div>
        </div>
        <div className="bg-gray-800/50 p-8 rounded-xl">
        <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-blue-400 focus:ring focus:ring-blue-400/20 focus:ring-opacity-50 transition-all"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-blue-400 focus:ring focus:ring-blue-400/20 focus:ring-opacity-50 transition-all"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
          <textarea
            id="message"
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-blue-400 focus:ring focus:ring-blue-400/20 focus:ring-opacity-50 transition-all"
            placeholder="Your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-medium transition-all hover:scale-105"
        >
          Send Message
        </button>
      </form>
        </div>
      </div>
    </div>
  </section>


        {/* Footer */}
        <footer className="py-8 border-t border-gray-800">
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-gray-400 flex items-center space-x-4">
          <span>© 2025 Mohammed Selim. All rights reserved.</span>
          <Link to="/admin/login" className="text-gray-600 hover:text-gray-400 text-xs">
            Admin
          </Link>
        </div>
        <div className="flex space-x-6">
          <a href="https://github.com/M7mdSelim" target="_blank" rel="noopener noreferrer" className="group">
            <Github className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          </a>
          <a href="https://www.linkedin.com/in/mohammed-selim-1673021a1/" target="_blank" rel="noopener noreferrer" className="group">
            <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          </a>
          <a href="mailto:MohammedSaleem330@Gmail.com" className="group">
            <Mail className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          </a>
          <a href="https://www.instagram.com/muhamedselim_/" target="_blank" rel="noopener noreferrer" className="group">
            <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          </a>
          <a href="https://www.facebook.com/profile.php?id=100006098884315" target="_blank" rel="noopener noreferrer" className="group">
            <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          </a>
        </div>
      </div>
    </div>
  </footer>
      </div>
    );
  }

  export default App;