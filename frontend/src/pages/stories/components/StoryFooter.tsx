import React, { useState } from 'react';
import { Icon } from '@components/atoms/Icon';

interface StoryFooterProps {
  onReply: (message: string) => void;
  onReact: (emoji: string) => void;
  onShare?: () => void;
}

const quickReactions = ['❤️', '😂', '😮', '😢', '👏', '🔥'];

/**
 * StoryFooter Component
 * 
 * Single Responsibility: Handle story replies and reactions
 */
export const StoryFooter: React.FC<StoryFooterProps> = ({
  onReply,
  onReact,
  onShare,
}) => {
  const [message, setMessage] = useState('');
  const [showReactions, setShowReactions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onReply(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="px-4 py-3">
      {/* Quick reactions */}
      {showReactions && (
        <div className="flex justify-center gap-2 mb-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {quickReactions.map((emoji) => (
            <button
              key={emoji}
              onClick={() => {
                onReact(emoji);
                setShowReactions(false);
              }}
              className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-xl transition-all hover:scale-110"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* Input area */}
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send message..."
            className="w-full bg-white/10 border border-white/20 rounded-full py-2.5 px-4 text-white text-sm placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>

        {message.trim() ? (
          <button
            type="submit"
            className="p-2.5 rounded-full transition-colors bg-linear-to-r from-cyan-400 to-amber-300 hover:from-cyan-300 hover:to-amber-200 shadow-[0_8px_24px_-14px_rgba(0,0,0,0.8)]"
          >
            <Icon name="send" size={20} className="text-slate-950" />
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setShowReactions(!showReactions)}
              className="p-2.5 hover:bg-white/10 rounded-full transition-colors"
            >
              <Icon name="heart" size={22} className="text-white" />
            </button>
            {onShare && (
              <button
                type="button"
                onClick={onShare}
                className="p-2.5 hover:bg-white/10 rounded-full transition-colors"
              >
                <Icon name="share" size={22} className="text-white" />
              </button>
            )}
          </>
        )}
      </form>
    </div>
  );
};

StoryFooter.displayName = 'StoryFooter';
