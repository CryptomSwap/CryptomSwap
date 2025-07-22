import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { FiLogOut, FiMoon, FiBell, FiMail, FiKey, FiCopy, FiSettings } from "react-icons/fi";

// Mock Data
const mockUser = {
  username: "cyberfan24",
  avatar: "/images/avatar-placeholder.png",
  followers: 12,
  stats: {
    drops: 24,
    days: 8,
    streak: 3,
  },
  referralCode: "PEEPZ2024",
};
const mockVault = [
  {
    id: 1,
    title: "Midnight Tease",
    creator: "DJ Night",
    thumbnail: "/images/vault1.jpg",
  },
  {
    id: 2,
    title: "Late Rush",
    creator: "Synth Queen",
    thumbnail: "/images/vault2.jpg",
  },
  {
    id: 3,
    title: "Purple Rain",
    creator: "Vapor Kid",
    thumbnail: "/images/vault3.jpg",
  },
];

function HexAvatar({ src, onClick }: { src: string; onClick?: () => void }) {
  return (
    <motion.div
      whileHover={{ boxShadow: "0 0 24px #8A00D4, 0 0 0 4px #fff2" }}
      className="w-24 h-24 mx-auto mb-2 cursor-pointer relative"
      onClick={onClick}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        <defs>
          <clipPath id="hex">
            <polygon points="50,5 95,27 95,73 50,95 5,73 5,27" />
          </clipPath>
        </defs>
        <image
          href={src}
          width="100"
          height="100"
          clipPath="url(#hex)"
          className="object-cover"
        />
        <polygon
          points="50,5 95,27 95,73 50,95 5,73 5,27"
          fill="none"
          stroke="#8A00D4"
          strokeWidth="3"
          className="transition-all duration-300"
        />
      </svg>
    </motion.div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 bg-white/5 backdrop-blur-sm rounded-xl p-3 flex flex-col items-center justify-center mx-1 min-w-[80px]"
    >
      <div className="text-lg font-black text-[#FF9900] flex items-center gap-1">{icon}{value}</div>
      <div className="text-xs text-gray-300 font-bold mt-1 uppercase tracking-wide">{label}</div>
    </motion.div>
  );
}

function VaultPreview({ drops, onView }: { drops: typeof mockVault; onView: (id: number) => void }) {
  return (
    <div className="overflow-x-auto flex gap-4 py-2 px-1 -mx-1">
      {drops.map((drop, i) => (
        <motion.div
          key={drop.id}
          whileHover={{ scale: 1.05, boxShadow: "0 0 12px #FF9900" }}
          className="min-w-[120px] bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-[#FF9900] transition"
          onClick={() => onView(drop.id)}
        >
          <img src={drop.thumbnail} alt={drop.title} className="w-full h-20 object-cover" />
          <div className="p-2">
            <div className="text-xs font-bold text-white truncate">{drop.title}</div>
            <div className="text-[10px] text-gray-400 truncate">{drop.creator}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function SettingsList({ onLogout }: { onLogout: () => void }) {
  const [notif, setNotif] = useState(true);
  return (
    <div className="mt-4 space-y-2">
      <button className="w-full flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 text-left text-white font-bold hover:shadow-[0_0_8px_#8A00D4] transition">
        <FiKey className="text-[#8A00D4] text-lg" /> Change Password/Biometric
      </button>
      <button className="w-full flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 text-left text-white font-bold hover:shadow-[0_0_8px_#8A00D4] transition">
        <FiMoon className="text-[#8A00D4] text-lg" /> Theme (Dark)
      </button>
      <button
        className="w-full flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 text-left text-white font-bold hover:shadow-[0_0_8px_#8A00D4] transition"
        onClick={() => setNotif((n) => !n)}
      >
        <FiBell className="text-[#8A00D4] text-lg" /> Notifications
        <span className={`ml-auto w-8 h-4 flex items-center rounded-full p-0.5 ${notif ? 'bg-[#FF9900]' : 'bg-gray-700'}`}>
          <span className={`block w-3 h-3 rounded-full bg-white shadow transform transition ${notif ? 'translate-x-4' : ''}`}></span>
        </span>
      </button>
      <button className="w-full flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 text-left text-white font-bold hover:shadow-[0_0_8px_#8A00D4] transition">
        <FiMail className="text-[#8A00D4] text-lg" /> Contact Support
      </button>
      <button
        className="w-full flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 text-left text-white font-bold hover:shadow-[0_0_8px_#FF9900] transition mt-6"
        onClick={onLogout}
      >
        <FiLogOut className="text-[#FF9900] text-lg" /> Logout
      </button>
    </div>
  );
}

function InviteModal({ open, onClose, code }: { open: boolean; onClose: () => void; code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-background rounded-2xl p-8 max-w-xs w-full text-center border border-[#8A00D4]/40 shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h2 className="text-xl font-black text-[#FF9900] mb-2">Invite Friends</h2>
            <p className="text-gray-300 mb-4">Share your code to get free unlocks!</p>
            <div className="flex items-center justify-center gap-2 bg-white/10 rounded-lg p-2 mb-4">
              <span className="font-mono text-lg text-white tracking-widest">{code}</span>
              <button
                onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1200); }}
                className="text-[#FF9900] hover:text-white transition"
              >
                <FiCopy className="text-xl" />
              </button>
            </div>
            {copied && <div className="text-green-400 text-xs mb-2">Copied!</div>}
            <button
              onClick={onClose}
              className="w-full mt-2 bg-[#FF9900] text-black font-bold py-2 rounded-full shadow-lg hover:shadow-[0_0_8px_#FF9900] transition"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function UserProfile() {
  const router = useRouter();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState(mockUser.username);
  const [avatar, setAvatar] = useState(mockUser.avatar);

  const handleLogout = () => {
    // Add confirmation modal if desired
    if (window.confirm("Are you sure you want to logout?")) {
      // Clear user session here
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] flex flex-col justify-between">
      <main className="flex-1 w-full max-w-md mx-auto px-4 pt-6 pb-2">
        {/* User Header */}
        <div className="flex flex-col items-center mb-4">
          <HexAvatar src={avatar} onClick={() => alert("Avatar upload coming soon!")} />
          {editMode ? (
            <input
              className="bg-black/40 border border-[#8A00D4] rounded-lg px-2 py-1 text-center font-black text-lg text-[#FF9900] mb-1"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoFocus
              onBlur={() => setEditMode(false)}
            />
          ) : (
            <button
              className="font-black text-lg text-[#FF9900] mb-1 hover:underline"
              onClick={() => setEditMode(true)}
            >
              {username}
            </button>
          )}
          <div className="text-xs text-gray-400 mb-2">Follower of {mockUser.followers} Creators</div>
        </div>

        {/* Stats */}
        <div className="flex justify-between mb-4">
          <StatCard label="Drops" value={mockUser.stats.drops} />
          <StatCard label="Days" value={mockUser.stats.days} />
          <StatCard label="Streak" value={<span>🔥 {mockUser.stats.streak}</span>} />
        </div>

        {/* Vault Preview */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-sm text-white">Unlocked Vault</span>
            <button
              className="text-xs text-[#8A00D4] hover:underline"
              onClick={() => router.push("/fan/vault")}
            >
              View All
            </button>
          </div>
          <VaultPreview drops={mockVault} onView={id => router.push(`/fan/drop/${id}`)} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <button
            className="w-full bg-[#FF9900] text-black font-bold py-3 rounded-full shadow-lg hover:shadow-[0_0_8px_#FF9900] transition"
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
          <button
            className="w-full bg-[#8A00D4] text-white font-bold py-3 rounded-full shadow-lg hover:shadow-[0_0_8px_#8A00D4] transition"
            onClick={() => setInviteOpen(true)}
          >
            Invite Friends — Get Free Unlocks
          </button>
          <button
            className="w-full bg-white/10 text-white font-bold py-3 rounded-full shadow-lg hover:shadow-[0_0_8px_#8A00D4] transition flex items-center justify-center gap-2"
            onClick={() => router.push("/fan/settings")}
          >
            <FiSettings className="text-[#8A00D4] text-lg" /> Settings
          </button>
        </div>

        {/* Settings List */}
        <SettingsList onLogout={handleLogout} />
      </main>

      {/* Footer */}
      <footer className="w-full max-w-md mx-auto px-4 pb-4 text-center text-xs text-gray-500">
        <a href="/legal/terms" className="hover:underline">Terms</a> &nbsp;|&nbsp; <a href="/legal/privacy" className="hover:underline">Privacy</a>
      </footer>

      {/* Invite Modal */}
      <InviteModal open={inviteOpen} onClose={() => setInviteOpen(false)} code={mockUser.referralCode} />
    </div>
  );
} 