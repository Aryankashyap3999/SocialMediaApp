import React from 'react';
import { Avatar } from '@components/atoms/Avatar';
import { Icon } from '@components/atoms/Icon';
import type { Conversation } from '../types';

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

/**
 * ConversationItem Component
 * 
 * Single Responsibility: Render one conversation in the list
 * Displays avatar, name, last message preview, and status indicators
 */
export const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  isActive,
  onClick,
}) => {
  const { participants, isGroup, groupName, lastMessage, unreadCount, isMuted, isPinned } = conversation;
  
  // Get display name and avatar
  const displayName = isGroup 
    ? groupName 
    : participants[0]?.name;
  
  const displayAvatar = isGroup 
    ? conversation.groupAvatar || participants[0]?.avatarUrl 
    : participants[0]?.avatarUrl;

  const isOnline = !isGroup && participants[0]?.isOnline;
  const isVerified = !isGroup && participants[0]?.isVerified;
  const isOwnMessage = lastMessage?.senderId === 'current';

  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-4 py-3 transition-colors text-left
        ${isActive 
          ? 'bg-violet-50 dark:bg-violet-950/30' 
          : 'hover:bg-gray-50 dark:hover:bg-gray-900/50'
        }
      `}
    >
      {/* Avatar with online indicator */}
      <div className="relative shrink-0">
        {isGroup && participants.length > 1 ? (
          // Group avatar stack
          <div className="relative w-12 h-12">
            <div className="absolute top-0 left-0 w-8 h-8 rounded-full overflow-hidden border-2 border-white dark:border-gray-950">
              <img src={participants[0]?.avatarUrl} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full overflow-hidden border-2 border-white dark:border-gray-950">
              <img src={participants[1]?.avatarUrl} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        ) : (
          <Avatar src={displayAvatar || ''} alt={displayName || ''} size="md" />
        )}
        
        {/* Online indicator */}
        {isOnline && (
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-950" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <span className={`font-semibold truncate ${unreadCount > 0 ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
            {displayName}
          </span>
          {isVerified && <Icon name="verified" size={14} />}
          {isPinned && <Icon name="pin" size={12} className="text-gray-400 ml-1" />}
        </div>
        
        {lastMessage && (
          <p className={`text-sm truncate ${unreadCount > 0 ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500'}`}>
            {isOwnMessage && <span className="text-gray-400">You: </span>}
            {lastMessage.content}
          </p>
        )}
      </div>

      {/* Right side - timestamp and indicators */}
      <div className="shrink-0 flex flex-col items-end gap-1">
        <span className={`text-xs ${unreadCount > 0 ? 'text-violet-600 dark:text-violet-400' : 'text-gray-400'}`}>
          {lastMessage?.timestamp}
        </span>
        
        <div className="flex items-center gap-1.5">
          {isMuted && <Icon name="mute" size={14} className="text-gray-400" />}
          {unreadCount > 0 && (
            <span className="min-w-[18px] h-[18px] px-1 bg-violet-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

ConversationItem.displayName = 'ConversationItem';
