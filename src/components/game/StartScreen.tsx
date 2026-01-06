import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { Globe, Play, Sparkles, Heart, Leaf, Users } from "lucide-react";
import { useEffect, useState } from "react";

const StartScreen = () => {
  const { startGame } = useGameStore();
  const [stars, setStars] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    // Only run on client where window is defined
    const starArray = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));
    setStars(starArray);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star, i) => (
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

      {/* ...rest of your component unchanged... */}
    </div>
  );
};

export default StartScreen;