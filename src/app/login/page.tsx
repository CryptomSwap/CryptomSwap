"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { saveCurrentUser } from "@/lib/storage";
import { mockUsers } from "@/lib/mockData";
import LoginForm from "@/components/Auth/LoginForm";

// Looping typewriter effect component
const LoopingTypewriterText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (isTyping && currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 150); // Speed of typing

      return () => clearTimeout(timer);
    } else if (currentIndex >= text.length) {
      // Text is complete, wait 2 seconds then fade out and reset
      setIsTyping(false);
      const fadeTimer = setTimeout(() => {
        setDisplayText('');
        setCurrentIndex(0);
        setIsTyping(true);
      }, 2000); // 2 second delay before restarting

      return () => clearTimeout(fadeTimer);
    }
  }, [currentIndex, text, isTyping]);

  return (
    <motion.span 
      animate={!isTyping ? { opacity: [1, 0] } : { opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="inline-block min-h-[1.2em]"
    >
      {displayText}
    </motion.span>
  );
};

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string, role: "fan" | "creator") => {
    setIsLoading(true);
    setError(null);
    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Mock login logic - find user by email and role
    const user = mockUsers.find(u => u.email === email && u.role === role);
    if (user) {
      saveCurrentUser(user);
      if (role === "creator") {
        router.push("/creator");
      } else {
        router.push("/fan/explore");
      }
    } else {
      setError("Invalid credentials. Try: fan@example.com (fan) or creator@example.com (creator)");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Metallic black background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
           style={{
             background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 25%, #0a0a0a 50%, #1a1a1a 75%, #000000 100%)',
             backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255, 163, 26, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(138, 0, 212, 0.1) 0%, transparent 50%)'
           }}>
      </div>
      {/* Metallic texture overlay */}
      <div className="absolute inset-0 opacity-30"
           style={{
             backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)',
             backgroundSize: '4px 4px'
           }}>
      </div>
      {/* Animated luxury background elements */}
      <motion.div
        className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-accent-orange/20 to-accent-orange/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2], rotate: [0, 180, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-60 h-60 bg-gradient-to-tl from-accent-orange/20 to-accent-orange/20 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3], rotate: [360, 180, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="w-full max-w-md z-10 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 w-full"
        >
          <motion.h1
            className="font-black text-6xl mb-4 tracking-[0.2em] uppercase text-center peepz-logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span style={{ color: '#ffa31a' }}>
              <LoopingTypewriterText text="PEEPZ" />
            </span>
          </motion.h1>
        </motion.div>
        <LoginForm onLogin={handleLogin} isLoading={isLoading} error={error} />
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <p className="text-sm text-gray-500 font-light tracking-wide">
            Demo accounts: fan@example.com (fan) or creator@example.com (creator)
          </p>
        </motion.div>
      </div>
    </div>
  );
} 