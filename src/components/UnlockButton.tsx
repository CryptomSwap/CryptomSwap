"use client";
import React from "react";
import { motion } from "framer-motion";

interface UnlockButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export default function UnlockButton({ 
  children, 
  loading = false, 
  variant = 'primary',
  size = 'md',
  disabled,
  ...props 
}: UnlockButtonProps) {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'py-2 px-4 text-sm';
      case 'md': return 'py-3 px-6 text-base';
      case 'lg': return 'py-4 px-8 text-lg';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
          case 'primary': return 'bg-gradient-to-r from-accent-orange to-accent-orange text-white';
    case 'secondary': return 'bg-accent-orange text-white';
    }
  };

  return (
    <motion.button
      className={`w-full rounded-full font-medium text-premium capitalize ${getSizeClasses()} ${getVariantClasses()} relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed`}
      disabled={disabled || loading}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 10px 25px rgba(255, 163, 26, 0.3)"
      }}
      whileTap={{ scale: 0.98 }}
      {...(props as any)}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Content */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: loading ? 0.7 : 1 }}
      >
        {loading ? (
          <>
            <motion.div
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span>Unlocking...</span>
          </>
        ) : (
          children
        )}
      </motion.div>

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
} 