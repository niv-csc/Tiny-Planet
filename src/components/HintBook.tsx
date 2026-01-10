import { useState } from "react";

const caretakerTips = [
  "🌱 Plant more trees to keep the planet healthy.",
  "💧 Conserve water — every drop matters.",
  "⚡ Use renewable energy sources whenever possible.",
  "🗑️ Reduce waste by recycling and composting.",
  "🐝 Protect biodiversity — care for animals and pollinators.",
  "🌍 Balance resources to keep ecosystems thriving.",
];

export default function HintBook() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={() => setOpen(true)}
      >
        📖 Caretaker’s Journal
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Caretaker’s Journal</h2>
            <p className="mb-4 text-gray-700">
              Gentle reminders to keep your planet flourishing:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {caretakerTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
            <button
              className="mt-4 px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}