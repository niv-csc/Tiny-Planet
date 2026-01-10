// src/components/LoadingScreen.tsx
import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white">
      {/* Spinning Planet */}
      <motion.div
        className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 to-green-400 mb-6"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
      />

      {/* Pulsing Stars */}
      <div className="flex space-x-2">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-yellow-300 rounded-full"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
          />
        ))}
      </div>

      <p className="mt-6 text-lg font-semibold">Loading Tiny Planet…</p>
    </div>
  );
}