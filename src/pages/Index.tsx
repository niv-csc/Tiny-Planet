import { useGameStore } from '@/store/gameStore';
import StartScreen from '@/components/game/StartScreen';
import GameScreen from '@/components/game/GameScreen';

const Index = () => {
  const { isPlaying } = useGameStore();

  return isPlaying ? <GameScreen /> : <StartScreen />;
};

export default Index;
