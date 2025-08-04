import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface UnlockSuccessPopupProps {
  dropTitle: string;
  onViewNow: () => void;
  onLater: () => void;
  visible: boolean;
}

export default function UnlockSuccessPopup({ dropTitle, onViewNow, onLater, visible }: UnlockSuccessPopupProps) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      onLater();
    }, 10000);
    return () => clearTimeout(timer);
  }, [visible, onLater]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            exit={{ y: 40 }}
            className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-xs w-full shadow-2xl border border-white/20 flex flex-col items-center neon-glow"
            style={{ boxShadow: '0 0 32px 4px #581c8755, 0 0 16px 2px #8A00D455' }}
          >
            <div className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl cursor-pointer" onClick={onLater} aria-label="Close">×</div>
            <div className="text-3xl mb-2">✅</div>
                    <h2 className="text-white font-black text-2xl mb-1 text-center drop-shadow-[0_0_8px_#581c87]">Unlocked!</h2>
        <p className="text-gray-200 text-center mb-6">You just unlocked <span className="text-accent-orange font-bold">{dropTitle}</span></p>
            <button
              className="w-full bg-[#581c87] text-white font-bold py-2 rounded-full shadow-lg hover:shadow-[0_0_8px_#581c87] transition mb-2 text-lg flex items-center justify-center gap-2"
              onClick={onViewNow}
            >
              <span role="img" aria-label="fire">🔥</span> View Now
            </button>
            <button
              className="w-full border border-white/40 text-white font-bold py-2 rounded-full bg-white/10 hover:bg-white/20 transition text-lg flex items-center justify-center gap-2"
              onClick={onLater}
            >
              <span role="img" aria-label="save">💾</span> Later
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 