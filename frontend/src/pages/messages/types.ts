/**
 * Messages Feature Types
 * 
 * Centralized type definitions for the messages feature
 */

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatarUrl: string;
  isVerified?: boolean;
  isOnline?: boolean;
  lastSeen?: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'audio' | 'file';
  mediaUrl?: string;
  isRead?: boolean;
  reactions?: string[];
}

export interface Conversation {
  id: string;
  participants: User[];
  isGroup: boolean;
  groupName?: string;
  groupAvatar?: string;
  lastMessage?: Message;
  unreadCount: number;
  isMuted?: boolean;
  isPinned?: boolean;
  typing?: string[]; // Array of user IDs currently typing
}

export interface MessageRequest {
  id: string;
  from: User;
  message: string;
  timestamp: string;
}
