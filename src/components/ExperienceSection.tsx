import { motion } from 'framer-motion';
import { Briefcase, Calendar, ArrowUpRight } from 'lucide-react';

const experiences = [
  {
    period: '01/2024 - Present',
    title: 'Software Engineer',
    company: 'Royal Resort (Police Club)',
    type: 'Part-time',
    description: 'Developed and deployed 8 digital applications using C#, .NET Framework, and SQL Server, covering multiple operational domains. All systems are actively used in daily operations.',
    skills: ['C#', '.NET Framework', 'SQL Server', 'Windows Apps'],
  },
  {
    period: '08/2025 - 10/2025',
    title: 'Integrated Software Solution (Training)',
    company: 'Raya Tech University',
    type: 'Training',
    description: 'Completed an intensive 6-week program covering CCNA, Python & Django, Java & Spring Boot, Angular, and API Development (REST & SOAP), with hands-on labs and projects.',
    skills: ['Python', 'Django', 'Java', 'Spring Boot', 'Angular', 'REST APIs'],
  },
  {
    period: '2022 - Present',
    title: "Exam's Invigilator",
    company: 'British Council',
    type: 'Freelance',
    description: 'Supervised exams ensuring compliance with regulations. Enhanced communication and professionalism in a multicultural environment.',
    skills: ['Communication', 'Attention to Detail', 'English'],
  },
];

export function ExperienceSection() {
  return (
    <section id="Work" className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="text-primary font-medium mb-3">CAREER</p>
            <h2 className="section-title">
              Work <span className="text-gradient">Experience</span>
            </h2>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group"
            >
              <motion.div 
                className="glass-card p-8"
                whileHover={{ x: 10 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Left side - Date */}
                  <div className="lg:w-48 shrink-0">
                    <motion.div 
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
                      whileHover={{ scale: 1.05, backgroundColor: 'hsl(var(--primary) / 0.2)' }}
                    >
                      <Calendar size={14} />
                      {exp.period}
                    </motion.div>
                  </div>
                  
                  {/* Right side - Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-display font-bold group-hover:text-primary transition-colors">
                          {exp.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                          <motion.div whileHover={{ rotate: 15 }} transition={{ type: 'spring' }}>
                            <Briefcase size={16} />
                          </motion.div>
                          <span>{exp.company}</span>
                          <motion.span 
                            className="px-2 py-0.5 rounded-full bg-muted text-xs"
                            whileHover={{ scale: 1.1, backgroundColor: 'hsl(var(--primary) / 0.2)', color: 'hsl(var(--primary))' }}
                          >
                            {exp.type}
                          </motion.span>
                        </div>
                      </div>
                      <motion.div
                        whileHover={{ rotate: 45, scale: 1.2 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <ArrowUpRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                      </motion.div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {exp.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-card border border-border text-muted-foreground cursor-default"
                          whileHover={{ 
                            scale: 1.1, 
                            borderColor: 'hsl(var(--primary))',
                            color: 'hsl(var(--primary))',
                            y: -2
                          }}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + skillIndex * 0.05 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
