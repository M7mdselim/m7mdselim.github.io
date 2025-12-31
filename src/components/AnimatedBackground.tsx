import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Large gradient orbs */}
      <motion.div
        className="absolute w-[900px] h-[900px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, hsl(160 84% 39% / 0.4), transparent 60%)',
          top: '-30%',
          right: '-20%',
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(180 70% 45% / 0.35), transparent 60%)',
          bottom: '5%',
          left: '-15%',
        }}
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, -60, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, hsl(80 65% 50% / 0.25), transparent 60%)',
          top: '40%',
          left: '30%',
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 80, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      />
      
      {/* Animated glow rings */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full border border-primary/10"
        style={{
          top: '20%',
          right: '10%',
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.3, 0.1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full border border-accent/10"
        style={{
          bottom: '30%',
          left: '5%',
        }}
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.1, 0.25, 0.1],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Subtle grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(hsl(var(--primary) / 0.4) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Animated lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <motion.line
          x1="0%"
          y1="30%"
          x2="100%"
          y2="70%"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.line
          x1="100%"
          y1="20%"
          x2="0%"
          y2="80%"
          stroke="hsl(var(--accent))"
          strokeWidth="1"
          animate={{
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </svg>
    </div>
  );
}
