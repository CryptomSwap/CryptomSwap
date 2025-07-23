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
  alreadyUnlocked?: boolean;
  showVaultCTA?: boolean;
  onViewVault?: () => void;
}

export default function FomoPopup({
  message,
  onUnlock,
  onDismiss,
  countdownSec = 8,
  dropId,
  visible,
  alreadyUnlocked = false,
  showVaultCTA = false,
  onViewVault
}: FomoPopupProps) {
  const [progress, setProgress] = useState(100);
  useEffect(() => {
    if (!visible || alreadyUnlocked) return;
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
  }, [visible, dropId, alreadyUnlocked]);

  // Extract spots left and drop title from message (simple regex for demo)
  const match = message.match(/Only (\d+) spots left.*?"([^"]+)"/);
  const spotsLeft = match ? match[1] : undefined;
  const dropTitle = match ? match[2] : undefined;

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-[320px] w-full p-6 rounded-3xl backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl ring-1 ring-orange-400/60 ring-offset-2 animate-fade-in"
          >
            {/* Close button */}
            <button
              className="absolute top-3 right-3 text-white/70 hover:text-white text-xl"
              onClick={onDismiss}
              aria-label="Close popup"
              tabIndex={0}
            >
              ×
            </button>
            {/* Header */}
            <h3 className="text-lg font-bold text-white text-center mb-2">
              🔥 Only {spotsLeft || "-"} spots left!
            </h3>
            <p className="text-sm text-white/80 text-center mb-4">
              Be one of the few to unlock
              {dropTitle && (
                <> "<span className="font-semibold">{dropTitle}</span>"</>
              )}
            </p>
            {/* Variant 1: Already Unlocked */}
            {alreadyUnlocked && !showVaultCTA && (
              <>
                <button disabled className="w-full text-white font-bold text-sm py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 opacity-60 cursor-default animate-pulse mb-2">
                  ✅ Already Unlocked
                </button>
                <p className="text-center text-white/70 text-sm mt-3">You’ve already unlocked this drop. Check your Vault to view it.</p>
              </>
            )}
            {/* Variant 2: View in Vault CTA */}
            {showVaultCTA && (
              <button
                className="mt-4 w-full text-white font-bold text-sm py-3 rounded-full bg-gradient-to-r from-purple-500 to-orange-500 hover:scale-105 transition-transform"
                onClick={onViewVault}
              >
                View in Vault
              </button>
            )}
            {/* Default: Unlock Now */}
            {!alreadyUnlocked && !showVaultCTA && (
              <>
                <button
                  className="w-full text-white font-bold text-sm py-3 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 shadow-xl hover:scale-[1.02] transition-transform mb-2"
                  onClick={onUnlock}
                >
                  Unlock Now
                </button>
                {/* Progress Bar */}
                <div className="mt-3 w-full h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-400 to-purple-500 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 