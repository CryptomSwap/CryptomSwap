import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DropMediaViewer from "@/components/DropMediaViewer";
import { formatDistanceToNow } from "date-fns";

interface VaultDropViewerProps {
  drop: {
    id: string;
    title: string;
    creatorName: string;
    creatorAvatar: string;
    type: "image" | "video" | "audio";
    mediaUrl: string;
    unlockedAt: string;
    description?: string;
  };
  onClose: () => void;
}

export default function VaultDropViewer({ drop, onClose }: VaultDropViewerProps) {
  const [descOpen, setDescOpen] = useState(false);
  return (
    <AnimatePresence>
      {drop && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 40 }}
          transition={{ type: "spring", stiffness: 200, damping: 24 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className="relative w-full max-w-lg mx-auto bg-white/5 backdrop-blur-md border border-purple-600 rounded-2xl shadow-2xl p-6 flex flex-col items-center"
            style={{ boxShadow: '0 0 32px 4px #8A00D4, 0 0 16px 2px #FF9900' }}
          >
            {/* Close button */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl z-10"
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>
            {/* Confirmation */}
            <div className="text-2xl font-black text-[#FF9900] mb-2 drop-shadow-[0_0_8px_#FF9900]">✅ You unlocked '{drop.title}'</div>
            {/* Media */}
            <DropMediaViewer type={drop.type} mediaUrl={drop.mediaUrl} />
            {/* Metadata */}
            <div className="flex items-center gap-3 mt-4 mb-2">
              <img src={drop.creatorAvatar} alt={drop.creatorName} className="w-10 h-10 rounded-full border-2 border-[#8A00D4] shadow" />
              <span className="text-white font-bold text-lg">{drop.creatorName}</span>
            </div>
            <div className="text-xs text-gray-300 mb-2">
              {(() => {
                const date = new Date(drop.unlockedAt);
                return isNaN(date.getTime())
                  ? 'Unlocked (unknown date)'
                  : `Unlocked ${formatDistanceToNow(date, { addSuffix: true })}`;
              })()}
            </div>
            {/* Description */}
            {drop.description && (
              <div className="w-full mt-2">
                <button
                  className="text-xs text-[#FF9900] underline font-bold mb-1"
                  onClick={() => setDescOpen(o => !o)}
                >
                  {descOpen ? "Hide Description" : "Show Description"}
                </button>
                <AnimatePresence>
                  {descOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="bg-white/10 backdrop-blur rounded-lg p-3 text-white text-sm mt-1 border border-[#8A00D4]"
                    >
                      {drop.description}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 