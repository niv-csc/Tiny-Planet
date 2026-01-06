import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";

const StartScreen = () => {
  const { startGame } = useGameStore();
  const [stars, setStars] = useState<{ x: number; y: number }[]>([]);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const starArray = Array.from({ length: 50 }).map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      }));
      setStars(starArray);
    }
  }, []);

  const handleStart = () => {
    setFadeOut(true);
    setTimeout(() => {
      startGame(); // switch to main game state
    }, 1000); // match fade duration
  };

  return (
    <motion.div
      className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {(stars ?? []).map((star, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-foreground rounded-full"
            initial={{ x: star.x, y: star.y, opacity: 0.2 }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Start Game Button */}
      <button
        onClick={handleStart}
        className="z-10 mt-8 px-6 py-3 rounded-full bg-foreground text-background text-lg font-semibold flex items-center gap-2 hover:scale-105 transition-transform"
      >
        <Play className="w-5 h-5" />
        Start Game
      </button>
    </motion.div>
  );
};

export default StartScreen;