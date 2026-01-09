import React, { useState } from 'react';
import { Avatar } from '@components/atoms/Avatar';
import { Icon } from '@components/atoms/Icon';
import { Button } from '@components/atoms/Button';

export interface ComposeBoxProps {
  currentUser?: {
    name: string;
    avatarUrl?: string;
  };
  placeholder?: string;
  onPost?: (content: string) => void;
}

/**
 * ComposeBox Organism
 * Create new post component for Aptoodate
 */
export const ComposeBox: React.FC<ComposeBoxProps> = ({
  currentUser,
  placeholder = "What's happening?",
  onPost,
}) => {
  const [content, setContent] = useState('');
  const maxLength = 280;

  const handlePost = () => {
    if (content.trim()) {
      onPost?.(content);
      setContent('');
    }
  };

  const remaining = maxLength - content.length;
  const isOverLimit = remaining < 0;
  const isNearLimit = remaining <= 20 && remaining > 0;

  return (
    <div className="bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 px-4 py-4">
      <div className="flex gap-3">
        {/* Avatar */}
        <Avatar
          src={currentUser?.avatarUrl}
          alt={currentUser?.name || 'You'}
          size="md"
        />

        {/* Compose Area */}
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
            rows={2}
            className="w-full bg-transparent border-none resize-none text-lg placeholder:text-gray-500 focus:outline-none"
          />

          {/* Divider */}
          <div className="border-t border-gray-100 dark:border-gray-800 my-3" />

          {/* Actions Row */}
          <div className="flex items-center justify-between">
            {/* Media Actions */}
            <div className="flex items-center gap-1">
              <button className="p-2 hover:bg-violet-100 dark:hover:bg-violet-900/30 rounded-full transition-colors group">
                <Icon name="image" size={20} className="text-violet-600" />
              </button>
              <button className="p-2 hover:bg-violet-100 dark:hover:bg-violet-900/30 rounded-full transition-colors group">
                <Icon name="gif" size={20} className="text-violet-600" />
              </button>
              <button className="p-2 hover:bg-violet-100 dark:hover:bg-violet-900/30 rounded-full transition-colors group">
                <Icon name="emoji" size={20} className="text-violet-600" />
              </button>
              <button className="p-2 hover:bg-violet-100 dark:hover:bg-violet-900/30 rounded-full transition-colors group">
                <Icon name="calendar" size={20} className="text-violet-600" />
              </button>
            </div>

            {/* Post Button & Character Count */}
            <div className="flex items-center gap-3">
              {content.length > 0 && (
                <div className="flex items-center gap-2">
                  {/* Circular progress */}
                  <div className="relative w-6 h-6">
                    <svg className="w-6 h-6 -rotate-90" viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-gray-200 dark:text-gray-700"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={`${Math.min(content.length / maxLength, 1) * 62.83} 62.83`}
                        className={
                          isOverLimit ? 'text-red-500' : 
                          isNearLimit ? 'text-yellow-500' : 
                          'text-violet-600'
                        }
                      />
                    </svg>
                    {remaining <= 20 && (
                      <span 
                        className={`absolute inset-0 flex items-center justify-center text-[10px] font-medium ${
                          isOverLimit ? 'text-red-500' : 'text-gray-500'
                        }`}
                      >
                        {remaining}
                      </span>
                    )}
                  </div>
                  <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />
                </div>
              )}
              <Button
                onClick={handlePost}
                disabled={!content.trim() || isOverLimit}
                className="bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 disabled:from-violet-400 disabled:to-indigo-400 disabled:cursor-not-allowed text-white font-bold px-5 py-2 rounded-full"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ComposeBox.displayName = 'ComposeBox';
