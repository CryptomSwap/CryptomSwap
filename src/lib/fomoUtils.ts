import { Drop } from './fomoMockData';

export function attemptUnlock(drop: Drop, userId: string): { success: boolean; reason?: string } {
  if (drop.unlockedBy.includes(userId)) {
    return { success: false, reason: 'Already unlocked' };
  }
  if (drop.unlockedBy.length >= drop.unlockLimit) {
    return { success: false, reason: 'Unlock limit reached' };
  }
  if (new Date(drop.expiresAt).getTime() < Date.now()) {
    return { success: false, reason: 'Drop expired' };
  }
  drop.unlockedBy.push(userId);
  // Optionally: persist to localStorage or backend here
  return { success: true };
} 