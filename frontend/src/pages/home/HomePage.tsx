import React from 'react';
import { FeedCard } from '@components/organisms/FeedCard';
import { RightSidebar } from '@components/organisms/RightSidebar';
import { ComposeBox } from '@components/organisms/ComposeBox';
import { StoriesBar } from '@components/organisms/StoriesBar';
import type { Story } from '@components/organisms/StoriesBar';

// Mock stories data
const mockStories = [
  {
    id: '0',
    username: 'Your story',
    avatarUrl: undefined,
    isYou: true,
  },
  {
    id: '1',
    username: 'sarah_travels',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    hasUnwatched: true,
  },
  {
    id: '2',
    username: 'marco.chen',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    hasUnwatched: true,
    isLive: true,
  },
  {
    id: '3',
    username: 'emma_rod',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    hasUnwatched: true,
  },
  {
    id: '4',
    username: 'alex.t',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    hasUnwatched: false,
  },
  {
    id: '5',
    username: 'lucia_m',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    hasUnwatched: true,
  },
  {
    id: '6',
    username: 'travel_diary',
    avatarUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop',
    hasUnwatched: false,
  },
  {
    id: '7',
    username: 'foodie_life',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    hasUnwatched: true,
  },
];

// Mock data for posts
const mockPosts = [
  {
    id: '1',
    author: {
      name: 'Sarah Johnson',
      username: 'sarahjohnson',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      isVerified: false,
    },
    content: "Just finished an incredible journey through Southeast Asia! The cultures, food, and people I met along the way were absolutely amazing. Can't wait to share more stories and tips with you all. What's your dream travel destination?",
    language: 'English',
    likesCount: 124,
    commentsCount: 23,
    sharesCount: 12,
    timestamp: '2h',
  },
  {
    id: '2',
    author: {
      name: 'Marco Chen',
      username: 'marcochen',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      isVerified: false,
    },
    content: 'Sunset views from Santorini never disappoint. This place is pure magic!',
    language: 'Spanish',
    media: {
      type: 'image' as const,
      url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop',
    },
    likesCount: 342,
    commentsCount: 58,
    sharesCount: 28,
    timestamp: '4h',
  },
  {
    id: '3',
    author: {
      name: 'Emma Rodriguez',
      username: 'emmarodriguez',
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      isVerified: true,
    },
    content: 'Quick tour of the Louvre Museum! So much history in one place.',
    language: 'French',
    media: {
      type: 'video' as const,
      url: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=600&fit=crop',
      duration: '0:45',
    },
    likesCount: 267,
    commentsCount: 41,
    sharesCount: 18,
    timestamp: '5h',
  },
  {
    id: '4',
    author: {
      name: 'Alex Thompson',
      username: 'alexthompson',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      isVerified: false,
    },
    content: "Pro tip for digital nomads: Always research the local coworking spaces before you arrive. It makes such a difference in productivity and meeting like-minded people. Currently working from Bali and loving the community here! 🌴💻",
    language: 'English',
    likesCount: 89,
    commentsCount: 15,
    sharesCount: 7,
    timestamp: '7h',
  },
  {
    id: '5',
    author: {
      name: 'Lucia Martinez',
      username: 'luciamartinez',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
      isVerified: false,
    },
    content: 'Morning coffee with this view in Barcelona. Life is good! ☕️✨',
    language: 'Spanish',
    media: {
      type: 'image' as const,
      url: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=600&fit=crop',
    },
    likesCount: 198,
    commentsCount: 32,
    sharesCount: 14,
    timestamp: '9h',
  },
];

// Mock suggestions data
const mockSuggestions = [
  {
    id: '1',
    name: 'Keshav Kumar',
    username: 'keshav_k',
  },
  {
    id: '2',
    name: 'Sundar Pichai',
    username: 'sundarpichai',
    isVerified: true,
  },
  {
    id: '3',
    name: 'HUMOURED MAN',
    username: 'humouredman',
  },
  {
    id: '4',
    name: 'Krishna Gupta',
    username: 'krishnagupta_1_2_3',
  },
];

// Mock trending data
const mockTrending = [
  {
    id: '1',
    category: 'Technology · Trending',
    title: '#AIRevolution',
    postsCount: '52.4K',
  },
  {
    id: '2',
    category: 'Design · Trending',
    title: 'UI/UX',
    postsCount: '18.2K',
  },
  {
    id: '3',
    category: 'Business · Trending',
    title: 'Remote Work',
    postsCount: '9.8K',
  },
  {
    id: '4',
    category: 'Entertainment · Trending',
    title: 'New Album Drop',
    postsCount: '124K',
  },
];

/**
 * HomePage
 * Main feed page with unique Aptoodate design
 */
export const HomePage: React.FC = () => {
  const handlePost = (content: string) => {
    console.log('New post:', content);
  };

  const handleStoryClick = (story: Story) => {
    console.log('View story:', story.username);
  };

  return (
    <div className="flex max-w-300 mx-auto">
      {/* Main Feed */}
      <div className="flex-1 max-w-150 border-r border-gray-100 dark:border-gray-800 min-h-screen">
        {/* Header with glassmorphism effect */}
        <div className="sticky top-0 z-10 bg-white/90 dark:bg-gray-950/90 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800">
          <div className="flex">
            <button className="flex-1 py-4 text-center font-bold hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors relative group">
              <span className="relative z-10">For you</span>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-linear-to-r from-violet-600 to-indigo-600 rounded-full" />
            </button>
            <button className="flex-1 py-4 text-center text-gray-500 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors relative group">
              <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Following</span>
            </button>
          </div>
        </div>

        {/* Stories Section */}
        <StoriesBar 
          stories={mockStories}
          onStoryClick={handleStoryClick}
          onAddStory={() => console.log('Add story')}
        />

        {/* Compose Box */}
        <ComposeBox
          currentUser={{
            name: 'Aryan Kashyap',
            avatarUrl: undefined,
          }}
          onPost={handlePost}
        />

        {/* Posts Feed */}
        <div>
          {mockPosts.map((post) => (
            <FeedCard
              key={post.id}
              id={post.id}
              author={post.author}
              content={post.content}
              language={post.language}
              media={post.media}
              likesCount={post.likesCount}
              commentsCount={post.commentsCount}
              sharesCount={post.sharesCount}
              timestamp={post.timestamp}
              onComment={() => console.log('Comment on post', post.id)}
              onShare={() => console.log('Share post', post.id)}
              onAuthorClick={() => console.log('View author profile', post.author.name)}
            />
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <RightSidebar
        currentUser={{
          name: 'Aryan Kashyap',
          username: 'aryankashyap2939',
        }}
        suggestions={mockSuggestions}
        trending={mockTrending}
      />
    </div>
  );
};

HomePage.displayName = 'HomePage';
