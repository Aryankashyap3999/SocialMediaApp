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
    <section className="px-1">
      <div className="rounded-3xl border border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-xl p-4 shadow-xl shadow-indigo-500/5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Signal Capsules</p>
            <h3 className="text-lg font-semibold text-white">People you follow are transmitting now</h3>
          </div>
          <button
            onClick={onAddStory}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-linear-to-r from-cyan-500 to-amber-400 text-slate-900 text-sm font-semibold shadow-lg shadow-cyan-500/25"
          >
            <span className="text-lg leading-none">＋</span>
            Send a signal
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {stories.map((story, idx) => (
            <button
              key={story.id}
              onClick={() => onStoryClick?.(story)}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-3 text-left group shadow-lg shadow-black/20"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-br from-cyan-400/20 via-transparent to-amber-400/20" />
              <div className="flex items-start gap-3 relative">
                <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-cyan-400/40 bg-linear-to-br from-cyan-500 to-amber-400">
                  {story.avatarUrl ? (
                    <img src={story.avatarUrl} alt={story.username} className="w-full h-full object-cover" />
                  ) : (
                    <span className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
                      {story.username.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white truncate">{story.username}</span>
                    {story.isLive && <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-linear-to-r from-cyan-500 to-amber-400 text-slate-950">Live</span>}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-indigo-200/80">
                    <span>{story.hasUnwatched ? 'New' : 'Seen'}</span>
                    <span className="w-1 h-1 rounded-full bg-indigo-300" />
                    <span>Capsule #{idx + 1}</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
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
