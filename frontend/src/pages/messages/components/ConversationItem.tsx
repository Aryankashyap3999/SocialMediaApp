import React from 'react';
import { Avatar } from '@components/atoms/Avatar';
import { Icon } from '@components/atoms/Icon';
import { GradientBadge } from '@components/atoms/GradientBadge';
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
        w-full flex items-center gap-3 px-4 py-3.5 transition-all duration-300 text-left mx-2 my-1 relative overflow-hidden group
        ${isActive 
          ? 'bg-linear-to-r from-cyan-500/15 to-transparent border-2 border-cyan-400/40 rounded-2xl shadow-lg shadow-cyan-500/10' 
          : 'bg-white/5 hover:bg-white/10 border-2 border-transparent hover:border-white/10 rounded-2xl'
        }
      `}
      style={{ width: 'calc(100% - 16px)' }}
    >
      {/* Hover gradient effect */}
      <div className="absolute inset-0 bg-linear-to-r from-cyan-500/0 via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Active indicator line */}
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-full bg-linear-to-b from-cyan-400 to-emerald-400" />
      )}
      
      {/* Avatar with unique online indicator */}
      <div className="relative shrink-0 z-10">
        {isGroup && participants.length > 1 ? (
          // Group avatar stack - Enhanced
          <div className="relative w-12 h-12">
            <div className="absolute top-0 left-0 w-9 h-9 rounded-xl overflow-hidden border-2 border-[#0a0a0a] shadow-lg">
              <img src={participants[0]?.avatarUrl} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 w-9 h-9 rounded-xl overflow-hidden border-2 border-[#0a0a0a] shadow-lg">
              <img src={participants[1]?.avatarUrl} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        ) : (
          <div className="relative">
            <Avatar src={displayAvatar || ''} alt={displayName || ''} size="md" />
            {/* Gradient ring on active */}
            {isActive && (
              <div className="absolute -inset-1 rounded-full border-2 border-cyan-400/30 animate-pulse" />
            )}
          </div>
        )}
        
        {/* Online indicator - Unique pulse design */}
        {isOnline && (
          <div className="absolute -bottom-0.5 -right-0.5">
            <div className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0a0a0a] flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-ping" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 z-10">
        <div className="flex items-center gap-1.5">
          <span className={`font-bold truncate ${unreadCount > 0 ? 'text-white' : 'text-slate-200'}`}>
            {displayName}
          </span>
          {isVerified && <Icon name="verified" size={14} className="text-cyan-400" />}
          {isPinned && (
            <span className="px-1.5 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/30">
              <Icon name="pin" size={10} className="text-amber-400" />
            </span>
          )}
        </div>
        
        {lastMessage && (
          <p className={`text-sm truncate mt-0.5 ${unreadCount > 0 ? 'text-cyan-100 font-medium' : 'text-slate-400'}`}>
            {isOwnMessage && <span className="text-cyan-400/70">You: </span>}
            {lastMessage.content}
          </p>
        )}
      </div>

      {/* Right side - timestamp and indicators */}
      <div className="shrink-0 flex flex-col items-end gap-1.5 z-10">
        <span className={`text-xs font-medium ${unreadCount > 0 ? 'text-cyan-300' : 'text-slate-500'}`}>
          {lastMessage?.timestamp}
        </span>
        
        <div className="flex items-center gap-2">
          {isMuted && (
            <span className="p-1 rounded-lg bg-white/5">
              <Icon name="mute" size={12} className="text-slate-500" />
            </span>
          )}
          {unreadCount > 0 && (
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-cyan-400 to-amber-400 rounded-full blur-md opacity-50" />
              <GradientBadge className="relative min-w-5 h-5 flex items-center justify-center text-xs font-bold">
                {unreadCount > 9 ? '9+' : unreadCount}
              </GradientBadge>
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

ConversationItem.displayName = 'ConversationItem';
