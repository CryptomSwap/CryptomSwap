import { useState, useEffect } from "react";

export interface VaultEntry {
  dropId: string;
  unlockedAt: string;
}

export function getVault(userId: string): VaultEntry[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(`vault_${userId}`);
  return data ? JSON.parse(data) : [];
}

export function addToVault(userId: string, entry: VaultEntry) {
  const vault = getVault(userId);
  if (!vault.find(e => e.dropId === entry.dropId)) {
    const updated = [entry, ...vault];
    localStorage.setItem(`vault_${userId}`, JSON.stringify(updated));
  }
}

export function isUnlocked(userId: string, dropId: string): boolean {
  const vault = getVault(userId);
  return vault.some(e => e.dropId === dropId);
}

export function useVault(userId: string) {
  const [vault, setVault] = useState<VaultEntry[]>([]);
  useEffect(() => {
    setVault(getVault(userId));
    const handler = () => setVault(getVault(userId));
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [userId]);
  return { vault, add: (entry: VaultEntry) => addToVault(userId, entry), isUnlocked: (dropId: string) => isUnlocked(userId, dropId) };
} 