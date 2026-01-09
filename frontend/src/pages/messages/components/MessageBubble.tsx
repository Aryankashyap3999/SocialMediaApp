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
              ? 'bg-violet-600 text-white rounded-br-md'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-md'
            }
          `}
        >
          {message.type === 'text' && (
            <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
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
          <p className={`text-xs text-gray-400 mt-1 ${isOwn ? 'text-right' : 'text-left'}`}>
            {message.timestamp}
            {isOwn && message.isRead && (
              <span className="ml-1">• Seen</span>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

MessageBubble.displayName = 'MessageBubble';
