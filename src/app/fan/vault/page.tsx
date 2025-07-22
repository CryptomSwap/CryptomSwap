"use client";
import React, { useState, useEffect } from "react";
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

export default function VaultPage() {
  const router = useRouter();
  const [user, setUser] = useState(getCurrentUser());
  const userId = user?.id || "guest";
  const { vault } = useVault(userId);
  // Merge unlocked drops from vault and user.unlockedDrops
  type DropWithUnlock = ReturnType<typeof getDropById> & { unlockedAt: string };
  const vaultEntries = vault.map(entry => ({ ...entry, source: 'vault' as const }));
  const userEntries = (user?.unlockedDrops || []).map(dropId => ({ dropId, unlockedAt: user?.joinedAt || '', source: 'user' as const }));
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
    if (!user) return;
    const unlocked = getUnlockedDrops();
    const dropIds = Object.keys(unlocked);
    const drops = dropIds.map(id => getDropById(id)).filter(Boolean);
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
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface rounded-xl p-4 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-text">Unlock History (Vault)</h2>
            <span className="text-xs text-gray-400">Private Collection</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <select
              className="bg-background border border-gray-600 rounded px-2 py-1 text-xs text-text"
              value={filterCreator}
              onChange={e => setFilterCreator(e.target.value)}
            >
              <option value="all">All Creators</option>
              {uniqueCreators.map(creator => (
                <option key={creator} value={creator}>{creator}</option>
              ))}
            </select>
            <select
              className="bg-background border border-gray-600 rounded px-2 py-1 text-xs text-text"
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              {uniqueTypes.map(type => (
                <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
              ))}
            </select>
            {/* Date filter placeholder */}
            {/* <input type="date" ... /> */}
          </div>
          {filteredDrops.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredDrops.map(drop => (
                <div key={drop.id} className="relative group">
                  <DropCard
                    id={drop.id}
                    image={(drop as any).thumbnail || (drop as any).image || '/default-image.png'}
                    title={drop.title}
                    creator={drop.creator}
                    countdown={(drop as any).countdown || ''}
                    onClick={() => setSelectedDropId(drop.id)}
                    variant="compact"
                  />
                  {/* Unlock date badge */}
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs rounded-full px-2 py-1">
                    {(() => {
                      const date = new Date(drop.unlockedAt);
                      return isNaN(date.getTime())
                        ? 'Unlocked (unknown date)'
                        : `Unlocked ${formatDistanceToNow(date, { addSuffix: true })}`;
                    })()}
                  </div>
                  {/* Download/Save if allowed (mock: always allowed) */}
                  <button
                    className="absolute top-2 right-2 bg-black/60 text-white text-xs rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition"
                    onClick={e => { e.stopPropagation(); alert('Download not implemented'); }}
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🔒</div>
              <p className="text-gray-400">No drops unlocked yet</p>
            </div>
          )}
        </motion.div>
      </main>
      {/* Modal for unlocked drop */}
      <AnimatePresence>
        {modalOpen && modalDrop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 40 }}
              className="bg-background rounded-2xl p-6 max-w-sm w-full shadow-2xl relative"
            >
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl"
                onClick={() => router.replace('/fan/vault')}
              >
                ×
              </button>
              <img src={modalDrop.thumbnail || modalDrop.image} alt={modalDrop.title} className="w-full h-48 object-cover rounded-xl mb-4" />
              <h2 className="text-white font-black text-2xl mb-2">{modalDrop.title}</h2>
              <p className="text-gray-300 mb-4">By {modalDrop.creator}</p>
              <div className="flex gap-2">
                <button
                  className="flex-1 bg-accent-orange text-black font-bold py-2 rounded-full hover:bg-orange-400 transition"
                  onClick={() => router.push(`/fan/drop/${modalDrop.id}`)}
                >
                  View Now
                </button>
                <button
                  className="flex-1 bg-gray-700 text-white font-bold py-2 rounded-full hover:bg-gray-600 transition"
                  onClick={() => router.replace('/fan/vault')}
                >
                  View Later
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* VaultDropViewer panel */}
      {selectedDropId && (
        <div ref={viewerRef} className="z-50">
          <VaultDropViewer
            drop={{
              id: selectedDropId,
              title: unlockedDrops.find(d => d.id === selectedDropId)?.title || '',
              creatorName: unlockedDrops.find(d => d.id === selectedDropId)?.creator || '',
              creatorAvatar: (() => {
                const creatorId = unlockedDrops.find(d => d.id === selectedDropId)?.creatorId;
                return creatorId ? (getCreatorById(creatorId)?.avatar || '') : '';
              })(),
              type: (unlockedDrops.find(d => d.id === selectedDropId)?.type as any) || 'image',
              mediaUrl: (unlockedDrops.find(d => d.id === selectedDropId)?.mediaUrl || unlockedDrops.find(d => d.id === selectedDropId)?.thumbnail || ''),
              unlockedAt: unlockedDrops.find(d => d.id === selectedDropId)?.unlockedAt || '',
              description: unlockedDrops.find(d => d.id === selectedDropId)?.description || '',
            }}
            onClose={() => setSelectedDropId(null)}
          />
        </div>
      )}
      <Navigation />
    </div>
  );
} 