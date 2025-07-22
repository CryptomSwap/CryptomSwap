"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { saveCurrentUser } from "@/lib/storage";
import { mockUsers } from "@/lib/mockData";

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
      style={{ color: '#FFA31A' }}
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'fan' | 'creator'>('fan');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      alert('Please enter email and password');
      return;
    }

    setIsLoading(true);

    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock login logic - find user by email and role
    const user = mockUsers.find(u => u.email === email && u.role === role);
    
    if (user) {
      // Save user to localStorage
      saveCurrentUser(user);
      
      // Redirect based on role
      if (role === 'creator') {
        router.push('/creator');
      } else {
        router.push('/fan/explore');
      }
    } else {
      alert('Invalid credentials. Try: fan@example.com (fan) or creator@example.com (creator)');
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

      <div className="w-full max-w-md z-10 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 w-full"
        >
          <motion.h1 
            className="font-black text-6xl mb-4 tracking-[0.2em] uppercase text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <LoopingTypewriterText text="PEEPZ" />
          </motion.h1>
        </motion.div>
        
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div 
            className="glass-premium rounded-2xl p-8 border border-white/10 shadow-2xl"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
            }}
          >
            <motion.h2 
              className="font-black text-2xl mb-8 text-text text-center tracking-wider uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Login
            </motion.h2>
            
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
              >
                <label className="block text-sm font-bold text-text mb-3 tracking-wide uppercase">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full input-premium rounded-xl px-4 py-3 text-text font-inter font-medium placeholder-gray-500"
                  placeholder="Enter your email"
                  required
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
                className="mt-16"
              >
                <label className="block text-sm font-bold text-text mb-3 tracking-wide uppercase">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full input-premium rounded-xl px-4 py-3 text-text font-inter font-medium placeholder-gray-500"
                  placeholder="Enter your password"
                  required
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6 }}
              >
                <div className="flex justify-center">
                  <motion.div 
                    className="relative bg-gray-800/50 backdrop-blur-xl rounded-3xl p-1 border border-gray-700/50"
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.button
                      type="button"
                      onClick={() => setRole(role === 'fan' ? 'creator' : 'fan')}
                      className="relative w-28 h-10 rounded-3xl font-bold transition-all duration-300 tracking-wide uppercase text-sm flex items-center justify-center overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Background gradient */}
                      <motion.div
                        className="absolute inset-0 rounded-3xl"
                        animate={{
                          background: role === 'fan' 
                            ? 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 50%, #C084FC 100%)'
                            : 'linear-gradient(135deg, #FFA31A 0%, #FF8C00 50%, #FF6B35 100%)'
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      />
                      
                      {/* Sliding indicator */}
                      <motion.div
                        className="absolute top-1 left-1 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30"
                        animate={{
                          x: role === 'fan' ? 0 : 66
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          <motion.div
                            className="w-1.5 h-1.5 rounded-full"
                            animate={{
                              background: role === 'fan' ? '#8B5CF6' : '#FFA31A'
                            }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                          />
                        </div>
                      </motion.div>
                      
                      {/* Text labels */}
                      <div className="flex w-full justify-between px-2 relative z-10">
                        <motion.span 
                          className={`font-bold transition-colors duration-300 text-xs ${
                            role === 'fan' ? 'text-white' : 'text-gray-400'
                          }`}
                          animate={{
                            opacity: role === 'fan' ? 1 : 0.6,
                            scale: role === 'fan' ? 1 : 0.95
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          Fan
                        </motion.span>
                        <motion.span 
                          className={`font-bold transition-colors duration-300 text-xs ${
                            role === 'creator' ? 'text-white' : 'text-gray-400'
                          }`}
                          animate={{
                            opacity: role === 'creator' ? 1 : 0.6,
                            scale: role === 'creator' ? 1 : 0.95
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          Creator
                        </motion.span>
                      </div>
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              className="w-full h-16 bg-surface/50 border border-white/10 rounded-3xl mt-8 relative overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
              onMouseDown={(e) => {
                const startX = e.clientX;
                const handleMouseMove = (e: MouseEvent) => {
                  const deltaX = e.clientX - startX;
                  if (deltaX > 100) { // Slide threshold
                    handleSubmit(e as any);
                  }
                };
                const handleMouseUp = () => {
                  document.removeEventListener('mousemove', handleMouseMove);
                  document.removeEventListener('mouseup', handleMouseUp);
                };
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
              }}
              onTouchStart={(e) => {
                const startX = e.touches[0].clientX;
                const handleTouchMove = (e: TouchEvent) => {
                  const deltaX = e.touches[0].clientX - startX;
                  if (deltaX > 100) { // Slide threshold
                    handleSubmit(e as any);
                  }
                };
                const handleTouchEnd = () => {
                  document.removeEventListener('touchmove', handleTouchMove);
                  document.removeEventListener('touchend', handleTouchEnd);
                };
                document.addEventListener('touchmove', handleTouchMove);
                document.addEventListener('touchend', handleTouchEnd);
              }}
            >
              {/* Slide indicator */}
              <motion.div
                className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#FFA31A] to-[#FFA31A]/80 flex items-center justify-center rounded-l-3xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-8 h-8 rounded-2xl bg-white/20 flex items-center justify-center"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </motion.div>
              
              {/* Text */}
              <div className="flex items-center justify-center h-full pl-20">
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center text-text"
                    >
                      <div className="spinner mr-3"></div>
                      Logging in...
                    </motion.div>
                  ) : (
                    <motion.span
                      key="text"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-text font-bold tracking-wider uppercase"
                    >
                      Slide to Login
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Slide hint */}
              <motion.div
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.form>
        
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