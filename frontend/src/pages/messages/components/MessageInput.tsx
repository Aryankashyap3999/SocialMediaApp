import React, { useState, useRef } from 'react';
import { Icon } from '@components/atoms/Icon';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  onTyping?: () => void;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * MessageInput Component
 * 
 * Single Responsibility: Handle message composition and sending
 * Includes text input and action buttons
 */
export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  onTyping,
  placeholder = 'Message...',
  disabled = false,
}) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    onTyping?.();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const hasContent = message.trim().length > 0;

  return (
    <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        {/* Emoji button */}
        <button
          type="button"
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <Icon name="emoji" size={22} className="text-gray-500" />
        </button>

        {/* Input */}
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full bg-gray-100 dark:bg-gray-900 rounded-full py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 placeholder:text-gray-400 disabled:opacity-50"
          />
        </div>

        {/* Action buttons */}
        {hasContent ? (
          <button
            type="submit"
            disabled={disabled}
            className="p-2 bg-violet-600 hover:bg-violet-700 rounded-full transition-colors disabled:opacity-50"
          >
            <Icon name="send" size={20} className="text-white" />
          </button>
        ) : (
          <>
            <button
              type="button"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <Icon name="image" size={22} className="text-gray-500" />
            </button>
            <button
              type="button"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <Icon name="microphone" size={22} className="text-gray-500" />
            </button>
          </>
        )}
      </form>
    </div>
  );
};

MessageInput.displayName = 'MessageInput';
