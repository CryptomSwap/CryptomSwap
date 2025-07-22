"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/BackButton";
import { saveReferralCode, getReferralCode, saveReferralCount, getReferralCount } from "@/lib/storage";
import Navigation from "@/components/Navigation";

const rewards = [
  { id: 1, name: "Early Access Badge", icon: "⭐", description: "Get first access to new drops" },
  { id: 2, name: "VIP Status", icon: "👑", description: "Exclusive VIP benefits" },
  { id: 3, name: "Bonus XP", icon: "🎯", description: "Extra experience points" },
  { id: 4, name: "Premium Content", icon: "💎", description: "Access to premium drops" },
];

export default function Page() {
  const [referralCode, setReferralCode] = useState(getReferralCode() || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [currentReward, setCurrentReward] = useState(0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!referralCode.trim()) {
      alert('Please enter a referral code');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Save referral code and increment count
    saveReferralCode(referralCode.trim());
    const currentCount = getReferralCount();
    saveReferralCount(currentCount + 1);

    setIsSubmitting(false);
    setShowRewards(true);

    // Animate through rewards
    rewards.forEach((_, index) => {
      setTimeout(() => setCurrentReward(index), index * 800);
    });
  };

  const referralCount = getReferralCount();

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
            Invite & Rewards
          </h1>
        </div>
      </motion.header>
      
      <main className="p-4 max-w-md mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-bold text-2xl mb-6 text-text text-center"
        >
          Invite & Rewards
        </motion.h1>

        {/* Referral Stats */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-surface rounded-xl p-4 mb-6"
        >
          <h2 className="font-bold text-lg mb-4 text-text">Your Referrals</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-orange">{referralCount}</div>
              <div className="text-xs text-gray-400">Total Referrals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-orange">{referralCount * 100}</div>
              <div className="text-xs text-gray-400">XP Earned</div>
            </div>
          </div>
        </motion.div>

        {/* Referral Code Entry */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface rounded-xl p-4 mb-6"
        >
          <h2 className="font-bold text-lg mb-4 text-text">Enter Referral Code</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
              className="w-full bg-background border border-gray-600 rounded-lg px-3 py-2 text-text text-center font-bold tracking-widest"
              placeholder="ENTER CODE"
              maxLength={8}
            />
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-accent-orange text-black font-bold py-3 rounded-full disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : 'Submit Code'}
            </motion.button>
          </form>
        </motion.div>

        {/* Available Rewards */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-surface rounded-xl p-4"
        >
          <h2 className="font-bold text-lg mb-4 text-text">Available Rewards</h2>
          <div className="space-y-3">
            {rewards.map((reward, index) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center p-3 bg-background rounded-lg"
              >
                <div className="text-2xl mr-3">{reward.icon}</div>
                <div className="flex-1">
                  <div className="font-bold text-text">{reward.name}</div>
                  <div className="text-sm text-gray-400">{reward.description}</div>
                </div>
                <div className="text-xs text-accent-orange font-bold">
                  {index < referralCount ? 'UNLOCKED' : 'LOCKED'}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Rewards Animation */}
        <AnimatePresence>
          {showRewards && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
              onClick={() => setShowRewards(false)}
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-surface rounded-xl p-6 max-w-sm mx-4 text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  key={currentReward}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="text-4xl mb-4"
                >
                  {rewards[currentReward]?.icon}
                </motion.div>
                <h3 className="font-bold text-lg mb-2 text-text">
                  {rewards[currentReward]?.name}
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  {rewards[currentReward]?.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-accent-orange text-black font-bold py-2 px-6 rounded-full"
                  onClick={() => setShowRewards(false)}
                >
                  Claim Reward
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
} 