// Storage utilities for PEEPZ platform
import { MockDrop, MockUser, MockCreator } from './mockData';

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// LocalStorage keys
const STORAGE_KEYS = {
  CURRENT_USER: 'peepz_current_user',
  UNLOCKED_DROPS: 'peepz_unlocked_drops',
  FOLLOWING: 'peepz_following',
  REFERRAL_CODE: 'peepz_referral_code',
  REFERRAL_COUNT: 'peepz_referral_count',
  NOTIFICATIONS: 'peepz_notifications',
  SETTINGS: 'peepz_settings',
} as const;

// SessionStorage keys
const SESSION_KEYS = {
  CREATOR_DROPS: 'peepz_creator_drops',
  CREATOR_STATS: 'peepz_creator_stats',
  UPLOADED_MEDIA: 'peepz_uploaded_media',
} as const;

// User management
export const saveCurrentUser = (user: MockUser): void => {
  if (!isBrowser) return;
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
};

export const getCurrentUser = (): MockUser | null => {
  if (!isBrowser) return null;
  const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return user ? JSON.parse(user) : null;
};

export const clearCurrentUser = (): void => {
  if (!isBrowser) return;
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
};

// Drop unlocks (localStorage for fans)
export const saveUnlockedDrop = (dropId: string, unlockTime: number): void => {
  if (!isBrowser) return;
  const unlocked = getUnlockedDrops();
  unlocked[dropId] = unlockTime;
  localStorage.setItem(STORAGE_KEYS.UNLOCKED_DROPS, JSON.stringify(unlocked));
};

export const getUnlockedDrops = (): Record<string, number> => {
  if (!isBrowser) return {};
  const unlocked = localStorage.getItem(STORAGE_KEYS.UNLOCKED_DROPS);
  return unlocked ? JSON.parse(unlocked) : {};
};

export const isDropUnlocked = (dropId: string): boolean => {
  if (!isBrowser) return false;
  const unlocked = getUnlockedDrops();
  return dropId in unlocked;
};

export const getDropUnlockTime = (dropId: string): number | null => {
  if (!isBrowser) return null;
  const unlocked = getUnlockedDrops();
  return unlocked[dropId] || null;
};

export const isDropExpired = (dropId: string): boolean => {
  if (!isBrowser) return false;
  const unlockTime = getDropUnlockTime(dropId);
  if (!unlockTime) return false;
  
  // Drops expire 1 hour after unlock
  const oneHour = 60 * 60 * 1000;
  return Date.now() - unlockTime > oneHour;
};

// Following creators (localStorage for fans)
export const saveFollowing = (creatorIds: string[]): void => {
  if (!isBrowser) return;
  localStorage.setItem(STORAGE_KEYS.FOLLOWING, JSON.stringify(creatorIds));
};

export const getFollowing = (): string[] => {
  if (!isBrowser) return [];
  const following = localStorage.getItem(STORAGE_KEYS.FOLLOWING);
  return following ? JSON.parse(following) : [];
};

export const followCreator = (creatorId: string): void => {
  if (!isBrowser) return;
  const following = getFollowing();
  if (!following.includes(creatorId)) {
    following.push(creatorId);
    saveFollowing(following);
  }
};

export const unfollowCreator = (creatorId: string): void => {
  if (!isBrowser) return;
  const following = getFollowing();
  const filtered = following.filter(id => id !== creatorId);
  saveFollowing(filtered);
};

export const isFollowing = (creatorId: string): boolean => {
  if (!isBrowser) return false;
  const following = getFollowing();
  return following.includes(creatorId);
};

// Referral system (localStorage for fans)
export const saveReferralCode = (code: string): void => {
  if (!isBrowser) return;
  localStorage.setItem(STORAGE_KEYS.REFERRAL_CODE, code);
};

export const getReferralCode = (): string | null => {
  if (!isBrowser) return null;
  return localStorage.getItem(STORAGE_KEYS.REFERRAL_CODE);
};

export const saveReferralCount = (count: number): void => {
  if (!isBrowser) return;
  localStorage.setItem(STORAGE_KEYS.REFERRAL_COUNT, count.toString());
};

export const getReferralCount = (): number => {
  if (!isBrowser) return 0;
  const count = localStorage.getItem(STORAGE_KEYS.REFERRAL_COUNT);
  return count ? parseInt(count, 10) : 0;
};

// Creator drops (sessionStorage for creators)
export const saveCreatorDrops = (drops: MockDrop[]): void => {
  if (!isBrowser) return;
  sessionStorage.setItem(SESSION_KEYS.CREATOR_DROPS, JSON.stringify(drops));
};

export const getCreatorDrops = (): MockDrop[] => {
  if (!isBrowser) return [];
  const drops = sessionStorage.getItem(SESSION_KEYS.CREATOR_DROPS);
  return drops ? JSON.parse(drops) : [];
};

export const addCreatorDrop = (drop: MockDrop): void => {
  if (!isBrowser) return;
  const drops = getCreatorDrops();
  drops.push(drop);
  saveCreatorDrops(drops);
};

// Creator stats (sessionStorage for creators)
export const saveCreatorStats = (stats: any): void => {
  if (!isBrowser) return;
  sessionStorage.setItem(SESSION_KEYS.CREATOR_STATS, JSON.stringify(stats));
};

export const getCreatorStats = (): any => {
  if (!isBrowser) return null;
  const stats = sessionStorage.getItem(SESSION_KEYS.CREATOR_STATS);
  return stats ? JSON.parse(stats) : null;
};

// Uploaded media (sessionStorage for creators)
export const saveUploadedMedia = (mediaUrl: string): void => {
  if (!isBrowser) return;
  sessionStorage.setItem(SESSION_KEYS.UPLOADED_MEDIA, mediaUrl);
};

export const getUploadedMedia = (): string | null => {
  if (!isBrowser) return null;
  return sessionStorage.getItem(SESSION_KEYS.UPLOADED_MEDIA);
};

// Settings (localStorage)
export const saveSettings = (settings: any): void => {
  if (!isBrowser) return;
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
};

export const getSettings = (): any => {
  if (!isBrowser) return {};
  const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  return settings ? JSON.parse(settings) : {};
};

// Notifications (localStorage)
export const saveNotifications = (notifications: any[]): void => {
  if (!isBrowser) return;
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
};

export const getNotifications = (): any[] => {
  if (!isBrowser) return [];
  const notifications = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
  return notifications ? JSON.parse(notifications) : [];
};

// Utility functions
export const clearAllData = (): void => {
  if (!isBrowser) return;
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
  Object.values(SESSION_KEYS).forEach(key => {
    sessionStorage.removeItem(key);
  });
}; 