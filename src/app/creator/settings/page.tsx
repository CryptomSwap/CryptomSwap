"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import BackButton from "@/components/BackButton";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [profileForm, setProfileForm] = useState({
    displayName: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    bio: 'Luxury content creator sharing exclusive behind-the-scenes moments.',
    website: 'https://johndoe.com',
    location: 'Los Angeles, CA'
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    newFans: true,
    newUnlocks: true,
    payoutReceived: true,
    dropPerformance: false,
    marketingEmails: false
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update logic here
    console.log('Profile updated:', profileForm);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password change logic here
    console.log('Password changed');
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950" style={{ fontFamily: 'Aeonik, system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800"
      >
        <div className="flex items-center justify-between p-4 max-w-md mx-auto">
          <div className="flex items-center space-x-3">
            <BackButton />
            <h1 className="font-black text-xl text-white uppercase tracking-wider">
              Settings
            </h1>
          </div>
        </div>
      </motion.div>

      <div className="max-w-md mx-auto pb-24">
        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4"
        >
          <div className="flex space-x-2 bg-gray-800/50 rounded-xl p-1">
            {['profile', 'security', 'notifications', 'account'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-orange-400 to-purple-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="px-4 space-y-6"
          >
            <div className="glass-premium rounded-xl p-4 border border-gray-700/50">
              <h3 className="font-black text-white uppercase tracking-wider mb-4">
                Profile Information
              </h3>
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.displayName}
                    onChange={(e) => setProfileForm({...profileForm, displayName: e.target.value})}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-orange-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={profileForm.username}
                    onChange={(e) => setProfileForm({...profileForm, username: e.target.value})}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-orange-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-orange-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">
                    Bio
                  </label>
                  <textarea
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
                    rows={3}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-orange-400 focus:outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={profileForm.website}
                    onChange={(e) => setProfileForm({...profileForm, website: e.target.value})}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-orange-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={profileForm.location}
                    onChange={(e) => setProfileForm({...profileForm, location: e.target.value})}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-orange-400 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-400 to-purple-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  Update Profile
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="px-4 space-y-6"
          >
            <div className="glass-premium rounded-xl p-4 border border-gray-700/50">
              <h3 className="font-black text-white uppercase tracking-wider mb-4">
                Change Password
              </h3>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-orange-400 focus:outline-none"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-orange-400 focus:outline-none"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-orange-400 focus:outline-none"
                    placeholder="Confirm new password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-400 to-purple-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  Change Password
                </button>
              </form>
            </div>

            <div className="glass-premium rounded-xl p-4 border border-gray-700/50">
              <h3 className="font-black text-white uppercase tracking-wider mb-4">
                Two-Factor Authentication
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">2FA Status</div>
                  <div className="text-gray-400 text-sm">Add an extra layer of security</div>
                </div>
                <button className="bg-gray-800/50 text-white font-medium py-2 px-4 rounded-lg border border-gray-700 hover:border-orange-400 transition-all duration-300">
                  Enable
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="px-4 space-y-6"
          >
            <div className="glass-premium rounded-xl p-4 border border-gray-700/50">
              <h3 className="font-black text-white uppercase tracking-wider mb-4">
                Notification Preferences
              </h3>
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </div>
                      <div className="text-gray-400 text-sm">
                        Receive notifications for {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle(key as keyof typeof notifications)}
                      className={`w-12 h-6 rounded-full transition-all duration-300 ${
                        value ? 'bg-gradient-to-r from-orange-400 to-purple-500' : 'bg-gray-700'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                        value ? 'ml-6' : 'ml-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Account Tab */}
        {activeTab === 'account' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="px-4 space-y-6"
          >
            <div className="glass-premium rounded-xl p-4 border border-gray-700/50">
              <h3 className="font-black text-white uppercase tracking-wider mb-4">
                Account Actions
              </h3>
              <div className="space-y-4">
                <button className="w-full bg-gray-800/50 text-white font-medium py-3 px-4 rounded-lg border border-gray-700 hover:border-orange-400 transition-all duration-300">
                  Download My Data
                </button>
                <button className="w-full bg-gray-800/50 text-white font-medium py-3 px-4 rounded-lg border border-gray-700 hover:border-orange-400 transition-all duration-300">
                  Deactivate Account
                </button>
                <button 
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full bg-red-600/20 text-red-400 font-medium py-3 px-4 rounded-lg border border-red-600/30 hover:bg-red-600/30 transition-all duration-300"
                >
                  Delete Account
                </button>
              </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              >
                <div className="glass-premium rounded-xl p-6 border border-gray-700/50 max-w-sm w-full">
                  <h3 className="font-black text-white uppercase tracking-wider mb-4">
                    Delete Account
                  </h3>
                  <p className="text-gray-300 mb-6">
                    This action cannot be undone. All your data, drops, and earnings will be permanently deleted.
                  </p>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="flex-1 bg-gray-800/50 text-white font-medium py-3 px-4 rounded-lg border border-gray-700 hover:border-orange-400 transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <button className="flex-1 bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105">
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
} 