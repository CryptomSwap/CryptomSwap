"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import GlowingButton from "@/components/GlowingButton";

export default function WelcomePage() {
  const router = useRouter();
  const [inviteCode, setInviteCode] = useState("");

  const handleUnlockAccess = () => {
    if (inviteCode.trim()) {
      // In a real app, validate the invite code
      router.push("/login");
    } else {
      // For demo, allow access without code
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between relative overflow-hidden py-8">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-[#0F0F0F] to-[#1A1A1A]"></div>
      
      {/* Animated luxury background elements */}
      <motion.div
        className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-accent-orange/20 to-accent-orange/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-10 right-10 w-60 h-60 bg-gradient-to-tl from-accent-orange/20 to-accent-orange/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.6, 0.3],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-4 flex-1 flex flex-col justify-center">
        {/* PEEPZ Logo with pulse animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
          className="mb-12 flex justify-center"
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-black tracking-[0.2em] uppercase"
            animate={{
              scale: [1, 1.05, 1],
              filter: [
                'drop-shadow(0 0 20px rgba(255,153,0,0.5))',
                'drop-shadow(0 0 30px rgba(255,153,0,0.8))',
                'drop-shadow(0 0 20px rgba(255,153,0,0.5))'
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span style={{ color: '#FFA31A' }}>
              PEEPZ
            </span>
          </motion.h1>
        </motion.div>

        {/* Optional invite code input */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mb-12 max-w-sm mx-auto"
        >
          <input
            type="text"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            placeholder="Enter invite code (optional)"
            className="w-full input-premium rounded-xl px-6 py-4 text-text font-medium placeholder-gray-500 text-center text-lg"
          />
        </motion.div>

      </div>

      {/* UNLOCK ACCESS Button - positioned at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="relative z-10 px-4 mb-16"
      >
        <GlowingButton
          label="UNLOCK ACCESS"
          onClick={handleUnlockAccess}
          variant="primary"
          size="md"
        />
      </motion.div>

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent-orange/30 rounded-full"
            style={{
              left: `${15 + i * 10}%`,
              top: `${20 + i * 8}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
    </div>
  );
} 