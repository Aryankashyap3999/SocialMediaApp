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
          ? 'bg-slate-900 border border-cyan-400/30 rounded-2xl' 
          : 'hover:bg-slate-900/70 rounded-2xl'
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
          <span className={`font-semibold truncate ${unreadCount > 0 ? 'text-slate-50' : 'text-slate-300'}`}>
            {displayName}
          </span>
          {isVerified && <Icon name="verified" size={14} />}
          {isPinned && <Icon name="pin" size={12} className="text-gray-400 ml-1" />}
        </div>
        
        {lastMessage && (
          <p className={`text-sm truncate ${unreadCount > 0 ? 'text-slate-100 font-medium' : 'text-slate-400'}`}>
            {isOwnMessage && <span className="text-slate-500">You: </span>}
            {lastMessage.content}
          </p>
        )}
      </div>

      {/* Right side - timestamp and indicators */}
      <div className="shrink-0 flex flex-col items-end gap-1">
        <span className={`text-xs ${unreadCount > 0 ? 'text-amber-300' : 'text-slate-500'}`}>
          {lastMessage?.timestamp}
        </span>
        
        <div className="flex items-center gap-1.5">
          {isMuted && <Icon name="mute" size={14} className="text-gray-400" />}
          {unreadCount > 0 && (
            <span className="min-w-4.5 h-4.5 px-1 bg-linear-to-r from-cyan-400 to-amber-300 text-slate-950 text-xs font-bold rounded-full flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

ConversationItem.displayName = 'ConversationItem';
