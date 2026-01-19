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
    <article className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-3 sm:p-5 shadow-2xl shadow-indigo-500/10 transition-transform duration-300 hover:-translate-y-1">
      <div className="absolute inset-x-4 top-0 h-px bg-linear-to-r from-cyan-400/70 via-amber-400/50 to-transparent" />
      <div className="absolute -left-10 top-6 h-20 w-20 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="flex gap-3 sm:gap-4">
        {/* Avatar block */}
        <button onClick={onAuthorClick} className="shrink-0 relative">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl overflow-hidden ring-2 ring-cyan-400/50 bg-linear-to-br from-cyan-600 to-amber-500 shadow-lg shadow-cyan-500/40">
            {author.avatarUrl ? (
              <img src={author.avatarUrl} alt={author.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white font-bold text-sm sm:text-lg">
                {author.name.charAt(0)}
              </div>
            )}
          </div>
          {author.isVerified && (
            <span className="absolute -bottom-1 -right-1 px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] font-bold uppercase bg-white text-indigo-600 rounded-full shadow">Verified</span>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
          <div className="flex items-start justify-between gap-2 sm:gap-3">
            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-indigo-200/80">
                <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-white/5 border border-white/10 text-white font-semibold truncate max-w-30 sm:max-w-none">{author.name}</span>
                {author.username && <span className="text-indigo-200/70 truncate hidden xs:inline">@{author.username}</span>}
                <span className="text-indigo-200/50">•</span>
                <span className="text-indigo-200/80">{timestamp}</span>
                {language && <LanguageTag language={language} size="sm" />}
              </div>
              <h3 className="text-base sm:text-xl font-semibold text-white leading-tight line-clamp-2">{content.split('.')[0]}</h3>
            </div>
            <button
              onClick={onMoreClick}
              className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 text-indigo-100 hover:text-white hover:border-indigo-400/60 shrink-0"
            >
              <Icon name="dotsVertical" size={16} className="sm:hidden" />
              <Icon name="dotsVertical" size={18} className="hidden sm:block" />
            </button>
          </div>

          <p className="text-sm sm:text-base text-indigo-100/80 leading-relaxed whitespace-pre-wrap line-clamp-4 sm:line-clamp-none">{content}</p>

          {media && (
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-xl shadow-black/30">
              <div className="absolute inset-0 bg-linear-to-br from-cyan-400/15 to-amber-300/15" />
              {media.type === 'image' ? (
                <img src={media.url} alt="Post media" className="relative w-full object-cover max-h-64 sm:max-h-125" />
              ) : (
                <div className="relative">
                  <img src={media.url} alt="Video thumbnail" className="relative w-full object-cover max-h-64 sm:max-h-125" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/80 text-indigo-700 font-semibold shadow-lg shadow-white/30 backdrop-blur text-sm sm:text-base">
                      Play clip
                    </button>
                  </div>
                  {media.duration && (
                    <span className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/70 text-white text-[10px] sm:text-xs font-semibold">
                      {media.duration}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

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
