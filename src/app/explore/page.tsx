"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import DropCard from "@/components/DropCard";
import Navigation from "@/components/Navigation";

// Mock data for explore drops
const mockDrops = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    title: "Exclusive Behind the Scenes",
    creator: "Alex Rivera",
    countdown: "2:34",
    distance: "0.2m",
    spotsLeft: 8,
    category: "trending"
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=500&fit=crop",
    title: "Studio Session",
    creator: "Maya Chen",
    countdown: "1:45",
    distance: "0.5m",
    spotsLeft: 12,
    category: "new"
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
    title: "Private Performance",
    creator: "Jordan Smith",
    countdown: "4:20",
    distance: "1.2m",
    spotsLeft: 5,
    category: "free"
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
    title: "Exclusive Interview",
    creator: "Sarah Johnson",
    countdown: "0:30",
    distance: "0.8m",
    spotsLeft: 3,
    category: "trending"
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
    title: "Behind the Lens",
    creator: "Mike Wilson",
    countdown: "3:15",
    distance: "2.1m",
    spotsLeft: 15,
    category: "new"
  }
];

const filterOptions = [
    { id: "trending", label: "Trending", color: "purple" },
  { id: "new", label: "New", color: "purple" },
  { id: "free", label: "Free", color: "gray" }
];

export default function ExplorePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("trending");

  const handleDropClick = (drop: any) => {
    router.push(`/fan/drop/${drop.id}`);
  };

  const filteredDrops = mockDrops.filter(drop => {
    const matchesSearch = drop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         drop.creator.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "all" || drop.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background relative">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-white/10 px-4 py-4"
      >
        <h1 className="text-white font-black text-2xl tracking-wider uppercase mb-4">
          Explore
        </h1>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative mb-4"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search drops and creators..."
            className="w-full input-premium rounded-xl px-4 py-3 text-text font-medium placeholder-gray-500 pl-12"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </div>
        </motion.div>

        {/* Filter Chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex space-x-3"
        >
          {filterOptions.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                selectedFilter === filter.id
                          ? filter.color === "purple"
        ? "bg-accent-purple text-white shadow-lg"
        : filter.color === "purple"
        ? "bg-accent-purple text-white shadow-lg"
                    : "bg-gray-600 text-white shadow-lg"
                  : "bg-surface/50 text-gray-400 border border-white/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>
      </motion.header>

      {/* Content */}
      <div className="pb-32 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 gap-6 py-6"
        >
          {filteredDrops.map((drop, index) => (
            <motion.div
              key={drop.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <DropCard
                {...drop}
                onClick={() => handleDropClick(drop)}
                variant="compact"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredDrops.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-white font-bold text-lg mb-2">No drops found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
} 