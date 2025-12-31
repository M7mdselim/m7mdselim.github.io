import { motion } from 'framer-motion';

const skills = [
  'React.js', 'JavaScript', 'Node.js', 'C#', '.NET Framework', 
  'SQL Server', 'Python', 'TensorFlow', 'PyTorch', 'NumPy', 
  'Pandas', 'REST APIs', 'GitHub', 'OOP', 'Data Structures'
];

export function SkillsMarquee() {
  const duplicatedSkills = [...skills, ...skills, ...skills];

  return (
    <section className="py-12 overflow-hidden border-y border-border/30 bg-card/30 relative">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      
      <motion.div
        className="flex gap-12"
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {duplicatedSkills.map((skill, index) => (
          <motion.div
            key={`${skill}-${index}`}
            className="flex items-center gap-4 whitespace-nowrap group cursor-default"
            whileHover={{ scale: 1.1, y: -5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <span className="text-2xl md:text-3xl font-display font-bold text-foreground/80 group-hover:text-primary transition-colors duration-300 group-hover:drop-shadow-[0_0_15px_hsl(var(--primary)/0.5)]">
              {skill}
            </span>
            <motion.span 
              className="w-2 h-2 rounded-full bg-primary"
              whileHover={{ scale: 1.5 }}
              animate={{ 
                boxShadow: ['0 0 0 0 hsl(var(--primary) / 0.4)', '0 0 0 8px hsl(var(--primary) / 0)', '0 0 0 0 hsl(var(--primary) / 0.4)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
