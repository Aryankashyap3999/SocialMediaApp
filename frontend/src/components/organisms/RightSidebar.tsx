import React from 'react';
import { Avatar } from '@components/atoms/Avatar';
import { Icon } from '@components/atoms/Icon';

export interface TrendingTopic {
  id: string;
  category: string;
  title: string;
  postsCount: string;
}

export interface RightSidebarProps {
  currentUser?: {
    name: string;
    username: string;
    avatarUrl?: string;
  };
  suggestions?: Array<{
    id: string;
    name: string;
    username: string;
    avatarUrl?: string;
    isVerified?: boolean;
    mutualFollowers?: string;
  }>;
  trending?: TrendingTopic[];
}

/**
 * RightSidebar Organism
 * Unique right panel with glassmorphism, gradient accents, and floating elements
 */
export const RightSidebar: React.FC<RightSidebarProps> = ({
  suggestions = [],
  trending = [],
}) => {
  return (
    <aside className="w-87.5 hidden xl:block pl-6">
      {/* Search Bar with unique floating design */}
      <div className="sticky top-0 pt-3 pb-3 bg-slate-950/80 backdrop-blur-xl z-10">
        <div className="relative group">
          <div className="absolute inset-0 bg-linear-to-r from-cyan-500/15 to-amber-400/15 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <Icon 
              name="search" 
              size={18} 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-cyan-400 transition-colors" 
            />
            <input
              type="text"
              placeholder="Search Aptoodate"
              className="w-full bg-slate-900/70 backdrop-blur-sm border-2 border-transparent rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-cyan-400/50 focus:bg-slate-900/80 transition-all duration-300 placeholder:text-gray-500"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden group-focus-within:flex items-center gap-1">
              <kbd className="px-2 py-0.5 text-[10px] font-medium bg-gray-200 dark:bg-gray-700 rounded text-gray-500">⌘</kbd>
              <kbd className="px-2 py-0.5 text-[10px] font-medium bg-gray-200 dark:bg-gray-700 rounded text-gray-500">K</kbd>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Section with unique card design */}
      {trending.length > 0 && (
        <div className="relative overflow-hidden rounded-3xl mb-4 group/card">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-900 to-slate-900" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-cyan-400/12 to-transparent rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-linear-to-tr from-amber-400/12 to-transparent rounded-full blur-2xl" />
          
          <div className="relative p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-6 bg-linear-to-b from-cyan-500 to-amber-400 rounded-full" />
              <h3 className="text-lg font-bold text-white">Trending Now</h3>
              <div className="ml-auto flex items-center gap-1 text-xs text-cyan-300 font-medium">
                <span className="w-2 h-2 bg-amber-300 rounded-full animate-pulse" />
                Live
              </div>
            </div>
            
            <div className="space-y-1">
              {trending.map((topic, index) => (
                <div 
                  key={topic.id} 
                  className="group relative p-3 rounded-2xl hover:bg-white/5 cursor-pointer transition-all duration-200"
                >
                  {/* Rank number */}
                  <div className="absolute left-3 top-3 text-4xl font-black text-slate-800 group-hover:text-cyan-100 transition-colors">
                    {index + 1}
                  </div>
                  
                  <div className="flex items-start justify-between pl-10">
                    <div>
                      <p className="text-xs text-slate-400">{topic.category}</p>
                      <p className="font-bold text-white group-hover:text-cyan-200 transition-colors">
                        {topic.title}
                      </p>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <Icon name="fire" size={12} className="text-amber-400" />
                        {topic.postsCount} posts
                      </p>
                    </div>
                    <button className="p-2 hover:bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200">
                      <Icon name="dotsVertical" size={16} className="text-gray-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-3 py-2.5 text-sm font-semibold text-slate-950 bg-linear-to-r from-cyan-500 to-amber-400 hover:from-cyan-400 hover:to-amber-300 rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/20">
              Show more trends
            </button>
          </div>
        </div>
      )}

      {/* Who to Follow with unique stacked cards */}
      {suggestions.length > 0 && (
        <div className="relative overflow-hidden rounded-3xl mb-4">
          <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-900 to-slate-900" />
          
          <div className="relative p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-6 bg-linear-to-b from-cyan-500 to-amber-400 rounded-full" />
              <h3 className="text-lg font-bold text-white">Suggested for you</h3>
            </div>
            
            <div className="space-y-3">
              {suggestions.map((user) => (
                <div key={user.id} className="group relative p-3 rounded-2xl hover:bg-white/5 transition-all duration-200">
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-linear-to-r from-cyan-400/0 via-cyan-400/10 to-amber-300/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Unique avatar with gradient ring */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-linear-to-br from-cyan-500 to-amber-400 rounded-full blur-sm opacity-0 group-hover:opacity-50 transition-opacity" />
                        <div className="relative p-0.5 bg-linear-to-br from-cyan-500 to-amber-400 rounded-full">
                          <div className="p-0.5 bg-slate-900 rounded-full">
                            <Avatar
                              src={user.avatarUrl}
                              alt={user.name}
                              size="md"
                            />
                          </div>
                        </div>
                        {user.isVerified && (
                          <div className="absolute -bottom-0.5 -right-0.5 bg-slate-900 rounded-full p-0.5">
                            <Icon name="verified" size={14} className="text-cyan-300" />
                          </div>
                        )}
                      </div>
                      
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="font-semibold text-sm truncate max-w-30 text-white group-hover:text-cyan-200 transition-colors">
                            {user.name}
                          </p>
                        </div>
                        <p className="text-sm text-slate-400 truncate max-w-35">
                          @{user.username}
                        </p>
                        {user.mutualFollowers && (
                          <p className="text-xs text-slate-500 mt-0.5">
                            {user.mutualFollowers}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <button className="px-4 py-1.5 bg-linear-to-r from-cyan-500 to-amber-400 hover:from-cyan-400 hover:to-amber-300 text-slate-950 text-sm font-bold rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25 active:scale-95">
                      Follow
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-3 py-2.5 text-sm font-semibold text-slate-950 bg-linear-to-r from-cyan-500 to-amber-400 hover:from-cyan-400 hover:to-amber-300 rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/20">
              See all suggestions
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

RightSidebar.displayName = 'RightSidebar';
