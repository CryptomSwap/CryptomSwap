"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  userType: 'fan' | 'creator' | 'both';
}

// Modern SVG Icons
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

const WalletIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={`transition-all duration-300 ${active ? 'drop-shadow-[0_0_8px_rgba(255,163,26,0.8)]' : ''}`}>
    <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8z" 
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

const StudioIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={`transition-all duration-300 ${active ? 'drop-shadow-[0_0_8px_rgba(255,163,26,0.8)]' : ''}`}>
    <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" 
          fill={active ? '#FFA31A' : '#6B7280'} 
          stroke={active ? '#FFA31A' : '#6B7280'} 
          strokeWidth="0.5"/>
  </svg>
);

const CreateIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={`transition-all duration-300 ${active ? 'drop-shadow-[0_0_8px_rgba(255,163,26,0.8)]' : ''}`}>
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" 
          fill={active ? '#FFA31A' : '#6B7280'} 
          stroke={active ? '#FFA31A' : '#6B7280'} 
          strokeWidth="0.5"/>
  </svg>
);

const NetworkIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={`transition-all duration-300 ${active ? 'drop-shadow-[0_0_8px_rgba(255,163,26,0.8)]' : ''}`}>
    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1l-1.7 2.26V15h-1.5v6H20zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9V9c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6.5h1.5V22h4z" 
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

const EarningsIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={`transition-all duration-300 ${active ? 'drop-shadow-[0_0_8px_rgba(255,163,26,0.8)]' : ''}`}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" 
          fill={active ? '#FFA31A' : '#6B7280'} 
          stroke={active ? '#FFA31A' : '#6B7280'} 
          strokeWidth="0.5"/>
  </svg>
);

const navItems: NavItem[] = [
  // Fan navigation
  { id: "discover", label: "Discover", icon: <DiscoverIcon active={false} />, path: "/fan/explore", userType: 'fan' },
  { id: "following", label: "Following", icon: <FollowingIcon active={false} />, path: "/fan/following", userType: 'fan' },
  { id: "vault", label: "Vault", icon: <VaultIcon active={false} />, path: "/fan/vault", userType: 'fan' },
  { id: "exclusive", label: "Exclusive", icon: <ExclusiveIcon active={false} />, path: "/fan/invite", userType: 'fan' },
  { id: "profile", label: "Profile", icon: <ProfileIcon active={false} />, path: "/fan/profile", userType: 'fan' },
  
  // Creator navigation
  { id: "studio", label: "Studio", icon: <StudioIcon active={false} />, path: "/creator", userType: 'creator' },
  { id: "create", label: "Create", icon: <CreateIcon active={false} />, path: "/creator/upload", userType: 'creator' },
  { id: "network", label: "Network", icon: <NetworkIcon active={false} />, path: "/creator/referrals", userType: 'creator' },
  { id: "earnings", label: "Earnings", icon: <EarningsIcon active={false} />, path: "/creator/profile", userType: 'creator' },
  { id: "profile", label: "Profile", icon: <ProfileIcon active={false} />, path: "/creator/profile", userType: 'creator' }
];

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [userType, setUserType] = useState<'fan' | 'creator'>('fan');

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

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path);
  };

  const userNavItems = navItems.filter(item => 
    item.userType === userType || item.userType === 'both'
  );

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-t border-white/10"
    >
      <div className="flex items-center justify-around px-4 py-0.5">
        {userNavItems.map((item, index) => {
          const active = isActive(item.path);
          
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
              {/* Icon */}
              <motion.div
                className="mb-1 relative z-10"
                animate={{
                  scale: active ? 1.1 : 1
                }}
                transition={{ duration: 0.3 }}
              >
                {React.cloneElement(item.icon as React.ReactElement, { active })}
              </motion.div>

              {/* Label */}
              <span className={`text-xs font-bold tracking-wide relative z-10 ${
                active ? 'text-[#FFA31A]' : 'text-gray-400'
              }`}>
                {item.label}
              </span>

              {/* Active indicator */}
            </motion.button>
          );
        })}
      </div>

      {/* Bottom safe area for mobile */}
      <div className="h-1 bg-background/80 backdrop-blur-xl" />
    </motion.nav>
  );
} 