"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
// TODO: Replace with shadcn/ui dialog when available

interface PopupProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Popup({ 
  open, 
  onClose, 
  children, 
  title,
  size = 'md' 
}: PopupProps) {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'max-w-sm';
      case 'md': return 'max-w-md';
      case 'lg': return 'max-w-lg';
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
            className={`w-full ${getSizeClasses()} mx-4 bg-surface rounded-t-2xl shadow-2xl border border-gray-700 overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-600 rounded-full"></div>
            </div>

            {/* Header */}
            {title && (
              <div className="px-6 py-4 border-b border-gray-700">
                <h3 className="font-bold text-lg text-text">{title}</h3>
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              {children}
            </div>

            {/* Close button */}
            <div className="px-6 pb-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full text-center text-accent-orange font-bold py-2 rounded-full border border-accent-orange/30 hover:bg-accent-orange/10 transition-colors"
                onClick={onClose}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 