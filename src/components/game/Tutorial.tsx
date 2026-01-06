import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { X, TreePine, Factory, Users, ArrowRight, Sparkles } from 'lucide-react';

const Tutorial = () => {
  const { showTutorial, closeTutorial } = useGameStore();

  return (
    <AnimatePresence>
      {showTutorial && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            className="relative w-full max-w-lg game-card-glow overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={closeTutorial}
              className="absolute top-4 right-4 p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors z-10"
            >
              <X size={20} className="text-muted-foreground" />
            </button>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="text-primary" size={28} />
                <h2 className="font-fredoka text-2xl text-primary">How to Play</h2>
              </div>

              <div className="space-y-6">
                {/* Step 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-nature/20 flex items-center justify-center">
                    <TreePine className="text-nature" size={20} />
                  </div>
                  <div>
                    <h3 className="font-nunito font-bold text-foreground mb-1">Place Elements</h3>
                    <p className="text-sm text-muted-foreground font-comic">
                      Select elements from the palette and click on the planet to place them. 
                      Trees help nature, factories produce energy!
                    </p>
                  </div>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-industry/20 flex items-center justify-center">
                    <Factory className="text-industry" size={20} />
                  </div>
                  <div>
                    <h3 className="font-nunito font-bold text-foreground mb-1">Keep Balance</h3>
                    <p className="text-sm text-muted-foreground font-comic">
                      Watch your planet's health! Too much pollution makes your planet sad. 
                      Balance industry with nature.
                    </p>
                  </div>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-human/20 flex items-center justify-center">
                    <Users className="text-human" size={20} />
                  </div>
                  <div>
                    <h3 className="font-nunito font-bold text-foreground mb-1">Guide Humans</h3>
                    <p className="text-sm text-muted-foreground font-comic">
                      Farmers grow food, Scientists reduce pollution, Educators spread knowledge.
                      Each human helps in unique ways!
                    </p>
                  </div>
                </motion.div>

                {/* Step 4 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <ArrowRight className="text-secondary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-nunito font-bold text-foreground mb-1">Advance Generations</h3>
                    <p className="text-sm text-muted-foreground font-comic">
                      After placing 5 elements, advance to the next generation. 
                      Your planet evolves based on your choices!
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Start button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={closeTutorial}
                className="w-full mt-8 py-4 rounded-xl font-fredoka text-lg
                          bg-gradient-to-r from-secondary to-secondary/80 
                          text-secondary-foreground shadow-lg"
              >
                Let's Begin! 🌍
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Tutorial;
