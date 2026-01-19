import React from 'react';

export interface Story {
  id: string;
  username: string;
  avatarUrl?: string;
  hasUnwatched?: boolean;
  isLive?: boolean;
  isYou?: boolean;
}

export interface StoriesBarProps {
  stories: Story[];
  onStoryClick?: (story: Story) => void;
  onAddStory?: () => void;
}

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
  return (
    <section className="px-0 sm:px-1">
      <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-xl p-3 sm:p-4 shadow-xl shadow-indigo-500/5">
        <div className="flex items-center justify-between mb-3 gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-cyan-200">Signal Capsules</p>
            <h3 className="text-sm sm:text-lg font-semibold text-white truncate">People you follow are transmitting now</h3>
          </div>
          <button
            onClick={onAddStory}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full bg-linear-to-r from-cyan-500 to-amber-400 text-slate-900 text-xs sm:text-sm font-semibold shadow-lg shadow-cyan-500/25 whitespace-nowrap shrink-0"
          >
            <span className="text-base sm:text-lg leading-none">+</span>
            <span className="hidden sm:inline">Send a signal</span>
            <span className="sm:hidden">Signal</span>

          </button>
        </div>

        {/* Mobile: Horizontal scroll, Desktop: Grid */}
        <div className="flex overflow-x-auto gap-2 sm:gap-3 pb-2 -mx-1 px-1 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:overflow-visible scrollbar-hide">
          {stories.map((story, idx) => (
            <button
              key={story.id}
              onClick={() => onStoryClick?.(story)}
              className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-black/40 p-2 sm:p-3 text-left group shadow-lg shadow-black/20 min-w-35 sm:min-w-0 shrink-0 sm:shrink"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-br from-cyan-400/20 via-transparent to-amber-400/20" />
              <div className="flex items-start gap-2 sm:gap-3 relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl overflow-hidden ring-2 ring-cyan-400/40 bg-linear-to-br from-cyan-500 to-amber-400 shrink-0">
                  {story.avatarUrl ? (
                    <img src={story.avatarUrl} alt={story.username} className="w-full h-full object-cover" />
                  ) : (
                    <span className="w-full h-full flex items-center justify-center text-white font-bold text-sm sm:text-lg">
                      {story.username.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-0.5 sm:space-y-1">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-white truncate">{story.username}</span>
                    {story.isLive && <span className="px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] font-bold uppercase rounded-full bg-linear-to-r from-cyan-500 to-amber-400 text-slate-950">Live</span>}
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-indigo-200/80">
                    <span>{story.hasUnwatched ? 'New' : 'Seen'}</span>
                    <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-indigo-300" />
                    <span>#{idx + 1}</span>
                  </div>
                </div>
              </div>
              <div className="mt-2 sm:mt-3 h-1.5 sm:h-2 rounded-full bg-white/10 overflow-hidden">
                <div className={`h-full rounded-full ${story.hasUnwatched ? 'bg-linear-to-r from-cyan-400 to-amber-300 w-5/6' : 'bg-white/20 w-3/4'}`} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

StoriesBar.displayName = 'StoriesBar';
