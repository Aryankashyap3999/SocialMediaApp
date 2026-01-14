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
            ${classes.ring} rounded-full p-0.75
            ${hasUnseenItems
              ? 'bg-linear-to-tr from-cyan-500 via-emerald-400 to-amber-300'
              : 'bg-gray-300 dark:bg-slate-700'
            }
          `}
        >
          {/* White/dark inner border */}
          <div className="w-full h-full rounded-full bg-white dark:bg-slate-950 p-0.5">
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
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-linear-to-r from-amber-300 to-cyan-400 text-slate-950 text-[10px] font-bold uppercase rounded tracking-wide border border-slate-900/60 shadow-[0_6px_18px_-12px_rgba(0,0,0,0.8)]">
            Live
          </div>
        )}
      </div>

      {/* Username */}
      {showUsername && (
        <span className={`${classes.text} text-gray-700 dark:text-gray-200 truncate w-full text-center`}>
          {user.username}
        </span>
      )}
    </button>
  );
};

StoryRing.displayName = 'StoryRing';
