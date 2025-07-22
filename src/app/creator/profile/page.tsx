"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import DropCard from "@/components/DropCard";
import Navigation from "@/components/Navigation";

// Mock data for creator profile
const mockCreator = {
  id: "1",
  username: "Alex Rivera",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  heroImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
  followerCount: "12.5K",
  bio: "Exclusive content creator sharing behind-the-scenes moments you won't find anywhere else.",
  previousDrops: [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      title: "Studio Session",
      creator: "Alex Rivera",
      countdown: "2:34",
      spotsLeft: 8
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop",
      title: "Behind the Scenes",
      creator: "Alex Rivera",
      countdown: "1:45",
      spotsLeft: 12
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
      title: "Private Performance",
      creator: "Alex Rivera",
      countdown: "4:20",
      spotsLeft: 5
    },
    {
      id: "4",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
      title: "Exclusive Interview",
      creator: "Alex Rivera",
      countdown: "0:30",
      spotsLeft: 3
    }
  ]
};

export default function CreatorProfilePage() {
  const router = useRouter();

  const handleDropClick = (drop: any) => {
    router.push(`/fan/drop/${drop.id}`);
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Hero Section */}
      <div className="relative h-80 overflow-hidden">
        {/* Background Image */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={mockCreator.heroImage}
            alt={mockCreator.username}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </motion.div>

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white z-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ←
        </motion.button>

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        >
          {/* Glowing hexagon background */}
          <motion.div
            className="relative"
            animate={{
              filter: [
                'drop-shadow(0 0 20px rgba(138, 0, 212, 0.5))',
                'drop-shadow(0 0 30px rgba(138, 0, 212, 0.8))',
                'drop-shadow(0 0 20px rgba(138, 0, 212, 0.5))'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-24 h-24 bg-gradient-to-br from-accent-orange to-accent-orange rounded-2xl p-1">
              <div className="w-full h-full rounded-xl overflow-hidden">
                <img
                  src={mockCreator.avatar}
                  alt={mockCreator.username}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Profile Info */}
      <div className="px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-6"
        >
          <h1 className="text-white font-black text-2xl mb-2">
            {mockCreator.username}
          </h1>
          <p className="text-accent-orange font-bold text-lg mb-3">
            {mockCreator.followerCount} followers
          </p>
          <p className="text-gray-300 text-sm leading-relaxed max-w-md mx-auto">
            {mockCreator.bio}
          </p>
        </motion.div>

        {/* Previous Drops */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-white font-black text-xl mb-4 tracking-wider uppercase">
            Previous Drops
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            {mockCreator.previousDrops.map((drop, index) => (
              <motion.div
                key={drop.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <DropCard
                  {...drop}
                  onClick={() => handleDropClick(drop)}
                  variant="compact"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
} 