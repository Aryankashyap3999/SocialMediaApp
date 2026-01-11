import React from 'react';
import { Avatar } from '@components/atoms/Avatar';
import { Icon } from '@components/atoms/Icon';
import { SectionHeader } from '@components/atoms/SectionHeader';

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
  const parseCount = (value: string) => {
    const upper = value.toUpperCase();
    if (upper.endsWith('M')) return parseFloat(upper) * 1_000_000;
    if (upper.endsWith('K')) return parseFloat(upper) * 1_000;
    const numeric = parseFloat(upper.replace(/[^0-9.]/g, ''));
    return Number.isFinite(numeric) ? numeric : 0;
  };

  const normalizedCounts = trending.map((t) => parseCount(t.postsCount));
  const maxCount = normalizedCounts.length ? Math.max(...normalizedCounts) : 1;

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
            <SectionHeader 
              title="Signal Heatmap" 
              bright 
              className="mb-4"
              action={
                <div className="flex items-center gap-1 text-xs text-cyan-300 font-medium">
                  <span className="w-2 h-2 bg-amber-300 rounded-full animate-pulse" />
                  Live
                </div>
              }
            />

            <div className="grid grid-cols-1 gap-3">
              {trending.map((topic, index) => {
                const heat = normalizedCounts[index] || 0;
                const heatPercent = Math.min(100, Math.max(18, Math.round((heat / maxCount) * 100)));
                const palette = index % 2 === 0
                  ? 'from-cyan-500/20 via-emerald-400/10 to-amber-300/20'
                  : 'from-amber-400/25 via-cyan-400/10 to-emerald-300/15';

                return (
                  <div
                    key={topic.id}
                    className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-4 shadow-lg shadow-black/20 group hover:border-cyan-400/30 transition"
                  >
                    <div className={`absolute inset-0 opacity-70 bg-linear-to-br ${palette}`} />
                    <div className="relative flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-lg font-black text-white/80">
                          {index + 1}
                        </div>
                        <div className="min-w-0 space-y-1">
                          <div className="flex items-center gap-2 text-xs text-cyan-100/80">
                            <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/10 uppercase tracking-wide">{topic.category}</span>
                            <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-amber-200">Heat {heatPercent}%</span>
                          </div>
                          <p className="font-bold text-white truncate text-base">{topic.title}</p>
                          <div className="text-xs text-slate-200/80 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-300" />
                            <span>{topic.postsCount} posts</span>
                          </div>
                        </div>
                      </div>
                      <button className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10 transition">
                        <Icon name="dotsVertical" size={16} />
                      </button>
                    </div>
                    <div className="relative mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-cyan-400 via-emerald-400 to-amber-300"
                        style={{ width: `${heatPercent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Lower signal</span>
                <span>Hotter signal</span>
              </div>
              <div className="h-2 rounded-full bg-linear-to-r from-slate-700 via-cyan-400 to-amber-300 border border-white/10 shadow-inner shadow-black/30" />
              <p className="text-[11px] text-slate-400">Heat is normalized per panel and recalculates live.</p>
            </div>

            <button className="w-full mt-3 py-2.5 text-sm font-semibold text-slate-950 bg-linear-to-r from-cyan-500 to-amber-400 hover:from-cyan-400 hover:to-amber-300 rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/20">
              See full heatmap
            </button>
          </div>
        </div>
      )}

      {/* Who to Follow with unique stacked cards */}
      {suggestions.length > 0 && (
        <div className="relative overflow-hidden rounded-3xl mb-4">
          <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-900 to-slate-900" />
          
          <div className="relative p-5">
            <SectionHeader title="Suggested for you" bright className="mb-4" />
            
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
