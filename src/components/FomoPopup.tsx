"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FomoPopupProps {
  message: string;
  onUnlock: () => void;
  onDismiss: () => void;
  countdownSec?: number;
  dropId: string;
  visible: boolean;
}

export default function FomoPopup({ message, onUnlock, onDismiss, countdownSec = 8, dropId, visible }: FomoPopupProps) {
  const [progress, setProgress] = useState(100);
  useEffect(() => {
    if (!visible) return;
    setProgress(100);
    const total = countdownSec * 1000;
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.max(0, 100 - (elapsed / total) * 100));
      if (elapsed >= total) {
        clearInterval(interval);
        onDismiss();
      }
    }, 50);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [visible, dropId]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <div className="relative bg-[#0A0A0A] border-2 border-[#FF9900] rounded-2xl shadow-xl p-4 flex flex-col items-center neon-glow pointer-events-auto w-[90vw] max-w-sm">
            {/* Close button */}
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl z-10"
              onClick={onDismiss}
              aria-label="Close popup"
            >
              ×
            </button>
            <div className="text-white font-bold text-center mb-2 text-base drop-shadow-[0_0_8px_#FF9900]">
              {message}
            </div>
            <button
              className="w-full bg-[#FF9900] text-black font-bold py-2 rounded-full shadow-lg hover:shadow-[0_0_8px_#FF9900] transition mb-2"
              onClick={onUnlock}
            >
              Unlock Now
            </button>
            <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
              <div
                className="h-2 bg-gradient-to-r from-[#FF9900] to-[#8A00D4] rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 