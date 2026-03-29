import React from 'react';
import { Avatar } from '@components/atoms/Avatar';
import { Icon } from '@components/atoms/Icon';
import { IconButton } from '@components/atoms/IconButton';
import type { Conversation } from '../types';

interface ChatHeaderProps {
  conversation: Conversation;
  onBack?: () => void;
  onVideoCall?: () => void;
  onVoiceCall?: () => void;
  onInfo?: () => void;
}

/**
 * ChatHeader Component
 * 
 * Single Responsibility: Display chat header with user info and actions
 */
export const ChatHeader: React.FC<ChatHeaderProps> = ({
  conversation,
  onBack,
  onVideoCall,
  onVoiceCall,
  onInfo,
}) => {
  const { participants, isGroup, groupName } = conversation;
  
  const displayName = isGroup ? groupName : participants[0]?.name;
  const displayAvatar = isGroup ? conversation.groupAvatar : participants[0]?.avatarUrl;
  const isOnline = !isGroup && participants[0]?.isOnline;
  const lastSeen = !isGroup && participants[0]?.lastSeen;
  const isVerified = !isGroup && participants[0]?.isVerified;

  const getStatusText = () => {
    if (isGroup) {
      return `${participants.length} members`;
    }
    if (isOnline) return 'Active now';
    if (lastSeen) return `Active ${lastSeen}`;
    return 'Offline';
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-orange-500/10 bg-[#0e0805]">
      <div className="flex items-center gap-3">
        {/* Back button (mobile) */}
        {onBack && (
          <IconButton
            onClick={onBack}
            size="sm"
            label="Go back"
            className="-ml-1.5 lg:hidden"
          >
            <Icon name="chevronLeft" size={24} />
          </IconButton>
        )}

        {/* Avatar */}
        <div className="relative">
          {isGroup && participants.length > 1 ? (
            <div className="relative w-10 h-10">
              <div className="absolute top-0 left-0 w-7 h-7 rounded-full overflow-hidden border-2 border-[#0e0805]">
                <img src={participants[0]?.avatarUrl} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full overflow-hidden border-2 border-[#0e0805]">
                <img src={participants[1]?.avatarUrl} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          ) : (
            <Avatar src={displayAvatar || ''} alt={displayName || ''} size="md" />
          )}
          
          {isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0e0805]" />
          )}
        </div>

        {/* User info */}
        <div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-slate-50">{displayName}</span>
            {isVerified && <Icon name="verified" size={14} />}
          </div>
          <p className="text-xs text-slate-400">
            {getStatusText()}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <IconButton onClick={onVoiceCall} label="Voice call">
          <Icon name="phone" size={20} className="text-slate-300" />
        </IconButton>
        <IconButton onClick={onVideoCall} label="Video call">
          <Icon name="video" size={20} className="text-slate-300" />
        </IconButton>
        <IconButton onClick={onInfo} label="Chat info">
          <Icon name="info" size={20} className="text-slate-300" />
        </IconButton>
      </div>
    </div>
  );
};

ChatHeader.displayName = 'ChatHeader';
