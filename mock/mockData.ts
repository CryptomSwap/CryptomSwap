// Mock data for PEEPZ app
// Creator and Drop models
export interface Creator {
  id: string;
  name: string;
  avatar: string;
  banner: string;
  bio: string;
}

export interface Drop {
  id: string;
  creatorId: string;
  title: string;
  type: "image" | "video" | "audio";
  mediaUrl: string;
  description: string;
  unlockLimit: number;
  unlockedBy: string[];
  createdAt: string;
  expiresAt: string;
  tags: string[];
}

const TAGS = ["🔥 Trending", "Free", "NSFW", "Art", "Behind-the-Scenes", "Drop", "Exclusive"];
const BIOS = [
  "Cinematic creator. Unlock my world.",
  "Art, music, and more. Join the journey.",
  "Exclusive drops every week.",
  "Behind the scenes and premium content.",
  "Unfiltered, uncut, unforgettable.",
  "Your new favorite creator.",
  "Cyber-inspired, always fresh.",
  "Unlock the unexpected.",
  "Premium vibes only.",
  "Welcome to my digital playground."
];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomTags(): string[] {
  const shuffled = TAGS.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * 3) + 2);
}

function randomType(): "image" | "video" | "audio" {
  const types = ["image", "video", "audio"];
  return types[Math.floor(Math.random() * types.length)] as any;
}

function mediaUrl(type: "image" | "video" | "audio", sig: number): string {
  if (type === "image") return `https://source.unsplash.com/random/600x600?nude,art,editorial&sig=${sig}`;
  if (type === "video") return "https://www.w3schools.com/html/mov_bbb.mp4";
  return "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
}

function avatarUrl(sig: number): string {
  return `https://source.unsplash.com/random/100x100?face&sig=${sig}`;
}

function bannerUrl(sig: number): string {
  return `https://source.unsplash.com/random/600x300?cyberpunk&sig=${sig}`;
}

function randomDescription(): string {
  const intros = [
    "Unlock a new side of me.",
    "A tease you won't forget.",
    "Step inside my world.",
    "For your eyes only.",
    "A drop you can't miss.",
    "Art meets attitude.",
    "Raw, real, and exclusive.",
    "Just dropped. Get it first.",
    "A taste of what's next.",
    "Premium content, just for you."
  ];
  return `${randomFrom(intros)} ${randomFrom(intros)}`;
}

// 1. Creators
export const mockCreators: Creator[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `creator${i + 1}`,
  name: `Creator ${i + 1}`,
  avatar: avatarUrl(i + 1),
  banner: bannerUrl(i + 1),
  bio: BIOS[i % BIOS.length],
}));

// 2. Drops
const now = Date.now();
export const mockDrops: Drop[] = mockCreators.flatMap((creator, i) => {
  // 4 older drops (3-10 days ago)
  const oldDrops = Array.from({ length: 4 }).map((_, j) => {
    const type = randomType();
    const createdAt = new Date(now - ((3 + Math.floor(Math.random() * 7)) * 24 * 60 * 60 * 1000) - j * 1000000).toISOString();
    const expiresAt = new Date(new Date(createdAt).getTime() + (2 + Math.floor(Math.random() * 2)) * 24 * 60 * 60 * 1000).toISOString();
    return {
      id: `drop${i * 5 + j + 1}`,
      creatorId: creator.id,
      title: `Drop ${i * 5 + j + 1} by ${creator.name}`,
      type,
      mediaUrl: mediaUrl(type, i * 5 + j + 1),
      description: randomDescription(),
      unlockLimit: 20 + Math.floor(Math.random() * 81),
      unlockedBy: [],
      createdAt,
      expiresAt,
      tags: randomTags(),
    };
  });
  // 1 recent drop (within 30 min, expires <24h)
  const type = randomType();
  const createdAt = new Date(now - Math.floor(Math.random() * 30) * 60 * 1000).toISOString();
  const expiresAt = new Date(new Date(createdAt).getTime() + (6 + Math.floor(Math.random() * 16)) * 60 * 60 * 1000).toISOString();
  const recentDrop = {
    id: `drop${i * 5 + 5}`,
    creatorId: creator.id,
    title: `Recent Drop by ${creator.name}`,
    type,
    mediaUrl: mediaUrl(type, i * 5 + 5),
    description: randomDescription(),
    unlockLimit: 20 + Math.floor(Math.random() * 81),
    unlockedBy: [],
    createdAt,
    expiresAt,
    tags: randomTags(),
  };
  return [...oldDrops, recentDrop];
}); 