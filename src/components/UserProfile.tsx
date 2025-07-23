import React from "react";
import { motion } from "framer-motion";

// Mock Data
const creator = {
  name: "Creator1",
  username: "@creator1",
  avatar: "/creator-avatar.png",
  bio: "Sharing premium, exclusive content with top fans.",
  verified: true,
  status: "Active",
  stats: [
    { label: "Drops", value: 0, trend: "+0%" },
    { label: "Followers", value: "1,200", trend: "+12%" },
    { label: "Unlocks", value: 200, trend: "+3.4%" },
    { label: "Earnings", value: "$5,000", trend: "+$420" },
  ],
  drops: [], // Fill with drop objects for demo
};

function StatBlock({ label, value, trend }: { label: string; value: React.ReactNode; trend: string }) {
  return (
    <div className="bg-white/5 rounded-xl py-3 px-2 flex flex-col items-center hover:bg-white/10 transition group">
      <div className="text-xl font-bold text-white flex items-center gap-1">{value}</div>
      <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mt-1">{label}</div>
      <div className="text-[10px] text-green-400 mt-0.5 group-hover:scale-105 transition">{trend}</div>
    </div>
  );
}

function DropTile({ drop }: { drop: any }) {
  return (
    <div className="bg-white/5 rounded-xl overflow-hidden flex flex-col items-center shadow hover:shadow-orange-500/30 transition cursor-pointer group">
      <div className="w-full aspect-square bg-black/30 flex items-center justify-center">
        {drop?.thumbnail ? (
          <img src={drop.thumbnail} alt={drop.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-3xl text-white/30">+</span>
        )}
      </div>
      <div className="w-full px-2 py-1">
        <div className="text-xs font-bold text-white truncate">{drop?.title || "New Drop"}</div>
        <div className="text-[10px] text-gray-400 truncate">{drop?.unlocks ? `${drop.unlocks} unlocks` : ""}</div>
      </div>
    </div>
  );
}

export default function UserProfile() {
  // For demo, no drops
  const drops = creator.drops;
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-premium">
      {/* Top Profile Card */}
      <div className="flex items-center gap-4 px-4 mt-4">
        <img src={creator.avatar} className="w-16 h-16 rounded-full border-2 border-orange-500" alt="avatar" />
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-premium text-lg font-medium capitalize" style={{ letterSpacing: '0.2px', lineHeight: 1.4 }}>{creator.name}</h2>
            {creator.verified && (
              <span className="inline-block align-middle" title="Verified">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#FFD700" />
                  <path d="M8 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
            <span className="ml-2 px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-medium capitalize">{creator.status}</span>
          </div>
          <p className="text-purple-400 text-sm">{creator.username}</p>
          <p className="text-white/70 text-sm mt-1">{creator.bio}</p>
        </div>
      </div>
      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4 mt-6 px-4 text-center text-white">
        {creator.stats.map((stat, i) => (
          <StatBlock key={i} {...stat} />
        ))}
      </div>
      {/* Recent Drops Grid */}
      <h3 className="text-premium text-lg font-medium capitalize px-4 mt-8" style={{ letterSpacing: '0.2px', lineHeight: 1.4 }}>Recent Drops</h3>
      {drops.length === 0 ? (
        <div className="px-4 text-white/50 text-center py-8">No drops yet. Start creating below.</div>
      ) : (
        <div className="grid grid-cols-3 gap-3 px-4 mt-2">
          {drops.map((drop, i) => (
            <DropTile key={i} drop={drop} />
          ))}
        </div>
      )}
      {/* Floating Add Drop Button */}
      <button className="fixed bottom-20 right-6 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center shadow-xl hover:scale-110 transition z-50">
        <span className="text-white text-3xl">+</span>
      </button>
    </div>
  );
} 