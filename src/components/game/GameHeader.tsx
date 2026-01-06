import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { Globe, RotateCcw, Info } from 'lucide-react';

const GameHeader = () => {
  const { planetState, score, resetGame } = useGameStore();

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center justify-between px-6 py-4 bg-card/80 backdrop-blur-md border-b border-border"
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="text-primary"
        >
          <Globe size={32} />
        </motion.div>
        <div>
          <h1 className="font-fredoka text-xl text-primary text-glow">Tiny Planet</h1>
          <p className="text-xs text-muted-foreground">Caretaker Simulator</p>
        </div>
      </div>

      {/* Stats */}
      <div className="hidden sm:flex items-center gap-6">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Generation</p>
          <p className="font-fredoka text-lg text-secondary">{planetState.generation}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Score</p>
          <p className="font-fredoka text-lg text-primary">{score}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Health</p>
          <p className="font-fredoka text-lg text-accent">{Math.round(planetState.health)}%</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetGame}
          className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
          title="Restart Game"
        >
          <RotateCcw size={20} className="text-muted-foreground" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
          title="How to Play"
        >
          <Info size={20} className="text-muted-foreground" />
        </motion.button>
      </div>
    </motion.header>
  );
};

export default GameHeader;
