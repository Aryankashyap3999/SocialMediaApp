import React from 'react';
import type { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  showTimestamp?: boolean;
}

/**
 * MessageBubble Component
 * 
 * Single Responsibility: Render a single message bubble
 * Handles different message types and styling for sent/received
 */
export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwn,
  showTimestamp = true,
}) => {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`max-w-[70%] ${isOwn ? 'order-2' : 'order-1'}`}>
        {/* Message content */}
        <div
          className={`
            px-4 py-2.5 rounded-2xl
            ${isOwn
              ? 'bg-linear-to-r from-orange-500 to-amber-400 text-white rounded-br-md shadow-[0_10px_30px_-18px_rgba(0,0,0,0.8)]'
              : 'bg-[#1a0d05]/80 text-amber-50 rounded-bl-md border border-orange-500/15'
            }
          `}
        >
          {message.type === 'text' && (
            <p className="text-sm whitespace-pre-wrap wrap-break-word">{message.content}</p>
          )}
          
          {message.type === 'image' && message.mediaUrl && (
            <img
              src={message.mediaUrl}
              alt=""
              className="rounded-lg max-w-full"
            />
          )}
        </div>

        {/* Timestamp */}
        {showTimestamp && (
          <p className={`text-xs text-slate-500 mt-1 ${isOwn ? 'text-right' : 'text-left'}`}>
            {message.timestamp}
            {isOwn && message.isRead && (
              <span className="ml-1 text-slate-600">• Seen</span>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

MessageBubble.displayName = 'MessageBubble';
