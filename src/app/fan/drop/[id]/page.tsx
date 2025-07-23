"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import GlowingButton from "@/components/GlowingButton";
import FomoPopup from "@/components/FomoPopup";
import Navigation from "@/components/Navigation";
import { useVault } from "@/hooks/useVault";

// Shimmer keyframes
const shimmerStyle = {
  background: 'linear-gradient(120deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.18) 40%, rgba(255,255,255,0.08) 100%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 15s linear infinite',
};

// Add shimmer keyframes to global style (if not already present)
if (typeof window !== 'undefined' && !document.getElementById('shimmer-keyframes')) {
  const style = document.createElement('style');
  style.id = 'shimmer-keyframes';
  style.innerHTML = `@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }`;
  document.head.appendChild(style);
}

// AvatarGroup mock
const fanAvatars = [
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/45.jpg',
  'https://randomuser.me/api/portraits/women/46.jpg',
  'https://randomuser.me/api/portraits/men/47.jpg',
];

// Creator seal badge SVG
const CreatorSeal = () => (
  <span className="ml-2 inline-block align-middle" title="Official Creator">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <polygon points="12,2 22,8 22,20 12,22 2,20 2,8" fill="#FFD700" stroke="#F5C400" strokeWidth="2" />
      <path d="M12 7l2 4h-4l2-4zm0 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" fill="#fff" />
    </svg>
  </span>
);

// Radial countdown ring SVG
const RadialCountdown = ({ percent, children }: { percent: number, children?: React.ReactNode }) => {
  const radius = 22;
  const stroke = 4;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const offset = circumference - percent * circumference;
  return (
    <svg width={radius * 2} height={radius * 2} className="block">
      <circle
        stroke="#222"
        fill="none"
        strokeWidth={stroke}
        cx={radius}
        cy={radius}
        r={normalizedRadius}
      />
      <circle
        stroke="#FFA31A"
        fill="none"
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        cx={radius}
        cy={radius}
        r={normalizedRadius}
        style={{ transition: 'stroke-dashoffset 1s linear' }}
      />
      {children && (
        <foreignObject x={radius-16} y={radius-12} width={32} height={24}>
          <div className="flex items-center justify-center w-8 h-6 text-xs font-bold text-white">
            {children}
          </div>
        </foreignObject>
      )}
    </svg>
  );
};

// Mock data for the drop
const mockDrop = {
  id: "1",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop",
  title: "exclusive behind the scenes",
  creator: "Alex Rivera",
  creatorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  followerCount: "12.5K",
  spotsLeft: 8,
  countdown: "2:34",
  description: "Get an exclusive look behind the scenes of my latest project. This is content you won't find anywhere else."
};

// Add lock-open icon SVG
const LockOpenIcon = () => (
  <svg className="w-5 h-5 mr-2 -ml-1 inline-block" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 17a2 2 0 002-2v-2a2 2 0 10-4 0v2a2 2 0 002 2zm6-2v-2a6 6 0 10-12 0v2a2 2 0 002 2h8a2 2 0 002-2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7V5a4 4 0 00-8 0" />
  </svg>
);

export default function DropDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [showFomo, setShowFomo] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const userId = "fan1"; // Replace with real user id if available
  const { add: addToVault, isUnlocked: isDropUnlocked } = useVault(userId);
  const [countdownSec, setCountdownSec] = useState(154); // 2:34
  useEffect(() => {
    if (countdownSec > 0) {
      const timer = setTimeout(() => setCountdownSec(countdownSec - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdownSec]);
  const countdownMin = Math.floor(countdownSec / 60);
  const countdownRem = countdownSec % 60;
  const countdownStr = `${countdownMin}:${countdownRem.toString().padStart(2, '0')}`;

  // Show FOMO popup after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (mockDrop.spotsLeft <= 10) {
        setShowFomo(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleUnlockNow = () => {
    setIsUnlocked(true);
    // Add to vault if not already unlocked
    if (!isDropUnlocked(mockDrop.id)) {
      addToVault({ dropId: mockDrop.id, unlockedAt: new Date().toISOString() });
    }
    // In a real app, handle payment/access logic here
  };

  const handleSnagIt = () => {
    setShowFomo(false);
    handleUnlockNow();
  };

  // For animated underline
  const [underlineIn, setUnderlineIn] = useState(false);
  useEffect(() => { setUnderlineIn(true); }, []);
  // For countdown color
  const countdownColor = countdownSec < 30 ? '#FF3B3B' : '#FFA31A';

  // Add Like/Share state
  const [likeCount, setLikeCount] = useState(12500);
  const [liked, setLiked] = useState(false);
  const [likePulse, setLikePulse] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => prev + (liked ? -1 : 1));
    setLikePulse(true);
    setTimeout(() => setLikePulse(false), 400);
  };
  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 1200);
  };

  // For fadeInUp animation
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => { setFadeIn(true); }, []);
  // For Unlock button idle shimmer
  const [idlePulse, setIdlePulse] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIdlePulse(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-b from-black via-[#0f0f1a] to-black relative overflow-hidden flex flex-col items-center justify-start ${fadeIn ? 'animate-fadeInUp' : ''}`} style={{ minHeight: '100vh' }}>
      {/* Cinematic Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src={mockDrop.image}
          alt={mockDrop.title}
          className="w-full h-full object-cover blur-md scale-105 opacity-60"
          style={{ filter: 'blur(8px) brightness(0.5)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#0f0f1a]/80 to-black/90" />
        <div className="absolute inset-0 pointer-events-none" style={shimmerStyle} />
        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 120px 40px #000, inset 0 0 80px 10px #2d003a' }} />
      </div>
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between w-full max-w-[400px] px-6 pt-4"
        >
          <motion.button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ←
          </motion.button>
        {/* Countdown badge with animated radial ring */}
        <div className="relative flex items-center">
          <RadialCountdown percent={countdownSec/154}>
            <span className="text-xs font-bold drop-shadow" style={{ color: countdownColor }}>
              {countdownStr}
            </span>
          </RadialCountdown>
        </div>
        </motion.header>
        {/* Main Content */}
      <motion.div className="w-full max-w-sm mx-auto px-4 flex-1 flex flex-col justify-between items-center gap-y-6">
          {/* Top Section */}
        <div className="space-y-6 pt-4">
            {/* FOMO Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
              className="flex justify-center"
            >
            <div className="relative flex items-center justify-center">
              <span className="absolute -inset-1 rounded-full ring-[3px] ring-orange-400/50 animate-pulse-slow" />
              <span className="bg-gradient-to-r from-orange-400 to-orange-500 text-black text-xs font-black px-4 py-2 rounded-full animate-pulse-slow shadow-lg">
                🔥 Only {mockDrop.spotsLeft} spots left!
              </span>
              </div>
            </motion.div>
            {/* Creator Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
              className="flex items-center space-x-4"
            >
            <div className="relative">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-orange-400 shadow-lg" style={{ boxShadow: '0 0 0 4px #FFA31A44' }}>
                <img
                  src={mockDrop.creatorImage}
                  alt={mockDrop.creator}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Creator Seal */}
              <div className="absolute -bottom-2 -right-2">
                <CreatorSeal />
              </div>
            </div>
              <div>
              <div className="flex items-center gap-1">
                <h3 className="text-white font-black text-lg">
                  {mockDrop.creator}
                </h3>
              </div>
              <p className="text-gray-300 text-xs">
                  {mockDrop.followerCount} followers
                </p>
              {/* Replace the View Creator Profile button: */}
              <div className="relative inline-flex rounded-full overflow-hidden mt-2 group">
                {/* Animated shimmer background */}
                <div className="absolute inset-0 bg-[linear-gradient(110deg,#FFA500,#FFD580,#FFA500)] bg-[length:200%_100%] animate-shimmer opacity-60 blur-md"></div>
                {/* Extra shimmer highlight overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,white,transparent)] bg-[length:200%_100%] animate-shimmer opacity-20 blur-lg pointer-events-none"></div>
                {/* Actual button */}
                <button className="relative z-10 px-4 py-2 text-sm font-semibold text-white rounded-full bg-orange-500 hover:scale-105 transition-all duration-300 shadow-lg" onClick={() => router.push(`/creator/68a9d503-66ab-4809-a3ae-7b70cad9b202`)}>
                  View Creator Profile
                </button>
              </div>
              </div>
            </motion.div>
            {/* Title and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h1 className="text-white font-bold text-2xl text-center leading-tight relative inline-block uppercase text-[22px] mt-6">
              {mockDrop.title.replace(/\w\S*/g, (w) => w.replace(/^./, c => c.toUpperCase()))}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={underlineIn ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                className="block h-1 mt-1 bg-gradient-to-r from-purple-600 to-orange-400 rounded-full w-2/3 origin-left"
              />
            </h1>
            {/* Quote Box */}
            <blockquote className="relative text-gray-300 text-base italic border-l-4 border-orange-400 pl-4 py-3 px-4 bg-white/5 rounded-lg mt-6">
              <span className="absolute left-2 top-2 text-orange-400 text-lg">“</span>
              {mockDrop.description}
            </blockquote>
            {/* Like + Share Row */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <motion.button
                className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center hover:scale-105 transition-all border border-white/10 shadow-lg"
                onClick={handleLike}
                whileTap={{ scale: 0.95 }}
                animate={likePulse ? { scale: [1, 1.2, 0.95, 1], boxShadow: liked ? '0 0 0 6px #FF3B3B44' : 'none' } : {}}
                transition={{ duration: 0.4 }}
                aria-label={liked ? "Unlike" : "Like"}
                type="button"
              >
                {liked ? (
                  <motion.svg key="filled" xmlns="http://www.w3.org/2000/svg" fill="#FF3B3B" viewBox="0 0 24 24" className="w-6 h-6" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }}>
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </motion.svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#fff" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                )}
                <span className="ml-2 text-xs text-white font-semibold drop-shadow">{(likeCount/1000).toFixed(1)}K</span>
              </motion.button>
              <motion.button
                className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center hover:scale-105 transition-all border border-white/10 shadow-lg"
                onClick={handleShare}
                whileTap={{ scale: 0.95 }}
                aria-label="Share"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#fff" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 8a3 3 0 11-6 0 3 3 0 016 0zm6 8a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.button>
              <AnimatePresence>
                {showShareToast && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute left-1/2 -translate-x-1/2 top-12 bg-black/80 text-white text-xs px-3 py-2 rounded-xl shadow-lg z-30">
                    Link copied!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Fan Reactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 mt-6"
            >
              <div className="flex -space-x-3 relative group">
                {fanAvatars.map((avatar, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={avatar}
                      alt="Fan avatar"
                      className="w-8 h-8 rounded-full border-2 border-white shadow cursor-pointer"
                      style={{ zIndex: fanAvatars.length - i }}
                    />
                    {/* Tooltip on hover */}
                    <span className="absolute left-1/2 -translate-x-1/2 -top-8 bg-black/80 text-white text-xs px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap">
                      Fan {i+1}
                    </span>
                  </div>
                ))}
                {/* Shimmer overlay */}
                <span className="absolute inset-0 pointer-events-none rounded-full animate-shimmer" style={{ background: 'linear-gradient(90deg, transparent, #fff3 40%, transparent 60%)', backgroundSize: '200% 100%' }} />
              </div>
              <span className="text-xs text-gray-300 ml-2">🔥 12,000 fans already unlocked this exclusive drop</span>
            </motion.div>
            </motion.div>
          </div>
        {/* 16px spacing above CTA */}
        <div style={{ height: 16 }} />
        {/* Unlock Section */}
        <div className="w-full sticky bottom-0 pt-8 pb-4 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-center mt-6">
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: '0 0 12px 4px #FFA31A99' }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, type: 'spring', stiffness: 120 }}
            className={`w-full animate-fadeUp ${idlePulse ? 'animate-pulse' : ''}`}
          >
            {/* Replace the Unlock Now button area for a more visible blur: */}
            <div className="w-full flex flex-col items-center justify-center">
              {/* Blurred drop image above the button */}
              <img
                src="https://assets-global.website-files.com/5d9bc5d562ffc2869b73d0d2/63f8e2e2b6b6b6b6b6b6b6b6_mockup.png"
                alt="Unlock mockup background"
                className="mb-[-32px] w-32 h-32 object-cover filter blur-2xl opacity-50 rounded-full shadow-lg"
                style={{ objectFit: 'cover', pointerEvents: 'none' }}
                draggable={false}
              />
              <div className="relative w-full flex items-center justify-center" style={{ overflow: 'visible' }}>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full blur-lg bg-gradient-to-r from-orange-500 to-purple-500 opacity-30 animate-pulse z-0"></div>
                {/* Unlock button */}
                <button
                  className="relative z-10 w-full flex items-center justify-center px-6 py-4 rounded-full font-bold text-white bg-gradient-to-r from-yellow-400 to-purple-600 hover:scale-105 transition ring-2 ring-orange-400/50 ring-offset-2 ring-offset-black shadow-xl"
                  style={{ boxShadow: '0 0 12px 4px #FFA31A99', textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}
              onClick={handleUnlockNow}
              disabled={isUnlocked}
                >
                  <LockOpenIcon />
                  <span className="relative animate-shimmer" style={{ background: 'linear-gradient(90deg, #fff2, #fff8, #fff2)', backgroundSize: '200% 100%' }}>
                    {isUnlocked ? "ACCESS GRANTED" : "UNLOCK NOW"}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
          {/* 16px spacing below CTA */}
          <div style={{ height: 16 }} />
          <div className="text-center mt-4">
            <p className="text-gray-400 text-sm">
              {isUnlocked
                ? "You now have exclusive access to this content"
                : "Unlock to get exclusive access to this content"}
            </p>
            <p className="text-xs text-orange-300 mt-1">
              Only {mockDrop.spotsLeft} unlocks left · Disappears after 24h
            </p>
          </div>
        </div>
      </motion.div>
      {/* FOMO Popup */}
      <FomoPopup
        message={`🔥 Only ${mockDrop.spotsLeft} spots left for "${mockDrop.title}"!`}
        countdownSec={30}
        onDismiss={() => setShowFomo(false)}
        onUnlock={handleSnagIt}
        visible={showFomo}
        dropId={mockDrop.id}
      />
      {/* Bottom Navigation */}
      <Navigation />
      {/* Add a row of fan avatars in the bottom left of the card area: */}
      <div className="absolute bottom-3 left-4 flex -space-x-2 z-20">
        {fanAvatars.map((avatar, i) => (
          <img key={i} src={avatar} className="w-6 h-6 rounded-full border-2 border-black" />
        ))}
      </div>
    </div>
  );
} 