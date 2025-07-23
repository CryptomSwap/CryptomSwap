"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

// Mock fan avatars
const fanAvatars = [
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/45.jpg',
  'https://randomuser.me/api/portraits/women/46.jpg',
  'https://randomuser.me/api/portraits/men/47.jpg',
];

// Creator seal badge
const CreatorSeal = () => (
  <span className="bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full font-bold ml-2">Verified Creator</span>
);

// Radial countdown ring SVG
const RadialCountdown = ({ percent, children }: RadialCountdownProps) => {
  const radius = 16;
  const stroke = 3;
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
        style={{ transition: 'stroke-dashoffset 1s linear', filter: 'drop-shadow(0 0 6px #FFA31A)' }}
      />
      {children && (
        <foreignObject x={radius-12} y={radius-10} width={24} height={20}>
          <div className="flex items-center justify-center w-6 h-5 text-xs font-bold text-white">
            {children}
          </div>
        </foreignObject>
      )}
    </svg>
  );
};

// Add prop types for DropCard and RadialCountdown
interface DropCardProps {
  id: string;
  image: string;
  title: string;
  creator: string;
  countdown: string;
  distance?: string;
  spotsLeft?: number;
  onClick: () => void;
  variant?: "default" | "compact" | "featured";
  locked?: boolean;
}
interface RadialCountdownProps {
  percent: number;
  children?: React.ReactNode;
}

export default function DropCard({
  id,
  image,
  title,
  creator,
  countdown,
  distance,
  spotsLeft,
  onClick,
  variant = "default",
  locked = false
}: DropCardProps) {
  const [liked, setLiked] = useState(false);
  const [likePulse, setLikePulse] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [countdownSec, setCountdownSec] = useState(154); // 2:34
  React.useEffect(() => {
    if (countdownSec > 0) {
      const timer = setTimeout(() => setCountdownSec(countdownSec - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdownSec]);
  const countdownMin = Math.floor(countdownSec / 60);
  const countdownRem = countdownSec % 60;
  const countdownStr = `${countdownMin}:${countdownRem.toString().padStart(2, '0')}`;

  // Shimmer CSS (add to global if not present)
  if (typeof window !== 'undefined' && !document.getElementById('shimmer-keyframes')) {
    const style = document.createElement('style');
    style.id = 'shimmer-keyframes';
    style.innerHTML = `@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } } .shimmer { background: linear-gradient(110deg, #222 0%, #444 40%, #222 100%); background-size: 200% 100%; animation: shimmer 2.5s linear infinite; opacity: 0.18; }`;
    document.head.appendChild(style);
  }

  return (
    <motion.div
      className="relative bg-[#0A0A0A] rounded-2xl p-2 shadow-md border border-white/5 overflow-hidden transition-transform hover:scale-[1.015] min-h-[340px]"
      whileHover={{ scale: 1.015 }}
      onClick={onClick}
    >
      {/* Drop Image + Shimmer */}
      <div className="relative w-full h-56 rounded-xl overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-xl transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 shimmer z-0 rounded-xl pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10 rounded-xl" />
      </div>
      {/* FOMO Tag */}
      <span className={`absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full z-20 shadow-md animate-pulse ${(spotsLeft ?? 0) < 5 ? 'animate-shake' : ''}`}>
        🔥 Only {spotsLeft ?? 0} left!
      </span>
      {/* Radial Countdown (Top-right) */}
      <div className="absolute top-3 right-3 z-20">
        <RadialCountdown percent={countdownSec/154}>
          <span className="text-xs font-bold text-orange-300 drop-shadow">{countdownStr}</span>
        </RadialCountdown>
      </div>
      {/* Title + Creator + Timer (Bottom-left) */}
      <div className="absolute bottom-5 left-4 z-30 text-white drop-shadow-md">
        <p className="font-bold text-lg">{title.replace(/\w\S*/g, (w) => w.replace(/^./, c => c.toUpperCase()))}</p>
        <p className="text-sm text-white/70 flex items-center">{creator}<CreatorSeal /></p>
        <p className="text-sm text-orange-400 mt-1">{countdownStr}</p>
      </div>
      {/* Like & Share (Bottom-right) */}
      <div className="absolute bottom-4 right-4 flex items-center space-x-3 z-30">
        <motion.button
          className="w-9 h-9 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-white/10 hover:scale-110 transition"
          onClick={e => { e.stopPropagation(); setLiked(l => !l); setLikePulse(true); setTimeout(() => setLikePulse(false), 400); }}
          whileTap={{ scale: 0.95 }}
          animate={likePulse ? { scale: [1, 1.2, 0.95, 1], boxShadow: liked ? '0 0 0 6px #FF3B3B44' : 'none' } : {}}
          transition={{ duration: 0.4 }}
          aria-label={liked ? "Unlike" : "Like"}
          type="button"
        >
          {liked ? (
            <motion.svg key="filled" xmlns="http://www.w3.org/2000/svg" fill="#FF3B3B" viewBox="0 0 24 24" className="w-5 h-5" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </motion.svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#fff" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </motion.button>
        <motion.button
          className="w-9 h-9 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-white/10 hover:scale-110 transition"
          onClick={e => { e.stopPropagation(); setShowShareToast(true); setTimeout(() => setShowShareToast(false), 1200); }}
          whileTap={{ scale: 0.95 }}
          aria-label="Share"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#fff" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 8a3 3 0 11-6 0 3 3 0 016 0zm6 8a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </motion.button>
      </div>
      {/* Fan Avatars (Bottom-left) */}
      <div className="absolute bottom-3 left-4 flex -space-x-2 z-20">
        {fanAvatars.map((avatar, i) => (
          <img key={i} src={avatar} className="w-6 h-6 rounded-full border-2 border-black" />
        ))}
      </div>
      {/* Share Toast */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={showShareToast ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-16 right-4 bg-black/80 text-white text-xs px-3 py-2 rounded-xl shadow-lg z-40 pointer-events-none"
        style={{ pointerEvents: 'none' }}
      >
        Link copied!
      </motion.div>
    </motion.div>
  );
} 