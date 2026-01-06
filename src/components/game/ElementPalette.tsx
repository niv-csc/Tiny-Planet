import { motion } from "framer-motion";
import { useGameStore, ElementType } from "@/store/gameStore";
import {
  TreePine,
  Factory,
  Waves,
  Mountain,
  User,
  FlaskConical,
  GraduationCap,
  Hammer,
  Heart,
} from "lucide-react";

interface ElementInfo {
  type: ElementType;
  icon: React.ReactNode;
  label: string;
  description: string;
  category: "nature" | "industry" | "human";
}

const elements: ElementInfo[] = [
  { type: "tree", icon: <TreePine size={24} />, label: "Tree", description: "+Biodiversity, -Pollution", category: "nature" },
  { type: "river", icon: <Waves size={24} />, label: "River", description: "+Biodiversity, +Health", category: "nature" },
  { type: "mountain", icon: <Mountain size={24} />, label: "Mountain", description: "+Materials", category: "nature" },
  { type: "factory", icon: <Factory size={24} />, label: "Factory", description: "+Energy, +Pollution", category: "industry" },
  { type: "farmer", icon: <User size={24} />, label: "Farmer", description: "+Food", category: "human" },
  { type: "scientist", icon: <FlaskConical size={24} />, label: "Scientist", description: "+Knowledge, -Pollution", category: "human" },
  { type: "educator", icon: <GraduationCap size={24} />, label: "Educator", description: "+Knowledge", category: "human" },
  { type: "builder", icon: <Hammer size={24} />, label: "Builder", description: "Builds structures", category: "human" },
  { type: "healer", icon: <Heart size={24} />, label: "Healer", description: "+Health", category: "human" },
];

const categoryColors = {
  nature: "from-nature/20 to-nature/5 border-nature/30 hover:border-nature",
  industry: "from-industry/20 to-industry/5 border-industry/30 hover:border-industry",
  human: "from-human/20 to-human/5 border-human/30 hover:border-human",
};

const categoryTextColors = {
  nature: "text-nature",
  industry: "text-industry",
  human: "text-human",
};

const ElementPalette = () => {
  const { selectedElement, selectElement, actionsThisGeneration, maxActionsPerGeneration } = useGameStore();

  // Guard against undefined values
  const safeMax = maxActionsPerGeneration ?? 0;
  const actionsRemaining = safeMax - (actionsThisGeneration ?? 0);

  return (
    <div className="game-card-glow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-fredoka text-lg text-primary">Elements</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Actions:</span>
          <div className="flex gap-1">
            {Array.from({ length: safeMax }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`w-3 h-3 rounded-full ${
                  i < actionsRemaining ? "bg-secondary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
        {elements.map((element, index) => (
          <motion.button
            key={element.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => selectElement(selectedElement === element.type ? null : element.type)}
            disabled={actionsRemaining <= 0}
            className={`
              relative flex flex-col items-center gap-1 p-3 rounded-xl border-2 
              bg-gradient-to-b transition-all duration-200
              ${categoryColors[element.category]}
              ${selectedElement === element.type ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}
              ${actionsRemaining <= 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
          >
            <div className={`${categoryTextColors[element.category]}`}>{element.icon}</div>
            <span className="text-xs font-semibold truncate w-full text-center">
              {element.label}
            </span>

            {/* Tooltip on hover */}
            <div
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 
                         bg-card rounded-lg shadow-lg opacity-0 group-hover:opacity-100 
                         pointer-events-none transition-opacity z-50 whitespace-nowrap
                         hidden sm:block"
            >
              <p className="text-xs text-muted-foreground">{element.description}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {selectedElement && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-sm text-center text-muted-foreground font-comic"
        >
          Click on the planet to place {selectedElement}! 🎯
        </motion.p>
      )}
    </div>
  );
};

export default ElementPalette;