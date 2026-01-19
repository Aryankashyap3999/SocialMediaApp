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
    <div className="flex items-center justify-between pt-2 border-t border-white/5">
      {/* Left Actions */}
      <div className="flex items-center -ml-1 sm:-ml-2 gap-0.5 sm:gap-1">
        {/* Reply/Comment */}
        <button
          onClick={onComment}
          className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full text-indigo-100 hover:text-white bg-white/5 hover:bg-indigo-500/20 border border-white/10 transition-colors group"
        >
          <Icon name="comment" size={18} className="sm:hidden" />
          <Icon name="comment" size={20} className="hidden sm:block" />
          {showCounts && commentsCount > 0 && (
            <span className="text-xs sm:text-sm group-hover:text-white">{formatCount(commentsCount)}</span>
          )}
        </button>

        {/* Repost */}
        <button
          onClick={onShare}
          className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full text-indigo-100 hover:text-white bg-white/5 hover:bg-emerald-500/20 border border-white/10 transition-colors group"
        >
          <Icon name="repost" size={18} className="sm:hidden" />
          <Icon name="repost" size={20} className="hidden sm:block" />
          {showCounts && sharesCount > 0 && (
            <span className="text-xs sm:text-sm group-hover:text-white">{formatCount(sharesCount)}</span>
          )}
        </button>

        {/* Like */}
        <button
          onClick={onLike}
          className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full border border-white/10 transition-colors group ${
            isLiked 
              ? 'text-amber-200 bg-amber-500/20' 
              : 'text-indigo-100 bg-white/5 hover:text-white hover:bg-amber-400/20'
          }`}
        >
          <Icon name="heart" size={18} filled={isLiked} className={`sm:hidden ${isLiked ? 'animate-[heartBeat_0.3s_ease-in-out]' : ''}`} />
          <Icon name="heart" size={20} filled={isLiked} className={`hidden sm:block ${isLiked ? 'animate-[heartBeat_0.3s_ease-in-out]' : ''}`} />
          {showCounts && likesCount > 0 && (
            <span className={`text-xs sm:text-sm ${isLiked ? 'text-amber-50' : 'group-hover:text-white'}`}>
              {formatCount(likesCount)}
            </span>
          )}
        </button>

        {/* Stats - Hidden on mobile */}
        <button
          className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full text-indigo-100 bg-white/5 border border-white/10 hover:text-white hover:bg-indigo-500/20 transition-colors"
        >
          <Icon name="stats" size={20} />
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Bookmark */}
        <button
          onClick={onBookmark}
          className={`p-1.5 sm:p-2 rounded-full border border-white/10 transition-colors ${
            isBookmarked 
              ? 'text-indigo-200 bg-indigo-500/15' 
              : 'text-indigo-100 bg-white/5 hover:text-white hover:bg-indigo-500/20'
          }`}
        >
          <Icon name="bookmark" size={18} filled={isBookmarked} className="sm:hidden" />
          <Icon name="bookmark" size={20} filled={isBookmarked} className="hidden sm:block" />
        </button>

        {/* Share */}
        <button
          onClick={onShare}
          className="p-1.5 sm:p-2 rounded-full text-indigo-100 bg-white/5 border border-white/10 hover:text-white hover:bg-indigo-500/20 transition-colors"
        >
          <Icon name="share" size={18} className="sm:hidden" />
          <Icon name="share" size={20} className="hidden sm:block" />
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
