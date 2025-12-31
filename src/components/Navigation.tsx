import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github } from 'lucide-react';

interface NavItem {
  label: string;
  section: string;
  id: string;
}

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string, sectionName: string) => void;
}

export function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { label: 'Home', section: 'about', id: 'about' },
    { label: 'Work', section: 'experience', id: 'Work' },
    { label: 'Projects', section: 'projects', id: 'Projects' },
    { label: 'Contact', section: 'contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (id: string, section: string) => {
    onNavigate(id, section);
    setMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed w-full z-50 transition-all duration-700 ${
        isScrolled 
          ? 'bg-background/60 backdrop-blur-2xl border-b border-border/20' 
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
        {/* Logo */}
        <motion.button
          onClick={() => handleNavigate('about', 'about')}
          className="flex items-center gap-2 group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div 
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-lg font-bold text-primary-foreground">S</span>
          </motion.div>
          <span className="text-xl font-display font-bold">
            <span className="text-foreground">Selim's</span>
            <span className="text-primary"> Portfolio</span>
          </span>
        </motion.button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 p-1.5 rounded-full bg-card/50 border border-border/50 backdrop-blur-sm">
          {navItems.map((item) => (
            <motion.button
              key={item.section}
              onClick={() => handleNavigate(item.id, item.section)}
              className={`relative px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                activeSection === item.section 
                  ? 'text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeSection === item.section && (
                <motion.div
                  layoutId="navPill"
                  className="absolute inset-0 bg-primary rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              {item.label}
            </motion.button>
          ))}
        </div>

        {/* GitHub */}
        <motion.a
          href="https://github.com/M7mdSelim"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-border hover:border-primary transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Github size={18} />
          <span className="text-sm font-medium">GitHub</span>
        </motion.a>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2.5 rounded-xl bg-card border border-border"
          whileTap={{ scale: 0.9 }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </motion.button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="p-6 space-y-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.section}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleNavigate(item.id, item.section)}
                  className={`block w-full text-left px-5 py-4 rounded-2xl font-medium transition-colors ${
                    activeSection === item.section 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
