"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import CreatorNavbar from "@/components/CreatorNavbar";

// Modern SVG Icons
const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const UnlockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <circle cx="12" cy="16" r="1" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const DollarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 01 0 7H6" />
  </svg>
);

const MusicIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const creator = {
  name: "Sophie",
  handle: "@itssophielicious",
  avatar: "/avatars/sophie.png",
  verified: true,
  status: "active",
  followers: 1245,
  unlocks: 376,
  earnings: 5430,
  drops: [
    {
      title: "First Drop",
      image: "/drops/sophie-drop1.jpg",
      unlocks: 120,
      status: "active",
      isPopular: true,
    },
    {}, {}, // 3 placeholders
  ],
  bio: "Just dropped my first exclusive. Come see what's inside.",
};

function GoldVerifiedBadge() {
  return (
    <span className="relative inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 shadow-lg border border-yellow-300 overflow-hidden group">
      <svg className="w-3 h-3 text-yellow-900 z-10" fill="currentColor" viewBox="0 0 20 20">
        <path d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" />
      </svg>
      {/* Metallic shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-60 group-hover:animate-shimmer pointer-events-none" />
    </span>
  );
}

function MetricCard({ icon, label, value, change }: { icon: React.ReactNode; label: string; value: string; change: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(0,0,0,0.15)" }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="text-gray-400 mb-2 flex justify-center">
        {icon}
      </div>
      <div className="text-2xl font-medium text-white mb-1">{value}</div>
      <div className="text-xs text-green-400 mb-1 font-medium">{change}</div>
      <div className="text-xs text-gray-400 font-medium">{label}</div>
    </motion.div>
  );
}

function DropTile({ drop, isPopular }: { drop: any; isPopular?: boolean }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(0,0,0,0.15)" }}
      className={`relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden flex flex-col items-center transition cursor-pointer group ${isPopular ? "ring-1 ring-orange-400/30" : ""}`}
    >
      <div className="w-full aspect-square bg-black/20 flex items-center justify-center">
        {drop?.image ? (
          <img src={drop.image} alt={drop.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-2xl text-gray-500">+</span>
        )}
      </div>
      <div className="w-full px-3 py-2">
        <div className="text-sm font-medium text-white truncate flex items-center gap-1">
          {drop?.title || "New Drop"}
          {isPopular && <span className="text-orange-400 text-xs font-medium">Popular</span>}
        </div>
        <div className="text-xs text-gray-400 truncate">{drop?.unlocks ? `${drop.unlocks} unlocks` : ""}</div>
      </div>
      {isPopular && (
        <div className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm">Most Popular</div>
      )}
    </motion.div>
  );
}

export default function Page() {
  const [filter, setFilter] = useState("all");
  const [showMenu, setShowMenu] = useState(false);
  const [avatar, setAvatar] = useState(creator.avatar);
  const [showFileInput, setShowFileInput] = useState(false);
  const router = useRouter();
  const drops = creator.drops;
  const filteredDrops = drops.filter((d: any) => {
    if (filter === "all") return true;
    if (filter === "active") return d.status === "active";
    if (filter === "archived") return d.status === "archived" || d.status === "expired";
    return true;
  });
  const mostPopular = drops.find((d: any) => d.isPopular);

  const handleMenuOption = (option: string) => {
    setShowMenu(false);
    switch (option) {
      case 'edit': router.push('/creator/profile'); break;
      case 'upload': router.push('/creator/upload'); break;
      case 'referrals': router.push('/creator/referrals'); break;
      case 'analytics': router.push('/creator/analytics'); break;
      case 'account': router.push('/creator/settings'); break;
      case 'billing': router.push('/creator/billing'); break;
      case 'settings': router.push('/creator/settings'); break;
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="relative bg-gradient-to-b from-[#0d0d0d] to-[#1c1c1c] min-h-screen text-white overflow-hidden">
        {/* PEEPZ Logo */}
        <div className="absolute top-6 left-6 z-50">
          <div className="font-black text-xl tracking-wider peepz-logo" style={{ color: '#ffa31a' }}>
            PEEPZ
          </div>
        </div>

        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px'
        }} />

        {/* Top Bar with Hamburger */}
        <div className="max-w-md mx-auto flex items-center justify-between px-6 pt-6 pb-4">
          <div />
          <button
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition relative z-20"
            onClick={() => setShowMenu((v) => !v)}
          >
            <div className="flex flex-col space-y-1">
              <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${showMenu ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${showMenu ? 'opacity-0' : ''}`}></div>
              <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${showMenu ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </div>
          </button>
          
          {/* Dropdown Menu */}
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute right-6 top-16 w-48 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="py-2">
                <button onClick={() => handleMenuOption('edit')} className="w-full px-4 py-2 text-left text-white hover:text-orange-400 transition-colors duration-200 text-sm">Edit Profile</button>
                <button onClick={() => handleMenuOption('upload')} className="w-full px-4 py-2 text-left text-white hover:text-orange-400 transition-colors duration-200 text-sm">Upload Drop</button>
                <button onClick={() => handleMenuOption('referrals')} className="w-full px-4 py-2 text-left text-white hover:text-orange-400 transition-colors duration-200 text-sm">Referrals</button>
                <button onClick={() => handleMenuOption('analytics')} className="w-full px-4 py-2 text-left text-white hover:text-orange-400 transition-colors duration-200 text-sm">Analytics</button>
                <div className="border-t border-white/10 my-1"></div>
                <button onClick={() => handleMenuOption('account')} className="w-full px-4 py-2 text-left text-white hover:text-orange-400 transition-colors duration-200 text-sm">Account Settings</button>
                <button onClick={() => handleMenuOption('billing')} className="w-full px-4 py-2 text-left text-white hover:text-orange-400 transition-colors duration-200 text-sm">Billing</button>
                <button onClick={() => handleMenuOption('settings')} className="w-full px-4 py-2 text-left text-white hover:text-orange-400 transition-colors duration-200 text-sm">Settings</button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Profile Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-md mx-auto mt-6 px-6">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl rounded-2xl px-6 py-6 flex items-center gap-6 relative overflow-hidden">
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-orange-500/10 rounded-2xl opacity-50" />
            
            {/* Content */}
            <div className="flex justify-between items-center w-full relative z-10">
              {/* Info left */}
              <div className="flex flex-col justify-start">
                <span className="text-white font-medium text-xl mb-1">{creator.name}</span>
                <span className="text-gray-400 text-sm font-medium mb-2">{creator.handle}</span>
                <span className="text-green-400 text-xs font-medium px-2 py-1 rounded-full bg-green-500/10 w-fit mb-3">{creator.status}</span>
                <span className="text-gray-300 text-sm line-clamp-2 font-normal">{creator.bio}</span>
              </div>
              
              {/* Avatar + verified badge right */}
              <div className="relative flex items-center justify-center">
                <div className="relative">
                  <img src={avatar} className="w-24 h-24 rounded-full border-2 border-white/20" alt="avatar" />
                  {creator.verified && (
                    <span className="absolute -bottom-1 -right-1">
                      <GoldVerifiedBadge />
                    </span>
                  )}
                  {/* Camera upload button */}
                  <button
                    className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center shadow-lg hover:scale-110 hover:bg-black/80 transition"
                    onClick={() => setShowFileInput(true)}
                    type="button"
                    tabIndex={0}
                    aria-label="Change profile picture"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M15 10l4.553-2.276A2 2 0 0020 6.382V5a2 2 0 00-2-2H6a2 2 0 00-2 2v1.382a2 2 0 00.447 1.342L9 10m6 0v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6m6 0l-4.553-2.276A2 2 0 014 6.382V5a2 2 0 012-2h12a2 2 0 012 2v1.382a2 2 0 01-.447 1.342L15 10z" />
                      <circle cx="12" cy="13" r="3" />
                    </svg>
                  </button>
                  {showFileInput && (
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute bottom-0 right-0 opacity-0 w-8 h-8 cursor-pointer z-30"
                      style={{ pointerEvents: 'auto' }}
                      onChange={e => { handleAvatarChange(e); setShowFileInput(false); }}
                      onBlur={() => setShowFileInput(false)}
                      autoFocus
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Welcome Message */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 4, delay: 0.8, ease: "easeOut" }} className="max-w-md mx-auto mt-6 px-6">
          <h2 className="text-[18px] font-sacrifice text-transparent bg-clip-text bg-gradient-to-r from-[#ffa31a] via-[#8A00D4] to-[#4A0080]">
            Welcome Back, Sophie
          </h2>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="max-w-md mx-auto px-6 mb-8">
          <div className="grid grid-cols-2 gap-4">
            <MetricCard icon={<UserIcon />} label="Followers" value="1,245" change="+4.2%" />
            <MetricCard icon={<UnlockIcon />} label="Unlocks" value="376" change="+3.1%" />
            <MetricCard icon={<DollarIcon />} label="Earnings" value="$5,430" change="+$420" />
            <MetricCard icon={<MusicIcon />} label="Drops" value="3" change="+0%" />
          </div>
        </motion.div>

        {/* Recent Drops */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="max-w-md mx-auto px-6 mb-24">
          <h3 className="text-lg font-medium text-white mb-4">Recent Drops</h3>
          <div className="grid grid-cols-2 gap-4">
            {filteredDrops.map((drop, index) => (
              <DropTile key={index} drop={drop} isPopular={drop?.isPopular} />
            ))}
          </div>
        </motion.div>



        <CreatorNavbar />
      </div>
    </>
  );
} 