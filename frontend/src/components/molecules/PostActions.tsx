import React from 'react';
import { Icon } from '@components/atoms/Icon';

export interface PostActionsProps {
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
  showCounts?: boolean;
}

/**
 * PostActions Molecule
 * Unique action buttons for Aptoodate posts
 */
export const PostActions: React.FC<PostActionsProps> = ({
  likesCount,
  commentsCount,
  sharesCount,
  isLiked = false,
  isBookmarked = false,
  onLike,
  onComment,
  onShare,
  onBookmark,
  showCounts = true,
}) => {
  return (
    <div className="flex items-center justify-between max-w-106.25">
      {/* Left Actions */}
      <div className="flex items-center -ml-2">
        {/* Reply/Comment */}
        <button
          onClick={onComment}
          className="flex items-center gap-2 p-2 rounded-full text-gray-500 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors group"
        >
          <Icon name="comment" size={20} />
          {showCounts && commentsCount > 0 && (
            <span className="text-sm group-hover:text-violet-600">{formatCount(commentsCount)}</span>
          )}
        </button>

        {/* Repost */}
        <button
          onClick={onShare}
          className="flex items-center gap-2 p-2 rounded-full text-gray-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors group"
        >
          <Icon name="repost" size={20} />
          {showCounts && sharesCount > 0 && (
            <span className="text-sm group-hover:text-green-600">{formatCount(sharesCount)}</span>
          )}
        </button>

        {/* Like */}
        <button
          onClick={onLike}
          className={`flex items-center gap-2 p-2 rounded-full transition-colors group ${
            isLiked 
              ? 'text-pink-600' 
              : 'text-gray-500 hover:text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900/20'
          }`}
        >
          <Icon name="heart" size={20} filled={isLiked} className={isLiked ? 'animate-[heartBeat_0.3s_ease-in-out]' : ''} />
          {showCounts && likesCount > 0 && (
            <span className={`text-sm ${isLiked ? 'text-pink-600' : 'group-hover:text-pink-600'}`}>
              {formatCount(likesCount)}
            </span>
          )}
        </button>

        {/* Stats */}
        <button
          className="flex items-center gap-2 p-2 rounded-full text-gray-500 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors"
        >
          <Icon name="stats" size={20} />
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1">
        {/* Bookmark */}
        <button
          onClick={onBookmark}
          className={`p-2 rounded-full transition-colors ${
            isBookmarked 
              ? 'text-violet-600' 
              : 'text-gray-500 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20'
          }`}
        >
          <Icon name="bookmark" size={20} filled={isBookmarked} />
        </button>

        {/* Share */}
        <button
          onClick={onShare}
          className="p-2 rounded-full text-gray-500 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors"
        >
          <Icon name="share" size={20} />
        </button>
      </div>
    </div>
  );
};

// Helper function to format large numbers
function formatCount(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
}

PostActions.displayName = 'PostActions';
