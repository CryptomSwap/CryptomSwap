"use client";
import React, { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import DropCard from "@/components/DropCard";
import { getUnlockedDrops, getCurrentUser } from "@/lib/storage";
import { getDropById, getCreatorById } from "@/lib/mockData";
import Navigation from "@/components/Navigation";
import BackButton from "@/components/BackButton";
import { useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { useVault } from "@/hooks/useVault";
import { formatDistanceToNow } from "date-fns";
import VaultDropViewer from "@/components/VaultDropViewer";

function VaultContent() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const userId = user?.id || "guest";
  const { vault } = useVault(userId);
  // Merge unlocked drops from vault and user.unlockedDrops
  type DropWithUnlock = ReturnType<typeof getDropById> & { unlockedAt: string };
  const vaultEntries = vault.map(entry => ({ ...entry, source: 'vault' as const }));
  const userEntries = (user?.unlockedDrops || []).map((dropId: string) => ({ dropId, unlockedAt: user?.joinedAt || '', source: 'user' as const }));
  // Merge and dedupe by dropId (prefer vault unlockAt if present)
  const mergedEntriesMap = new Map<string, { dropId: string; unlockedAt: string }>();
  [...vaultEntries, ...userEntries].forEach(entry => {
    if (!mergedEntriesMap.has(entry.dropId) || entry.source === 'vault') {
      mergedEntriesMap.set(entry.dropId, { dropId: entry.dropId, unlockedAt: entry.unlockedAt });
    }
  });
  const mergedEntries = Array.from(mergedEntriesMap.values());
  const unlockedDrops: DropWithUnlock[] = mergedEntries
    .map(entry => {
      const drop = getDropById(entry.dropId);
      if (drop) return { ...drop, unlockedAt: entry.unlockedAt };
      return null;
    })
    .filter((d): d is DropWithUnlock => d !== null)
    .sort((a, b) => new Date(b.unlockedAt).getTime() - new Date(a.unlockedAt).getTime());
  const [filterCreator, setFilterCreator] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const searchParams = useSearchParams();
  const openDropId = searchParams.get('open');
  const [modalOpen, setModalOpen] = useState(!!openDropId);
  const [modalDrop, setModalDrop] = useState<any>(null);
  const [selectedDropId, setSelectedDropId] = useState<string | null>(null);
  const viewerRef = React.useRef<HTMLDivElement>(null);

  // Scroll viewer into view when opened
  React.useEffect(() => {
    if (selectedDropId && viewerRef.current && viewerRef.current.scrollIntoView) {
      setTimeout(() => viewerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
    }
  }, [selectedDropId]);

  useEffect(() => {
    // Load user data on client side
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  useEffect(() => {
    if (!user) return;
    const unlocked = getUnlockedDrops();
    const dropIds = Object.keys(unlocked);
    const drops = dropIds.map((id: string) => getDropById(id)).filter(Boolean);
    // setUnlockedDrops(drops); // This line is no longer needed
  }, [user]);

  useEffect(() => {
    if (openDropId) {
      const drop = unlockedDrops.find(d => d.id === openDropId);
      setModalDrop(drop);
      setModalOpen(true);
    } else {
      setModalOpen(false);
      setModalDrop(null);
    }
  }, [openDropId, unlockedDrops]);

  const uniqueCreators = Array.from(new Set(unlockedDrops.map(d => d.creator)));
  const uniqueTypes = ['image']; // Extend if you add video/audio

  const filteredDrops = unlockedDrops.filter(drop => {
    const creatorMatch = filterCreator === 'all' || drop.creator === filterCreator;
    const typeMatch = filterType === 'all' || ((drop as any).type || 'image') === filterType;
    return creatorMatch && typeMatch;
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-text">Please log in</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-white/10 px-4 py-4"
      >
        <div className="flex items-center space-x-3">
          <BackButton />
          <h1 className="text-white font-black text-2xl tracking-wider uppercase">
            Vault
          </h1>
        </div>
      </motion.header>
      
      <main className="p-4 max-w-md mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl mb-6 text-premium font-medium capitalize"
          style={{ letterSpacing: '0.2px', lineHeight: 1.4 }}
        >
          Your Vault
        </motion.h1>

        {/* Filter Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface rounded-xl p-4 mb-6"
        >
          <h2 className="font-bold text-lg mb-4 text-text">Filters</h2>
          <div className="space-y-4">
            {/* Creator Filter */}
            <div>
              <label className="block text-sm font-bold text-text mb-2">Creator</label>
            <select
              value={filterCreator}
                onChange={(e) => setFilterCreator(e.target.value)}
                className="w-full bg-background border border-gray-600 rounded-lg px-3 py-2 text-text"
            >
              <option value="all">All Creators</option>
              {uniqueCreators.map(creator => (
                <option key={creator} value={creator}>{creator}</option>
              ))}
            </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-bold text-text mb-2">Type</label>
            <select
              value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full bg-background border border-gray-600 rounded-lg px-3 py-2 text-text"
            >
              <option value="all">All Types</option>
              {uniqueTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
              ))}
            </select>
            </div>
          </div>
        </motion.div>

        {/* Drops Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-4"
        >
          {filteredDrops.map((drop) => (
                  <DropCard
              key={drop.id}
                    id={drop.id}
              image={drop.thumbnail}
                    title={drop.title}
                    creator={drop.creator}
              countdown=""
              onClick={() => {
                setSelectedDropId(drop.id);
                setModalDrop(drop);
                setModalOpen(true);
              }}
                    variant="compact"
                  />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredDrops.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-lg font-bold text-text mb-2">No Drops Yet</h3>
            <p className="text-gray-400">Unlock some drops to see them here</p>
          </motion.div>
        )}
      </main>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && modalDrop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-surface rounded-xl p-4 max-w-md w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-text">{modalDrop.title}</h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <img
                  src={modalDrop.thumbnail}
                  alt={modalDrop.title}
                  className="w-full rounded-lg"
                />
                <p className="text-text">{modalDrop.description}</p>
                <div className="text-sm text-gray-400">
                  Unlocked {formatDistanceToNow(new Date(modalDrop.unlockedAt), { addSuffix: true })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navigation />
    </div>
  );
}

export default function VaultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-text">Loading...</div>
      </div>
    }>
      <VaultContent />
    </Suspense>
  );
} 