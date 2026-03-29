import React from 'react';
import { Avatar } from '@components/atoms/Avatar';
import { Icon } from '@components/atoms/Icon';
import { SectionHeader } from '@components/atoms/SectionHeader';
import { CricketWidget } from './CricketWidget';
import { BharatPulse } from './BharatPulse';

export interface TrendingTopic {
  id: string;
  category: string;
  title: string;
  postsCount: string;
  heat?: number; // Optional explicit heat percentage (0-100)
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
  // Calculate heat percentages - use explicit heat if provided, otherwise calculate from posts
  const parseCount = (value: string) => {
    const upper = value.toUpperCase();
    if (upper.endsWith('M')) return parseFloat(upper) * 1_000_000;
    if (upper.endsWith('K')) return parseFloat(upper) * 1_000;
    const numeric = parseFloat(upper.replace(/[^0-9.]/g, ''));
    return Number.isFinite(numeric) ? numeric : 0;
  };

  const normalizedCounts = trending.map((t) => t.heat ?? parseCount(t.postsCount));
  const maxCount = normalizedCounts.length ? Math.max(...normalizedCounts.filter(c => c > 0), 1) : 1;

  return (
    <aside className="w-87.5 hidden xl:block pl-6">
      {/* Search Bar with unique floating design */}
      <div className="sticky top-0 pt-3 pb-3 bg-[#0e0805]/90 backdrop-blur-xl z-10">
        <div className="relative group">
          <div className="absolute inset-0 bg-linear-to-r from-orange-500/15 to-amber-400/15 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <Icon
              name="search"
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-400 transition-colors"
            />
            <input
              type="text"
              placeholder="Search Aptoodate"
              className="w-full bg-orange-500/5 backdrop-blur-sm border-2 border-orange-500/10 rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-orange-400/50 focus:bg-orange-500/8 transition-all duration-300 placeholder:text-gray-500"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden group-focus-within:flex items-center gap-1">
              <kbd className="px-2 py-0.5 text-[10px] font-medium bg-gray-200 dark:bg-gray-700 rounded text-gray-500">⌘</kbd>
              <kbd className="px-2 py-0.5 text-[10px] font-medium bg-gray-200 dark:bg-gray-700 rounded text-gray-500">K</kbd>
            </div>
          </div>
        </div>
      </div>

      {/* Signal Heatmap - Trending Section */}
      {trending.length > 0 && (
        <div className="relative overflow-hidden rounded-3xl mb-4 group/card">
          {/* Warm dark gradient background */}
          <div className="absolute inset-0 bg-linear-to-br from-[#1a0d05] via-[#130a04] to-[#0e0805]" />
          <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-amber-400 via-orange-400 to-amber-400" />
          
          <div className="relative p-5">
            <SectionHeader 
              title="Signal Heatmap" 
              bright 
              className="mb-4"
              action={
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  Live
                </div>
              }
            />

            <div className="grid grid-cols-1 gap-3">
              {trending.map((topic, index) => {
                // Use explicit heat value if provided, otherwise calculate from normalized counts
                const heatPercent = topic.heat !== undefined 
                  ? topic.heat 
                  : Math.min(100, Math.max(18, Math.round((normalizedCounts[index] / maxCount) * 100)));
                
                // Determine heat color based on percentage
                const getHeatColor = (percent: number) => {
                  if (percent >= 70) return 'text-amber-400 bg-amber-400/20';
                  if (percent >= 40) return 'text-orange-400 bg-orange-400/20';
                  return 'text-emerald-400 bg-emerald-400/20';
                };

                const getDotColor = (percent: number) => {
                  if (percent >= 70) return 'bg-amber-400';
                  if (percent >= 40) return 'bg-orange-400';
                  return 'bg-emerald-400';
                };

                return (
                  <div
                    key={topic.id}
                    className="relative overflow-hidden rounded-2xl border border-orange-500/8 bg-[#130a04] p-4 shadow-lg shadow-black/30 group hover:border-orange-400/30 transition-all duration-200"
                  >
                    <div className="flex items-start gap-3">
                      {/* Rank number */}
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/15 flex items-center justify-center text-lg font-bold text-orange-300/60 shrink-0">
                        {index + 1}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0 space-y-2">
                        {/* Category & Heat badges */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/15 text-[10px] uppercase tracking-wider font-semibold text-orange-200">
                            {topic.category}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${getHeatColor(heatPercent)}`}>
                              Heat {heatPercent}%
                            </span>
                            <button className="p-1.5 rounded-lg bg-orange-500/5 border border-orange-500/10 text-slate-400 hover:text-white hover:bg-orange-500/15 transition">
                              <Icon name="dotsVertical" size={14} />
                            </button>
                          </div>
                        </div>
                        
                        {/* Title */}
                        <p className="font-bold text-white text-base leading-tight">{topic.title}</p>
                        
                        {/* Post count with dot */}
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span className={`w-2 h-2 rounded-full ${getDotColor(heatPercent)}`} />
                          <span>{topic.postsCount} posts</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Heat gradient legend */}
            <div className="mt-5 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>Lower signal</span>
                <span>Hotter signal</span>
              </div>
              <div className="h-2 rounded-full bg-linear-to-r from-emerald-600 via-amber-500 to-orange-500 border border-white/10 shadow-inner" />
              <p className="text-[10px] text-slate-500 text-center">Heat is normalized per panel and recalculates live.</p>
            </div>

            <button className="w-full mt-4 py-3 text-sm font-bold text-white bg-linear-to-r from-orange-500 via-amber-500 to-rose-500 hover:from-orange-400 hover:via-amber-400 hover:to-rose-400 rounded-xl transition-all duration-200 shadow-lg shadow-orange-500/25" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
              See full heatmap
            </button>
          </div>
        </div>
      )}

      {/* Bharat Pulse — city-wise Indian trending */}
      <BharatPulse />

      {/* Cricket live widget */}
      <CricketWidget />

      {/* Who to Follow with unique stacked cards */}
      {suggestions.length > 0 && (
        <div className="relative overflow-hidden rounded-3xl mb-4">
          <div className="absolute inset-0 bg-linear-to-br from-[#1a0d05] via-[#130a04] to-[#0e0805]" />
          
          <div className="relative p-5">
            <SectionHeader title="Tune In to Frequencies" bright className="mb-4" />
            
            <div className="space-y-3">
              {suggestions.map((user) => (
                <div key={user.id} className="group relative p-3 rounded-2xl hover:bg-white/5 transition-all duration-200">
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-linear-to-r from-orange-400/0 via-orange-400/10 to-amber-300/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Unique avatar with gradient ring */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-linear-to-br from-orange-500 to-rose-500 rounded-full blur-sm opacity-0 group-hover:opacity-50 transition-opacity" />
                        <div className="relative p-0.5 bg-linear-to-br from-orange-500 to-rose-500 rounded-full">
                          <div className="p-0.5 bg-[#0e0805] rounded-full">
                            <Avatar
                              src={user.avatarUrl}
                              alt={user.name}
                              size="md"
                            />
                          </div>
                        </div>
                        {user.isVerified && (
                          <div className="absolute -bottom-0.5 -right-0.5 bg-[#0e0805] rounded-full p-0.5">
                            <Icon name="verified" size={14} className="text-orange-300" />
                          </div>
                        )}
                      </div>
                      
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="font-semibold text-sm truncate max-w-30 text-white group-hover:text-orange-200 transition-colors">
                            {user.name}
                          </p>
                        </div>
                        <p className="text-sm text-orange-300/60 truncate max-w-35">
                          @{user.username}
                        </p>
                        {user.mutualFollowers && (
                          <p className="text-xs text-slate-500 mt-0.5">
                            {user.mutualFollowers}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <button className="px-4 py-1.5 bg-linear-to-r from-amber-700 to-orange-700 hover:from-amber-600 hover:to-orange-600 text-amber-100 text-xs font-bold rounded-full transition-all duration-200 hover:shadow-md hover:shadow-amber-950/30 active:scale-95">
                      Tune In
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-3 py-2.5 text-xs font-bold text-amber-100 bg-linear-to-r from-amber-700 to-orange-700 hover:from-amber-600 hover:to-orange-600 rounded-xl transition-all duration-200 shadow-sm shadow-amber-950/30" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
              Browse all Frequencies →
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

RightSidebar.displayName = 'RightSidebar';
