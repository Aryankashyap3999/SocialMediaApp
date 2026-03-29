import React, { useState } from 'react';
import type { SignalTier } from '@/store/useDropStore';
import { SIGNAL_TIERS } from '@/store/useDropStore';

export interface Story {
  id: string;
  username: string;
  avatarUrl?: string;
  hasUnwatched?: boolean;
  isLive?: boolean;
  isYou?: boolean;
  signalTier?: SignalTier; // Flash, Pulse, or Broadcast
}

export interface StoriesBarProps {
  stories: Story[];
  onStoryClick?: (story: Story) => void;
  onAddStory?: () => void;
}

// Maximum visible items in collapsed view
const MAX_VISIBLE_DESKTOP = 8;
const MAX_VISIBLE_MOBILE = 6;

/**
 * SignalBar Organism
 * Capsule-style publishing shelf with glowing gradient borders
 * Design: Hexagonal-inspired corners with animated glow effects
 */
export const StoriesBar: React.FC<StoriesBarProps> = ({
  stories,
  onStoryClick,
  onAddStory,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Filter stories to show based on expansion state
  const visibleStories = isExpanded ? stories : stories.slice(0, MAX_VISIBLE_DESKTOP);
  const hasMore = stories.length > MAX_VISIBLE_DESKTOP;
  const remainingCount = stories.length - MAX_VISIBLE_DESKTOP;

  return (
    <section className="px-0 sm:px-1">
      <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-xl p-3 sm:p-4 shadow-xl shadow-indigo-500/5">
        <div className="flex items-center justify-between mb-3 gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-orange-200/80">Signal Capsules</p>
            <h3 className="text-sm sm:text-lg font-semibold text-white truncate" style={{ fontFamily: "'Baloo 2', sans-serif" }}>People you follow are transmitting now</h3>
          </div>
          <button
            onClick={onAddStory}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full bg-linear-to-r from-orange-500 to-rose-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-orange-500/30 whitespace-nowrap shrink-0"
          >
            <span className="text-base sm:text-lg leading-none">+</span>
            <span className="hidden sm:inline">Send a signal</span>
            <span className="sm:hidden">Signal</span>
          </button>
        </div>

        {/* Mobile: Horizontal scroll, Desktop: Grid with limited rows */}
        <div className="flex overflow-x-auto gap-2 sm:gap-3 pb-2 -mx-1 px-1 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible scrollbar-hide">
          {visibleStories.slice(0, isExpanded ? stories.length : MAX_VISIBLE_MOBILE).map((story, idx) => {
            // Get the ring color based on signal tier
            const tierData = story.signalTier ? SIGNAL_TIERS[story.signalTier] : null;
            
            // Different border styles based on tier
            const getBorderStyle = () => {
              if (story.isLive) return 'ring-2 ring-cyan-400 animate-pulse';
              if (!tierData) return 'ring-1 ring-white/20';
              switch (story.signalTier) {
                case 'flash': return 'ring-2 ring-red-500 shadow-red-500/30 shadow-lg';
                case 'pulse': return 'ring-2 ring-amber-400 shadow-amber-400/20 shadow-md';
                case 'broadcast': return 'ring-2 ring-emerald-400 shadow-emerald-400/20 shadow-md';
                default: return 'ring-1 ring-white/20';
              }
            };
            
            // Background gradient based on tier for variety
            const getBgGradient = () => {
              if (story.isYou) return 'bg-linear-to-br from-orange-600/20 to-amber-600/20';
              if (!tierData) return 'bg-black/40';
              switch (story.signalTier) {
                case 'flash': return 'bg-linear-to-br from-red-900/30 to-orange-900/20';
                case 'pulse': return 'bg-linear-to-br from-amber-900/20 to-yellow-900/10';
                case 'broadcast': return 'bg-linear-to-br from-emerald-900/20 to-teal-900/10';
                default: return 'bg-black/40';
              }
            };

            // Progress bar width based on time remaining (simulated)
            const getProgressWidth = () => {
              if (!tierData) return story.hasUnwatched ? 'w-4/5' : 'w-1/2';
              // Simulate different progress based on tier
              switch (story.signalTier) {
                case 'flash': return idx % 2 === 0 ? 'w-1/3' : 'w-2/3'; // Urgent, running out
                case 'pulse': return idx % 3 === 0 ? 'w-1/2' : 'w-3/4'; // Medium time
                case 'broadcast': return 'w-5/6'; // Long duration
                default: return 'w-3/4';
              }
            };
            
            return (
              <button
                key={story.id}
                onClick={() => onStoryClick?.(story)}
                className={`relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 ${getBgGradient()} p-2 sm:p-3 text-left group shadow-lg shadow-black/20 min-w-35 sm:min-w-0 shrink-0 sm:shrink transition-all duration-300 hover:scale-[1.02] hover:border-white/20`}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-br from-cyan-400/10 via-transparent to-amber-400/10" />
                
                {/* Flash urgent indicator */}
                {story.signalTier === 'flash' && (
                  <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
                )}
                
                <div className="flex items-start gap-2 sm:gap-3 relative">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl overflow-hidden ${getBorderStyle()} shrink-0`}>
                    {story.avatarUrl ? (
                      <img src={story.avatarUrl} alt={story.username} className="w-full h-full object-cover" />
                    ) : (
                      <span className="w-full h-full flex items-center justify-center bg-linear-to-br from-cyan-500 to-amber-400 text-white font-bold text-sm sm:text-lg">
                        {story.username.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 space-y-0.5 sm:space-y-1">
                    <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                      <span className="text-xs sm:text-sm font-semibold text-white truncate max-w-20 sm:max-w-25">{story.username}</span>
                      {story.isLive && (
                        <span className="px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] font-bold uppercase rounded-full bg-linear-to-r from-cyan-500 to-amber-400 text-slate-950 animate-pulse">
                          Live
                        </span>
                      )}
                      {/* Signal Tier Badge */}
                      {tierData && !story.isLive && (
                        <span className={`px-1.5 py-0.5 text-[8px] font-bold rounded-full bg-linear-to-r ${tierData.color} text-white`}>
                          {tierData.icon}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-slate-400">
                      <span className={story.hasUnwatched ? 'text-orange-300' : 'text-slate-500'}>{story.hasUnwatched ? 'New' : 'Seen'}</span>
                      <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-slate-500" />
                      {tierData ? (
                        <span className={`${story.signalTier === 'flash' ? 'text-red-400' : story.signalTier === 'pulse' ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {tierData.label}
                        </span>
                      ) : (
                        <span>#{idx + 1}</span>
                      )}
                    </div>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="mt-2 sm:mt-3 h-1 sm:h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className={`h-full rounded-full ${getProgressWidth()} transition-all ${
                    tierData 
                      ? `bg-linear-to-r ${tierData.color}` 
                      : story.hasUnwatched 
                        ? 'bg-linear-to-r from-cyan-400 to-amber-300' 
                        : 'bg-white/20'
                  }`} />
                </div>
              </button>
            );
          })}
          
          {/* Show more button when collapsed and has more items */}
          {hasMore && !isExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className="hidden sm:flex relative overflow-hidden rounded-xl sm:rounded-2xl border border-dashed border-white/20 bg-white/5 p-2 sm:p-3 text-center items-center justify-center group hover:border-cyan-400/40 hover:bg-white/10 transition-all duration-300 min-h-20"
            >
              <div className="text-center">
                <div className="text-lg sm:text-xl font-bold text-orange-400">+{remainingCount}</div>
                <div className="text-[10px] sm:text-xs text-slate-400">more signals</div>
              </div>
            </button>
          )}
        </div>
        
        {/* Collapse button when expanded */}
        {isExpanded && hasMore && (
          <button
            onClick={() => setIsExpanded(false)}
            className="hidden sm:block w-full mt-3 py-2 text-xs text-slate-400 hover:text-orange-400 transition-colors"
          >
            Show less
          </button>
        )}
      </div>
    </section>
  );
};

StoriesBar.displayName = 'StoriesBar';
