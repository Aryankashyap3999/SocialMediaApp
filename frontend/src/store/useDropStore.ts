import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Drop Types
 */
export type DropType = 'post' | 'story' | 'reel' | 'poll' | 'live';

export type DropStatus = 'draft' | 'published' | 'archived' | 'scheduled';

/**
 * Signal Tiers - Unique to Aptoodate!
 * Different durations and visual styles for signals/stories
 */
export type SignalTier = 'flash' | 'pulse' | 'broadcast';

export const SIGNAL_TIERS: Record<SignalTier, { 
  label: string; 
  duration: number; // hours
  color: string;
  icon: string;
  description: string;
}> = {
  flash: { 
    label: 'Flash', 
    duration: 4, 
    color: 'from-red-500 to-orange-500',
    icon: '⚡',
    description: 'Urgent • 4 hours'
  },
  pulse: { 
    label: 'Pulse', 
    duration: 24, 
    color: 'from-amber-400 to-yellow-500',
    icon: '📡',
    description: 'Daily • 24 hours'
  },
  broadcast: { 
    label: 'Broadcast', 
    duration: 168, 
    color: 'from-emerald-400 to-cyan-500',
    icon: '🎙️',
    description: 'Extended • 7 days'
  },
};

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
  
  // Signal tier (for stories) - Unique to Aptoodate!
  signalTier?: SignalTier;
  
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
  signalTier?: SignalTier; // For stories - Flash/Pulse/Broadcast
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
 * Current user (TODO: replace with auth store)
 */
const currentUser = {
  id: 'user_1',
  name: 'Current User',
  avatar: '',
};

/**
 * Helper to clear storage if quota exceeded
 */
const clearStorageIfNeeded = () => {
  try {
    const storageKey = 'aptoodate-drops-storage';
    const stored = localStorage.getItem(storageKey);
    if (stored && stored.length > 2 * 1024 * 1024) { // If over 2MB
      console.warn('Storage too large, clearing old drops...');
      localStorage.removeItem(storageKey);
      return true;
    }
  } catch (e) {
    console.warn('Error checking storage:', e);
  }
  return false;
};

// Clear storage on module load if needed
clearStorageIfNeeded();

/**
 * Drop Store
 * Zustand store for managing Drops with persistence
 */
export const useDropStore = create<DropState & DropActions>()(
  persist(
    (set, get) => ({
      // Initial State
      drops: [],
      currentDraft: null,
      isCreating: false,
      isLoading: false,
      filterType: 'all',
      filterStatus: 'all',

      // CRUD Operations
      createDrop: (input) => {
        try {
          // Clear storage if it's getting too large
          clearStorageIfNeeded();
          
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
          // Signal tier for stories - determines expiration
          signalTier: input.type === 'story' ? (input.signalTier || 'pulse') : undefined,
          expiresAt: input.type === 'story'
            ? new Date(Date.now() + (SIGNAL_TIERS[input.signalTier || 'pulse'].duration) * 3600000).toISOString()
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
        } catch (error) {
          // Handle quota exceeded error
          if (error instanceof Error && error.name === 'QuotaExceededError') {
            console.warn('Storage quota exceeded, clearing storage...');
            try {
              localStorage.removeItem('aptoodate-drops-storage');
              // Retry after clearing
              set((state) => ({
                drops: state.drops.slice(0, 5), // Keep only 5 most recent
              }));
            } catch (e) {
              console.error('Failed to clear storage:', e);
            }
          }
          throw error;
        }
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
      partialize: (state) => {
        // Limit stored drops to prevent quota issues
        const MAX_STORED_DROPS = 20;
        const recentDrops = state.drops.slice(0, MAX_STORED_DROPS);
        
        // Filter out drops with large base64 media (can't persist these without exceeding quota)
        // Only persist drops with external URLs or no media
        const persistableDrops = recentDrops.filter(drop => {
          // If no media, it's safe to persist
          if (drop.media.length === 0) return true;
          
          // Check if any media has large base64 data
          const hasLargeBase64 = drop.media.some(m => 
            m.url.startsWith('data:') && m.url.length > 5000
          );
          
          // Don't persist drops with large base64 images
          return !hasLargeBase64;
        });
        
        return { drops: persistableDrops };
      },
      // Handle storage errors gracefully
      onRehydrateStorage: () => (_state, error) => {
        if (error) {
          console.warn('Failed to rehydrate drops storage:', error);
        }
      },
    }
  )
);

export default useDropStore;
