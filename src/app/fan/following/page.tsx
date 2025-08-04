"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import DropCard from "@/components/DropCard";
import Navigation from "@/components/Navigation";
import BackButton from "@/components/BackButton";

// Mock data for followed creators
const mockFollowedCreators = [
  {
    id: "creator1",
    creatorId: "creator1",
    username: "luxury_lisa",
    displayName: "Lisa Luxury",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop",
    bio: "Exclusive lifestyle content and behind-the-scenes luxury experiences.",
    followers: 15420,
    hasNewDrop: true,
    lastDropTime: "2 hours ago"
  },
  {
    id: "creator2",
    creatorId: "creator2",
    username: "premium_paul",
    displayName: "Paul Premium",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    bio: "High-end fashion and exclusive brand collaborations.",
    followers: 8920,
    hasNewDrop: false,
    lastDropTime: "1 day ago"
  },
  {
    id: "creator3",
    creatorId: "creator3",
    username: "elite_emma",
    displayName: "Emma Elite",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    bio: "Luxury travel and exclusive destination content.",
    followers: 23450,
    hasNewDrop: true,
    lastDropTime: "30 minutes ago"
  },
  {
    id: "creator4",
    creatorId: "creator4",
    username: "vip_victor",
    displayName: "Victor VIP",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    bio: "Exclusive car collections and luxury lifestyle.",
    followers: 18750,
    hasNewDrop: false,
    lastDropTime: "3 days ago"
  }
];

// Mock data for drops from followed creators
const mockFollowingDrops = [
  {
    id: "drop1",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    title: "Behind the Scenes: Luxury Fashion Week",
    creator: "Lisa Luxury",
    creatorId: "creator1",
    countdown: "2:34",
    distance: "0.2m",
    spotsLeft: 8,
    isNew: true,
    createdAt: "2 hours ago"
  },
  {
    id: "drop2",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
    title: "Exclusive: Maldives Private Island Tour",
    creator: "Emma Elite",
    creatorId: "creator3",
    countdown: "1:45",
    distance: "0.5m",
    spotsLeft: 12,
    isNew: true,
    createdAt: "30 minutes ago"
  },
  {
    id: "drop3",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=500&fit=crop",
    title: "Studio Session",
    creator: "Paul Premium",
    creatorId: "creator2",
    countdown: "4:20",
    distance: "1.2m",
    spotsLeft: 5,
    isNew: false,
    createdAt: "1 day ago"
  },
  {
    id: "drop4",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
    title: "Private Collection: Designer Handbags",
    creator: "Lisa Luxury",
    creatorId: "creator1",
    countdown: "0:30",
    distance: "0.8m",
    spotsLeft: 3,
    isNew: false,
    createdAt: "3 days ago"
  }
];

export default function FollowingPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'feed' | 'creators'>('feed');

  const handleDropClick = (drop: any) => {
    router.push(`/fan/drop/${drop.id}`);
  };

  const handleCreatorClick = (creator: any) => {
    router.push(`/c/${creator.username}`);
  };

  return (
    <div className="min-h-screen bg-background relative" style={{
      background: 'radial-gradient(circle at center, #2a0030 0%, #1a001f 100%)'
    }}>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-30 bg-surface/80 backdrop-blur-xl border-b border-purple-500/20 px-4 py-4"
      >
        <div className="flex items-center space-x-3 mb-4">
          <BackButton />
          <h1 className="text-white font-black text-2xl tracking-wider uppercase">
            Following
          </h1>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-surface/50 rounded-xl p-1 border border-purple-500/10">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('feed')}
            className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all duration-300 ${
              activeTab === 'feed'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                : 'text-gray-400 hover:text-white hover:bg-surface/50'
            }`}
          >
            Feed
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('creators')}
            className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all duration-300 ${
              activeTab === 'creators'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                : 'text-gray-400 hover:text-white hover:bg-surface/50'
            }`}
          >
            Creators
          </motion.button>
        </div>
      </motion.header>

      {/* Content */}
      <div className="pb-32 px-4">
        {activeTab === 'feed' ? (
          // Feed Tab
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="py-6"
          >
            <div className="mb-6">
              <h2 className="text-white font-bold text-lg mb-2">Latest from Creators</h2>
              <p className="text-purple-300 text-sm">Drops from creators you follow</p>
            </div>
            
            <div className="space-y-6">
              {mockFollowingDrops.map((drop, index) => (
                <motion.div
                  key={drop.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* New Drop Indicator */}
                  {drop.isNew && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 z-10 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg shadow-purple-500/50"
                    >
                      NEW
                    </motion.div>
                  )}
                  
                  <DropCard
                    {...drop}
                    onClick={() => handleDropClick(drop)}
                    variant="default"
                  />
                  
                  {/* Creator Info */}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-purple-500/30">
                        <img 
                          src={mockFollowedCreators.find(c => c.creatorId === drop.creatorId)?.avatar} 
                          alt={drop.creator}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{drop.creator}</p>
                        <p className="text-purple-300 text-xs">{drop.createdAt}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          // Creators Tab
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="py-6"
          >
            <div className="mb-6">
              <h2 className="text-white font-bold text-lg mb-2">Creators You Follow</h2>
              <p className="text-purple-300 text-sm">{mockFollowedCreators.length} creators</p>
            </div>
            
            <div className="space-y-4">
              {mockFollowedCreators.map((creator, index) => (
                <motion.div
                  key={creator.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleCreatorClick(creator)}
                  className="bg-surface/30 backdrop-blur-sm rounded-xl p-4 cursor-pointer hover:bg-surface/50 transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/20"
                  style={{
                    background: 'rgba(60, 0, 100, 0.2)',
                    boxShadow: '0 0 10px rgba(168, 85, 247, 0.2)'
                  }}
                >
                  <div className="flex items-center space-x-4">
                    {/* Avatar with notification indicator */}
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500/30">
                        <img 
                          src={creator.avatar} 
                          alt={creator.displayName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {creator.hasNewDrop && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 rounded-full border-2 border-black flex items-center justify-center shadow-lg shadow-purple-500/50"
                        >
                          <span className="text-white text-xs font-bold">!</span>
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Creator Info */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-white font-bold text-lg">{creator.displayName}</h3>
                        {creator.hasNewDrop && (
                          <span className="text-purple-400 text-xs font-bold bg-purple-600/20 px-2 py-1 rounded-full border border-purple-500/30">
                            New Drop
                          </span>
                        )}
                      </div>
                      <p className="text-purple-300 text-sm mb-2">@{creator.username}</p>
                      <p className="text-gray-300 text-sm mb-2 line-clamp-2">{creator.bio}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-purple-300 text-xs">
                          {creator.followers.toLocaleString()} followers
                        </span>
                        <span className="text-gray-500 text-xs">
                          {creator.lastDropTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
} 