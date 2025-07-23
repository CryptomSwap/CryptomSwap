"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

// Modern SVG Icons for Creator Navigation
const HomeIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`transition-all duration-300 ${active ? 'drop-shadow-[0_0_8px_rgba(255,163,26,0.8)]' : ''}`}>
    <path d="M3 12L12 3l9 9v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7z" 
          stroke={active ? '#FFA31A' : '#B0B0B0'} 
          strokeWidth="1.5" 
          fill={active ? '#FFA31A' : 'none'} />
    <rect x="9" y="14" width="6" height="5" rx="1" 
          fill={active ? '#fff' : '#B0B0B0'} 
          opacity=".2" />
  </svg>
);

const ReelsIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`transition-all duration-300 ${active ? 'drop-shadow-[0_0_8px_rgba(255,163,26,0.8)]' : ''}`}>
    <rect x="3" y="5" width="18" height="14" rx="3" 
          stroke={active ? '#FFA31A' : '#B0B0B0'} 
          strokeWidth="1.5" 
          fill="none" />
    <rect x="8" y="9" width="8" height="6" rx="2" 
          fill={active ? '#FFA31A' : '#B0B0B0'} 
          opacity=".2" />
  </svg>
);

const UploadIcon = ({ active }: { active: boolean }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className={`transition-all duration-300 ${active ? 'drop-shadow-[0_0_12px_rgba(255,163,26,0.9)]' : ''}`}>
    <circle cx="12" cy="12" r="11" 
            stroke={active ? '#FFA31A' : '#B0B0B0'} 
            strokeWidth="2" 
            fill="url(#uploadGradient)" />
    <defs>
      <linearGradient id="uploadGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFA31A"/>
        <stop offset="1" stopColor="#8A00D4"/>
      </linearGradient>
    </defs>
    <path d="M12 8v8M8 12h8" 
          stroke="#fff" 
          strokeWidth="2" 
          strokeLinecap="round" />
  </svg>
);

const ChartIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`transition-all duration-300 ${active ? 'drop-shadow-[0_0_8px_rgba(255,163,26,0.8)]' : ''}`}>
    <rect x="4" y="10" width="3" height="7" rx="1.5" 
          fill={active ? '#FFA31A' : '#B0B0B0'} />
    <rect x="10.5" y="6" width="3" height="11" rx="1.5" 
          fill={active ? '#FFA31A' : '#B0B0B0'} />
    <rect x="17" y="13" width="3" height="4" rx="1.5" 
          fill={active ? '#FFA31A' : '#B0B0B0'} />
  </svg>
);

const BellIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`transition-all duration-300 ${active ? 'drop-shadow-[0_0_8px_rgba(255,163,26,0.8)]' : ''}`}>
    <path d="M12 22c1.1 0 2-.9 2-2H10a2 2 0 0 0 2 2zm6-6V11c0-3.07-1.63-5.64-4.5-6.32V4a1.5 1.5 0 0 0-3 0v.68C7.63 5.36 6 7.92 6 11v5l-1.29 1.29A1 1 0 0 0 6 19h12a1 1 0 0 0 .71-1.71L18 16z" 
          fill={active ? '#FFA31A' : '#B0B0B0'} />
  </svg>
);

// Fan Navigation Icons
const DiscoverIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={`transition-all duration-300 ${active ? 'drop-shadow-[0_0_8px_rgba(255,163,26,0.8)]' : ''}`}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" 
          fill={active ? '#FFA31A' : '#6B7280'} 
          stroke={active ? '#FFA31A' : '#6B7280'} 
          strokeWidth="0.5"/>
  </svg>
);

const VaultIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={`transition-all duration-300 ${active ? 'drop-shadow-[0_0_8px_rgba(255,163,26,0.8)]' : ''}`}>
    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5zM12 15c-1.4 0-2.8-1.1-2.8-2.5V11c0-1.4 1.4-2.5 2.8-2.5s2.8 1.1 2.8 2.5v1.5c0 1.4-1.4 2.5-2.8 2.5z" 
          fill={active ? '#FFA31A' : '#6B7280'} 
          stroke={active ? '#FFA31A' : '#6B7280'} 
          strokeWidth="0.5"/>
  </svg>
);

const ExclusiveIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={`transition-all duration-300 ${active ? 'drop-shadow-[0_0_8px_rgba(255,163,26,0.8)]' : ''}`}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
          fill={active ? '#FFA31A' : '#6B7280'} 
          stroke={active ? '#FFA31A' : '#6B7280'} 
          strokeWidth="0.5"/>
  </svg>
);

const ProfileIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={`transition-all duration-300 ${active ? 'drop-shadow-[0_0_8px_rgba(255,163,26,0.8)]' : ''}`}>
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" 
          fill={active ? '#FFA31A' : '#6B7280'} 
          stroke={active ? '#FFA31A' : '#6B7280'} 
          strokeWidth="0.5"/>
  </svg>
);

const FollowingIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={`transition-all duration-300 ${active ? 'drop-shadow-[0_0_8px_rgba(255,163,26,0.8)]' : ''}`}>
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" 
          fill={active ? '#FFA31A' : '#6B7280'} 
          stroke={active ? '#FFA31A' : '#6B7280'} 
          strokeWidth="0.5"/>
  </svg>
);

// Helper to get creator avatar from localStorage
function useCreatorAvatar() {
  const [avatar, setAvatar] = React.useState<string | null>(null);
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        try {
          const user = JSON.parse(currentUser);
          setAvatar(user.avatar || null);
        } catch {
          setAvatar(null);
        }
      }
    }
  }, []);
  return avatar;
}

// Creator Navigation Item Component
function CreatorNavItem({ 
  icon, 
  label, 
  path, 
  highlight, 
  badge 
}: { 
  icon: React.ReactNode; 
  label: string; 
  path: string; 
  highlight?: boolean; 
  badge?: string; 
}) {
  const router = useRouter();
  const pathname = usePathname();
  const active = pathname === path || pathname.startsWith(path);

  return (
    <motion.button
      onClick={() => router.push(path)}
      className={`flex flex-col items-center justify-center relative transition-all duration-300 ${
        highlight ? 'scale-110 z-10' : ''
      }`}
      whileHover={{ scale: highlight ? 1.15 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={highlight ? { 
        filter: 'drop-shadow(0 0 20px rgba(255, 163, 26, 0.6))' 
      } : {}}
    >
      <div className={`rounded-full flex items-center justify-center p-2 ${
        highlight 
          ? 'bg-gradient-to-br from-orange-400 to-purple-600 shadow-lg animate-pulse' 
          : active 
            ? 'bg-black/40 ring-2 ring-orange-400/60' 
            : 'bg-transparent'
      }`} 
      style={highlight ? { 
        boxShadow: '0 0 24px 8px rgba(255, 163, 26, 0.4)' 
      } : {}}>
        {React.cloneElement(icon as React.ReactElement, { active })}
      </div>
      <span className={`text-xs mt-1 font-medium ${
        active ? 'text-[#FFA31A]' : 'text-gray-400'
      }`}>
        {label}
      </span>
      {badge && (
        <motion.span 
          className={`absolute -top-1 -right-2 text-xs rounded-full px-1.5 py-0.5 ${
            label === 'Inbox' ? 'bg-red-500 text-white' : 'bg-orange-400 text-white'
          } shadow font-bold`} 
          style={{ fontSize: 10 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {badge}
        </motion.span>
      )}
    </motion.button>
  );
}

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [userType, setUserType] = useState<'fan' | 'creator'>('fan');
  const avatar = useCreatorAvatar();

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      try {
        const user = JSON.parse(currentUser);
        setUserType(user.role || 'fan');
      } catch (error) {
        console.error('Error parsing user data:', error);
        setUserType('fan');
      }
    }
  }, []);

  // --- CREATOR NAVIGATION ---
  if (userType === 'creator') {
    // Mock data for badges (replace with real logic)
    const hasNewStats = true;
    const hasNewInbox = true;

    return (
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed bottom-0 w-full flex justify-around items-center bg-black/90 py-4 border-t border-gray-800 z-50 rounded-t-2xl shadow-2xl backdrop-blur-xl"
      >
        <CreatorNavItem 
          icon={<HomeIcon active={pathname === '/creator'} />} 
          label="Dashboard" 
          path="/creator" 
        />
        <CreatorNavItem 
          icon={<ReelsIcon active={pathname === '/creator/drops'} />} 
          label="My Drops" 
          path="/creator/drops" 
        />
        <CreatorNavItem 
          icon={<UploadIcon active={pathname === '/creator/upload'} />} 
          label="Upload" 
          path="/creator/upload" 
          highlight 
        />
        <CreatorNavItem 
          icon={<ChartIcon active={pathname === '/creator/stats'} />} 
          label="Stats" 
          path="/creator/stats" 
        />
        <CreatorNavItem 
          icon={<BellIcon active={pathname === '/creator/inbox'} />} 
          label="Inbox" 
          path="/creator/inbox" 
        />
      </motion.nav>
    );
  }

  // --- FAN NAVIGATION ---
  const fanNavItems = [
    { id: "discover", label: "Discover", icon: <DiscoverIcon active={false} />, path: "/fan/explore" },
    { id: "following", label: "Following", icon: <FollowingIcon active={false} />, path: "/fan/following" },
    { id: "vault", label: "Vault", icon: <VaultIcon active={false} />, path: "/fan/vault" },
    { id: "exclusive", label: "Exclusive", icon: <ExclusiveIcon active={false} />, path: "/fan/invite" },
    { id: "profile", label: "Profile", icon: <ProfileIcon active={false} />, path: "/fan/profile" },
  ];

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-t border-white/10"
    >
      <div className="flex items-center justify-around px-4 py-0.5">
        {fanNavItems.map((item, index) => {
          const active = pathname === item.path || pathname.startsWith(item.path);
          
          return (
            <motion.button
              key={item.id}
              onClick={() => router.push(item.path)}
              className="relative flex flex-col items-center justify-center w-10 h-10 rounded-2xl transition-all duration-300"
              style={{
                background: active 
                  ? 'linear-gradient(135deg, rgba(255, 163, 26, 0.1), rgba(255, 163, 26, 0.05))'
                  : 'transparent',
                border: active 
                  ? '1px solid rgba(255, 163, 26, 0.3)'
                  : '1px solid transparent',
                boxShadow: active 
                  ? '0 0 20px rgba(255, 163, 26, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  : 'none'
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className="mb-1 relative z-10"
                animate={{
                  scale: active ? 1.1 : 1
                }}
                transition={{ duration: 0.3 }}
              >
                {React.cloneElement(item.icon as React.ReactElement, { active })}
              </motion.div>

              <span className={`text-xs font-bold tracking-wide relative z-10 ${
                active ? 'text-[#FFA31A]' : 'text-gray-400'
              }`}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="h-1 bg-background/80 backdrop-blur-xl" />
    </motion.nav>
  );
} 