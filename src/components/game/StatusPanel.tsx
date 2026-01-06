import { motion } from 'framer-motion';
import { useGameStore, PlanetEmotion } from '@/store/gameStore';
import { Heart, Leaf, Zap, GraduationCap, Apple, Battery, Boxes, Sparkles } from 'lucide-react';

const emotionEmojis: Record<PlanetEmotion, string> = {
  happy: '😊',
  content: '🙂',
  worried: '😟',
  angry: '😠',
  crying: '😢',
  dying: '💀',
};

const emotionMessages: Record<PlanetEmotion, string> = {
  happy: "I'm thriving! Thank you!",
  content: "Things are going well...",
  worried: "I'm a bit concerned...",
  angry: "This pollution hurts!",
  crying: "Please help me...",
  dying: "I can't take much more...",
};

const StatusBar = ({
  label,
  value,
  icon,
  color,
  showLabel = true,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  showLabel?: boolean;
}) => (
  <div className="flex items-center gap-2">
    <div className={`${color}`}>{icon}</div>
    {showLabel && <span className="text-xs text-muted-foreground w-16">{label}</span>}
    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`h-full rounded-full ${color.replace('text-', 'bg-')}`}
      />
    </div>
    <span className="text-xs font-bold w-8 text-right">{Math.round(value)}%</span>
  </div>
);

const StatusPanel = () => {
  const {
    planetState,
    emotion,
    score,
    advanceGeneration,
    actionsThisGeneration,
    maxActionsPerGeneration,
  } = useGameStore();

  // ✅ Safe defaults
  const safePlanet = planetState ?? {
    generation: 0,
    health: 0,
    biodiversity: 0,
    pollution: 0,
    knowledge: 0,
    resources: { food: 0, energy: 0, materials: 0 },
  };
  const safeActions = actionsThisGeneration ?? 0;
  const safeMaxActions = maxActionsPerGeneration ?? 0;

  return (
    <div className="space-y-4">
      {/* Planet Status Card */}
      <div className="game-card-glow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.span
              key={emotion}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="text-4xl"
            >
              {emotionEmojis[emotion]}
            </motion.span>
            <div>
              <h3 className="font-fredoka text-lg text-primary capitalize">{emotion}</h3>
              <p className="text-xs text-muted-foreground font-comic">
                {emotionMessages[emotion]}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Generation</p>
            <p className="font-fredoka text-2xl text-secondary">{safePlanet.generation}</p>
          </div>
        </div>

        <div className="space-y-3">
          <StatusBar label="Health" value={safePlanet.health} icon={<Heart size={16} />} color="text-accent" />
          <StatusBar label="Nature" value={safePlanet.biodiversity} icon={<Leaf size={16} />} color="text-nature" />
          <StatusBar label="Pollution" value={safePlanet.pollution} icon={<Zap size={16} />} color="text-industry" />
          <StatusBar label="Knowledge" value={safePlanet.knowledge} icon={<GraduationCap size={16} />} color="text-primary" />
        </div>
      </div>

      {/* Resources Card */}
      <div className="game-card">
        <h4 className="font-fredoka text-sm text-muted-foreground mb-3">Resources</h4>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center">
            <Apple size={20} className="text-accent mb-1" />
            <span className="text-lg font-bold">{Math.round(safePlanet.resources.food)}</span>
            <span className="text-xs text-muted-foreground">Food</span>
          </div>
          <div className="flex flex-col items-center">
            <Battery size={20} className="text-primary mb-1" />
            <span className="text-lg font-bold">{Math.round(safePlanet.resources.energy)}</span>
            <span className="text-xs text-muted-foreground">Energy</span>
          </div>
          <div className="flex flex-col items-center">
            <Boxes size={20} className="text-industry mb-1" />
            <span className="text-lg font-bold">{Math.round(safePlanet.resources.materials)}</span>
            <span className="text-xs text-muted-foreground">Materials</span>
          </div>
        </div>
      </div>

      {/* Score & Next Generation */}
      <div className="flex gap-3">
        <div className="game-card flex-1 flex items-center justify-center gap-2">
          <Sparkles size={20} className="text-primary" />
          <span className="font-fredoka text-xl">{score ?? 0}</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={advanceGeneration}
          disabled={safeActions < safeMaxActions}
          className={`
            flex-1 py-3 px-4 rounded-xl font-fredoka text-sm
            transition-all duration-200
            ${safeActions >= safeMaxActions
              ? 'bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground shadow-lg'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
            }
          `}
        >
          {safeActions >= safeMaxActions
            ? '→ Next Generation'
            : `${safeActions}/${safeMaxActions} Actions`}
        </motion.button>
      </div>
    </div>
  );
};

export default StatusPanel;