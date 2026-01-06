import { create } from 'zustand';

export type ElementType = 'tree' | 'factory' | 'river' | 'mountain' | 'farmer' | 'scientist' | 'educator' | 'builder' | 'healer';

export type PlanetEmotion = 'happy' | 'content' | 'worried' | 'angry' | 'crying' | 'dying';

export interface PlacedElement {
  id: string;
  type: ElementType;
  position: { x: number; y: number; z: number };
  generationPlaced: number;
}

export interface PlanetState {
  health: number;
  pollution: number;
  biodiversity: number;
  knowledge: number;
  generation: number;
  resources: {
    food: number;
    energy: number;
    materials: number;
  };
}

export interface GameState {
  // Planet State
  planetState: PlanetState;
  emotion: PlanetEmotion;
  
  // Elements
  placedElements: PlacedElement[];
  selectedElement: ElementType | null;
  
  // UI State
  actionsThisGeneration: number;
  maxActionsPerGeneration: number;
  score: number;
  isPlaying: boolean;
  showTutorial: boolean;
  
  // Actions
  selectElement: (type: ElementType | null) => void;
  placeElement: (position: { x: number; y: number; z: number }) => void;
  advanceGeneration: () => void;
  updatePlanetState: () => void;
  startGame: () => void;
  resetGame: () => void;
  closeTutorial: () => void;
}

const ELEMENT_EFFECTS: Record<ElementType, Partial<PlanetState>> = {
  tree: { biodiversity: 5, pollution: -3, health: 2 },
  factory: { pollution: 8, resources: { food: 0, energy: 10, materials: 5 } },
  river: { biodiversity: 7, health: 3 },
  mountain: { biodiversity: 3, resources: { food: 0, energy: 0, materials: 8 } },
  farmer: { resources: { food: 15, energy: 0, materials: 0 }, biodiversity: -1 },
  scientist: { pollution: -5, knowledge: 8, health: 2 },
  educator: { knowledge: 10 },
  builder: { resources: { food: 0, energy: -2, materials: -5 }, pollution: 2 },
  healer: { health: 8, biodiversity: 2 },
};

const calculateEmotion = (health: number): PlanetEmotion => {
  if (health >= 80) return 'happy';
  if (health >= 60) return 'content';
  if (health >= 40) return 'worried';
  if (health >= 20) return 'angry';
  if (health >= 5) return 'crying';
  return 'dying';
};

const calculateHealth = (state: PlanetState): number => {
  const baseHealth = 50;
  const pollutionPenalty = state.pollution * 0.7;
  const biodiversityBonus = state.biodiversity * 0.4;
  const knowledgeBonus = state.knowledge * 0.2;
  
  return Math.max(0, Math.min(100, 
    baseHealth - pollutionPenalty + biodiversityBonus + knowledgeBonus
  ));
};

const initialPlanetState: PlanetState = {
  health: 70,
  pollution: 10,
  biodiversity: 30,
  knowledge: 20,
  generation: 1,
  resources: {
    food: 50,
    energy: 50,
    materials: 50,
  },
};

export const useGameStore = create<GameState>((set, get) => ({
  planetState: { ...initialPlanetState },
  emotion: 'content',
  placedElements: [],
  selectedElement: null,
  actionsThisGeneration: 0,
  maxActionsPerGeneration: 5,
  score: 0,
  isPlaying: false,
  showTutorial: true,

  selectElement: (type) => set({ selectedElement: type }),

  placeElement: (position) => {
    const { selectedElement, placedElements, actionsThisGeneration, maxActionsPerGeneration, planetState } = get();
    
    if (!selectedElement || actionsThisGeneration >= maxActionsPerGeneration) return;

    const newElement: PlacedElement = {
      id: `${selectedElement}-${Date.now()}`,
      type: selectedElement,
      position,
      generationPlaced: planetState.generation,
    };

    const effects = ELEMENT_EFFECTS[selectedElement];
    const newPlanetState = { ...planetState };
    
    // Apply effects
    if (effects.biodiversity) newPlanetState.biodiversity = Math.max(0, Math.min(100, newPlanetState.biodiversity + effects.biodiversity));
    if (effects.pollution) newPlanetState.pollution = Math.max(0, Math.min(100, newPlanetState.pollution + effects.pollution));
    if (effects.knowledge) newPlanetState.knowledge = Math.max(0, Math.min(100, newPlanetState.knowledge + effects.knowledge));
    if (effects.health) newPlanetState.health = Math.max(0, Math.min(100, newPlanetState.health + effects.health));
    
    if (effects.resources) {
      newPlanetState.resources = {
        food: Math.max(0, Math.min(100, newPlanetState.resources.food + (effects.resources.food || 0))),
        energy: Math.max(0, Math.min(100, newPlanetState.resources.energy + (effects.resources.energy || 0))),
        materials: Math.max(0, Math.min(100, newPlanetState.resources.materials + (effects.resources.materials || 0))),
      };
    }
    
    // Recalculate health based on all factors
    newPlanetState.health = calculateHealth(newPlanetState);
    
    const newScore = get().score + Math.floor(newPlanetState.health);

    set({
      placedElements: [...placedElements, newElement],
      actionsThisGeneration: actionsThisGeneration + 1,
      planetState: newPlanetState,
      emotion: calculateEmotion(newPlanetState.health),
      score: newScore,
    });
  },

  advanceGeneration: () => {
    const { planetState, placedElements } = get();
    
    // Natural regeneration and decay
    const newPlanetState = { ...planetState };
    newPlanetState.generation += 1;
    
    // Trees grow and help over time
    const treeCount = placedElements.filter(e => e.type === 'tree').length;
    newPlanetState.biodiversity = Math.min(100, newPlanetState.biodiversity + treeCount * 0.5);
    newPlanetState.pollution = Math.max(0, newPlanetState.pollution - treeCount * 0.3);
    
    // Factories continue to pollute
    const factoryCount = placedElements.filter(e => e.type === 'factory').length;
    newPlanetState.pollution = Math.min(100, newPlanetState.pollution + factoryCount * 2);
    
    // Scientists help reduce pollution
    const scientistCount = placedElements.filter(e => e.type === 'scientist').length;
    newPlanetState.pollution = Math.max(0, newPlanetState.pollution - scientistCount * 1.5);
    
    // Educators spread knowledge
    const educatorCount = placedElements.filter(e => e.type === 'educator').length;
    newPlanetState.knowledge = Math.min(100, newPlanetState.knowledge + educatorCount * 2);
    
    // Healers restore health
    const healerCount = placedElements.filter(e => e.type === 'healer').length;
    newPlanetState.health = Math.min(100, newPlanetState.health + healerCount * 3);
    
    // Resource consumption
    newPlanetState.resources.food = Math.max(0, newPlanetState.resources.food - 5);
    newPlanetState.resources.energy = Math.max(0, newPlanetState.resources.energy - 3);
    
    // Recalculate final health
    newPlanetState.health = calculateHealth(newPlanetState);
    
    set({
      planetState: newPlanetState,
      emotion: calculateEmotion(newPlanetState.health),
      actionsThisGeneration: 0,
    });
  },

  updatePlanetState: () => {
    const { planetState } = get();
    const newHealth = calculateHealth(planetState);
    set({
      planetState: { ...planetState, health: newHealth },
      emotion: calculateEmotion(newHealth),
    });
  },

  startGame: () => set({ isPlaying: true }),
  
  resetGame: () => set({
    planetState: { ...initialPlanetState },
    emotion: 'content',
    placedElements: [],
    selectedElement: null,
    actionsThisGeneration: 0,
    score: 0,
    isPlaying: false,
    showTutorial: true,
  }),

  closeTutorial: () => set({ showTutorial: false }),
}));
