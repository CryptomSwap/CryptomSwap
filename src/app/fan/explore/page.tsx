"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import FomoPopup from "@/components/FomoPopup";

const mockDrops = [
  // 8+ drops, some locked, some unlocked
  { id: "1", image: "/drops/bts-alex.jpg", title: "Exclusive Behind the Scenes", creator: "Alex Rivera", locked: false },
  { id: "2", image: "/drops/neon-nights.jpg", title: "Early Preview: Neon Nights", creator: "Camila Sato", locked: true },
  { id: "3", image: "/drops/nft-alpha.jpg", title: "NFT Alpha Leak", creator: "Zane Storm", locked: false },
  { id: "4", image: "/drops/hiit.jpg", title: "Morning HIIT Routine", creator: "Luna1995", locked: true },
  { id: "5", image: "/drops/acting-workshop.jpg", title: "Live Acting Workshop", creator: "Olivia Chen", locked: false },
  { id: "6", image: "/drops/portfolio-reveal.jpg", title: "Crypto Portfolio Reveal", creator: "Zane Storm", locked: true },
  { id: "7", image: "/drops/studio-confession.jpg", title: "Studio Confession", creator: "Alex Rivera", locked: false },
  { id: "8", image: "/drops/meal-prep.jpg", title: "Meal Prep Secrets", creator: "Luna1995", locked: false },
];

const mockReels = [
  { id: "r1", video: "/reels/reel1.mp4", thumbnail: "/reels/reel1-thumb.jpg", creator: "@alexrivera", avatar: "/avatars/alex.png", title: "Studio Vibes" },
  { id: "r2", video: "/reels/reel2.mp4", thumbnail: "/reels/reel2-thumb.jpg", creator: "@camisato", avatar: "/avatars/camila.png", title: "Film Set Energy" },
  { id: "r3", video: "/reels/reel3.mp4", thumbnail: "/reels/reel3-thumb.jpg", creator: "@zanestorm", avatar: "/avatars/zane.png", title: "NFT Drop Party" },
  { id: "r4", video: "/reels/reel4.mp4", thumbnail: "/reels/reel4-thumb.jpg", creator: "@luna1995", avatar: "/avatars/luna.png", title: "HIIT in 30s" },
];

function DropTile({ drop, size = "1x1", onClick }: { drop: any; size?: "1x1" | "2x2"; onClick: () => void }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, boxShadow: "0 0 16px #FF990055" }}
      className={`relative bg-white/5 rounded-xl overflow-hidden cursor-pointer group transition-all duration-300 ${size === "2x2" ? "row-span-2 col-span-2" : ""}`}
      onClick={onClick}
    >
      <img src={drop.image} alt={drop.title} className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${drop.locked ? "blur-md" : ""}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 rounded-xl" />
      {drop.locked && (
        <div className="absolute top-2 right-2 bg-black/70 rounded-full p-1 z-20">
          <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 17a2 2 0 002-2v-2a2 2 0 10-4 0v2a2 2 0 002 2zm6-2v-2a6 6 0 10-12 0v2a2 2 0 002 2h8a2 2 0 002-2z" /></svg>
        </div>
      )}
      <div className="absolute bottom-2 left-2 z-20 text-white font-bold text-xs drop-shadow-lg">{drop.title}</div>
      {/* Hover overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/40 z-30">
        <button className="mb-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 text-premium font-medium capitalize shadow-xl hover:scale-105 transition" style={{ letterSpacing: '0.2px', lineHeight: 1.4 }}>Unlock Now</button>
        <div className="flex gap-2">
          <button className="w-9 h-9 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-white/10 hover:scale-110 transition"><span>💜</span></button>
          <button className="w-9 h-9 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-white/10 hover:scale-110 transition"><span>↗️</span></button>
        </div>
      </div>
    </motion.div>
  );
}

function ReelTile({ reel, onClick }: { reel: any; onClick: () => void }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, boxShadow: "0 0 16px #a259ff55" }}
      className="relative w-36 h-64 rounded-2xl overflow-hidden bg-black/40 cursor-pointer group flex-shrink-0"
      onClick={onClick}
    >
      <video src={reel.video} poster={reel.thumbnail} className="w-full h-full object-cover" autoPlay muted loop playsInline />
      <div className="absolute bottom-2 left-2 flex items-center gap-2 z-20">
        <img src={reel.avatar} className="w-8 h-8 rounded-full border-2 border-orange-400" alt="avatar" />
        <span className="text-white text-xs font-bold drop-shadow">{reel.creator}</span>
      </div>
      <div className="absolute top-2 left-2 bg-gradient-to-r from-orange-400 to-purple-500 text-black text-xs font-bold px-2 py-1 rounded-full shadow animate-pulse z-20">Reel</div>
    </motion.div>
  );
}

export default function ExplorePage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showReelModal, setShowReelModal] = useState(false);
  const [activeReel, setActiveReel] = useState<any>(null);

  // Responsive grid: alternate some tiles as 2x2 for visual interest
  const gridDrops = mockDrops.map((drop, i) => ({ ...drop, size: (i % 7 === 0 ? '2x2' : '1x1') as '1x1' | '2x2' }));

  return (
    <div className="min-h-screen bg-[#0B0B0E] relative overflow-x-hidden">
      {/* Grain/texture overlay */}
      <div className="absolute inset-0 bg-[url('/textures/grain.png')] opacity-10 pointer-events-none z-0" />
      {/* Top: Search + Filter */}
      <div className="sticky top-0 z-30 bg-[#0B0B0E]/80 backdrop-blur-xl border-b border-white/10 px-4 py-4 flex flex-col gap-3">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search creators, drops, or tags..."
          className="w-full px-4 py-2 rounded-full bg-black/40 border border-purple-500/30 text-premium placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-orange-400/80 shadow-inner transition"
        />
        <div className="flex gap-2 mt-1">
          {["all", "reels", "photos", "new", "most"].map(f => (
            <button
              key={f}
              className={`px-4 py-1 rounded-full border border-purple-500/30 text-sm font-medium capitalize transition-all ${filter === f ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-premium shadow' : 'bg-[#18181b] text-secondary hover:bg-purple-900/30'}`}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All" : f === "reels" ? "Reels" : f === "photos" ? "Photos" : f === "new" ? "New Drops" : "Most Unlocked"}
            </button>
          ))}
        </div>
      </div>
      {/* Drops Grid */}
      <div className="px-2 pt-4 pb-32 max-w-2xl mx-auto">
        <div className="grid grid-cols-3 gap-3 auto-rows-[120px] sm:auto-rows-[140px]">
          {gridDrops.map((drop, i) => (
            <DropTile key={drop.id} drop={drop} size={drop.size} onClick={() => {}} />
          ))}
        </div>
      </div>
      {/* Reels Carousel */}
      <div className="px-4 mt-2">
        <div className="text-orange-400 font-bold mb-2">🔥 Trending Reels</div>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {mockReels.map((reel, i) => (
            <ReelTile key={reel.id} reel={reel} onClick={() => { setActiveReel(reel); setShowReelModal(true); }} />
          ))}
        </div>
      </div>
      {/* Reel Modal */}
      <AnimatePresence>
        {showReelModal && activeReel && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
            <div className="relative w-[320px] h-[600px] bg-black rounded-2xl overflow-hidden flex flex-col items-center">
              <video src={activeReel.video} poster={activeReel.thumbnail} className="w-full h-full object-cover" autoPlay muted loop playsInline />
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <img src={activeReel.avatar} className="w-8 h-8 rounded-full border-2 border-orange-400" alt="avatar" />
                  <span className="text-white text-xs font-bold drop-shadow">{activeReel.creator}</span>
                </div>
                <div className="text-white font-bold text-lg">{activeReel.title}</div>
                <div className="flex gap-2 mt-2">
                  <button className="w-10 h-10 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-white/10 hover:scale-110 transition"><span>💜</span></button>
                  <button className="w-10 h-10 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-white/10 hover:scale-110 transition"><span>↗️</span></button>
                  <button className="flex-1 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 text-white font-bold shadow-xl hover:scale-105 transition">Unlock</button>
                </div>
              </div>
              <button className="absolute top-2 right-2 text-white/70 hover:text-white text-2xl" onClick={() => setShowReelModal(false)}>×</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
} 