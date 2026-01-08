import type React from 'react';
import { Button, HeartIcon, CommentIcon, ShareIcon } from '@components/atoms';

export interface PostActionsProps {
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  isCompact?: boolean;
}

/**
 * PostActions Molecule
 * 
 * Combines: Button (Button) + Icons (HeartIcon, CommentIcon, ShareIcon) + Text
 * Single responsibility: Display post interaction buttons
 * 
 * @example
 * <PostActions 
 *   likes={42} 
 *   comments={8}
 *   shares={2}
 *   isLiked
 *   onLike={() => console.log('liked')}
 * />
 */
export const PostActions: React.FC<PostActionsProps> = ({
  likes,
  comments,
  shares,
  isLiked = false,
  onLike,
  onComment,
  onShare,
  isCompact = false,
}) => {
  const buttonSize = isCompact ? 'sm' : 'md';

  return (
    <div className={`flex gap-2 ${isCompact ? 'gap-1' : 'gap-3'}`}>
      <Button
        variant="ghost"
        size={buttonSize}
        onClick={onLike}
        className={`flex-1 flex items-center justify-center gap-2 ${isLiked ? 'text-error' : ''}`}
      >
        <HeartIcon
          size={isCompact ? 16 : 20}
          fill={isLiked ? 'currentColor' : 'none'}
        />
        {!isCompact && <span>{likes}</span>}
      </Button>

      <Button
        variant="ghost"
        size={buttonSize}
        onClick={onComment}
        className="flex-1 flex items-center justify-center gap-2"
      >
        <CommentIcon size={isCompact ? 16 : 20} />
        {!isCompact && <span>{comments}</span>}
      </Button>

      <Button
        variant="ghost"
        size={buttonSize}
        onClick={onShare}
        className="flex-1 flex items-center justify-center gap-2"
      >
        <ShareIcon size={isCompact ? 16 : 20} />
        {!isCompact && <span>{shares}</span>}
      </Button>
    </div>
  );
};

PostActions.displayName = 'PostActions';
