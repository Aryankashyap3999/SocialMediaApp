import React, { useState, useRef } from 'react';
import { Icon } from '@components/atoms/Icon';
import { IconButton } from '@components/atoms/IconButton';

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
    <div className="px-4 py-3 border-t border-orange-500/10 bg-[#0e0805]">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        {/* Emoji button */}
        <IconButton type="button" rounded="full" label="Add emoji">
          <Icon name="emoji" size={22} className="text-slate-400" />
        </IconButton>

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
            className="w-full bg-orange-500/5 border border-orange-500/10 rounded-full py-2.5 px-4 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-400/50 placeholder:text-slate-500 disabled:opacity-50"
          />
        </div>

        {/* Action buttons */}
        {hasContent ? (
          <button
            type="submit"
            disabled={disabled}
            className="p-2 rounded-full transition-colors bg-linear-to-r from-orange-500 to-amber-400 hover:from-orange-400 hover:to-amber-300 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.8)] disabled:opacity-50"
          >
            <Icon name="send" size={20} className="text-white" />
          </button>
        ) : (
          <>
            <IconButton type="button" rounded="full" label="Add image">
              <Icon name="image" size={22} className="text-slate-400" />
            </IconButton>
            <IconButton type="button" rounded="full" label="Voice message">
              <Icon name="microphone" size={22} className="text-slate-400" />
            </IconButton>
          </>
        )}
      </form>
    </div>
  );
};

MessageInput.displayName = 'MessageInput';
