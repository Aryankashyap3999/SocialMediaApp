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
    <div className="px-4 py-3 border-t border-slate-700 bg-[#0a0a0a]">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        {/* Emoji button */}
        <button
          type="button"
          className="p-2 hover:bg-[#141414] rounded-full transition-colors"
        >
          <Icon name="emoji" size={22} className="text-slate-400" />
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
            className="w-full bg-[#141414] rounded-full py-2.5 px-4 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 placeholder:text-slate-500 disabled:opacity-50"
          />
        </div>

        {/* Action buttons */}
        {hasContent ? (
          <button
            type="submit"
            disabled={disabled}
            className="p-2 rounded-full transition-colors bg-linear-to-r from-cyan-400 to-amber-300 hover:from-cyan-300 hover:to-amber-200 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.8)] disabled:opacity-50"
          >
            <Icon name="send" size={20} className="text-slate-950" />
          </button>
        ) : (
          <>
            <button
              type="button"
              className="p-2 hover:bg-[#141414] rounded-full transition-colors"
            >
              <Icon name="image" size={22} className="text-slate-400" />
            </button>
            <button
              type="button"
              className="p-2 hover:bg-[#141414] rounded-full transition-colors"
            >
              <Icon name="microphone" size={22} className="text-slate-400" />
            </button>
          </>
        )}
      </form>
    </div>
  );
};

MessageInput.displayName = 'MessageInput';
