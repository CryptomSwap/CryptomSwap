"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";

const mockLeaderboard = [
  { id: 1, name: "Sarah Smith", referrals: 45, earnings: 1250 },
  { id: 2, name: "Mike Johnson", referrals: 38, earnings: 980 },
  { id: 3, name: "Emma Davis", referrals: 32, earnings: 820 },
  { id: 4, name: "Alex Wilson", referrals: 28, earnings: 720 },
  { id: 5, name: "Jordan Brown", referrals: 25, earnings: 650 },
];

export default function Page() {
  const [copied, setCopied] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const referralCode = "LISA2024";
  const totalReferrals = 156;
  const totalEarnings = 2840;
  const thisWeekReferrals = 23;
  const thisWeekEarnings = 420;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = referralCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="p-4 max-w-md mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-bold text-2xl mb-6 text-text"
        >
          Referrals
        </motion.h1>

        {/* Referral Code */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-surface rounded-xl p-4 mb-6"
        >
          <h2 className="font-bold text-lg mb-4 text-text">Your Referral Code</h2>
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex-1 bg-background border border-gray-600 rounded-lg px-3 py-2 text-center">
              <span className="font-bold text-accent-orange tracking-widest">{referralCode}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-accent-orange text-black font-bold py-2 px-4 rounded-lg"
              onClick={handleCopyCode}
            >
              {copied ? 'Copied!' : 'Copy'}
            </motion.button>
          </div>
          <p className="text-sm text-gray-400 text-center">
            Share this code with your audience to earn rewards
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface rounded-xl p-4 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-text">Stats</h2>
            <div className="flex space-x-2">
              {['week', 'month', 'all'].map(period => (
                <motion.button
                  key={period}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    selectedPeriod === period
                      ? 'bg-accent-orange text-black'
                      : 'bg-background text-gray-400'
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-orange">
                {selectedPeriod === 'week' ? thisWeekReferrals : totalReferrals}
              </div>
              <div className="text-xs text-gray-400">Referrals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-orange">
                ${selectedPeriod === 'week' ? thisWeekEarnings : totalEarnings}
              </div>
              <div className="text-xs text-gray-400">Earnings</div>
            </div>
          </div>
        </motion.div>

        {/* Leaderboard */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface rounded-xl p-4"
        >
          <h2 className="font-bold text-lg mb-4 text-text">Top Referrers</h2>
          <div className="space-y-3">
            {mockLeaderboard.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center p-3 bg-background rounded-lg"
              >
                <div className="w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center text-sm font-bold text-black mr-3">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-text">{user.name}</div>
                  <div className="text-sm text-gray-400">{user.referrals} referrals</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-accent-orange">${user.earnings}</div>
                  <div className="text-xs text-gray-400">earned</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Copy Success Animation */}
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-accent-orange text-black font-bold py-2 px-4 rounded-full z-50"
            >
              Code copied to clipboard!
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
} 