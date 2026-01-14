import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Drop Types
 */
export type DropType = 'post' | 'story' | 'reel' | 'poll' | 'live';

export type DropStatus = 'draft' | 'published' | 'archived' | 'scheduled';

/**
 * Media Item Interface
 */
export interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  thumbnailUrl?: string;
  duration?: number; // For video/audio in seconds
  width?: number;
  height?: number;
}

/**
 * Poll Option Interface
 */
export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

/**
 * Drop Interface
 * Main data structure for a Drop (post/story/reel/poll)
 */
export interface Drop {
  id: string;
  type: DropType;
  status: DropStatus;
  
  // Content
  caption: string;
  media: MediaItem[];
  
  // Poll specific
  pollOptions?: PollOption[];
  pollEndsAt?: string;
  
  // Metadata
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  
  // Engagement
  likes: number;
  comments: number;
  shares: number;
  views: number;
  
  // Tags & Location
  tags: string[];
  mentions: string[];
  location?: string;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  scheduledAt?: string;
  expiresAt?: string; // For stories
  
  // Settings
  commentsEnabled: boolean;
  likesVisible: boolean;
  shareEnabled: boolean;
}

/**
 * Create Drop Input
 */
export interface CreateDropInput {
  type: DropType;
  caption: string;
  media?: MediaItem[];
  pollOptions?: Omit<PollOption, 'id' | 'votes'>[];
  pollDuration?: number; // in hours
  tags?: string[];
  mentions?: string[];
  location?: string;
  scheduledAt?: string;
  commentsEnabled?: boolean;
  likesVisible?: boolean;
  shareEnabled?: boolean;
}

/**
 * Drop Store State
 */
interface DropState {
  // All drops
  drops: Drop[];
  
  // Draft being created
  currentDraft: Partial<CreateDropInput> | null;
  
  // Loading states
  isCreating: boolean;
  isLoading: boolean;
  
  // Filters
  filterType: DropType | 'all';
  filterStatus: DropStatus | 'all';
}

/**
 * Drop Store Actions
 */
interface DropActions {
  // CRUD Operations
  createDrop: (input: CreateDropInput) => Drop;
  updateDrop: (id: string, updates: Partial<Drop>) => void;
  deleteDrop: (id: string) => void;
  
  // Draft management
  setDraft: (draft: Partial<CreateDropInput>) => void;
  updateDraft: (updates: Partial<CreateDropInput>) => void;
  clearDraft: () => void;
  saveDraftAsDrop: () => Drop | null;
  
  // Engagement actions
  likeDrop: (id: string) => void;
  unlikeDrop: (id: string) => void;
  incrementViews: (id: string) => void;
  
  // Poll actions
  votePoll: (dropId: string, optionId: string) => void;
  
  // Status management
  publishDrop: (id: string) => void;
  archiveDrop: (id: string) => void;
  scheduleDrop: (id: string, scheduledAt: string) => void;
  
  // Filters
  setFilterType: (type: DropType | 'all') => void;
  setFilterStatus: (status: DropStatus | 'all') => void;
  
  // Getters
  getDropById: (id: string) => Drop | undefined;
  getDropsByType: (type: DropType) => Drop[];
  getDropsByStatus: (status: DropStatus) => Drop[];
  getFilteredDrops: () => Drop[];
  
  // Utility
  setLoading: (loading: boolean) => void;
}

/**
 * Generate unique ID
 */
const generateId = () => `drop_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

/**
 * Current user (mock - replace with auth store later)
 */
const currentUser = {
  id: 'user_1',
  name: 'Aryan Kashyap',
  avatar: 'https://i.pravatar.cc/150?u=aryan',
};

/**
 * Initial mock drops for testing
 */
const mockDrops: Drop[] = [
  {
    id: 'drop_1',
    type: 'post',
    status: 'published',
    caption: 'Just launched a new feature! 🚀 Check out the glassmorphic design.',
    media: [
      {
        id: 'media_1',
        type: 'image',
        url: 'https://picsum.photos/800/600?random=1',
        width: 800,
        height: 600,
      },
    ],
    authorId: currentUser.id,
    authorName: currentUser.name,
    authorAvatar: currentUser.avatar,
    likes: 142,
    comments: 23,
    shares: 8,
    views: 1250,
    tags: ['design', 'ui', 'launch'],
    mentions: [],
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    commentsEnabled: true,
    likesVisible: true,
    shareEnabled: true,
  },
  {
    id: 'drop_2',
    type: 'reel',
    status: 'published',
    caption: 'Behind the scenes of building Aptoodate 🎬',
    media: [
      {
        id: 'media_2',
        type: 'video',
        url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        thumbnailUrl: 'https://picsum.photos/400/700?random=2',
        duration: 30,
        width: 400,
        height: 700,
      },
    ],
    authorId: currentUser.id,
    authorName: currentUser.name,
    authorAvatar: currentUser.avatar,
    likes: 89,
    comments: 12,
    shares: 5,
    views: 890,
    tags: ['behindthescenes', 'coding', 'dev'],
    mentions: [],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    commentsEnabled: true,
    likesVisible: true,
    shareEnabled: true,
  },
  {
    id: 'drop_3',
    type: 'poll',
    status: 'published',
    caption: 'Which feature should we build next? 🤔',
    media: [],
    pollOptions: [
      { id: 'opt_1', text: 'Dark mode themes', votes: 45 },
      { id: 'opt_2', text: 'Video calls', votes: 32 },
      { id: 'opt_3', text: 'Custom reactions', votes: 28 },
      { id: 'opt_4', text: 'Voice messages', votes: 19 },
    ],
    pollEndsAt: new Date(Date.now() + 86400000 * 2).toISOString(),
    authorId: currentUser.id,
    authorName: currentUser.name,
    authorAvatar: currentUser.avatar,
    likes: 67,
    comments: 34,
    shares: 3,
    views: 445,
    tags: ['poll', 'community', 'feedback'],
    mentions: [],
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    updatedAt: new Date(Date.now() - 7200000).toISOString(),
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    commentsEnabled: true,
    likesVisible: true,
    shareEnabled: true,
  },
];

/**
 * Drop Store
 * Zustand store for managing Drops with persistence
 */
export const useDropStore = create<DropState & DropActions>()(
  persist(
    (set, get) => ({
      // Initial State
      drops: mockDrops,
      currentDraft: null,
      isCreating: false,
      isLoading: false,
      filterType: 'all',
      filterStatus: 'all',

      // CRUD Operations
      createDrop: (input) => {
        const now = new Date().toISOString();
        const newDrop: Drop = {
          id: generateId(),
          type: input.type,
          status: input.scheduledAt ? 'scheduled' : 'published',
          caption: input.caption,
          media: input.media || [],
          pollOptions: input.pollOptions?.map((opt) => ({
            ...opt,
            id: generateId(),
            votes: 0,
          })),
          pollEndsAt: input.pollDuration
            ? new Date(Date.now() + input.pollDuration * 3600000).toISOString()
            : undefined,
          authorId: currentUser.id,
          authorName: currentUser.name,
          authorAvatar: currentUser.avatar,
          likes: 0,
          comments: 0,
          shares: 0,
          views: 0,
          tags: input.tags || [],
          mentions: input.mentions || [],
          location: input.location,
          createdAt: now,
          updatedAt: now,
          publishedAt: input.scheduledAt ? undefined : now,
          scheduledAt: input.scheduledAt,
          expiresAt: input.type === 'story'
            ? new Date(Date.now() + 24 * 3600000).toISOString()
            : undefined,
          commentsEnabled: input.commentsEnabled ?? true,
          likesVisible: input.likesVisible ?? true,
          shareEnabled: input.shareEnabled ?? true,
        };

        set((state) => ({
          drops: [newDrop, ...state.drops],
          currentDraft: null,
          isCreating: false,
        }));

        return newDrop;
      },

      updateDrop: (id, updates) => {
        set((state) => ({
          drops: state.drops.map((drop) =>
            drop.id === id
              ? { ...drop, ...updates, updatedAt: new Date().toISOString() }
              : drop
          ),
        }));
      },

      deleteDrop: (id) => {
        set((state) => ({
          drops: state.drops.filter((drop) => drop.id !== id),
        }));
      },

      // Draft Management
      setDraft: (draft) => {
        set({ currentDraft: draft });
      },

      updateDraft: (updates) => {
        set((state) => ({
          currentDraft: state.currentDraft
            ? { ...state.currentDraft, ...updates }
            : updates,
        }));
      },

      clearDraft: () => {
        set({ currentDraft: null });
      },

      saveDraftAsDrop: () => {
        const { currentDraft, createDrop } = get();
        if (!currentDraft || !currentDraft.type || !currentDraft.caption) {
          return null;
        }
        return createDrop(currentDraft as CreateDropInput);
      },

      // Engagement Actions
      likeDrop: (id) => {
        set((state) => ({
          drops: state.drops.map((drop) =>
            drop.id === id ? { ...drop, likes: drop.likes + 1 } : drop
          ),
        }));
      },

      unlikeDrop: (id) => {
        set((state) => ({
          drops: state.drops.map((drop) =>
            drop.id === id ? { ...drop, likes: Math.max(0, drop.likes - 1) } : drop
          ),
        }));
      },

      incrementViews: (id) => {
        set((state) => ({
          drops: state.drops.map((drop) =>
            drop.id === id ? { ...drop, views: drop.views + 1 } : drop
          ),
        }));
      },

      // Poll Actions
      votePoll: (dropId, optionId) => {
        set((state) => ({
          drops: state.drops.map((drop) =>
            drop.id === dropId && drop.pollOptions
              ? {
                  ...drop,
                  pollOptions: drop.pollOptions.map((opt) =>
                    opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
                  ),
                }
              : drop
          ),
        }));
      },

      // Status Management
      publishDrop: (id) => {
        const now = new Date().toISOString();
        set((state) => ({
          drops: state.drops.map((drop) =>
            drop.id === id
              ? { ...drop, status: 'published', publishedAt: now, updatedAt: now }
              : drop
          ),
        }));
      },

      archiveDrop: (id) => {
        set((state) => ({
          drops: state.drops.map((drop) =>
            drop.id === id
              ? { ...drop, status: 'archived', updatedAt: new Date().toISOString() }
              : drop
          ),
        }));
      },

      scheduleDrop: (id, scheduledAt) => {
        set((state) => ({
          drops: state.drops.map((drop) =>
            drop.id === id
              ? {
                  ...drop,
                  status: 'scheduled',
                  scheduledAt,
                  updatedAt: new Date().toISOString(),
                }
              : drop
          ),
        }));
      },

      // Filters
      setFilterType: (type) => {
        set({ filterType: type });
      },

      setFilterStatus: (status) => {
        set({ filterStatus: status });
      },

      // Getters
      getDropById: (id) => {
        return get().drops.find((drop) => drop.id === id);
      },

      getDropsByType: (type) => {
        return get().drops.filter((drop) => drop.type === type);
      },

      getDropsByStatus: (status) => {
        return get().drops.filter((drop) => drop.status === status);
      },

      getFilteredDrops: () => {
        const { drops, filterType, filterStatus } = get();
        return drops.filter((drop) => {
          const typeMatch = filterType === 'all' || drop.type === filterType;
          const statusMatch = filterStatus === 'all' || drop.status === filterStatus;
          return typeMatch && statusMatch;
        });
      },

      // Utility
      setLoading: (loading) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'aptoodate-drops-storage',
      partialize: (state) => ({
        drops: state.drops,
      }),
    }
  )
);

export default useDropStore;
