"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/BackButton";
import { getReferralCount, getCurrentUser, clearCurrentUser } from "@/lib/storage";
import { mockDrops, getDropById } from "@/lib/mockData";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import DropCard from "@/components/DropCard";
import { isDropUnlocked, getUnlockedDrops } from "@/lib/storage";

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [unlockedDrops, setUnlockedDrops] = useState<any[]>([]);
  const [showEditMode, setShowEditMode] = useState(false);
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: true,
  });

  // Vault filter state
  const [filterCreator, setFilterCreator] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterDate, setFilterDate] = useState('all');

  useEffect(() => {
    // Load user data on client side
    const currentUser = getCurrentUser();
    setUser(currentUser);
    
    // Load unlocked drops
    const unlocked = getUnlockedDrops();
    const dropIds = Object.keys(unlocked);
    const drops = dropIds.map(id => getDropById(id)).filter(Boolean);
    setUnlockedDrops(drops);
  }, []);

  // Get all unique creators from unlockedDrops
  const uniqueCreators = Array.from(new Set(unlockedDrops.map(d => d.creator)));
  // Get all unique types (mock: just 'image' for now)
  const uniqueTypes = ['image']; // Extend if you add video/audio

  // Filtering logic
  const filteredDrops = unlockedDrops.filter(drop => {
    const creatorMatch = filterCreator === 'all' || drop.creator === filterCreator;
    const typeMatch = filterType === 'all' || (drop.type || 'image') === filterType;
    // Date filter: just mock for now
    return creatorMatch && typeMatch;
  });

  const handleLogout = () => {
    clearCurrentUser();
    router.push('/login');
  };

  const handlePreferenceChange = (key: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const referralCount = getReferralCount();

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-text">Please log in</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Button */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-white/10 px-4 py-4"
      >
        <div className="flex items-center space-x-3">
          <BackButton />
          <h1 className="text-white font-black text-2xl tracking-wider uppercase">
            Profile
          </h1>
        </div>
      </motion.header>
      
      <main className="p-4 max-w-md mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl mb-6 text-premium font-medium capitalize"
          style={{ letterSpacing: '0.2px', lineHeight: 1.4 }}
        >
          Your Profile
        </motion.h1>

        {/* Profile Info */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-surface rounded-xl p-4 mb-6"
        >
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-accent-orange rounded-full flex items-center justify-center text-2xl font-medium text-black mr-4" style={{ letterSpacing: '0.2px', lineHeight: 1.4 }}>
              {user.displayName.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg text-premium font-medium capitalize" style={{ letterSpacing: '0.2px', lineHeight: 1.4 }}>{user.displayName}</h2>
              <p className="text-sm text-secondary">@{user.username}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-xl font-medium text-accent-orange" style={{ letterSpacing: '0.2px', lineHeight: 1.4 }}>{unlockedDrops.length}</div>
              <div className="text-xs text-secondary">Drops Unlocked</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-medium text-accent-orange" style={{ letterSpacing: '0.2px', lineHeight: 1.4 }}>{referralCount}</div>
              <div className="text-xs text-secondary">Referrals</div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-accent-orange text-black font-medium capitalize py-2 rounded-full"
            style={{ letterSpacing: '0.2px', lineHeight: 1.4 }}
            onClick={() => setShowEditMode(!showEditMode)}
          >
            {showEditMode ? 'Cancel Edit' : 'Edit Profile'}
          </motion.button>
        </motion.div>

        {/* Edit Mode */}
        <AnimatePresence>
          {showEditMode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-surface rounded-xl p-4 mb-6 overflow-hidden"
            >
              <h3 className="font-bold text-lg mb-4 text-text">Preferences</h3>
              <div className="space-y-3">
                {Object.entries(preferences).map(([key, value]) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between"
                  >
                    <span className="text-text capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </span>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handlePreferenceChange(key)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        value ? 'bg-accent-orange' : 'bg-gray-600'
                      }`}
                    >
                      <motion.div
                        className="w-4 h-4 bg-white rounded-full"
                        animate={{ x: value ? 24 : 2 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unlocked Drops */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface rounded-xl p-4 mb-6"
        >
          <h2 className="font-bold text-lg mb-4 text-text">Unlocked Drops</h2>
          <div className="space-y-3">
            {unlockedDrops.length > 0 ? (
              unlockedDrops.map((drop, index) => (
                <motion.div
                  key={drop.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center p-3 bg-background rounded-lg"
                >
                  <div className="w-12 h-12 bg-gray-700 rounded-lg mr-3"></div>
                  <div className="flex-1">
                    <div className="font-bold text-text">{drop.title}</div>
                    <div className="text-sm text-gray-400">by {drop.creator}</div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-accent-orange font-bold text-sm"
                    onClick={() => router.push(`/fan/drop/${drop.id}`)}
                  >
                    View
                  </motion.button>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">🔒</div>
                <p className="text-gray-400">No drops unlocked yet</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 bg-accent-orange text-black font-bold py-2 px-4 rounded-full"
                  onClick={() => router.push('/fan/explore')}
                >
                  Explore Drops
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Vault Section removed. Add Vault button below stats. */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-accent-orange text-black font-bold py-2 rounded-full mb-4 mt-2"
          onClick={() => router.push('/fan/vault')}
        >
          Go to Vault
        </motion.button>

        {/* Logout */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-red-600 text-white font-bold py-3 rounded-full"
          onClick={handleLogout}
        >
          Logout
        </motion.button>
      </main>
      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
} 