import React, { useState } from 'react';
import { ProfileHeader } from './ProfileHeader';
import { ProfileTabs, type ProfileTab } from './ProfileTabs';
import { ProfilePostGrid, type MediaItem } from './ProfilePostGrid';
import { EditProfileModal, type ProfileData } from './EditProfileModal';
import { FeedCard } from '@components/organisms/FeedCard';
import { Icon } from '@components/atoms/Icon';

// Mock user data
const mockUser = {
  id: '1',
  name: 'Sarah Johnson',
  username: 'sarahjohnson',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  coverUrl: 'https://images.unsplash.com/photo-1488330890490-c291ecf62571?w=1200&h=400&fit=crop',
  bio: '✨ Travel enthusiast | 📸 Photography lover | 🌍 Exploring the world one city at a time. Always seeking new adventures and authentic experiences.',
  location: 'San Francisco, CA',
  website: 'https://sarahtravels.com',
  joinDate: 'March 2021',
  isVerified: true,
  followersCount: 12453,
  followingCount: 892,
  postsCount: 234,
};

// Mock posts data
const mockPosts = [
  {
    id: '1',
    author: {
      name: mockUser.name,
      username: mockUser.username,
      avatarUrl: mockUser.avatarUrl,
      isVerified: mockUser.isVerified,
    },
    content: "Just finished an incredible journey through Southeast Asia! The cultures, food, and people I met along the way were absolutely amazing. Can't wait to share more stories and tips with you all. 🌏✈️",
    language: 'English',
    likesCount: 342,
    commentsCount: 58,
    sharesCount: 28,
    timestamp: '2h',
  },
  {
    id: '2',
    author: {
      name: mockUser.name,
      username: mockUser.username,
      avatarUrl: mockUser.avatarUrl,
      isVerified: mockUser.isVerified,
    },
    content: 'Sunset views from Santorini never disappoint. This place is pure magic! 🌅',
    language: 'English',
    media: {
      type: 'image' as const,
      url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop',
    },
    likesCount: 892,
    commentsCount: 124,
    sharesCount: 67,
    timestamp: '1d',
  },
  {
    id: '3',
    author: {
      name: mockUser.name,
      username: mockUser.username,
      avatarUrl: mockUser.avatarUrl,
      isVerified: mockUser.isVerified,
    },
    content: 'Morning coffee with a view. There\'s something magical about starting your day in a new city. What\'s your favorite morning ritual when traveling? ☕️',
    language: 'English',
    media: {
      type: 'image' as const,
      url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop',
    },
    likesCount: 567,
    commentsCount: 89,
    sharesCount: 34,
    timestamp: '3d',
  },
];

// Mock media items
const mockMedia: MediaItem[] = [
  {
    id: '1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=400&fit=crop',
    likesCount: 892,
    commentsCount: 124,
  },
  {
    id: '2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
    likesCount: 567,
    commentsCount: 89,
  },
  {
    id: '3',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=400&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=400&fit=crop',
    likesCount: 1234,
    commentsCount: 156,
    duration: '0:45',
  },
  {
    id: '4',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=400&fit=crop',
    likesCount: 445,
    commentsCount: 67,
  },
  {
    id: '5',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=400&fit=crop',
    likesCount: 789,
    commentsCount: 98,
  },
  {
    id: '6',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop',
    likesCount: 654,
    commentsCount: 78,
  },
  {
    id: '7',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1682686581580-d99b0230064e?w=400&h=400&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1682686581580-d99b0230064e?w=400&h=400&fit=crop',
    likesCount: 2341,
    commentsCount: 234,
    duration: '1:23',
  },
  {
    id: '8',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop',
    likesCount: 543,
    commentsCount: 65,
  },
  {
    id: '9',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=400&fit=crop',
    likesCount: 876,
    commentsCount: 112,
  },
];

// Mock liked posts
const mockLikedPosts = [
  {
    id: 'liked-1',
    author: {
      name: 'Marco Chen',
      username: 'marcochen',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      isVerified: true,
    },
    content: 'The beauty of minimalist design is in its ability to communicate more with less. Every element should serve a purpose. 🎨',
    language: 'English',
    likesCount: 456,
    commentsCount: 34,
    sharesCount: 12,
    timestamp: '5h',
    isLiked: true,
  },
  {
    id: 'liked-2',
    author: {
      name: 'Emma Rodriguez',
      username: 'emmarodriguez',
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      isVerified: false,
    },
    content: 'Just discovered an amazing hidden gem in Barcelona. Sometimes the best experiences come from getting lost! 🇪🇸',
    language: 'Spanish',
    media: {
      type: 'image' as const,
      url: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=600&fit=crop',
    },
    likesCount: 789,
    commentsCount: 67,
    sharesCount: 45,
    timestamp: '1d',
    isLiked: true,
  },
];

export interface ProfilePageProps {
  userId?: string;
}

/**
 * ProfilePage Component
 * 
 * Main profile page displaying user information, posts, media, and likes
 */
export const ProfilePage: React.FC<ProfilePageProps> = ({ userId }) => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('posts');
  const [isFollowing, setIsFollowing] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Determine if viewing own profile (for demo, always true)
  const isOwnProfile = !userId || userId === mockUser.id;

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = async (data: ProfileData) => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Saving profile:', data);
    setIsSaving(false);
    setIsEditModalOpen(false);
  };

  const handleMessageClick = () => {
    console.log('Opening messages...');
  };

  const handleMoreClick = () => {
    console.log('Opening more options...');
  };

  const renderEmptyState = (type: string) => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
        <Icon 
          name={type === 'posts' ? 'home' : type === 'replies' ? 'comment' : 'heart'} 
          size={32} 
          className="text-cyan-400 dark:text-cyan-500" 
        />
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
        {type === 'posts' && 'No posts yet'}
        {type === 'replies' && 'No replies yet'}
        {type === 'likes' && 'No likes yet'}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-center max-w-sm">
        {type === 'posts' && (isOwnProfile 
          ? "When you post something, it will show up here." 
          : "This user hasn't posted anything yet."
        )}
        {type === 'replies' && (isOwnProfile 
          ? "When you reply to posts, they will show up here." 
          : "This user hasn't replied to any posts yet."
        )}
        {type === 'likes' && (isOwnProfile 
          ? "Posts you like will appear here." 
          : "This user hasn't liked any posts yet."
        )}
      </p>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return mockPosts.length > 0 ? (
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {mockPosts.map((post) => (
              <FeedCard
                key={post.id}
                {...post}
              />
            ))}
          </div>
        ) : renderEmptyState('posts');

      case 'replies':
        return renderEmptyState('replies');

      case 'media':
        return (
          <ProfilePostGrid
            items={mockMedia}
            onItemClick={(item) => console.log('Clicked:', item)}
          />
        );

      case 'likes':
        return mockLikedPosts.length > 0 ? (
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {mockLikedPosts.map((post) => (
              <FeedCard
                key={post.id}
                {...post}
              />
            ))}
          </div>
        ) : renderEmptyState('likes');

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Back button for mobile */}
      <div className="sticky top-0 z-20 flex items-center gap-4 px-4 py-3 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 lg:hidden">
        <button
          onClick={() => window.history.back()}
          className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
        >
          <svg className="w-5 h-5 text-slate-700 dark:text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="font-bold text-lg text-slate-900 dark:text-slate-100">{mockUser.name}</h1>
          <p className="text-xs text-slate-500">{mockUser.postsCount} posts</p>
        </div>
      </div>

      {/* Profile Header */}
      <ProfileHeader
        user={mockUser}
        isOwnProfile={isOwnProfile}
        isFollowing={isFollowing}
        onFollowClick={handleFollowClick}
        onEditClick={handleEditClick}
        onMessageClick={handleMessageClick}
        onMoreClick={handleMoreClick}
      />

      {/* Profile Tabs */}
      <ProfileTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={{
          posts: mockPosts.length,
          replies: 0,
          media: mockMedia.length,
          likes: mockLikedPosts.length,
        }}
      />

      {/* Tab Content */}
      <div className="pb-20">
        {renderContent()}
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
        initialData={{
          name: mockUser.name,
          bio: mockUser.bio || '',
          location: mockUser.location || '',
          website: mockUser.website || '',
          avatarUrl: mockUser.avatarUrl,
          coverUrl: mockUser.coverUrl,
        }}
        isLoading={isSaving}
      />
    </div>
  );
};

ProfilePage.displayName = 'ProfilePage';
