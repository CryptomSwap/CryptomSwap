"use client";
import React from "react";
import { motion } from "framer-motion";

interface GlowingButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "full-width";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
}

export default function GlowingButton({
  label,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false
}: GlowingButtonProps) {
  const sizeClasses = {
    sm: "px-6 py-3 text-sm",
    md: "px-8 py-4 text-base",
    lg: "px-12 py-6 text-lg"
  };

  const variantClasses = {
    primary: "text-white font-black",
    secondary: "text-white font-black",
    "full-width": "w-full text-white font-black"
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative overflow-hidden rounded-full font-medium text-premium capitalize
        border-2 border-white/20 shadow-2xl
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
      style={{ 
        background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
        boxShadow: '0 8px 32px rgba(168, 85, 247, 0.3)'
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 25px 50px rgba(168, 85, 247, 0.4)"
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl opacity-50"
        style={{ background: 'linear-gradient(135deg, #a855f7, #7c3aed)' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Content */}
      <motion.span className="relative z-10 flex items-center justify-center">
        {loading ? (
          <>
            <div className="spinner mr-3"></div>
            Loading...
          </>
        ) : (
          label
        )}
      </motion.span>
    </motion.button>
  );
} 