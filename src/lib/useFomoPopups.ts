import { useEffect, useRef, useState } from 'react';
import { Drop } from './fomoMockData';

interface FomoPopupData {
  drop: Drop;
  message: string;
  type: 'low-unlocks' | 'new' | 'fast-unlocks' | 'expiring';
}

export function useFomoPopups(drops: Drop[]) {
  const [activePopup, setActivePopup] = useState<FomoPopupData | null>(null);
  const lastPopupTimestamps = useRef<{ [dropId: string]: number }>({});

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      for (const drop of drops) {
        // Low unlocks left
        if (drop.unlockLimit - drop.unlockedBy.length <= 5 && drop.unlockLimit - drop.unlockedBy.length > 0) {
          if (shouldPopup(drop.id, now)) {
            setActivePopup({
              drop,
              message: `🔥 Only ${drop.unlockLimit - drop.unlockedBy.length} unlocks left for '${drop.title}'`,
              type: 'low-unlocks',
            });
            updatePopup(drop.id, now);
            return;
          }
        }
        // New drop (published within last 3 min)
        // (Assume drop has a createdAt field if needed)
        // Fast unlocks (5+ in last 2 min) - skipped for mock
        // Expiring soon
        const expiresIn = new Date(drop.expiresAt).getTime() - now;
        if (expiresIn > 0 && expiresIn <= 5 * 60 * 1000) {
          if (shouldPopup(drop.id, now)) {
            setActivePopup({
              drop,
              message: `⏳ Final minutes to unlock '${drop.title}'`,
              type: 'expiring',
            });
            updatePopup(drop.id, now);
            return;
          }
        }
      }
    }, 10000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [drops]);

  function shouldPopup(dropId: string, now: number) {
    const last = lastPopupTimestamps.current[dropId] || 0;
    return now - last > 30000; // 30s window
  }
  function updatePopup(dropId: string, now: number) {
    lastPopupTimestamps.current[dropId] = now;
  }
  function triggerPopup(popup: FomoPopupData) {
    setActivePopup(popup);
  }
  return { activePopup, triggerPopup, setActivePopup };
} 