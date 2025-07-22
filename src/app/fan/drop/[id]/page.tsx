"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import GlowingButton from "@/components/GlowingButton";
import FomoPopup from "@/components/FomoPopup";
import Navigation from "@/components/Navigation";
import { useVault } from "@/hooks/useVault";

// Mock data for the drop
const mockDrop = {
  id: "1",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop",
  title: "Exclusive Behind the Scenes",
  creator: "Alex Rivera",
  creatorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  followerCount: "12.5K",
  spotsLeft: 8,
  countdown: "2:34",
  description: "Get an exclusive look behind the scenes of my latest project. This is content you won't find anywhere else."
};

export default function DropDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [showFomo, setShowFomo] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const userId = "fan1"; // Replace with real user id if available
  const { add: addToVault, isUnlocked: isDropUnlocked } = useVault(userId);

  // Show FOMO popup after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (mockDrop.spotsLeft <= 10) {
        setShowFomo(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleUnlockNow = () => {
    setIsUnlocked(true);
    // Add to vault if not already unlocked
    if (!isDropUnlocked(mockDrop.id)) {
      addToVault({ dropId: mockDrop.id, unlockedAt: new Date().toISOString() });
    }
    // In a real app, handle payment/access logic here
  };

  const handleSnagIt = () => {
    setShowFomo(false);
    handleUnlockNow();
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={mockDrop.image}
          alt={mockDrop.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between p-4"
        >
          <motion.button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ←
          </motion.button>
          
          <motion.div
            className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-accent-orange text-sm font-bold">
              {mockDrop.countdown}
            </span>
          </motion.div>
        </motion.header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-between p-4">
          {/* Top Section */}
          <div className="space-y-6">
            {/* FOMO Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center"
            >
              <div className="bg-gradient-to-r from-accent-orange to-accent-orange text-black text-sm font-black px-4 py-2 rounded-full animate-pulse">
                🔥 Only {mockDrop.spotsLeft} spots left!
              </div>
            </motion.div>

            {/* Creator Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center space-x-4"
            >
              <motion.div
                className="w-16 h-16 rounded-full overflow-hidden border-2 border-accent-orange"
                whileHover={{ scale: 1.1 }}
              >
                <img
                  src={mockDrop.creatorImage}
                  alt={mockDrop.creator}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div>
                <h3 className="text-white font-black text-xl">
                  {mockDrop.creator}
                </h3>
                <p className="text-gray-300 text-sm">
                  {mockDrop.followerCount} followers
                </p>
                {/* Go to Creator Profile Button */}
                <button
                  className="mt-2 px-4 py-1 rounded-full btn-premium neon-orange text-white font-bold text-xs shadow animate-glow"
                  onClick={() => router.push(`/creator/68a9d503-66ab-4809-a3ae-7b70cad9b202`)}
                >
                  View Creator Profile
                </button>
              </div>
            </motion.div>

            {/* Title and Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-4"
            >
              <h1 className="text-white font-black text-3xl leading-tight">
                {mockDrop.title}
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                {mockDrop.description}
              </p>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="space-y-4"
          >
            {/* Unlock Button */}
            <GlowingButton
              label={isUnlocked ? "ACCESS GRANTED" : "UNLOCK NOW"}
              onClick={handleUnlockNow}
              variant="full-width"
              size="lg"
              disabled={isUnlocked}
            />

            {/* Additional Info */}
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                {isUnlocked 
                  ? "You now have exclusive access to this content" 
                  : "Unlock to get exclusive access to this content"
                }
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FOMO Popup */}
      <FomoPopup
        message={`🔥 Only ${mockDrop.spotsLeft} spots left for "${mockDrop.title}"!`}
        countdownSec={30}
        onDismiss={() => setShowFomo(false)}
        onUnlock={handleSnagIt}
        visible={showFomo}
        dropId={mockDrop.id}
      />
      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
} 