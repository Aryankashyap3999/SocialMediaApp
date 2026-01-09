import React, { useState } from 'react';
import { Icon } from '@components/atoms/Icon';
import { Avatar } from '@components/atoms/Avatar';
import { FeedCard } from '@components/organisms/FeedCard';

// Mock categories
const categories = [
  { id: 'all', label: 'For You', icon: 'trending' },
  { id: 'tech', label: 'Technology', icon: 'settings' },
  { id: 'travel', label: 'Travel', icon: 'discover' },
  { id: 'sports', label: 'Sports', icon: 'trending' },
  { id: 'music', label: 'Music', icon: 'stories' },
  { id: 'art', label: 'Art & Design', icon: 'image' },
  { id: 'food', label: 'Food', icon: 'emoji' },
  { id: 'news', label: 'News', icon: 'notifications' },
];

// Mock trending topics
const trendingTopics = [
  { id: '1', tag: '#AIRevolution', posts: '125K', category: 'Technology' },
  { id: '2', tag: '#WorldCup2026', posts: '89K', category: 'Sports' },
  { id: '3', tag: '#SustainableLiving', posts: '45K', category: 'Lifestyle' },
  { id: '4', tag: '#RemoteWork', posts: '38K', category: 'Business' },
  { id: '5', tag: '#NFTArt', posts: '29K', category: 'Art' },
];

// Mock suggested users
const suggestedUsers = [
  {
    id: '1',
    name: 'Tech Insights',
    username: 'techinsights',
    avatarUrl: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=100&h=100&fit=crop',
    bio: 'Daily tech news and insights',
    isVerified: true,
    followers: '1.2M',
  },
  {
    id: '2',
    name: 'Travel Diaries',
    username: 'traveldiaries',
    avatarUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=100&h=100&fit=crop',
    bio: 'Exploring hidden gems worldwide',
    isVerified: true,
    followers: '892K',
  },
  {
    id: '3',
    name: 'Design Weekly',
    username: 'designweekly',
    avatarUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=100&h=100&fit=crop',
    bio: 'UI/UX inspiration & tutorials',
    isVerified: false,
    followers: '456K',
  },
  {
    id: '4',
    name: 'Foodie Adventures',
    username: 'foodieadv',
    avatarUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100&h=100&fit=crop',
    bio: 'Food photography & recipes',
    isVerified: true,
    followers: '678K',
  },
];

// Mock trending posts
const trendingPosts = [
  {
    id: 't1',
    author: {
      name: 'Tech Insights',
      username: 'techinsights',
      avatarUrl: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=100&h=100&fit=crop',
      isVerified: true,
    },
    content: '🚀 Breaking: AI assistants are now capable of understanding context better than ever! The latest advancements in large language models are truly remarkable. What do you think this means for the future of work? #AIRevolution #TechNews',
    language: 'English',
    media: {
      type: 'image' as const,
      url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    },
    likesCount: 4523,
    commentsCount: 342,
    sharesCount: 189,
    timestamp: '2h',
  },
  {
    id: 't2',
    author: {
      name: 'Travel Diaries',
      username: 'traveldiaries',
      avatarUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=100&h=100&fit=crop',
      isVerified: true,
    },
    content: 'Just discovered this hidden waterfall in Bali! 🌴💦 The locals call it the "Secret Garden." After a 2-hour trek through the jungle, this view made every step worth it. Save this for your next adventure!',
    language: 'English',
    media: {
      type: 'image' as const,
      url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop',
    },
    likesCount: 8234,
    commentsCount: 567,
    sharesCount: 423,
    timestamp: '4h',
  },
  {
    id: 't3',
    author: {
      name: 'Design Weekly',
      username: 'designweekly',
      avatarUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=100&h=100&fit=crop',
      isVerified: false,
    },
    content: '✨ Design tip of the day: White space is not empty space—it\'s breathing room for your content. The best designs know when to let elements breathe. Less is truly more! #DesignTips #UIUX',
    language: 'English',
    likesCount: 2156,
    commentsCount: 98,
    sharesCount: 234,
    timestamp: '6h',
  },
];

// Mock explore grid items
const exploreGridItems = [
  { id: 'e1', type: 'image', url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=400&fit=crop', likes: 12400 },
  { id: 'e2', type: 'image', url: 'https://images.unsplash.com/photo-1682686581580-d99b0230064e?w=400&h=400&fit=crop', likes: 8900 },
  { id: 'e3', type: 'video', url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=400&fit=crop', likes: 45000, duration: '0:32' },
  { id: 'e4', type: 'image', url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop', likes: 6700 },
  { id: 'e5', type: 'image', url: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=400&fit=crop', likes: 9200 },
  { id: 'e6', type: 'video', url: 'https://images.unsplash.com/photo-1574169208507-84376144848b?w=400&h=400&fit=crop', likes: 23400, duration: '1:05' },
  { id: 'e7', type: 'image', url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=400&fit=crop', likes: 15600 },
  { id: 'e8', type: 'image', url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=400&fit=crop', likes: 11200 },
  { id: 'e9', type: 'image', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop', likes: 7800 },
];

type ViewMode = 'explore' | 'trending' | 'people';

/**
 * DiscoverPage Component
 * 
 * Explore and discover trending content, topics, and users
 */
export const DiscoverPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<ViewMode>('explore');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="min-h-screen">
      {/* Sticky Header with Search */}
      <div className="sticky top-0 z-20 bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
        {/* Search Bar */}
        <div className="px-4 py-3">
          <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-[1.02]' : ''}`}>
            {/* Glow effect */}
            <div className={`absolute inset-0 bg-linear-to-r from-violet-500/20 to-indigo-500/20 rounded-2xl blur-xl transition-opacity duration-300 ${isSearchFocused ? 'opacity-100' : 'opacity-0'}`} />
            
            <div className="relative flex items-center">
              <Icon 
                name="search" 
                size={20} 
                className={`absolute left-4 transition-colors ${isSearchFocused ? 'text-violet-500' : 'text-gray-400'}`} 
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search topics, people, or posts..."
                className="w-full bg-gray-100 dark:bg-gray-900 border-2 border-transparent rounded-2xl py-3.5 pl-12 pr-4 text-base focus:outline-none focus:border-violet-500/50 focus:bg-white dark:focus:bg-gray-800 transition-all placeholder:text-gray-400"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="px-4 pb-3 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap
                  text-sm font-medium transition-all duration-200
                  ${activeCategory === category.id
                    ? 'bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }
                `}
              >
                <Icon name={category.icon} size={16} />
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex border-t border-gray-100 dark:border-gray-800">
          {(['explore', 'trending', 'people'] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`
                flex-1 py-3.5 text-sm font-medium capitalize relative transition-colors
                ${viewMode === mode 
                  ? 'text-violet-600 dark:text-violet-400' 
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }
              `}
            >
              {mode}
              {viewMode === mode && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-linear-to-r from-violet-500 to-indigo-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="pb-20">
        {/* Explore Grid View */}
        {viewMode === 'explore' && (
          <div className="grid grid-cols-3 gap-0.5">
            {exploreGridItems.map((item, index) => (
              <button
                key={item.id}
                className={`
                  relative aspect-square group overflow-hidden bg-gray-100 dark:bg-gray-800
                  ${index === 0 ? 'col-span-2 row-span-2' : ''}
                `}
              >
                <img
                  src={item.url}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Video indicator */}
                {item.type === 'video' && (
                  <>
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/70 rounded text-white text-xs font-medium">
                      {item.duration}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                        <Icon name="play" size={24} className="text-white ml-1" />
                      </div>
                    </div>
                  </>
                )}
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex items-center gap-1.5 text-white">
                    <Icon name="heart" size={20} filled />
                    <span className="font-semibold">{formatNumber(item.likes)}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Trending View */}
        {viewMode === 'trending' && (
          <div>
            {/* Trending Topics Section */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-linear-to-b from-violet-600 to-indigo-600 rounded-full" />
                Trending Topics
              </h2>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <button
                    key={topic.id}
                    className="w-full flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors group"
                  >
                    <span className="text-2xl font-bold text-gray-200 dark:text-gray-700 group-hover:text-violet-200 dark:group-hover:text-violet-900/50 transition-colors">
                      {index + 1}
                    </span>
                    <div className="flex-1 text-left">
                      <p className="text-xs text-gray-500 dark:text-gray-400">{topic.category}</p>
                      <p className="font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                        {topic.tag}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <Icon name="trending" size={12} className="text-orange-500" />
                        {topic.posts} posts
                      </p>
                    </div>
                    <Icon name="dotsVertical" size={18} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Posts */}
            <div>
              <h2 className="text-lg font-bold p-4 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-linear-to-b from-pink-500 to-violet-600 rounded-full" />
                Trending Posts
              </h2>
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {trendingPosts.map((post) => (
                  <FeedCard key={post.id} {...post} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* People View */}
        {viewMode === 'people' && (
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-linear-to-b from-violet-600 to-indigo-600 rounded-full" />
              Suggested for You
            </h2>
            <div className="space-y-3">
              {suggestedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors group"
                >
                  {/* Avatar with gradient ring */}
                  <div className="relative shrink-0">
                    <div className="p-0.5 bg-linear-to-br from-violet-500 to-pink-500 rounded-full">
                      <div className="p-0.5 bg-white dark:bg-gray-900 rounded-full">
                        <Avatar
                          src={user.avatarUrl}
                          alt={user.name}
                          size="lg"
                        />
                      </div>
                    </div>
                    {user.isVerified && (
                      <div className="absolute -bottom-0.5 -right-0.5 bg-white dark:bg-gray-900 rounded-full p-0.5">
                        <Icon name="verified" size={16} />
                      </div>
                    )}
                  </div>
                  
                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-gray-900 dark:text-white truncate">
                        {user.name}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-1">{user.bio}</p>
                    <p className="text-xs text-gray-500 mt-1">{user.followers} followers</p>
                  </div>
                  
                  {/* Follow Button */}
                  <button className="px-5 py-2 bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white text-sm font-bold rounded-full transition-all hover:shadow-lg hover:shadow-violet-500/25 active:scale-95">
                    Follow
                  </button>
                </div>
              ))}
            </div>

            {/* More Suggestions */}
            <div className="mt-8">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-linear-to-b from-pink-500 to-orange-500 rounded-full" />
                Popular Creators
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {suggestedUsers.slice(0, 4).map((user) => (
                  <div
                    key={`popular-${user.id}`}
                    className="relative p-4 rounded-2xl bg-linear-to-br from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/30 border border-violet-100 dark:border-violet-900/30 group hover:shadow-lg hover:shadow-violet-500/10 transition-all"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="p-0.5 bg-linear-to-br from-violet-500 to-pink-500 rounded-full mb-3">
                        <div className="p-0.5 bg-white dark:bg-gray-900 rounded-full">
                          <Avatar
                            src={user.avatarUrl}
                            alt={user.name}
                            size="xl"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mb-0.5">
                        <span className="font-bold text-sm truncate max-w-30">{user.name}</span>
                        {user.isVerified && <Icon name="verified" size={14} />}
                      </div>
                      <p className="text-xs text-gray-500 mb-3">@{user.username}</p>
                      <button className="w-full py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                        Follow
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

DiscoverPage.displayName = 'DiscoverPage';
