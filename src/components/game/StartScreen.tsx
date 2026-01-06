import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { Globe, Play, Sparkles, Heart, Leaf, Users } from 'lucide-react';

const StartScreen = () => {
  const { startGame } = useGameStore();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-foreground rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0.2 
            }}
            animate={{ 
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{ 
              duration: 2 + Math.random() * 3, 
              repeat: Infinity,
              delay: Math.random() * 2 
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 1 }}
        className="relative mb-8"
      >
        {/* Orbiting ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-40 h-40 border-2 border-dashed border-primary/30 rounded-full" />
        </motion.div>
        
        {/* Planet icon */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10"
        >
          <Globe size={120} className="text-primary" strokeWidth={1} />
          <motion.div
            className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="font-fredoka text-5xl sm:text-6xl text-primary text-glow mb-2"
      >
        Tiny Planet
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="font-comic text-xl text-muted-foreground mb-8"
      >
        Caretaker Simulator
      </motion.p>

      {/* Feature icons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex gap-8 mb-10"
      >
        {[
          { icon: <Leaf size={28} />, label: "Nature", color: "text-nature" },
          { icon: <Heart size={28} />, label: "Balance", color: "text-accent" },
          { icon: <Users size={28} />, label: "Humans", color: "text-human" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="flex flex-col items-center gap-2"
          >
            <div className={`${item.color}`}>{item.icon}</div>
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Start button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={startGame}
        className="group relative flex items-center gap-3 px-10 py-5 rounded-2xl
                   bg-gradient-to-r from-primary to-primary/80 
                   text-primary-foreground font-fredoka text-xl
                   shadow-lg hover:shadow-xl transition-shadow"
      >
        <Play size={24} />
        <span>Start Game</span>
        <Sparkles 
          size={20} 
          className="absolute -top-2 -right-2 text-secondary animate-pulse" 
        />
      </motion.button>

      {/* Instructions hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 text-sm text-muted-foreground text-center max-w-md font-comic"
      >
        Hold a tiny planet in your hands. Balance ecosystems, industries, and humans 
        across generations. Your choices shape its fate! 🌍
      </motion.p>
    </div>
  );
};

export default StartScreen;
