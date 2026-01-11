import React from 'react';
import { FeedCard } from '@components/organisms/FeedCard';
import { RightSidebar } from '@components/organisms/RightSidebar';
import { ComposeBox } from '@components/organisms/ComposeBox';
import { StoriesBar } from '@components/organisms/StoriesBar';
import type { Story } from '@components/organisms/StoriesBar';

// Mock signal capsules data
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
    console.log('View signal:', story.username);
  };

  return (
    <div className="relative max-w-7xl mx-auto px-2 sm:px-4 pb-12 space-y-6">
      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-cyan-500/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_45%),radial-gradient(circle_at_78%_0%,rgba(245,158,11,0.16),transparent_38%)]" />
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">Aptoodate / Signal Desk</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">Broadcast signals, not stories</h1>
            <p className="text-cyan-50/80 max-w-2xl">Swap endless scroll for signals, capsules, and editorial drops. Drop a note, pin a moment, broadcast an idea.</p>
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-cyan-100">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live desk
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 xl:col-span-8 space-y-5">
          {/* Signal Capsules */}
          <StoriesBar 
            stories={mockStories}
            onStoryClick={handleStoryClick}
            onAddStory={() => console.log('Add signal')}
          />

          {/* Composer */}
          <ComposeBox
            currentUser={{
              name: 'Aryan Kashyap',
              avatarUrl: undefined,
            }}
            onPost={handlePost}
          />

          {/* Feed stack */}
          <div className="space-y-4">
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

        {/* Right column */}
        <div className="col-span-12 xl:col-span-4">
          <RightSidebar
            currentUser={{
              name: 'Aryan Kashyap',
              username: 'aryankashyap2939',
            }}
            suggestions={mockSuggestions}
            trending={mockTrending}
          />
        </div>
      </div>
    </div>
  );
};

HomePage.displayName = 'HomePage';
