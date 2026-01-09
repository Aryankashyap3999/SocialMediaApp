import React from 'react';
import { Avatar } from '@components/atoms/Avatar';

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
 * StoriesBar Organism
 * Unique horizontal scrollable stories with glowing gradient borders
 * Design: Hexagonal-inspired corners with animated glow effects
 */
export const StoriesBar: React.FC<StoriesBarProps> = ({
  stories,
  onStoryClick,
  onAddStory,
}) => {
  return (
    <div className="py-4 border-b border-gray-100 dark:border-gray-800">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide px-4 pb-1">
        {/* Add Story Button */}
        <button
          onClick={onAddStory}
          className="flex flex-col items-center gap-2 shrink-0"
        >
          <div className="relative">
            {/* Outer glow container */}
            <div className="w-17 h-17 rounded-2xl bg-linear-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 p-0.75 transition-transform hover:scale-105">
              <div className="w-full h-full rounded-[13px] bg-white dark:bg-gray-950 flex items-center justify-center">
                <Avatar
                  src={stories[0]?.avatarUrl}
                  alt="Your story"
                  size="lg"
                />
              </div>
            </div>
            {/* Add icon badge */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-linear-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/30">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
          </div>
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Your story</span>
        </button>

        {/* Stories */}
        {stories.slice(1).map((story) => (
          <button
            key={story.id}
            onClick={() => onStoryClick?.(story)}
            className="flex flex-col items-center gap-2 shrink-0 group"
          >
            <div className="relative">
              {/* Animated gradient border */}
              <div 
                className={`
                  w-17 h-17 rounded-2xl p-0.75 transition-all duration-300 group-hover:scale-105
                  ${story.hasUnwatched 
                    ? 'bg-linear-to-br from-violet-500 via-purple-500 to-pink-500 animate-pulse shadow-lg shadow-purple-500/25' 
                    : 'bg-linear-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700'
                  }
                  ${story.isLive ? 'ring-2 ring-red-500 ring-offset-2 dark:ring-offset-gray-950' : ''}
                `}
              >
                <div className="w-full h-full rounded-[13px] bg-white dark:bg-gray-950 p-0.5">
                  <div className="w-full h-full rounded-[11px] overflow-hidden">
                    {story.avatarUrl ? (
                      <img 
                        src={story.avatarUrl} 
                        alt={story.username}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                        {story.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Live badge */}
              {story.isLive && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold uppercase rounded-md animate-pulse">
                  Live
                </div>
              )}
            </div>
            
            <span className={`
              text-xs font-medium max-w-17 truncate
              ${story.hasUnwatched ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}
            `}>
              {story.username}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

StoriesBar.displayName = 'StoriesBar';
