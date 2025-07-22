export interface Drop {
  id: string;
  title: string;
  creator: string;
  unlockPrice: number;
  unlockLimit: number;
  unlockedBy: string[];
  expiresAt: string;
}

export const mockDrops: Drop[] = [
  {
    id: '1',
    title: 'Midnight Tease',
    creator: 'DJ Night',
    unlockPrice: 10,
    unlockLimit: 20,
    unlockedBy: ['user1', 'user2', 'user3'],
    expiresAt: new Date(Date.now() + 1000 * 60 * 10).toISOString(), // 10 min from now
  },
  {
    id: '2',
    title: 'Late Rush',
    creator: 'Synth Queen',
    unlockPrice: 8,
    unlockLimit: 10,
    unlockedBy: ['user1', 'user2'],
    expiresAt: new Date(Date.now() + 1000 * 60 * 3).toISOString(), // 3 min from now
  },
  {
    id: '3',
    title: 'Purple Rain',
    creator: 'Vapor Kid',
    unlockPrice: 12,
    unlockLimit: 5,
    unlockedBy: [],
    expiresAt: new Date(Date.now() + 1000 * 60 * 6).toISOString(), // 6 min from now
  },
]; 