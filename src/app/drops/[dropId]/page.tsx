"use client";
import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { getDropById, getCreatorById } from "@/lib/mockData";
import DropMediaViewer from "@/components/DropMediaViewer";
import DropDescription from "@/components/DropDescription";
import DropEngagement from "@/components/DropEngagement";
import { formatDistanceToNow } from "date-fns";

export default function DropDetailUnlockedPage() {
  const router = useRouter();
  const params = useParams();
  const dropId = params.dropId as string;
  const drop = getDropById(dropId);
  if (!drop) return <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white">Drop not found</div>;
  const creator = getCreatorById(drop.creatorId);
  const unlockedAt = new Date(); // TODO: get real unlock time from vault if available

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#0A0A0A] flex flex-col"
    >
      {/* Back button */}
      <button
        className="absolute top-4 left-4 z-20 bg-black/60 rounded-full p-2 text-white border border-white/10 hover:bg-black/80"
        onClick={() => router.push("/fan/vault")}
      >
        ← Back
      </button>
      {/* Title & Creator */}
      <div className="flex flex-col items-center mt-12 mb-4">
        <motion.h1
          initial={{ textShadow: "none" }}
          animate={{ textShadow: "0 0 16px #8A00D4, 0 0 32px #8A00D4" }}
          className="text-3xl md:text-4xl font-black text-white mb-2 text-center drop-shadow-[0_0_16px_#8A00D4]"
        >
          {drop.title}
        </motion.h1>
        <div className="flex items-center gap-3 mb-1">
          <div className="relative">
            <motion.img
              src={creator?.avatar}
              alt={creator?.displayName}
              className="w-12 h-12 rounded-full border-2 border-[#8A00D4] shadow-lg"
              initial={{ boxShadow: "none" }}
              animate={{ boxShadow: "0 0 24px 4px #8A00D4" }}
            />
            {/* Glow ring */}
            <span className="absolute inset-0 rounded-full border-2 border-[#8A00D4] animate-pulse pointer-events-none" />
          </div>
          <span className="text-white font-bold text-lg">{creator?.displayName}</span>
        </div>
        <div className="text-xs text-gray-400">
          Unlocked {formatDistanceToNow(unlockedAt, { addSuffix: true })}
        </div>
      </div>
      {/* Media Viewer */}
      <DropMediaViewer type={drop.type || "image"} mediaUrl={drop.mediaUrl || drop.thumbnail} />
      {/* Description */}
      <DropDescription description={drop.description} />
      {/* Tags */}
      <div className="flex flex-wrap gap-2 justify-center mt-2 mb-4">
        {drop.tags?.map(tag => (
          <span key={tag} className="px-3 py-1 rounded-full bg-white/10 text-xs text-white border border-[#8A00D4] backdrop-blur-sm shadow-sm">
            #{tag}
          </span>
        ))}
      </div>
      {/* Engagement */}
      <DropEngagement dropId={drop.id} />
    </motion.div>
  );
} 