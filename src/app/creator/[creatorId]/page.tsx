"use client";
import React, { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { mockCreators, mockDrops } from "@/lib/mockData";
import DropCard from "@/components/DropCard";
// import useFanVault from "@/hooks/useFanVault"; // (optional)
// import CreatorBanner from "@/components/CreatorBanner"; // (to be created)

export default function FanCreatorProfilePage() {
  const { creatorId } = useParams();
  // TODO: Replace with real fan data or hook
  const fan = { id: "fan1", unlockedDropIds: ["drop1-1", "drop2-2"] };

  const creator = useMemo(() => mockCreators.find(c => c.id === creatorId), [creatorId]);
  const drops = useMemo(() => mockDrops.filter(d => d.creatorId === creatorId && new Date(d.expiresAt) > new Date()), [creatorId]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Tag filter logic
  const allTags = Array.from(new Set(drops.flatMap(d => d.tags || [])));
  const filteredDrops = selectedTag ? drops.filter(d => d.tags?.includes(selectedTag)) : drops;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] flex flex-col">
      {/* Hero Section */}
      {/* <CreatorBanner creator={creator} /> */}
      <div className="relative w-full h-48 md:h-64 bg-gradient-to-br from-purple-900 via-black to-orange-900 flex items-end justify-center">
        <img src={creator?.banner} alt="banner" className="absolute inset-0 w-full h-full object-cover object-center z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
        <div className="relative z-20 flex flex-col items-center mb-[-2.5rem]">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}
            className="w-24 h-24 rounded-full border-4 border-purple-500/80 bg-black/80 flex items-center justify-center shadow-xl animate-glow">
            <img src={creator?.avatar} alt={creator?.displayName} className="w-24 h-24 rounded-full object-cover" />
          </motion.div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-8 px-4">
        <h1 className="font-inter font-bold text-2xl text-white mb-1 animate-fadeInUp">{creator?.displayName}</h1>
        <p className="text-gray-400 text-sm mb-2 animate-fadeInUp">@{creator?.username}</p>
        <div className="glass-premium rounded-xl px-4 py-3 mb-4 w-full max-w-md text-center animate-fadeInUp">
          <p className="text-gray-200 text-base leading-relaxed">{creator?.bio}</p>
        </div>
      </div>

      {/* Tag Filters */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mt-2 mb-4 px-4">
          {allTags.map(tag => (
            <button
              key={tag}
              className={`px-3 py-1 rounded-full text-xs font-bold border-0 transition-all duration-200
                ${selectedTag === tag
                  ? 'bg-gradient-to-r from-orange-500 via-purple-600 to-orange-400 text-white shadow-lg'
                  : 'bg-orange-500 text-white hover:bg-purple-600 hover:text-white'}`}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Drops Feed */}
      <div className="flex-1 w-full max-w-md mx-auto px-2 pb-24">
        <h2 className="font-inter font-bold text-lg text-white mb-3 mt-2 animate-fadeInUp">Drops by {creator?.displayName}</h2>
        <div className="grid grid-cols-2 gap-4">
          <AnimatePresence>
            {filteredDrops.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-2 text-center text-gray-500 py-12">
                No drops available yet.
              </motion.div>
            ) : (
              filteredDrops.map(drop => {
                const unlocked = fan.unlockedDropIds.includes(drop.id);
                return (
                  <DropCard
                    key={drop.id}
                    id={drop.id}
                    image={drop.thumbnail || drop.mediaUrl || "/default-drop.png"}
                    title={drop.title}
                    creator={creator?.displayName || ""}
                    countdown={/* TODO: format countdown from drop.expiresAt */ ""}
                    spotsLeft={drop.unlockLimit}
                    onClick={() => {/* TODO: handle drop click (unlock/view) */}}
                    locked={!unlocked}
                  />
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Follow Button */}
      <motion.button
        whileHover={{ scale: 1.08, boxShadow: "0 0 24px #FF9900" }}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-6 right-6 z-50 btn-premium neon-orange px-6 py-3 rounded-full font-bold text-lg shadow-lg"
      >
        Follow
      </motion.button>
    </div>
  );
} 