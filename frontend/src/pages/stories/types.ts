/**
 * Stories Feature Types
 * 
 * Centralized type definitions for the stories feature
 */

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
}

export interface StoryGroup {
  title: string;
  stories: Story[];
}
