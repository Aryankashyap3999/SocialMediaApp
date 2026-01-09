import React, { useState } from 'react';
import { PostActions } from '@components/molecules/PostActions';
import { LanguageTag } from '@components/molecules/LanguageTag';
import { Icon } from '@components/atoms/Icon';

export interface FeedCardProps {
  id: string;
  author: {
    name: string;
    username?: string;
    avatarUrl?: string;
    isVerified?: boolean;
  };
  content: string;
  language?: string;
  media?: {
    type: 'image' | 'video';
    url: string;
    aspectRatio?: string;
    duration?: string;
  };
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  timestamp: string;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
  onAuthorClick?: () => void;
  onMoreClick?: () => void;
}

/**
 * FeedCard Organism
 * Unique post card design for Aptoodate
 */
export const FeedCard: React.FC<FeedCardProps> = ({
  author,
  content,
  language,
  media,
  likesCount,
  commentsCount,
  sharesCount,
  isLiked = false,
  isBookmarked = false,
  timestamp,
  onLike,
  onComment,
  onShare,
  onBookmark,
  onAuthorClick,
  onMoreClick,
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [likes, setLikes] = useState(likesCount);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
    onLike?.();
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    onBookmark?.();
  };

  return (
    <article className="group relative px-4 py-4 transition-all duration-300 hover:bg-linear-to-r hover:from-violet-500/5 hover:to-transparent">
      {/* Left accent line on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-violet-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-r" />
      
      {/* Divider line */}
      <div className="absolute bottom-0 left-16 right-4 h-px bg-linear-to-r from-gray-200 dark:from-gray-800 to-transparent" />
      
      <div className="flex gap-3">
        {/* Avatar with unique border */}
        <button onClick={onAuthorClick} className="shrink-0 group/avatar">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-violet-500 to-indigo-500 p-0.5 transition-transform group-hover/avatar:scale-110 group-hover/avatar:rotate-3">
              <div className="w-full h-full rounded-[10px] overflow-hidden bg-white dark:bg-gray-950">
                {author.avatarUrl ? (
                  <img src={author.avatarUrl} alt={author.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white font-bold">
                    {author.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>
            {author.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white dark:bg-gray-950 rounded-full flex items-center justify-center">
                <Icon name="verified" size={16} />
              </div>
            )}
          </div>
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-1">
            <button
              onClick={onAuthorClick}
              className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5"
            >
              <span className="font-bold text-[15px] hover:underline">{author.name}</span>
              {author.username && (
                <span className="text-gray-500 text-sm">@{author.username}</span>
              )}
              <span className="text-gray-400 text-sm">·</span>
              <span className="text-gray-500 text-sm">{timestamp}</span>
              {language && (
                <span className="ml-1">
                  <LanguageTag language={language} size="sm" />
                </span>
              )}
            </button>
            
            <button
              onClick={onMoreClick}
              className="p-2 -m-2 hover:bg-violet-100 dark:hover:bg-violet-900/30 rounded-xl transition-colors group/more"
            >
              <Icon name="dotsVertical" size={18} className="text-gray-400 group-hover/more:text-violet-600" />
            </button>
          </div>

          {/* Text Content */}
          <p className="text-[15px] text-gray-900 dark:text-gray-100 whitespace-pre-wrap mb-3 leading-relaxed">
            {content}
          </p>

          {/* Media with unique styling */}
          {media && (
            <div className="relative rounded-2xl overflow-hidden mb-3 group/media">
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-linear-to-br from-violet-500/20 to-indigo-500/20 opacity-0 group-hover/media:opacity-100 transition-opacity pointer-events-none z-10 rounded-2xl" />
              
              {media.type === 'image' ? (
                <img
                  src={media.url}
                  alt="Post media"
                  className="w-full object-cover max-h-125 transition-transform duration-500 group-hover/media:scale-[1.02]"
                />
              ) : (
                <div className="relative">
                  <img
                    src={media.url}
                    alt="Video thumbnail"
                    className="w-full object-cover max-h-125"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Play button - unique design */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="relative w-20 h-20 group/play">
                      {/* Animated rings */}
                      <div className="absolute inset-0 rounded-2xl bg-white/20 backdrop-blur-sm animate-ping opacity-75" />
                      <div className="relative w-full h-full rounded-2xl bg-linear-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-2xl shadow-violet-500/50 transition-transform group-hover/play:scale-110">
                        <Icon name="play" size={32} className="text-white ml-1" />
                      </div>
                    </button>
                  </div>
                  
                  {/* Duration badge */}
                  {media.duration && (
                    <span className="absolute bottom-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-xs font-bold rounded-lg">
                      {media.duration}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <PostActions
            likesCount={likes}
            commentsCount={commentsCount}
            sharesCount={sharesCount}
            isLiked={liked}
            isBookmarked={bookmarked}
            onLike={handleLike}
            onComment={onComment}
            onShare={onShare}
            onBookmark={handleBookmark}
          />
        </div>
      </div>
    </article>
  );
};

FeedCard.displayName = 'FeedCard';
