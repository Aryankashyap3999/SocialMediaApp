// User types
export interface User {
    _id: string;
    email: string;
    username: string;
    bio?: string;
    avatarUrl?: string;
    isVerified?: boolean;
    createdAt: string;
    updatedAt: string;
}

// Post types
export interface Post {
    _id: string;
    content: string;
    imageUrl?: string;
    author: User;
    likesCount: number;
    commentsCount: number;
    isLiked: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface FeedResponse {
    posts: Post[];
    total: number;
    limit: number;
    skip: number;
}

// Comment types
export interface Comment {
    _id: string;
    content: string;
    author: User;
    post: string;
    parentComment?: string;
    repliesCount: number;
    createdAt: string;
    updatedAt: string;
}

// Like types
export interface Like {
    _id: string;
    user: User;
    post: string;
    createdAt: string;
}

// Follow types
export interface Follow {
    _id: string;
    follower: User;
    following: User;
    createdAt: string;
}

export interface FollowStats {
    followersCount: number;
    followingCount: number;
}

// Story types
export interface Story {
    _id: string;
    mediaUrl: string;
    mediaType: 'image' | 'video';
    author: User;
    viewsCount: number;
    expiresAt: string;
    createdAt: string;
}

// Message types
export interface Message {
    _id: string;
    content: string;
    sender: User;
    conversation: string;
    isRead: boolean;
    createdAt: string;
}

export interface Conversation {
    _id: string;
    participants: User[];
    lastMessage?: Message;
    unreadCount: number;
    createdAt: string;
    updatedAt: string;
}

// Notification types
export interface Notification {
    _id: string;
    type: 'like' | 'comment' | 'follow' | 'mention';
    sender: User;
    recipient: string;
    post?: string;
    comment?: string;
    isRead: boolean;
    createdAt: string;
}

// API Error type
export interface ApiError {
    message: string;
    status?: number;
}
