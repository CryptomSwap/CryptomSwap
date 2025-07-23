"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFingerprint } from "@fortawesome/free-solid-svg-icons";

// Typewriter effect component for tagline
const TypewriterTagline = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "Exclusivity at Your Fingertips";

  useEffect(() => {
    if (isTyping && currentIndex < fullText.length) {
    const timer = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50); // Even faster speed of typing

      return () => clearTimeout(timer);
    } else if (currentIndex >= fullText.length) {
      // Text is complete, wait 3 seconds then reset
      setIsTyping(false);
      const resetTimer = setTimeout(() => {
        setDisplayText('');
        setCurrentIndex(0);
        setIsTyping(true);
      }, 3000); // 3 second delay

      return () => clearTimeout(resetTimer);
    }
  }, [currentIndex, fullText, isTyping]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="font-medium text-premium text-sm md:text-base lg:text-lg mb-12 text-center"
      style={{
        background: 'linear-gradient(135deg, #FFB84D 0%, #B366FF 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        letterSpacing: '0.2px',
        lineHeight: 1.4
      }}
    >
      {displayText}
    </motion.div>
  );
};

// Finger scan icon component
const FingerScanIcon = ({ onClick }: { onClick: () => void }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBiometric = async () => {
    setIsScanning(true);
    setError(null);
    
    try {
      // Check if WebAuthn is supported
      if (!navigator.credentials) {
        throw new Error('WebAuthn not supported on this device');
      }

      // Create biometric challenge
      const publicKey = {
        challenge: Uint8Array.from('peepz-challenge', c => c.charCodeAt(0)),
        rp: { name: 'PEEPZ' },
        user: {
          id: Uint8Array.from('peepz-user-id', c => c.charCodeAt(0)),
          name: 'peepz@user.app',
          displayName: 'PEEPZ User'
        },
        pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
        authenticatorSelection: {
          authenticatorAttachment: 'platform',
          userVerification: 'required'
        },
        timeout: 60000,
        attestation: 'none'
      };

      const credential = await navigator.credentials.create({ 
        publicKey: publicKey as PublicKeyCredentialCreationOptions 
      });
      console.log('Biometric success:', credential);

      // Success - call the original onClick handler
      onClick();
    } catch (err) {
      console.error('Biometric error:', err);
      setError('Biometric authentication failed or not supported');
      
      // Still call onClick as fallback after showing error
      setTimeout(() => {
        setError(null);
        onClick();
      }, 2000);
    } finally {
      // Reset scanning state after animation
      setTimeout(() => setIsScanning(false), 2000);
    }
  };

  return (
    <motion.div
      onClick={handleBiometric}
      className="cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="flex items-center justify-center relative"
        animate={isScanning ? {
          scale: [1, 1.2, 1],
        } : {}}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        {/* Fingerprint scan icon */}
        <FontAwesomeIcon 
          icon={faFingerprint} 
          style={{ 
            fontSize: '45px',
            color: '#FFA500'
          }}
        />
        
        {/* Scanning ring effect */}
        {isScanning && (
          <motion.div
            className="absolute inset-0 border-2 border-white rounded-full"
            animate={{
              scale: [1, 1.5, 2],
              opacity: [1, 0.5, 0]
            }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        )}
      </motion.div>
      
      {/* Text below icon */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-[#FFA31A] text-sm font-medium mt-3 text-center"
        style={{ fontFamily: 'Aeonik, system-ui, -apple-system, sans-serif' }}
      >
        Tap to Scan
      </motion.p>
      
      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-red-400 text-xs mt-2 text-center max-w-xs"
            style={{ fontFamily: 'Aeonik, system-ui, -apple-system, sans-serif' }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function Page() {
  const router = useRouter();
  const [showWelcome, setShowWelcome] = useState(false);

  const handleFingerScan = () => {
    // Show welcome message
    setShowWelcome(true);
    // Navigate to welcome page after a delay
    setTimeout(() => {
      router.push('/welcome');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative">
      {/* Main content */}
      <div className="text-center z-10 px-4 w-full max-w-md">
        {/* Welcome Message */}
      <AnimatePresence>
          {showWelcome && (
                         <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 3, delay: 0.3, ease: "easeOut" }}
               className="mb-8"
             >
              <h2 className="text-lg font-sacrifice text-transparent bg-clip-text bg-gradient-to-r from-[#ffa31a] via-[#8A00D4] to-[#4A0080] tracking-wide">
                Welcome, ADMIN.
              </h2>
            </motion.div>
        )}
      </AnimatePresence>

        {/* PEEPZ Logo */}
          <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
          className="mb-4"
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.2em] uppercase text-center peepz-logo">
            <span style={{ color: '#ffa31a' }}>
              PEEPZ
            </span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <TypewriterTagline />
      </div>

      {/* Finger scan icon at bottom middle */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-20 inset-x-0 flex justify-center items-center"
      >
        <FingerScanIcon onClick={handleFingerScan} />
      </motion.div>
    </div>
  );
} 