import { motion } from 'framer-motion';
import { Brain, Code2, Monitor, Zap } from 'lucide-react';

const services = [
  {
    icon: Brain,
    number: '01',
    title: 'AI & Machine Learning',
    description: 'Building intelligent systems with TensorFlow, PyTorch, and NLP. Experienced with ChatGPT and DeepSeek integration for high-performance applications.',
    tags: ['TensorFlow', 'PyTorch', 'Transformers', 'NLP'],
  },
  {
    icon: Code2,
    number: '02',
    title: 'Frontend Development',
    description: 'Creating beautiful, responsive web applications using React.js, HTML, CSS, and JavaScript with seamless user experiences.',
    tags: ['React.js', 'JavaScript', 'HTML/CSS'],
  },
  {
    icon: Monitor,
    number: '03',
    title: 'Desktop Applications',
    description: 'Developing robust Windows applications with C# and .NET Framework. Built 8+ production apps for enterprise operations.',
    tags: ['C#', '.NET Framework', 'SQL Server'],
  },
  {
    icon: Zap,
    number: '04',
    title: 'Full Stack Solutions',
    description: 'End-to-end development with Node.js backend, database management, and REST API integration. Led 8-developer team for graduation project.',
    tags: ['Node.js', 'PHP Laravel', 'REST APIs'],
  },
];

export function ExpertiseSection() {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="text-primary font-medium mb-3">WHAT I DO</p>
            <h2 className="section-title">
              Services & <span className="text-gradient">Expertise</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md md:text-right">
            Specialized in creating digital experiences that combine technical excellence with creative innovation.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <motion.div 
                className="glass-card p-8 h-full"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="flex items-start justify-between mb-6">
                  <motion.div 
                    className="p-4 rounded-2xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <service.icon size={28} className="text-primary" />
                  </motion.div>
                  <motion.span 
                    className="text-5xl font-display font-bold text-border/50 group-hover:text-primary/20 transition-colors"
                    whileHover={{ scale: 1.2, x: -5 }}
                  >
                    {service.number}
                  </motion.span>
                </div>
                
                <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground cursor-default"
                      whileHover={{ 
                        scale: 1.15, 
                        backgroundColor: 'hsl(var(--primary) / 0.2)',
                        color: 'hsl(var(--primary))',
                        y: -3
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + tagIndex * 0.1 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
