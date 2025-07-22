// Mock data for PEEPZ platform
export interface MockDrop {
  id: string;
  title: string;
  creator: string;
  creatorId: string;
  description: string;
  thumbnail: string;
  unlockLimit: number;
  unlockCount: number;
  createdAt: string;
  expiresAt: string;
  price?: number;
  type?: 'image' | 'video' | 'audio';
  tags?: string[];
  mediaUrl?: string;
}

export interface MockCreator {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatar: string;
  banner: string;
  followers: number;
  totalEarnings: number;
  totalUnlocks: number;
  socials?: { platform: string; url: string }[];
  location?: string;
}

export interface MockUser {
  id: string;
  email: string;
  role: 'fan' | 'creator';
  username: string;
  displayName: string;
  avatar: string;
  unlockedDrops: string[];
  following: string[];
  referralCode?: string;
  referralCount: number;
  bio?: string;
  preferences?: { theme: string; notifications: boolean };
  joinedAt?: string;
}

export interface MockStats {
  earnings: number;
  unlocks: number;
  views: number;
  referrals: number;
}

// MOCK CREATORS
export const mockCreators: MockCreator[] = [
  {
    id: "68a9d503-66ab-4809-a3ae-7b70cad9b202",
    username: "creator1",
    displayName: "Creator1",
    bio: "Creator1 shares premium, exclusive content with their top fans.",
    avatar: "https://source.unsplash.com/random/100x100?face&sig=0",
    banner: "https://source.unsplash.com/random/600x300?cyberpunk&sig=0",
    followers: 1200,
    totalEarnings: 5000,
    totalUnlocks: 200,
    socials: [
      { platform: "Instagram", url: "https://instagram.com/creator1" }
    ],
    location: "New York"
  },
  {
    id: "631f345a-3656-4c9f-b98f-47dd98d0e6a8",
    username: "creator2",
    displayName: "Creator2",
    bio: "Creator2 shares premium, exclusive content with their top fans.",
    avatar: "https://source.unsplash.com/random/100x100?face&sig=1",
    banner: "https://source.unsplash.com/random/600x300?cyberpunk&sig=1",
    followers: 950,
    totalEarnings: 3200,
    totalUnlocks: 150,
    socials: [
      { platform: "Twitter", url: "https://twitter.com/creator2" }
    ],
    location: "London"
  },
  {
    id: "3c16758d-6e3e-479d-9a24-25891eb0b6ab",
    username: "creator3",
    displayName: "Creator3",
    bio: "Creator3 shares premium, exclusive content with their top fans.",
    avatar: "https://source.unsplash.com/random/100x100?face&sig=2",
    banner: "https://source.unsplash.com/random/600x300?cyberpunk&sig=2",
    followers: 1100,
    totalEarnings: 4100,
    totalUnlocks: 180,
    socials: [
      { platform: "Instagram", url: "https://instagram.com/creator3" }
    ],
    location: "Los Angeles"
  },
  {
    id: "b7e2e2c1-4e2a-4b2a-8e2a-7e2e2c1b2a3c",
    username: "creator4",
    displayName: "Creator4",
    bio: "Creator4 shares premium, exclusive content with their top fans.",
    avatar: "https://source.unsplash.com/random/100x100?face&sig=3",
    banner: "https://source.unsplash.com/random/600x300?cyberpunk&sig=3",
    followers: 800,
    totalEarnings: 2900,
    totalUnlocks: 120,
    socials: [
      { platform: "Twitter", url: "https://twitter.com/creator4" }
    ],
    location: "Berlin"
  },
  {
    id: "c8f3f3d2-5f3b-5c3b-9f3b-8f3f3d2c3b4d",
    username: "creator5",
    displayName: "Creator5",
    bio: "Creator5 shares premium, exclusive content with their top fans.",
    avatar: "https://source.unsplash.com/random/100x100?face&sig=4",
    banner: "https://source.unsplash.com/random/600x300?cyberpunk&sig=4",
    followers: 1350,
    totalEarnings: 6000,
    totalUnlocks: 250,
    socials: [
      { platform: "Instagram", url: "https://instagram.com/creator5" }
    ],
    location: "Tokyo"
  },
  {
    id: "d9a4a4e3-6a4c-6d4c-0a4c-9a4a4e3d4c5e",
    username: "creator6",
    displayName: "Creator6",
    bio: "Creator6 shares premium, exclusive content with their top fans.",
    avatar: "https://source.unsplash.com/random/100x100?face&sig=5",
    banner: "https://source.unsplash.com/random/600x300?cyberpunk&sig=5",
    followers: 700,
    totalEarnings: 2100,
    totalUnlocks: 90,
    socials: [
      { platform: "Instagram", url: "https://instagram.com/creator6" }
    ],
    location: "Paris"
  },
  {
    id: "e0b5b5f4-7b5d-7e5d-1b5d-0b5b5f4e5d6f",
    username: "creator7",
    displayName: "Creator7",
    bio: "Creator7 shares premium, exclusive content with their top fans.",
    avatar: "https://source.unsplash.com/random/100x100?face&sig=6",
    banner: "https://source.unsplash.com/random/600x300?cyberpunk&sig=6",
    followers: 1600,
    totalEarnings: 7200,
    totalUnlocks: 300,
    socials: [
      { platform: "Twitter", url: "https://twitter.com/creator7" }
    ],
    location: "Sydney"
  },
  {
    id: "f1c6c6a5-8c6e-8f6e-2c6e-1c6c6a5f6e7a",
    username: "creator8",
    displayName: "Creator8",
    bio: "Creator8 shares premium, exclusive content with their top fans.",
    avatar: "https://source.unsplash.com/random/100x100?face&sig=7",
    banner: "https://source.unsplash.com/random/600x300?cyberpunk&sig=7",
    followers: 900,
    totalEarnings: 3300,
    totalUnlocks: 140,
    socials: [
      { platform: "Instagram", url: "https://instagram.com/creator8" }
    ],
    location: "Toronto"
  },
  {
    id: "a2d7d7b6-9d7f-9a7f-3d7f-2d7d7b6a7f8b",
    username: "creator9",
    displayName: "Creator9",
    bio: "Creator9 shares premium, exclusive content with their top fans.",
    avatar: "https://source.unsplash.com/random/100x100?face&sig=8",
    banner: "https://source.unsplash.com/random/600x300?cyberpunk&sig=8",
    followers: 1050,
    totalEarnings: 4700,
    totalUnlocks: 170,
    socials: [
      { platform: "Twitter", url: "https://twitter.com/creator9" }
    ],
    location: "Barcelona"
  },
  {
    id: "b3e8e8c7-0e80-0b80-4e80-3e8e8c7b8c9c",
    username: "creator10",
    displayName: "Creator10",
    bio: "Creator10 shares premium, exclusive content with their top fans.",
    avatar: "https://source.unsplash.com/random/100x100?face&sig=9",
    banner: "https://source.unsplash.com/random/600x300?cyberpunk&sig=9",
    followers: 1400,
    totalEarnings: 8000,
    totalUnlocks: 350,
    socials: [
      { platform: "Instagram", url: "https://instagram.com/creator10" }
    ],
    location: "San Francisco"
  }
];

// MOCK DROPS
export const mockDrops: MockDrop[] = [
  // Creator1 Drops
  {
    id: "drop1-1",
    title: "Creator1 Drop 1",
    creator: "Creator1",
    creatorId: "68a9d503-66ab-4809-a3ae-7b70cad9b202",
    description: "Behind the curtain of their latest shoot.",
    thumbnail: "https://source.unsplash.com/random/400x300?art,editorial&sig=101",
    unlockLimit: 86,
    unlockCount: 12,
    createdAt: "2025-07-14T14:53:57.157Z",
    expiresAt: "2025-07-17T14:53:57.157Z",
    type: "audio",
    tags: ["Behind-the-Scenes", "Art", "Free", "NSFW"],
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: "drop1-2",
    title: "Creator1 Drop 2",
    creator: "Creator1",
    creatorId: "68a9d503-66ab-4809-a3ae-7b70cad9b202",
    description: "Only available for a limited time.",
    thumbnail: "https://source.unsplash.com/random/400x300?nude,art,editorial&sig=102",
    unlockLimit: 70,
    unlockCount: 8,
    createdAt: "2025-07-17T14:53:57.157Z",
    expiresAt: "2025-07-20T14:53:57.157Z",
    type: "image",
    tags: ["🔥 Trending", "Drop", "Exclusive"],
    mediaUrl: "https://source.unsplash.com/random/600x600?nude,art,editorial&sig=1"
  },
  {
    id: "drop1-3",
    title: "Creator1 Drop 3",
    creator: "Creator1",
    creatorId: "68a9d503-66ab-4809-a3ae-7b70cad9b202",
    description: "A cinematic reveal of their next project.",
    thumbnail: "https://source.unsplash.com/random/400x300?cinematic,preview&sig=103",
    unlockLimit: 50,
    unlockCount: 5,
    createdAt: "2025-07-20T14:53:57.157Z",
    expiresAt: "2025-07-23T14:53:57.157Z",
    type: "video",
    tags: ["Cinematic", "Preview", "Video"],
    mediaUrl: "https://samplelib.com/mp4/sample-720p.mp4"
  },
  {
    id: "drop1-4",
    title: "Creator1 Drop 4",
    creator: "Creator1",
    creatorId: "68a9d503-66ab-4809-a3ae-7b70cad9b202",
    description: "Editorial fashion shoot.",
    thumbnail: "https://source.unsplash.com/random/400x300?fashion,editorial&sig=104",
    unlockLimit: 40,
    unlockCount: 3,
    createdAt: "2025-07-23T14:53:57.157Z",
    expiresAt: "2025-07-26T14:53:57.157Z",
    type: "image",
    tags: ["Fashion", "Editorial", "Photo"],
    mediaUrl: "https://source.unsplash.com/random/600x600?fashion,editorial&sig=2"
  },
  {
    id: "drop1-5",
    title: "Creator1 Drop 5",
    creator: "Creator1",
    creatorId: "68a9d503-66ab-4809-a3ae-7b70cad9b202",
    description: "Exclusive audio commentary.",
    thumbnail: "https://source.unsplash.com/random/400x300?audio,commentary&sig=105",
    unlockLimit: 30,
    unlockCount: 2,
    createdAt: "2025-07-26T14:53:57.157Z",
    expiresAt: "2025-07-29T14:53:57.157Z",
    type: "audio",
    tags: ["Audio", "Commentary", "Exclusive"],
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  // Creator2 Drops
  {
    id: "drop2-1",
    title: "Creator2 Drop 1",
    creator: "Creator2",
    creatorId: "631f345a-3656-4c9f-b98f-47dd98d0e6a8",
    description: "A new portrait series.",
    thumbnail: "https://source.unsplash.com/random/400x300?art,portrait&sig=110",
    unlockLimit: 100,
    unlockCount: 15,
    createdAt: "2025-07-14T15:00:00.000Z",
    expiresAt: "2025-07-17T15:00:00.000Z",
    type: "image",
    tags: ["Portrait", "Art", "Drop"],
    mediaUrl: "https://source.unsplash.com/random/600x600?art,portrait&sig=10"
  },
  {
    id: "drop2-2",
    title: "Creator2 Drop 2",
    creator: "Creator2",
    creatorId: "631f345a-3656-4c9f-b98f-47dd98d0e6a8",
    description: "Short teaser for upcoming content.",
    thumbnail: "https://source.unsplash.com/random/400x300?teaser,video&sig=111",
    unlockLimit: 80,
    unlockCount: 10,
    createdAt: "2025-07-17T15:00:00.000Z",
    expiresAt: "2025-07-20T15:00:00.000Z",
    type: "video",
    tags: ["Teaser", "Video", "Upcoming"],
    mediaUrl: "https://samplelib.com/mp4/sample-5s.mp4"
  },
  {
    id: "drop2-3",
    title: "Creator2 Drop 3",
    creator: "Creator2",
    creatorId: "631f345a-3656-4c9f-b98f-47dd98d0e6a8",
    description: "Audio Q&A with fans.",
    thumbnail: "https://source.unsplash.com/random/400x300?audio,qa&sig=112",
    unlockLimit: 60,
    unlockCount: 7,
    createdAt: "2025-07-20T15:00:00.000Z",
    expiresAt: "2025-07-23T15:00:00.000Z",
    type: "audio",
    tags: ["Q&A", "Audio", "Fan"],
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    id: "drop2-4",
    title: "Creator2 Drop 4",
    creator: "Creator2",
    creatorId: "631f345a-3656-4c9f-b98f-47dd98d0e6a8",
    description: "Limited edition editorial.",
    thumbnail: "https://source.unsplash.com/random/400x300?editorial,art&sig=113",
    unlockLimit: 50,
    unlockCount: 4,
    createdAt: "2025-07-23T15:00:00.000Z",
    expiresAt: "2025-07-26T15:00:00.000Z",
    type: "image",
    tags: ["Editorial", "Limited", "Art"],
    mediaUrl: "https://source.unsplash.com/random/600x600?editorial,art&sig=11"
  },
  {
    id: "drop2-5",
    title: "Creator2 Drop 5",
    creator: "Creator2",
    creatorId: "631f345a-3656-4c9f-b98f-47dd98d0e6a8",
    description: "Behind the scenes video.",
    thumbnail: "https://source.unsplash.com/random/400x300?bts,video&sig=114",
    unlockLimit: 40,
    unlockCount: 2,
    createdAt: "2025-07-26T15:00:00.000Z",
    expiresAt: "2025-07-29T15:00:00.000Z",
    type: "video",
    tags: ["Behind-the-Scenes", "Video", "Drop"],
    mediaUrl: "https://samplelib.com/mp4/sample-30s.mp4"
  },
  // Creator3 Drops
  {
    id: "drop3-1",
    title: "Creator3 Drop 1",
    creator: "Creator3",
    creatorId: "3c16758d-6e3e-479d-9a24-25891eb0b6ab",
    description: "Exclusive look at the new project.",
    thumbnail: "https://source.unsplash.com/random/400x300?project,exclusive&sig=120",
    unlockLimit: 90,
    unlockCount: 10,
    createdAt: "2025-07-14T16:00:00.000Z",
    expiresAt: "2025-07-17T16:00:00.000Z",
    type: "image",
    tags: ["Exclusive", "Project", "Art"],
    mediaUrl: "https://source.unsplash.com/random/600x600?project,exclusive&sig=20"
  },
  {
    id: "drop3-2",
    title: "Creator3 Drop 2",
    creator: "Creator3",
    creatorId: "3c16758d-6e3e-479d-9a24-25891eb0b6ab",
    description: "Studio session audio.",
    thumbnail: "https://source.unsplash.com/random/400x300?studio,audio&sig=121",
    unlockLimit: 60,
    unlockCount: 7,
    createdAt: "2025-07-17T16:00:00.000Z",
    expiresAt: "2025-07-20T16:00:00.000Z",
    type: "audio",
    tags: ["Studio", "Audio", "Music"],
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  {
    id: "drop3-3",
    title: "Creator3 Drop 3",
    creator: "Creator3",
    creatorId: "3c16758d-6e3e-479d-9a24-25891eb0b6ab",
    description: "Short teaser video.",
    thumbnail: "https://source.unsplash.com/random/400x300?teaser,video&sig=122",
    unlockLimit: 50,
    unlockCount: 5,
    createdAt: "2025-07-20T16:00:00.000Z",
    expiresAt: "2025-07-23T16:00:00.000Z",
    type: "video",
    tags: ["Teaser", "Video", "Preview"],
    mediaUrl: "https://samplelib.com/mp4/sample-10s.mp4"
  },
  {
    id: "drop3-4",
    title: "Creator3 Drop 4",
    creator: "Creator3",
    creatorId: "3c16758d-6e3e-479d-9a24-25891eb0b6ab",
    description: "Fashion editorial.",
    thumbnail: "https://source.unsplash.com/random/400x300?fashion,editorial&sig=123",
    unlockLimit: 40,
    unlockCount: 3,
    createdAt: "2025-07-23T16:00:00.000Z",
    expiresAt: "2025-07-26T16:00:00.000Z",
    type: "image",
    tags: ["Fashion", "Editorial", "Photo"],
    mediaUrl: "https://source.unsplash.com/random/600x600?fashion,editorial&sig=23"
  },
  {
    id: "drop3-5",
    title: "Creator3 Drop 5",
    creator: "Creator3",
    creatorId: "3c16758d-6e3e-479d-9a24-25891eb0b6ab",
    description: "Q&A audio session.",
    thumbnail: "https://source.unsplash.com/random/400x300?audio,qa&sig=124",
    unlockLimit: 30,
    unlockCount: 2,
    createdAt: "2025-07-26T16:00:00.000Z",
    expiresAt: "2025-07-29T16:00:00.000Z",
    type: "audio",
    tags: ["Q&A", "Audio", "Fan"],
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  },
  // Creator4 Drops
  {
    id: "drop4-1",
    title: "Creator4 Drop 1",
    creator: "Creator4",
    creatorId: "b7e2e2c1-4e2a-4b2a-8e2a-7e2e2c1b2a3c",
    description: "New art drop.",
    thumbnail: "https://source.unsplash.com/random/400x300?art,drop&sig=130",
    unlockLimit: 80,
    unlockCount: 9,
    createdAt: "2025-07-14T17:00:00.000Z",
    expiresAt: "2025-07-17T17:00:00.000Z",
    type: "image",
    tags: ["Art", "Drop", "Exclusive"],
    mediaUrl: "https://source.unsplash.com/random/600x600?art,drop&sig=30"
  },
  {
    id: "drop4-2",
    title: "Creator4 Drop 2",
    creator: "Creator4",
    creatorId: "b7e2e2c1-4e2a-4b2a-8e2a-7e2e2c1b2a3c",
    description: "Live performance audio.",
    thumbnail: "https://source.unsplash.com/random/400x300?live,audio&sig=131",
    unlockLimit: 60,
    unlockCount: 7,
    createdAt: "2025-07-17T17:00:00.000Z",
    expiresAt: "2025-07-20T17:00:00.000Z",
    type: "audio",
    tags: ["Live", "Audio", "Performance"],
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
  },
  {
    id: "drop4-3",
    title: "Creator4 Drop 3",
    creator: "Creator4",
    creatorId: "b7e2e2c1-4e2a-4b2a-8e2a-7e2e2c1b2a3c",
    description: "Short film preview.",
    thumbnail: "https://source.unsplash.com/random/400x300?film,preview&sig=132",
    unlockLimit: 50,
    unlockCount: 5,
    createdAt: "2025-07-20T17:00:00.000Z",
    expiresAt: "2025-07-23T17:00:00.000Z",
    type: "video",
    tags: ["Film", "Preview", "Video"],
    mediaUrl: "https://samplelib.com/mp4/sample-15s.mp4"
  },
  {
    id: "drop4-4",
    title: "Creator4 Drop 4",
    creator: "Creator4",
    creatorId: "b7e2e2c1-4e2a-4b2a-8e2a-7e2e2c1b2a3c",
    description: "Fashion editorial.",
    thumbnail: "https://source.unsplash.com/random/400x300?fashion,editorial&sig=133",
    unlockLimit: 40,
    unlockCount: 3,
    createdAt: "2025-07-23T17:00:00.000Z",
    expiresAt: "2025-07-26T17:00:00.000Z",
    type: "image",
    tags: ["Fashion", "Editorial", "Photo"],
    mediaUrl: "https://source.unsplash.com/random/600x600?fashion,editorial&sig=33"
  },
  {
    id: "drop4-5",
    title: "Creator4 Drop 5",
    creator: "Creator4",
    creatorId: "b7e2e2c1-4e2a-4b2a-8e2a-7e2e2c1b2a3c",
    description: "Q&A video session.",
    thumbnail: "https://source.unsplash.com/random/400x300?video,qa&sig=134",
    unlockLimit: 30,
    unlockCount: 2,
    createdAt: "2025-07-26T17:00:00.000Z",
    expiresAt: "2025-07-29T17:00:00.000Z",
    type: "video",
    tags: ["Q&A", "Video", "Fan"],
    mediaUrl: "https://samplelib.com/mp4/sample-20s.mp4"
  },
  // Creator5 Drops
  {
    id: "drop5-1",
    title: "Creator5 Drop 1",
    creator: "Creator5",
    creatorId: "c8f3f3d2-5f3b-5c3b-9f3b-8f3f3d2c3b4d",
    description: "Exclusive behind the scenes.",
    thumbnail: "https://source.unsplash.com/random/400x300?bts,exclusive&sig=140",
    unlockLimit: 100,
    unlockCount: 12,
    createdAt: "2025-07-14T18:00:00.000Z",
    expiresAt: "2025-07-17T18:00:00.000Z",
    type: "image",
    tags: ["Behind-the-Scenes", "Exclusive", "Drop"],
    mediaUrl: "https://source.unsplash.com/random/600x600?bts,exclusive&sig=40"
  },
  {
    id: "drop5-2",
    title: "Creator5 Drop 2",
    creator: "Creator5",
    creatorId: "c8f3f3d2-5f3b-5c3b-9f3b-8f3f3d2c3b4d",
    description: "Music session audio.",
    thumbnail: "https://source.unsplash.com/random/400x300?music,audio&sig=141",
    unlockLimit: 80,
    unlockCount: 10,
    createdAt: "2025-07-17T18:00:00.000Z",
    expiresAt: "2025-07-20T18:00:00.000Z",
    type: "audio",
    tags: ["Music", "Audio", "Session"],
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
  },
  {
    id: "drop5-3",
    title: "Creator5 Drop 3",
    creator: "Creator5",
    creatorId: "c8f3f3d2-5f3b-5c3b-9f3b-8f3f3d2c3b4d",
    description: "Short video preview.",
    thumbnail: "https://source.unsplash.com/random/400x300?video,preview&sig=142",
    unlockLimit: 60,
    unlockCount: 7,
    createdAt: "2025-07-20T18:00:00.000Z",
    expiresAt: "2025-07-23T18:00:00.000Z",
    type: "video",
    tags: ["Video", "Preview", "Drop"],
    mediaUrl: "https://samplelib.com/mp4/sample-25s.mp4"
  },
  {
    id: "drop5-4",
    title: "Creator5 Drop 4",
    creator: "Creator5",
    creatorId: "c8f3f3d2-5f3b-5c3b-9f3b-8f3f3d2c3b4d",
    description: "Fashion editorial.",
    thumbnail: "https://source.unsplash.com/random/400x300?fashion,editorial&sig=143",
    unlockLimit: 50,
    unlockCount: 5,
    createdAt: "2025-07-23T18:00:00.000Z",
    expiresAt: "2025-07-26T18:00:00.000Z",
    type: "image",
    tags: ["Fashion", "Editorial", "Photo"],
    mediaUrl: "https://source.unsplash.com/random/600x600?fashion,editorial&sig=43"
  },
  {
    id: "drop5-5",
    title: "Creator5 Drop 5",
    creator: "Creator5",
    creatorId: "c8f3f3d2-5f3b-5c3b-9f3b-8f3f3d2c3b4d",
    description: "Q&A audio session.",
    thumbnail: "https://source.unsplash.com/random/400x300?audio,qa&sig=144",
    unlockLimit: 40,
    unlockCount: 3,
    createdAt: "2025-07-26T18:00:00.000Z",
    expiresAt: "2025-07-29T18:00:00.000Z",
    type: "audio",
    tags: ["Q&A", "Audio", "Fan"],
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
  },
  // Creator6 Drops
  {
    id: "drop6-1",
    title: "Creator6 Drop 1",
    creator: "Creator6",
    creatorId: "d9a4a4e3-6a4c-6d4c-0a4c-9a4a4e3d4c5e",
    description: "Exclusive art drop.",
    thumbnail: "https://source.unsplash.com/random/400x300?art,exclusive&sig=150",
    unlockLimit: 90,
    unlockCount: 11,
    createdAt: "2025-07-14T19:00:00.000Z",
    expiresAt: "2025-07-17T19:00:00.000Z",
    type: "image",
    tags: ["Art", "Exclusive", "Drop"],
    mediaUrl: "https://source.unsplash.com/random/600x600?art,exclusive&sig=50"
  },
  {
    id: "drop6-2",
    title: "Creator6 Drop 2",
    creator: "Creator6",
    creatorId: "d9a4a4e3-6a4c-6d4c-0a4c-9a4a4e3d4c5e",
    description: "Music session audio.",
    thumbnail: "https://source.unsplash.com/random/400x300?music,audio&sig=151",
    unlockLimit: 70,
    unlockCount: 8,
    createdAt: "2025-07-17T19:00:00.000Z",
    expiresAt: "2025-07-20T19:00:00.000Z",
    type: "audio",
    tags: ["Music", "Audio", "Session"],
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
  },
  {
    id: "drop6-3",
    title: "Creator6 Drop 3",
    creator: "Creator6",
    creatorId: "d9a4a4e3-6a4c-6d4c-0a4c-9a4a4e3d4c5e",
    description: "Short video preview.",
    thumbnail: "https://source.unsplash.com/random/400x300?video,preview&sig=152",
    unlockLimit: 60,
    unlockCount: 6,
    createdAt: "2025-07-20T19:00:00.000Z",
    expiresAt: "2025-07-23T19:00:00.000Z",
    type: "video",
    tags: ["Video", "Preview", "Drop"],
    mediaUrl: "https://samplelib.com/mp4/sample-30s.mp4"
  },
  {
    id: "drop6-4",
    title: "Creator6 Drop 4",
    creator: "Creator6",
    creatorId: "d9a4a4e3-6a4c-6d4c-0a4c-9a4a4e3d4c5e",
    description: "Fashion editorial.",
    thumbnail: "https://source.unsplash.com/random/400x300?fashion,editorial&sig=153",
    unlockLimit: 50,
    unlockCount: 4,
    createdAt: "2025-07-23T19:00:00.000Z",
    expiresAt: "2025-07-26T19:00:00.000Z",
    type: "image",
    tags: ["Fashion", "Editorial", "Photo"],
    mediaUrl: "https://source.unsplash.com/random/600x600?fashion,editorial&sig=53"
  },
  {
    id: "drop6-5",
    title: "Creator6 Drop 5",
    creator: "Creator6",
    creatorId: "d9a4a4e3-6a4c-6d4c-0a4c-9a4a4e3d4c5e",
    description: "Q&A video session.",
    thumbnail: "https://source.unsplash.com/random/400x300?video,qa&sig=154",
    unlockLimit: 40,
    unlockCount: 2,
    createdAt: "2025-07-26T19:00:00.000Z",
    expiresAt: "2025-07-29T19:00:00.000Z",
    type: "video",
    tags: ["Q&A", "Video", "Fan"],
    mediaUrl: "https://samplelib.com/mp4/sample-35s.mp4"
  },
  // Creator7 Drops
  {
    id: "drop7-1",
    title: "Creator7 Drop 1",
    creator: "Creator7",
    creatorId: "e0b5b5f4-7b5d-7e5d-1b5d-0b5b5f4e5d6f",
    description: "Exclusive look at the new project.",
    thumbnail: "https://source.unsplash.com/random/400x300?project,exclusive&sig=160",
    unlockLimit: 110,
    unlockCount: 14,
    createdAt: "2025-07-14T20:00:00.000Z",
    expiresAt: "2025-07-17T20:00:00.000Z",
    type: "image",
    tags: ["Exclusive", "Project", "Art"],
    mediaUrl: "https://source.unsplash.com/random/600x600?project,exclusive&sig=60"
  },
  {
    id: "drop7-2",
    title: "Creator7 Drop 2",
    creator: "Creator7",
    creatorId: "e0b5b5f4-7b5d-7e5d-1b5d-0b5b5f4e5d6f",
    description: "Studio session audio.",
    thumbnail: "https://source.unsplash.com/random/400x300?studio,audio&sig=161",
    unlockLimit: 90,
    unlockCount: 11,
    createdAt: "2025-07-17T20:00:00.000Z",
    expiresAt: "2025-07-20T20:00:00.000Z",
    type: "audio",
    tags: ["Studio", "Audio", "Music"],
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3"
  },
  {
    id: "drop7-3",
    title: "Creator7 Drop 3",
    creator: "Creator7",
    creatorId: "e0b5b5f4-7b5d-7e5d-1b5d-0b5b5f4e5d6f",
    description: "Short teaser video.",
    thumbnail: "https://source.unsplash.com/random/400x300?teaser,video&sig=162",
    unlockLimit: 70,
    unlockCount: 8,
    createdAt: "2025-07-20T20:00:00.000Z",
    expiresAt: "2025-07-23T20:00:00.000Z",
    type: "video",
    tags: ["Teaser", "Video", "Preview"],
    mediaUrl: "https://samplelib.com/mp4/sample-40s.mp4"
  },
  {
    id: "drop7-4",
    title: "Creator7 Drop 4",
    creator: "Creator7",
    creatorId: "e0b5b5f4-7b5d-7e5d-1b5d-0b5b5f4e5d6f",
    description: "Fashion editorial.",
    thumbnail: "https://source.unsplash.com/random/400x300?fashion,editorial&sig=163",
    unlockLimit: 60,
    unlockCount: 6,
    createdAt: "2025-07-23T20:00:00.000Z",
    expiresAt: "2025-07-26T20:00:00.000Z",
    type: "image",
    tags: ["Fashion", "Editorial", "Photo"],
    mediaUrl: "https://source.unsplash.com/random/600x600?fashion,editorial&sig=63"
  },
  {
    id: "drop7-5",
    title: "Creator7 Drop 5",
    creator: "Creator7",
    creatorId: "e0b5b5f4-7b5d-7e5d-1b5d-0b5b5f4e5d6f",
    description: "Q&A audio session.",
    thumbnail: "https://source.unsplash.com/random/400x300?audio,qa&sig=164",
    unlockLimit: 50,
    unlockCount: 4,
    createdAt: "2025-07-26T20:00:00.000Z",
    expiresAt: "2025-07-29T20:00:00.000Z",
    type: "audio",
    tags: ["Q&A", "Audio", "Fan"],
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3"
  },
  // Creator8 Drops
  {
    id: "drop8-1",
    title: "Creator8 Drop 1",
    creator: "Creator8",
    creatorId: "f1c6c6a5-8c6e-8f6e-2c6e-1c6c6a5f6e7a",
    description: "Exclusive look at the new project.",
    thumbnail: "https://source.unsplash.com/random/400x300?project,exclusive&sig=170",
    unlockLimit: 100,
    unlockCount: 13,
    createdAt: "2025-07-14T21:00:00.000Z",
    expiresAt: "2025-07-17T21:00:00.000Z",
    type: "image",
    tags: ["Exclusive", "Project", "Art"],
    mediaUrl: "https://source.unsplash.com/random/600x600?project,exclusive&sig=70"
  },
  {
    id: "drop8-2",
    title: "Creator8 Drop 2",
    creator: "Creator8",
    creatorId: "f1c6c6a5-8c6e-8f6e-2c6e-1c6c6a5f6e7a",
    description: "Studio session audio.",
    thumbnail: "https://source.unsplash.com/random/400x300?studio,audio&sig=171",
    unlockLimit: 80,
    unlockCount: 9,
    createdAt: "2025-07-17T21:00:00.000Z",
    expiresAt: "2025-07-20T21:00:00.000Z",
    type: "audio",
    tags: ["Studio", "Audio", "Music"],
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3"
  },
  {
    id: "drop8-3",
    title: "Creator8 Drop 3",
    creator: "Creator8",
    creatorId: "f1c6c6a5-8c6e-8f6e-2c6e-1c6c6a5f6e7a",
    description: "Short teaser video.",
    thumbnail: "https://source.unsplash.com/random/400x300?teaser,video&sig=172",
    unlockLimit: 60,
    unlockCount: 7,
    createdAt: "2025-07-20T21:00:00.000Z",
    expiresAt: "2025-07-23T21:00:00.000Z",
    type: "video",
    tags: ["Teaser", "Video", "Preview"],
    mediaUrl: "https://samplelib.com/mp4/sample-45s.mp4"
  },
  {
    id: "drop8-4",
    title: "Creator8 Drop 4",
    creator: "Creator8",
    creatorId: "f1c6c6a5-8c6e-8f6e-2c6e-1c6c6a5f6e7a",
    description: "Fashion editorial.",
    thumbnail: "https://source.unsplash.com/random/400x300?fashion,editorial&sig=173",
    unlockLimit: 50,
    unlockCount: 5,
    createdAt: "2025-07-23T21:00:00.000Z",
    expiresAt: "2025-07-26T21:00:00.000Z",
    type: "image",
    tags: ["Fashion", "Editorial", "Photo"],
    mediaUrl: "https://source.unsplash.com/random/600x600?fashion,editorial&sig=73"
  },
  {
    id: "drop8-5",
    title: "Creator8 Drop 5",
    creator: "Creator8",
    creatorId: "f1c6c6a5-8c6e-8f6e-2c6e-1c6c6a5f6e7a",
    description: "Q&A audio session.",
    thumbnail: "https://source.unsplash.com/random/400x300?audio,qa&sig=174",
    unlockLimit: 40,
    unlockCount: 3,
    createdAt: "2025-07-26T21:00:00.000Z",
    expiresAt: "2025-07-29T21:00:00.000Z",
    type: "audio",
    tags: ["Q&A", "Audio", "Fan"],
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3"
  },
  // Creator9 Drops
  {
    id: "drop9-1",
    title: "Creator9 Drop 1",
    creator: "Creator9",
    creatorId: "a2d7d7b6-9d7f-9a7f-3d7f-2d7d7b6a7f8b",
    description: "Exclusive art drop.",
    thumbnail: "https://source.unsplash.com/random/400x300?art,exclusive&sig=180",
    unlockLimit: 90,
    unlockCount: 11,
    createdAt: "2025-07-14T22:00:00.000Z",
    expiresAt: "2025-07-17T22:00:00.000Z",
    type: "image",
    tags: ["Art", "Exclusive", "Drop"],
    mediaUrl: "https://source.unsplash.com/random/600x600?art,exclusive&sig=80"
  },
  {
    id: "drop9-2",
    title: "Creator9 Drop 2",
    creator: "Creator9",
    creatorId: "a2d7d7b6-9d7f-9a7f-3d7f-2d7d7b6a7f8b",
    description: "Music session audio.",
    thumbnail: "https://source.unsplash.com/random/400x300?music,audio&sig=181",
    unlockLimit: 70,
    unlockCount: 8,
    createdAt: "2025-07-17T22:00:00.000Z",
    expiresAt: "2025-07-20T22:00:00.000Z",
    type: "audio",
    tags: ["Music", "Audio", "Session"],
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3"
  },
  {
    id: "drop9-3",
    title: "Creator9 Drop 3",
    creator: "Creator9",
    creatorId: "a2d7d7b6-9d7f-9a7f-3d7f-2d7d7b6a7f8b",
    description: "Short video preview.",
    thumbnail: "https://source.unsplash.com/random/400x300?video,preview&sig=182",
    unlockLimit: 60,
    unlockCount: 6,
    createdAt: "2025-07-20T22:00:00.000Z",
    expiresAt: "2025-07-23T22:00:00.000Z",
    type: "video",
    tags: ["Video", "Preview", "Drop"],
    mediaUrl: "https://samplelib.com/mp4/sample-50s.mp4"
  },
  {
    id: "drop9-4",
    title: "Creator9 Drop 4",
    creator: "Creator9",
    creatorId: "a2d7d7b6-9d7f-9a7f-3d7f-2d7d7b6a7f8b",
    description: "Fashion editorial.",
    thumbnail: "https://source.unsplash.com/random/400x300?fashion,editorial&sig=183",
    unlockLimit: 50,
    unlockCount: 4,
    createdAt: "2025-07-23T22:00:00.000Z",
    expiresAt: "2025-07-26T22:00:00.000Z",
    type: "image",
    tags: ["Fashion", "Editorial", "Photo"],
    mediaUrl: "https://source.unsplash.com/random/600x600?fashion,editorial&sig=83"
  },
  {
    id: "drop9-5",
    title: "Creator9 Drop 5",
    creator: "Creator9",
    creatorId: "a2d7d7b6-9d7f-9a7f-3d7f-2d7d7b6a7f8b",
    description: "Q&A video session.",
    thumbnail: "https://source.unsplash.com/random/400x300?video,qa&sig=184",
    unlockLimit: 40,
    unlockCount: 2,
    createdAt: "2025-07-26T22:00:00.000Z",
    expiresAt: "2025-07-29T22:00:00.000Z",
    type: "video",
    tags: ["Q&A", "Video", "Fan"],
    mediaUrl: "https://samplelib.com/mp4/sample-55s.mp4"
  },
  // Creator10 Drops
  {
    id: "drop10-1",
    title: "Creator10 Drop 1",
    creator: "Creator10",
    creatorId: "b3e8e8c7-0e80-0b80-4e80-3e8e8c7b8c9c",
    description: "Exclusive behind the scenes.",
    thumbnail: "https://source.unsplash.com/random/400x300?bts,exclusive&sig=190",
    unlockLimit: 120,
    unlockCount: 16,
    createdAt: "2025-07-14T23:00:00.000Z",
    expiresAt: "2025-07-17T23:00:00.000Z",
    type: "image",
    tags: ["Behind-the-Scenes", "Exclusive", "Drop"],
    mediaUrl: "https://source.unsplash.com/random/600x600?bts,exclusive&sig=90"
  },
  {
    id: "drop10-2",
    title: "Creator10 Drop 2",
    creator: "Creator10",
    creatorId: "b3e8e8c7-0e80-0b80-4e80-3e8e8c7b8c9c",
    description: "Music session audio.",
    thumbnail: "https://source.unsplash.com/random/400x300?music,audio&sig=191",
    unlockLimit: 100,
    unlockCount: 13,
    createdAt: "2025-07-17T23:00:00.000Z",
    expiresAt: "2025-07-20T23:00:00.000Z",
    type: "audio",
    tags: ["Music", "Audio", "Session"],
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3"
  },
  {
    id: "drop10-3",
    title: "Creator10 Drop 3",
    creator: "Creator10",
    creatorId: "b3e8e8c7-0e80-0b80-4e80-3e8e8c7b8c9c",
    description: "Short video preview.",
    thumbnail: "https://source.unsplash.com/random/400x300?video,preview&sig=192",
    unlockLimit: 80,
    unlockCount: 10,
    createdAt: "2025-07-20T23:00:00.000Z",
    expiresAt: "2025-07-23T23:00:00.000Z",
    type: "video",
    tags: ["Video", "Preview", "Drop"],
    mediaUrl: "https://samplelib.com/mp4/sample-60s.mp4"
  },
  {
    id: "drop10-4",
    title: "Creator10 Drop 4",
    creator: "Creator10",
    creatorId: "b3e8e8c7-0e80-0b80-4e80-3e8e8c7b8c9c",
    description: "Fashion editorial.",
    thumbnail: "https://source.unsplash.com/random/400x300?fashion,editorial&sig=193",
    unlockLimit: 60,
    unlockCount: 7,
    createdAt: "2025-07-23T23:00:00.000Z",
    expiresAt: "2025-07-26T23:00:00.000Z",
    type: "image",
    tags: ["Fashion", "Editorial", "Photo"],
    mediaUrl: "https://source.unsplash.com/random/600x600?fashion,editorial&sig=93"
  },
  {
    id: "drop10-5",
    title: "Creator10 Drop 5",
    creator: "Creator10",
    creatorId: "b3e8e8c7-0e80-0b80-4e80-3e8e8c7b8c9c",
    description: "Q&A audio session.",
    thumbnail: "https://source.unsplash.com/random/400x300?audio,qa&sig=194",
    unlockLimit: 50,
    unlockCount: 5,
    createdAt: "2025-07-26T23:00:00.000Z",
    expiresAt: "2025-07-29T23:00:00.000Z",
    type: "audio",
    tags: ["Q&A", "Audio", "Fan"],
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3"
  }
];
// END OF MOCK DATA

// Mock users
export const mockUsers: MockUser[] = [
  {
    id: 'user1',
    email: 'fan@example.com',
    role: 'fan',
    username: 'luxury_fan',
    displayName: 'Luxury Fan',
    avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
    unlockedDrops: ['drop1', 'drop3'],
    following: ['creator1', 'creator3'],
    referralCode: 'LUXURY123',
    referralCount: 5,
    bio: 'Avid fan of luxury and exclusive content.',
    preferences: { theme: 'dark', notifications: true },
    joinedAt: '2023-12-01T09:00:00Z',
  },
  {
    id: 'user2',
    email: 'creator@example.com',
    role: 'creator',
    username: 'luxury_lisa',
    displayName: 'Lisa Luxury',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    unlockedDrops: [],
    following: [],
    referralCount: 0,
    bio: 'Creator of luxury experiences.',
    preferences: { theme: 'light', notifications: false },
    joinedAt: '2023-11-15T10:00:00Z',
  },
  {
    id: 'user3',
    email: 'emmafan@example.com',
    role: 'fan',
    username: 'emma_fan',
    displayName: 'Emma Fan',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    unlockedDrops: ['drop3', 'drop6'],
    following: ['creator3'],
    referralCode: 'EMMAFAN2024',
    referralCount: 2,
    bio: 'Travel and adventure enthusiast.',
    preferences: { theme: 'dark', notifications: true },
    joinedAt: '2024-01-10T08:00:00Z',
  },
  {
    id: 'user4',
    email: 'samfan@example.com',
    role: 'fan',
    username: 'sam_fan',
    displayName: 'Sam Fan',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    unlockedDrops: ['drop5'],
    following: ['creator4'],
    referralCode: 'SAMFAN2024',
    referralCount: 1,
    bio: 'Music lover and audio drop collector.',
    preferences: { theme: 'dark', notifications: false },
    joinedAt: '2024-01-20T11:00:00Z',
  },
];

// Mock stats
export const mockStats: MockStats = {
  earnings: 28450,
  unlocks: 1247,
  views: 45620,
  referrals: 89,
};

// Helper functions
export const getDropById = (id: string): MockDrop | undefined => {
  return mockDrops.find(drop => drop.id === id);
};

export const getCreatorById = (id: string): MockCreator | undefined => {
  return mockCreators.find(creator => creator.id === id);
};

export const getUserById = (id: string): MockUser | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getDropsByCreator = (creatorId: string): MockDrop[] => {
  return mockDrops.filter(drop => drop.creatorId === creatorId);
}; 