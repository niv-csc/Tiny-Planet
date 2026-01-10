import { useState } from "react";

interface NPCProps {
  name: string;
  sprite: string; // path to character image
  dialogue?: string[];
  onTriggerEvent?: () => void; // optional callback for planet events
}

export default function NPC({ name, sprite, dialogue = [], onTriggerEvent }: NPCProps) {
  const [showDialogue, setShowDialogue] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);

  const handleClick = () => {
    if (!showDialogue) {
      setShowDialogue(true);
      setLineIndex(0);
      if (onTriggerEvent) onTriggerEvent(); // trigger event when dialogue starts
    } else if (lineIndex < dialogue.length - 1) {
      setLineIndex(lineIndex + 1);
    } else {
      setShowDialogue(false);
    }
  };

  return (
    <div className="cursor-pointer flex flex-col items-center" onClick={handleClick}>
      {/* Character sprite */}
      <img src={sprite} alt={name} className="w-20 h-20 rounded-lg shadow-md" />

      {/* Dialogue box */}
      {showDialogue && (
        <div className="mt-2 p-3 bg-white rounded shadow text-sm max-w-xs">
          <p>
            <strong>{name}:</strong> {dialogue[lineIndex]}
          </p>
          <p className="text-gray-500 text-xs">(click to continue)</p>
        </div>
      )}
    </div>
  );
}