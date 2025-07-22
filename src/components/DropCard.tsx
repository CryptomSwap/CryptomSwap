"use client";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface DropCardProps {
  id: string;
  image: string;
  title: string;
  creator: string;
  countdown: string;
  distance?: string;
  spotsLeft?: number;
  onClick: () => void;
  variant?: "default" | "compact" | "featured";
  locked?: boolean;
}

export default function DropCard({
  id,
  image,
  title,
  creator,
  countdown,
  distance,
  spotsLeft,
  onClick,
  variant = "default",
  locked = false
}: DropCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const containerClasses = {
    default: "aspect-[4/5]",
    compact: "aspect-[3/4]",
    featured: "aspect-[4/5]"
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ 
        scale: 1.02,
        rotateY: 2,
        boxShadow: "0 20px 40px rgba(255, 163, 26, 0.2)"
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl cursor-pointer
        glass-premium border border-white/10
        ${containerClasses[variant]}
      `}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover ${locked ? 'blur-md scale-105' : ''}`}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Locked overlay */}
      {locked && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40">
          <div className="flex flex-col items-center">
            <svg className="w-8 h-8 text-orange-400 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 17a2 2 0 002-2v-2a2 2 0 10-4 0v2a2 2 0 002 2zm6-2v-2a6 6 0 10-12 0v2a2 2 0 002 2h8a2 2 0 002-2z" />
            </svg>
            <span className="text-xs font-bold text-orange-300 bg-black/60 px-2 py-1 rounded-full">Unlock to view</span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-4">
        {/* Top section */}
        <div className="flex justify-between items-start">
          {spotsLeft && (
            <motion.div
              className="text-black text-xs font-black px-3 py-1 rounded-full"
              style={{ background: 'linear-gradient(135deg, #FFA31A, #FFA31A)' }}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🔥 Only {spotsLeft} left!
            </motion.div>
          )}
          
          {distance && (
            <div className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
              {distance}
            </div>
          )}
        </div>

        {/* Bottom section */}
        <div className="space-y-2">
          <h3 className="text-white font-black text-lg leading-tight">
            {title}
          </h3>
          <p className="text-gray-300 text-sm font-medium">
            {creator}
          </p>
          
          {/* Countdown */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#FFA31A' }} />
              <span className="text-sm font-bold" style={{ color: '#FFA31A' }}>
                {countdown}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Edge glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl border border-transparent"
        whileHover={{
          borderColor: 'rgba(255, 163, 26, 0.5)',
          boxShadow: '0 0 20px rgba(255, 163, 26, 0.3)'
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
} 