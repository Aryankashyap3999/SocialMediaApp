import React from 'react';
import { Icon } from '@components/atoms/Icon';
import type { StoryUser, StoryItem } from '../types';

interface StoryHeaderProps {
  user: StoryUser;
  item: StoryItem;
  onClose: () => void;
  onMute?: () => void;
  onMore?: () => void;
  isMuted?: boolean;
}

/**
 * StoryHeader Component
 * 
 * Single Responsibility: Display story user info and actions
 */
export const StoryHeader: React.FC<StoryHeaderProps> = ({
  user,
  item,
  onClose,
  onMute,
  onMore,
  isMuted = false,
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      {/* User info */}
      <div className="flex items-center gap-3">
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="w-8 h-8 rounded-full object-cover border-2 border-white/20"
        />
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold text-sm">{user.username}</span>
          {user.isVerified && <Icon name="verified" size={14} />}
          <span className="text-white/60 text-xs">{item.timestamp}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {onMute && (
          <button
            onClick={onMute}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <Icon
              name={isMuted ? 'mute' : 'volume'}
              size={20}
              className="text-white"
            />
          </button>
        )}
        {onMore && (
          <button
            onClick={onMore}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <Icon name="dotsVertical" size={20} className="text-white" />
          </button>
        )}
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <Icon name="close" size={20} className="text-white" />
        </button>
      </div>
    </div>
  );
};

StoryHeader.displayName = 'StoryHeader';
