import { motion } from 'framer-motion';
import { 
  Code2, 
  Braces, 
  Database, 
  Terminal, 
  Cpu, 
  Globe, 
  Sparkles,
  Zap,
  Layers,
  GitBranch
} from 'lucide-react';

const icons = [
  { Icon: Code2, delay: 0, duration: 15, x: '10%', y: '20%' },
  { Icon: Braces, delay: 2, duration: 18, x: '85%', y: '15%' },
  { Icon: Database, delay: 4, duration: 20, x: '75%', y: '70%' },
  { Icon: Terminal, delay: 1, duration: 16, x: '15%', y: '75%' },
  { Icon: Cpu, delay: 3, duration: 14, x: '50%', y: '10%' },
  { Icon: Globe, delay: 5, duration: 17, x: '90%', y: '45%' },
  { Icon: Sparkles, delay: 2.5, duration: 19, x: '5%', y: '50%' },
  { Icon: Zap, delay: 1.5, duration: 15, x: '40%', y: '85%' },
  { Icon: Layers, delay: 4.5, duration: 21, x: '60%', y: '30%' },
  { Icon: GitBranch, delay: 3.5, duration: 16, x: '25%', y: '40%' },
];

export function FloatingIcons() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-5">
      {icons.map(({ Icon, delay, duration, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.15, 0.1, 0.15, 0],
            scale: [0.5, 1, 1.1, 1, 0.5],
            y: [0, -100, -200, -300, -400],
            x: [0, 20, -20, 30, 0],
            rotate: [0, 45, -30, 60, 0],
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            delay: delay,
            ease: 'easeInOut',
          }}
        >
          <Icon 
            size={32} 
            className="text-primary/30" 
            strokeWidth={1.5}
          />
        </motion.div>
      ))}
      
      {/* Additional floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-primary/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -200, -400],
            opacity: [0, 0.6, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 8,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}