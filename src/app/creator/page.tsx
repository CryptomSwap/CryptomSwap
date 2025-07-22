"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { mockCreators, mockDrops } from "@/lib/mockData";
import { getCreatorDrops, saveCreatorDrops } from "@/lib/storage";
import BackButton from "@/components/BackButton";

export default function Page() {
  const router = useRouter();
  const [creator, setCreator] = useState(mockCreators[0]); // Default to first creator
  const [recentDrops, setRecentDrops] = useState<typeof mockDrops>([]);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // Load creator drops from sessionStorage or use mock data
    const storedDrops = getCreatorDrops();
    if (storedDrops.length > 0) {
      setRecentDrops(storedDrops);
    } else {
      // Initialize with mock data for demo
      const creatorDrops = mockDrops.filter(drop => drop.creatorId === 'creator1');
      saveCreatorDrops(creatorDrops);
      setRecentDrops(creatorDrops);
    }
  }, []);

  const handleViewDrop = (dropId: string) => {
    router.push(`/creator/drop/${dropId}`);
  };

  const handleMenuOption = (option: string) => {
    setShowMenu(false);
    switch (option) {
      case 'upload':
        router.push('/creator/upload');
        break;
      case 'referrals':
        router.push('/creator/referrals');
        break;
      case 'account':
        router.push('/creator/profile');
        break;
      case 'billing':
        router.push('/creator/billing');
        break;
      case 'analytics':
        router.push('/creator/analytics');
        break;
      case 'settings':
        router.push('/creator/settings');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800"
      >
        <div className="flex items-center justify-between p-4 max-w-md mx-auto">
          <div className="flex items-center space-x-3">
            <BackButton />
            <h1 className="font-inter font-bold text-xl text-white uppercase tracking-wider">
              Profile
            </h1>
          </div>
          <div className="relative">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMenu(!showMenu)}
              className="w-10 h-10 rounded-full bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 hover:border-orange-500/50 flex items-center justify-center transition-all duration-300 hover:bg-gray-800/70"
            >
              <div className="flex flex-col space-y-1">
                <div className={`w-4 h-0.5 bg-white transition-all duration-300 ${showMenu ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                <div className={`w-4 h-0.5 bg-white transition-all duration-300 ${showMenu ? 'opacity-0' : ''}`}></div>
                <div className={`w-4 h-0.5 bg-white transition-all duration-300 ${showMenu ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
              </div>
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95, height: 0 }}
                  animate={{ opacity: 1, y: 0, scale: 1, height: "auto" }}
                  exit={{ opacity: 0, y: -20, scale: 0.95, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute right-0 top-12 w-40 bg-gradient-to-b from-black via-gray-900 to-purple-900 backdrop-blur-xl border border-purple-500/30 rounded-xl shadow-2xl z-50 overflow-hidden"
                >
                  <div className="py-2">
                    <motion.button
                      whileHover={{ backgroundColor: 'rgba(255, 163, 26, 0.15)' }}
                      onClick={() => handleMenuOption('referrals')}
                      className="w-full px-3 py-2.5 text-left text-white hover:text-orange-400 transition-colors duration-200 text-sm"
                    >
                      <span className="font-medium">Referrals</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ backgroundColor: 'rgba(255, 163, 26, 0.15)' }}
                      onClick={() => handleMenuOption('analytics')}
                      className="w-full px-3 py-2.5 text-left text-white hover:text-orange-400 transition-colors duration-200 text-sm"
                    >
                      <span className="font-medium">Analytics</span>
                    </motion.button>
                    
                    <div className="border-t border-purple-500/30 my-1"></div>
                    
                    <motion.button
                      whileHover={{ backgroundColor: 'rgba(255, 163, 26, 0.15)' }}
                      onClick={() => handleMenuOption('account')}
                      className="w-full px-3 py-2.5 text-left text-white hover:text-orange-400 transition-colors duration-200 text-sm"
                    >
                      <span className="font-medium">Account Settings</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ backgroundColor: 'rgba(255, 163, 26, 0.15)' }}
                      onClick={() => handleMenuOption('billing')}
                      className="w-full px-3 py-2.5 text-left text-white hover:text-orange-400 transition-colors duration-200 text-sm"
                    >
                      <span className="font-medium">Billing Information</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ backgroundColor: 'rgba(255, 163, 26, 0.15)' }}
                      onClick={() => handleMenuOption('settings')}
                      className="w-full px-3 py-2.5 text-left text-white hover:text-orange-400 transition-colors duration-200 text-sm"
                    >
                      <span className="font-medium">Settings</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
      
      <main className="max-w-md mx-auto pb-24 relative">
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6"
        >
          {/* Avatar and Basic Info */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-400 to-purple-600 p-0.5">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {creator.displayName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-black"></div>
            </div>
            <div className="flex-1">
              <h2 className="font-inter font-bold text-xl text-white mb-1">
                {creator.displayName}
              </h2>
              <p className="text-gray-400 text-sm mb-2">@{creator.username}</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                {creator.bio}
              </p>
            </div>
          </div>
          
          {/* Stats Row */}
          <div className="flex justify-around py-4 border-t border-gray-800">
            <div className="text-center">
              <div className="font-inter font-bold text-xl text-white">
                {recentDrops.length}
              </div>
              <div className="text-gray-400 text-xs uppercase tracking-wider">Drops</div>
            </div>
            <div className="text-center">
              <div className="font-inter font-bold text-xl text-white">
                {creator.followers.toLocaleString()}
              </div>
              <div className="text-gray-400 text-xs uppercase tracking-wider">Followers</div>
          </div>
            <div className="text-center">
              <div className="font-inter font-bold text-xl text-white">
                {creator.totalUnlocks.toLocaleString()}
              </div>
              <div className="text-gray-400 text-xs uppercase tracking-wider">Unlocks</div>
            </div>
            <div className="text-center">
              <div className="font-inter font-bold text-xl text-white">
                ${creator.totalEarnings.toLocaleString()}
              </div>
              <div className="text-gray-400 text-xs uppercase tracking-wider">Earnings</div>
            </div>
          </div>
        </motion.div>

        {/* Drops Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="px-4 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-inter font-bold text-lg text-white uppercase tracking-wider">
              Recent Drops
            </h3>
            <span className="text-gray-400 text-sm">
              {recentDrops.length} total
            </span>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {recentDrops.map((drop, index) => (
              <motion.div
                key={drop.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onClick={() => handleViewDrop(drop.id)}
                className="relative aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden cursor-pointer group border border-gray-700 hover:border-orange-400 transition-all duration-300"
              >
                {/* Drop Thumbnail Placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-orange-400/20 to-purple-600/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl mb-1">📸</div>
                    <div className="text-xs text-gray-300 font-medium px-2">
                      {drop.title.split(' ').slice(0, 2).join(' ')}
                    </div>
          </div>
        </div>

                {/* Overlay with unlock count */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-white font-bold text-sm mb-1">
                      {drop.unlockCount}/{drop.unlockLimit}
                    </div>
                    <div className="text-orange-400 text-xs">unlocked</div>
                  </div>
        </div>

                {/* Price badge */}
                {drop.price && (
                  <div className="absolute top-2 right-2 bg-orange-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                    ${drop.price}
          </div>
                )}
              </motion.div>
            ))}
            
            {/* Empty slots for visual balance */}
            {Array.from({ length: Math.max(0, 6 - recentDrops.length) }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className="aspect-square bg-gray-800/30 rounded-lg border border-gray-700/50 flex items-center justify-center"
              >
                <div className="text-gray-600 text-2xl">+</div>
            </div>
            ))}
        </div>
        </motion.div>

        {/* Floating Upload Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-6 inset-x-0 flex justify-center z-40"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleMenuOption('upload')}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 shadow-2xl border-2 border-orange-300/50 hover:border-orange-200/50 transition-all duration-300 flex items-center justify-center group"
            style={{
              boxShadow: '0 8px 25px rgba(255, 163, 26, 0.3), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)'
            }}
          >
            <svg 
              className="w-6 h-6 text-white transform group-hover:scale-110 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2.5} 
                d="M12 4v16m8-8H4" 
              />
            </svg>
          </motion.button>
        </motion.div>

      </main>
    </div>
  );
} 