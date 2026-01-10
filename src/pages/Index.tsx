import { useGameStore } from '@/store/gameStore';
import StartScreen from '@/components/game/StartScreen';
import GameScreen from '@/components/game/GameScreen';
import HintBook from '@/components/HintBook'; // 👈 Add this line

const Index = () => {
  const { isPlaying } = useGameStore();

  return isPlaying ? (
    <GameScreen />
  ) : (
    <div className="relative">
      <StartScreen />
      <div className="absolute top-4 right-4 z-50">
        <HintBook /> {/* 👈 Renders the Caretaker’s Journal button */}
      </div>
    </div>
  );
};

export default Index;