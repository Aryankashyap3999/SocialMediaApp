/**
 * Stories Feature Types
 * 
 * Centralized type definitions for the stories feature
 */

// Signal Frequency Band - unique classification system
export type FrequencyBand = 'all' | 'breaking' | 'trending' | 'chill' | 'broadcast';

export interface StoryUser {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  isVerified?: boolean;
}

export interface StoryItem {
  id: string;
  type: 'image' | 'video';
  mediaUrl: string;
  duration: number; // in seconds
  timestamp: string;
  caption?: string;
  location?: string;
  music?: {
    title: string;
    artist: string;
  };
  viewers?: number;
  reactions?: StoryReaction[];
}

export interface StoryReaction {
  userId: string;
  emoji: string;
}

export interface Story {
  id: string;
  user: StoryUser;
  items: StoryItem[];
  hasUnseenItems: boolean;
  isLive?: boolean;
  isMuted?: boolean;
  frequencyBand?: FrequencyBand; // Signal frequency classification
  signalStrength?: number; // 1-5 based on engagement
}

export interface StoryGroup {
  title: string;
  stories: Story[];
}
