import React from 'react';
import { Icon } from '@components/atoms/Icon';

interface AddStoryCardProps {
  userAvatar?: string;
  onClick: () => void;
}

/**
 * AddStoryCard Component
 * 
 * Single Responsibility: Display "Add Story" card for creating new stories
 */
export const AddStoryCard: React.FC<AddStoryCardProps> = ({
  userAvatar,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 max-w-18"
    >
      <div className="relative">
        {/* Avatar or placeholder */}
        <div className="w-18 h-18 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
          {userAvatar ? (
            <img
              src={userAvatar}
              alt="Your story"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Icon name="profile" size={32} className="text-gray-400" />
            </div>
          )}
        </div>

        {/* Plus badge */}
        <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full border-2 border-white dark:border-slate-950 bg-linear-to-br from-cyan-500 to-amber-300 flex items-center justify-center shadow-[0_6px_18px_-10px_rgba(0,0,0,0.8)]">
          <Icon name="plus" size={14} className="text-slate-950" />
        </div>
      </div>

      <span className="text-xs text-gray-700 dark:text-gray-200 truncate w-full text-center">
        Your signal
      </span>
    </button>
  );
};

AddStoryCard.displayName = 'AddStoryCard';
