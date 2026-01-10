import { motion } from 'framer-motion';
import Planet from './Planet';
import ElementPalette from './ElementPalette';
import StatusPanel from './StatusPanel';
import GameHeader from './GameHeader';
import Tutorial from './Tutorial';
import { useGameStore } from '@/store/gameStore';

const GameScreen = () => {
  const { increaseNature, increaseKnowledge, increaseHappiness } = useGameStore();

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <GameHeader />

      <div className="flex-1 flex flex-col lg:flex-row p-4 gap-4 overflow-hidden">
        {/* Planet Area - Main focus */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 lg:flex-[2] min-h-[400px] lg:min-h-0 relative"
        >
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <Planet />
          </div>

          {/* Floating tip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 
                       px-4 py-2 rounded-full bg-card/90 backdrop-blur-sm
                       border border-border text-sm text-muted-foreground font-comic"
          >
            🖱️ Drag to rotate • Scroll to zoom • Click to place
          </motion.div>
        </motion.div>

        {/* Side Panel */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full lg:w-80 xl:w-96 space-y-4 overflow-y-auto"
        >
          <StatusPanel />
        </motion.div>
      </div>

      {/* Bottom Element Palette */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-4"
      >
        <ElementPalette />
      </motion.div>

      {/* Tutorial Overlay */}
      <Tutorial />
    </div>
  );
};

export default GameScreen;