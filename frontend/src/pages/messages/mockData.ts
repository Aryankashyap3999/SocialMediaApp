import type { User, Conversation, Message } from './types';

/**
 * Centralized mock data - easily replaceable with API calls
 */

let currentUser: (User & { password: string; email: string }) | null = null;

/**
 * Set the current user after successful sign-in
 */
export function setCurrentUser(user: (User & { password: string; email: string }) | null) {
  currentUser = user;
}

/**
 * Get the current user
 */
export function getCurrentUser() {
  return currentUser;
}

export const mockUsers: (User & { password: string; email: string })[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    username: 'sarahchen',
    email: 'sarah@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    isVerified: true,
    isOnline: true,
    password: 'sarah123',
  },
  {
    id: '2',
    name: 'Alex Rivera',
    username: 'alexrivera',
    email: 'alex@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    isOnline: false,
    lastSeen: '2h ago',
    password: 'alex123',
  },
  {
    id: '3',
    name: 'Tech Insights',
    username: 'techinsights',
    email: 'tech@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=100&h=100&fit=crop',
    isVerified: true,
    isOnline: true,
    password: 'tech123',
  },
  {
    id: '4',
    name: 'Emily Watson',
    username: 'emilywatson',
    email: 'emily@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    isOnline: false,
    lastSeen: '1d ago',
    password: 'emily123',
  },
  {
    id: '5',
    name: 'Marcus Johnson',
    username: 'marcusj',
    email: 'marcus@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    isVerified: true,
    isOnline: true,
    password: 'marcus123',
  },
  {
    id: '6',
    name: 'Design Weekly',
    username: 'designweekly',
    email: 'design@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=100&h=100&fit=crop',
    isVerified: true,
    isOnline: false,
    lastSeen: '30m ago',
    password: 'design123',
  },
];

export const mockConversations: Conversation[] = [
  {
    id: 'c1',
    participants: [mockUsers[0]],
    isGroup: false,
    lastMessage: {
      id: 'm1',
      senderId: '1',
      content: 'Hey! Did you see the new design updates? 🎨',
      timestamp: '2m',
      type: 'text',
      isRead: false,
    },
    unreadCount: 2,
    isPinned: true,
  },
  {
    id: 'c2',
    participants: [mockUsers[1]],
    isGroup: false,
    lastMessage: {
      id: 'm2',
      senderId: 'current',
      content: 'Sure, let me check and get back to you',
      timestamp: '15m',
      type: 'text',
      isRead: true,
    },
    unreadCount: 0,
    isMuted: true,
  },
  {
    id: 'c3',
    participants: [mockUsers[2]],
    isGroup: false,
    lastMessage: {
      id: 'm3',
      senderId: '3',
      content: 'Sent an attachment',
      timestamp: '1h',
      type: 'text',
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: 'c4',
    participants: [mockUsers[0], mockUsers[1], mockUsers[4]],
    isGroup: true,
    groupName: 'Project Team',
    lastMessage: {
      id: 'm4',
      senderId: '1',
      content: 'Meeting at 3pm today 📅',
      timestamp: '2h',
      type: 'text',
      isRead: false,
    },
    unreadCount: 5,
  },
  {
    id: 'c5',
    participants: [mockUsers[3]],
    isGroup: false,
    lastMessage: {
      id: 'm5',
      senderId: '4',
      content: 'Thanks for sharing! That was really helpful 🙏',
      timestamp: '1d',
      type: 'text',
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: 'c6',
    participants: [mockUsers[5]],
    isGroup: false,
    lastMessage: {
      id: 'm6',
      senderId: 'current',
      content: 'I\'ll send over the files tomorrow',
      timestamp: '2d',
      type: 'text',
      isRead: true,
    },
    unreadCount: 0,
  },
];

export const mockMessages: Record<string, Message[]> = {
  c1: [
    { id: '1', senderId: '1', content: 'Hey! How are you doing?', timestamp: '10:30 AM', type: 'text' },
    { id: '2', senderId: 'current', content: 'I\'m good! Working on the new project 💻', timestamp: '10:32 AM', type: 'text' },
    { id: '3', senderId: '1', content: 'Nice! Can\'t wait to see it', timestamp: '10:33 AM', type: 'text' },
    { id: '4', senderId: '1', content: 'Did you see the new design updates? 🎨', timestamp: '10:35 AM', type: 'text' },
  ],
  c2: [
    { id: '1', senderId: '2', content: 'Can you review the PR?', timestamp: 'Yesterday', type: 'text' },
    { id: '2', senderId: 'current', content: 'Sure, let me check and get back to you', timestamp: 'Yesterday', type: 'text' },
  ],
  c3: [
    { id: '1', senderId: '3', content: 'Check out this article on AI trends', timestamp: '2h ago', type: 'text' },
    { id: '2', senderId: '3', content: 'Sent an attachment', timestamp: '1h ago', type: 'text' },
  ],
  c4: [
    { id: '1', senderId: '1', content: 'Team, we need to discuss the roadmap', timestamp: '3h ago', type: 'text' },
    { id: '2', senderId: '5', content: 'I\'m available after 2pm', timestamp: '2h ago', type: 'text' },
    { id: '3', senderId: '1', content: 'Meeting at 3pm today 📅', timestamp: '2h ago', type: 'text' },
  ],
};

/**
 * Find user by email and password for demo sign-in
 * @param email Email address (from form)
 * @param password Password
 * @returns User object if found, else undefined
 */
export function findUserByEmailAndPassword(email: string, password: string) {
  return mockUsers.find(
    (u) => u && u.email === email && u.password === password
  );
}

/**
 * Find user by username and password for demo sign-in
 * @param username Username (from email field in form)
 * @param password Password
 * @returns User object if found, else undefined
 */
export function findUserByUsernameAndPassword(username: string, password: string) {
  return mockUsers.find(
    (u) => u && u.username === username && u.password === password
  );
}