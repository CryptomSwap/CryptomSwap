"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import DropCard from "@/components/DropCard";
import Navigation from "@/components/Navigation";

// Mock data for unlocked drops
const mockUnlockedDrops = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    title: "Exclusive Behind the Scenes",
    creator: "Alex Rivera",
    countdown: "2:34",
    unlockDate: "2024-01-15",
    unlockTime: "14:30"
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop",
    title: "Studio Session",
    creator: "Maya Chen",
    countdown: "1:45",
    unlockDate: "2024-01-14",
    unlockTime: "16:20"
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
    title: "Private Performance",
    creator: "Jordan Smith",
    countdown: "4:20",
    unlockDate: "2024-01-13",
    unlockTime: "20:15"
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
    title: "Exclusive Interview",
    creator: "Sarah Johnson",
    countdown: "0:30",
    unlockDate: "2024-01-12",
    unlockTime: "11:45"
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
    title: "Behind the Lens",
    creator: "Mike Wilson",
    countdown: "3:15",
    unlockDate: "2024-01-11",
    unlockTime: "19:30"
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    title: "VIP Access",
    creator: "Emma Davis",
    countdown: "1:20",
    unlockDate: "2024-01-10",
    unlockTime: "15:10"
  }
];

export default function WalletPage() {
  const router = useRouter();

  const handleDropClick = (drop: any) => {
    router.push(`/fan/drop/${drop.id}`);
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-white/10 px-4 py-4"
      >
        <h1 className="text-white font-black text-2xl tracking-wider uppercase mb-2">
          Wallet
        </h1>
        <p className="text-gray-400 text-sm">
          Your unlocked drops and exclusive content
        </p>
      </motion.header>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-4 py-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-premium rounded-2xl p-4 text-center">
            <div className="text-2xl font-black text-accent-orange mb-1">
              {mockUnlockedDrops.length}
            </div>
            <div className="text-gray-400 text-sm">Drops Unlocked</div>
          </div>
          <div className="glass-premium rounded-2xl p-4 text-center">
            <div className="text-2xl font-black text-accent-orange mb-1">
              6
            </div>
            <div className="text-gray-400 text-sm">Creators Followed</div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="pb-32 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-white font-black text-xl mb-4 tracking-wider uppercase">
            Unlock History
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            {mockUnlockedDrops.map((drop, index) => (
              <motion.div
                key={drop.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="relative"
              >
                {/* Neon edge effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(255, 153, 0, 0.3)',
                      '0 0 30px rgba(138, 0, 212, 0.3)',
                      '0 0 20px rgba(255, 153, 0, 0.3)'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <DropCard
                  {...drop}
                  onClick={() => handleDropClick(drop)}
                  variant="compact"
                />
                
                {/* Unlock timestamp */}
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-accent-orange text-xs font-bold">
                    {drop.unlockTime}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Empty State */}
        {mockUnlockedDrops.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-white font-bold text-lg mb-2">No unlocked drops yet</h3>
            <p className="text-gray-400">Start exploring to unlock exclusive content</p>
          </motion.div>
        )}
      </div>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
} 