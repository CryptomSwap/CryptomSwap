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
    <div className="min-h-screen bg-background relative overflow-hidden" style={{
      background: 'radial-gradient(circle at center, #2a0030 0%, #1a001f 100%)'
    }}>
      {/* Animated luxury background elements */}
      <motion.div
        className="absolute top-20 left-20 w-60 h-60 bg-gradient-to-br from-purple-600/10 to-purple-800/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.3, 0.1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tl from-purple-600/10 to-purple-800/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
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
            className="text-4xl md:text-5xl font-black tracking-[0.2em] uppercase peepz-logo"
            animate={{
              scale: [1, 1.05, 1],
              filter: [
                'drop-shadow(0 0 20px rgba(255,255,255,0.5))',
                'drop-shadow(0 0 30px rgba(255,255,255,0.8))',
                'drop-shadow(0 0 20px rgba(255,255,255,0.5))'
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span style={{ 
              color: '#ffffff',
              textShadow: '0 0 15px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3)',
              fontWeight: 900,
              WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)'
            }}>
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