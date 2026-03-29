import type { Story, StoryGroup } from './types';

/**
 * Mock Data for Stories Feature
 * 
 * Centralized mock data - easily replaceable with API calls
 * 
 * Frequency Bands:
 * - breaking: Real-time urgent signals (< 1hr old, high engagement)
 * - trending: High engagement signals getting attention
 * - chill: Casual everyday moments
 * - broadcast: Verified creator announcements
 */

export const mockStories: Story[] = [
  {
    id: 's1',
    user: {
      id: '1',
      name: 'Sarah Chen',
      username: 'sarahchen',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      isVerified: true,
    },
    items: [
      {
        id: 'si1',
        type: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1080&h=1920&fit=crop',
        duration: 5,
        timestamp: '2h ago',
        caption: 'Beautiful sunset at the beach 🌅',
        location: 'Malibu, California',
        viewers: 1234,
      },
      {
        id: 'si2',
        type: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920&fit=crop',
        duration: 5,
        timestamp: '2h ago',
        caption: 'Nature vibes ✨',
        viewers: 1100,
      },
    ],
    hasUnseenItems: true,
    frequencyBand: 'trending',
    signalStrength: 5,
  },
  {
    id: 's2',
    user: {
      id: '2',
      name: 'Alex Rivera',
      username: 'alexrivera',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    items: [
      {
        id: 'si3',
        type: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1080&h=1920&fit=crop',
        duration: 5,
        timestamp: '4h ago',
        caption: 'Mountain adventures 🏔️',
        location: 'Swiss Alps',
        viewers: 856,
      },
    ],
    hasUnseenItems: true,
    frequencyBand: 'chill',
    signalStrength: 3,
  },
  {
    id: 's3',
    user: {
      id: '3',
      name: 'Tech Insights',
      username: 'techinsights',
      avatarUrl: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=100&h=100&fit=crop',
      isVerified: true,
    },
    items: [
      {
        id: 'si4',
        type: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1080&h=1920&fit=crop',
        duration: 5,
        timestamp: '5h ago',
        caption: 'New tech drop! 🚀',
        viewers: 5420,
      },
      {
        id: 'si5',
        type: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1080&h=1920&fit=crop',
        duration: 5,
        timestamp: '5h ago',
        caption: 'Behind the scenes',
        viewers: 4800,
      },
      {
        id: 'si6',
        type: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1080&h=1920&fit=crop',
        duration: 5,
        timestamp: '5h ago',
        viewers: 4200,
      },
    ],
    hasUnseenItems: true,
    isLive: true,
    frequencyBand: 'breaking',
    signalStrength: 5,
  },
  {
    id: 's4',
    user: {
      id: '4',
      name: 'Emily Watson',
      username: 'emilywatson',
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    },
    items: [
      {
        id: 'si7',
        type: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1080&h=1920&fit=crop',
        duration: 5,
        timestamp: '8h ago',
        caption: 'Cooking something special 🍳',
        viewers: 432,
      },
    ],
    hasUnseenItems: false,
    frequencyBand: 'chill',
    signalStrength: 2,
  },
  {
    id: 's5',
    user: {
      id: '5',
      name: 'Marcus Johnson',
      username: 'marcusj',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      isVerified: true,
    },
    items: [
      {
        id: 'si8',
        type: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1080&h=1920&fit=crop',
        duration: 5,
        timestamp: '10h ago',
        caption: 'Gym time 💪',
        location: 'LA Fitness',
        viewers: 2100,
      },
    ],
    hasUnseenItems: false,
    frequencyBand: 'trending',
    signalStrength: 4,
  },
  {
    id: 's6',
    user: {
      id: '6',
      name: 'Design Weekly',
      username: 'designweekly',
      avatarUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=100&h=100&fit=crop',
      isVerified: true,
    },
    items: [
      {
        id: 'si9',
        type: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1080&h=1920&fit=crop',
        duration: 5,
        timestamp: '12h ago',
        caption: 'Design inspiration of the day 🎨',
        viewers: 3400,
      },
      {
        id: 'si10',
        type: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1080&h=1920&fit=crop',
        duration: 5,
        timestamp: '12h ago',
        viewers: 3100,
      },
    ],
    hasUnseenItems: false,
    frequencyBand: 'broadcast',
    signalStrength: 5,
  },
];

export const storyGroups: StoryGroup[] = [
  {
    title: 'Following',
    stories: mockStories,
  },
];

// Your story (for adding new stories)
export const yourStory: Story | null = null;
