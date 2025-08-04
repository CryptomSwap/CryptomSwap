"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { saveCurrentUser } from "@/lib/storage";
import { mockUsers } from "@/lib/mockData";
import LoginForm from "@/components/Auth/LoginForm";
import Logo from "@/components/Logo";

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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden" 
         style={{
           background: 'radial-gradient(circle at center, #2a0030 0%, #1a001f 100%)'
         }}>
      
      {/* Subtle blurred background image */}
      <div className="absolute inset-0 opacity-5"
           style={{
             backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23a855f7" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
             backgroundSize: '60px 60px'
           }}>
      </div>

      {/* Animated luxury background elements */}
      <motion.div
        className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2], rotate: [0, 180, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-60 h-60 bg-gradient-to-tl from-purple-600/20 to-purple-800/20 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3], rotate: [360, 180, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Animated shimmer effect on edges */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ 
          background: [
            'linear-gradient(45deg, transparent 30%, rgba(168, 85, 247, 0.1) 50%, transparent 70%)',
            'linear-gradient(45deg, transparent 30%, rgba(168, 85, 247, 0.05) 50%, transparent 70%)',
            'linear-gradient(45deg, transparent 30%, rgba(168, 85, 247, 0.1) 50%, transparent 70%)'
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="w-full max-w-md z-10 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 w-full"
        >
          <Logo 
            size="lg" 
            animated={true} 
            showTypewriter={true}
            className="mb-4"
          />
        </motion.div>
        
        <LoginForm onLogin={handleLogin} isLoading={isLoading} error={error} />
        
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <p className="text-sm text-purple-300 font-light tracking-wide">
            Demo accounts: fan@example.com (fan) or creator@example.com (creator)
          </p>
        </motion.div>
      </div>
    </div>
  );
} 