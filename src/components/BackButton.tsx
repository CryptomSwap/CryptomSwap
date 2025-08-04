"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  className?: string;
  onClick?: () => void;
}

export default function BackButton({ className = "", onClick }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
              className={`w-10 h-10 rounded-full bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 hover:border-purple-500/50 flex items-center justify-center transition-all duration-300 hover:bg-gray-800/70 ${className}`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        className="text-white"
      >
        <path
          d="M19 12H5M12 19l-7-7 7-7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
} 