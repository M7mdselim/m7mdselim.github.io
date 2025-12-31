import { motion } from 'framer-motion';
import { ArrowRight, Download, MapPin } from 'lucide-react';

interface HeroSectionProps {
  onScrollToProjects: () => void;
  onScrollToContact: () => void;
}

export function HeroSection({ onScrollToProjects, onScrollToContact }: HeroSectionProps) {
  return (
    <section id="about" className="min-h-screen flex items-center pt-24 pb-20 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span className="text-muted-foreground">Available for new projects</span>
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className="display-heading">
                <span className="text-muted-foreground block text-2xl md:text-3xl font-normal mb-4">
                  Hey there, I'm
                </span>
                <span className="block">Mohammed</span>
                <span className="text-gradient block">Selim</span>
              </h1>
            </motion.div>

            {/* Role */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-lg"
            >
              Software Engineer specializing in <span className="text-primary">Full-Stack Development</span>,
              <span className="text-accent"> AI Integration</span> & Digital Applications
            </motion.p>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <MapPin size={18} className="text-primary" />
              <span>Cairo, Egypt • Open to Remote</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <motion.button
                onClick={onScrollToContact}
                className="btn-primary flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Let's Talk</span>
                <ArrowRight size={18} />
              </motion.button>
              <motion.button
                onClick={onScrollToProjects}
                className="btn-ghost flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View Work</span>
                <Download size={18} />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Profile Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Decorative shapes */}
              <motion.div
                className="absolute -top-8 -right-8 w-32 h-32 rounded-3xl border border-primary/30 bg-primary/5"
                animate={{ rotate: [0, 90, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full border border-accent/30 bg-accent/5"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              {/* Main image container */}
              <div className="relative">
                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-primary via-accent to-primary opacity-20 blur-2xl" />
                <motion.div
                  className="relative w-72 h-72 md:w-96 md:h-96 rounded-[2.5rem] overflow-hidden border-2 border-border bg-card"
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src="https://swgmyybkpqjlkiiecxvc.supabase.co/storage/v1/object/sign/PortofolioBucket/profile.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJQb3J0b2ZvbGlvQnVja2V0L3Byb2ZpbGUuanBnIiwiaWF0IjoxNzM4NzczNzA5LCJleHAiOjE4OTY0NTM3MDl9.Lnq5y9U5-EMHbntq6tOfY8CNJ7DBYHUlIZJKCFYPIlk"
                    alt="Mohammed Selim"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>

              {/* Stats cards */}
              <motion.div
                className="absolute -right-4 top-1/4 p-4 rounded-2xl bg-card border border-border shadow-xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-3xl font-display font-bold text-primary">8+</p>
                <p className="text-sm text-muted-foreground">Apps Built</p>
              </motion.div>
              
              <motion.div
                className="absolute -left-4 bottom-1/4 p-4 rounded-2xl bg-card border border-border shadow-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-3xl font-display font-bold text-accent">CS</p>
                <p className="text-sm text-muted-foreground">Bachelor's</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
