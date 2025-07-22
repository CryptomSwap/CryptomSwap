"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import DropCard from "@/components/DropCard";
import Navigation from "@/components/Navigation";
import FomoPopup from "@/components/FomoPopup";
import BackButton from "@/components/BackButton";

// Mock data for drops
const mockDrops = [
    {
    id: "1",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    title: "Exclusive Behind the Scenes",
    creator: "Alex Rivera",
    countdown: "2:34",
    distance: "0.2m",
    spotsLeft: 8
    },
    {
    id: "2",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=500&fit=crop",
    title: "Studio Session",
    creator: "Maya Chen",
    countdown: "1:45",
    distance: "0.5m",
    spotsLeft: 12
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
    title: "Private Performance",
    creator: "Jordan Smith",
    countdown: "4:20",
    distance: "1.2m",
    spotsLeft: 5
    },
    {
    id: "4",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
    title: "Exclusive Interview",
    creator: "Sarah Johnson",
    countdown: "0:30",
    distance: "0.8m",
    spotsLeft: 3
    },
    {
    id: "5",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
    title: "Behind the Lens",
    creator: "Mike Wilson",
    countdown: "3:15",
    distance: "2.1m",
    spotsLeft: 15
  }
];

export default function HomeFeedPage() {
  const router = useRouter();
  const [showFomo, setShowFomo] = useState(false);
  const [selectedDrop, setSelectedDrop] = useState<any>(null);

  const handleDropClick = (drop: any) => {
    setSelectedDrop(drop);
    // Show FOMO popup for drops with low spots
    if (drop.spotsLeft <= 5) {
    setShowFomo(true);
    } else {
      router.push(`/fan/drop/${drop.id}`);
    }
  };

  const handleSnagIt = () => {
    setShowFomo(false);
    if (selectedDrop) {
      router.push(`/fan/vault`);
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Blur overlay when FOMO popup is visible */}
      {showFomo && (
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-all" />
      )}
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-white/10 px-4 py-4"
      >
        <div className="flex items-center space-x-3">
          <BackButton />
          <h1 className="text-white font-black text-2xl tracking-wider uppercase">
            Home Feed
          </h1>
        </div>
      </motion.header>

      {/* Content */}
      <div className="pb-32 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 gap-6 py-6"
        >
          {mockDrops.map((drop, index) => (
                <motion.div
                  key={drop.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
                >
              <DropCard
                    {...drop}
                onClick={() => handleDropClick(drop)}
                variant="default"
                  />
                </motion.div>
              ))}
              </motion.div>
      </div>



      {/* Bottom Navigation */}
      <Navigation />

      {/* FOMO Popup */}
      <FomoPopup
        message={`🔥 Only ${selectedDrop?.spotsLeft} spots left for "${selectedDrop?.title}"!`}
        countdownSec={15}
        onDismiss={() => setShowFomo(false)}
        onUnlock={handleSnagIt}
        visible={showFomo}
        dropId={selectedDrop?.id || ""}
      />
    </div>
  );
} 