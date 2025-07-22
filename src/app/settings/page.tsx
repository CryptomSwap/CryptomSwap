"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import { getCurrentUser, saveSettings, getSettings } from "@/lib/storage";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState(getCurrentUser());
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [profile, setProfile] = useState({
    displayName: user?.displayName || '',
    username: user?.username || '',
    email: user?.email || '',
    bio: 'Luxury content enthusiast and exclusive drop collector.',
  });

  const [notifications, setNotifications] = useState({
    newDrops: true,
    dropExpiring: true,
    exclusiveAccess: true,
    referralRewards: false,
    marketingEmails: true,
    pushNotifications: false,
  });

  useEffect(() => {
    // Load saved settings
    const savedSettings = getSettings();
    if (savedSettings.notifications) {
      setNotifications(prev => ({ ...prev, ...savedSettings.notifications }));
    }
  }, []);

  const handleProfileChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate save delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Save settings to localStorage
    saveSettings({ notifications });
    
    setIsLoading(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-text">Please log in</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="p-4 max-w-md mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-bold text-2xl mb-6 text-text"
        >
          Settings
        </motion.h1>

        {/* Profile Settings */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-surface rounded-xl p-4 mb-6"
        >
          <h2 className="font-bold text-lg mb-4 text-text">Profile Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-text mb-2">Display Name</label>
              <input
                type="text"
                value={profile.displayName}
                onChange={(e) => handleProfileChange('displayName', e.target.value)}
                className="w-full bg-background border border-gray-600 rounded-lg px-3 py-2 text-text"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-text mb-2">Username</label>
              <input
                type="text"
                value={profile.username}
                onChange={(e) => handleProfileChange('username', e.target.value)}
                className="w-full bg-background border border-gray-600 rounded-lg px-3 py-2 text-text"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-text mb-2">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleProfileChange('email', e.target.value)}
                className="w-full bg-background border border-gray-600 rounded-lg px-3 py-2 text-text"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-text mb-2">Bio</label>
              <textarea
                value={profile.bio}
                onChange={(e) => handleProfileChange('bio', e.target.value)}
                className="w-full bg-background border border-gray-600 rounded-lg px-3 py-2 text-text h-20 resize-none"
              />
            </div>
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface rounded-xl p-4 mb-6"
        >
          <h2 className="font-bold text-lg mb-4 text-text">Notifications</h2>
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-text capitalize">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </div>
                  <div className="text-sm text-gray-400">
                    {key === 'newDrops' && 'Get notified when creators upload new drops'}
                    {key === 'dropExpiring' && 'Reminders when your unlocked drops are about to expire'}
                    {key === 'exclusiveAccess' && 'Early access to exclusive content'}
                    {key === 'referralRewards' && 'Updates on your referral earnings'}
                    {key === 'marketingEmails' && 'Receive promotional emails and updates'}
                    {key === 'pushNotifications' && 'Push notifications on your device'}
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleNotificationChange(key)}
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

        {/* Save Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
          onClick={handleSave}
          className="w-full bg-accent-orange text-black font-bold py-3 rounded-full disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : 'Save Settings'}
        </motion.button>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-accent-orange text-black font-bold py-2 px-4 rounded-full z-50"
            >
              Settings saved successfully!
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
} 