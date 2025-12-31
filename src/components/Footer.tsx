import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { socialLinks } from './ContactSection';

export function Footer() {
  return (
    <footer className="py-12 border-t border-border/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles size={14} className="text-primary-foreground" />
              </div>
              <span className="font-display font-bold">SelimDev</span>
            </div>
            <span className="text-muted-foreground text-sm">
              © 2025 Mohammed Selim
            </span>
            <Link 
              to="/admin/login" 
              className="text-muted-foreground/40 hover:text-muted-foreground text-xs transition-colors"
            >
              Admin
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl hover:bg-primary/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon size={18} className="text-muted-foreground hover:text-primary transition-colors" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
