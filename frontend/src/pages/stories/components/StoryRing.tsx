import React from 'react';
import type { Story } from '../types';

interface StoryRingProps {
  story: Story;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  showUsername?: boolean;
}

/**
 * StoryRing Component
 * 
 * Single Responsibility: Render a story avatar with gradient ring
 * Shows unseen/seen state and live badge
 */
export const StoryRing: React.FC<StoryRingProps> = ({
  story,
  size = 'md',
  onClick,
  showUsername = true,
}) => {
  const { user, hasUnseenItems, isLive } = story;

  const sizeClasses = {
    sm: {
      ring: 'w-14 h-14',
      avatar: 'w-12 h-12',
      text: 'text-xs',
      maxWidth: 'max-w-[56px]',
    },
    md: {
      ring: 'w-18 h-18',
      avatar: 'w-16 h-16',
      text: 'text-xs',
      maxWidth: 'max-w-[72px]',
    },
    lg: {
      ring: 'w-24 h-24',
      avatar: 'w-[86px] h-[86px]',
      text: 'text-sm',
      maxWidth: 'max-w-[96px]',
    },
  };

  const classes = sizeClasses[size];

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 ${classes.maxWidth}`}
    >
      {/* Ring container */}
      <div className="relative">
        {/* Gradient ring */}
        <div
          className={`
            ${classes.ring} rounded-full p-[3px]
            ${hasUnseenItems
              ? 'bg-gradient-to-tr from-amber-500 via-pink-500 to-violet-600'
              : 'bg-gray-300 dark:bg-gray-600'
            }
          `}
        >
          {/* White/dark inner border */}
          <div className="w-full h-full rounded-full bg-white dark:bg-gray-950 p-[2px]">
            {/* Avatar */}
            <img
              src={user.avatarUrl}
              alt={user.name}
              className={`${classes.avatar} rounded-full object-cover`}
            />
          </div>
        </div>

        {/* Live badge */}
        {isLive && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-gradient-to-r from-pink-500 to-red-500 text-white text-[10px] font-bold uppercase rounded tracking-wide">
            Live
          </div>
        )}
      </div>

      {/* Username */}
      {showUsername && (
        <span className={`${classes.text} text-gray-700 dark:text-gray-300 truncate w-full text-center`}>
          {user.username}
        </span>
      )}
    </button>
  );
};

StoryRing.displayName = 'StoryRing';
