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
  echoCount?: number;
  signalStrength?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  isEcho?: boolean;
  echoAuthorName?: string;
  isBoosted?: boolean;
  boostTier?: 'pulse' | 'flash' | 'broadcast';
  timestamp: string;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
  onEcho?: () => void;
  onBoost?: () => void;
  onAuthorClick?: () => void;
  onMoreClick?: () => void;
}

const BOOST_COLORS = {
  pulse: 'from-emerald-500 to-cyan-500',
  flash: 'from-amber-400 to-orange-500',
  broadcast: 'from-purple-500 to-pink-500',
};

export const FeedCard: React.FC<FeedCardProps> = ({
  author,
  content,
  language,
  media,
  likesCount,
  commentsCount,
  sharesCount,
  echoCount = 0,
  signalStrength = 0,
  isLiked = false,
  isBookmarked = false,
  isEcho = false,
  echoAuthorName,
  isBoosted = false,
  boostTier,
  timestamp,
  onLike,
  onComment,
  onShare,
  onBookmark,
  onEcho,
  onBoost,
  onAuthorClick,
  onMoreClick,
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [likes, setLikes] = useState(likesCount);
  const [echoes, setEchoes] = useState(echoCount);
  const [imageError, setImageError] = useState(false);
  const [showBoostMenu, setShowBoostMenu] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
    onLike?.();
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    onBookmark?.();
  };

  const handleEcho = () => {
    setEchoes(prev => prev + 1);
    onEcho?.();
  };

  const boostColor = boostTier ? BOOST_COLORS[boostTier] : null;
  const strengthLevel = Math.min(100, signalStrength);

  return (
    <article className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl border backdrop-blur-xl p-3 sm:p-5 shadow-2xl transition-transform duration-300 hover:-translate-y-1 ${
      isBoosted && boostTier
        ? `border-transparent bg-linear-to-br ${boostColor}/10 shadow-${boostTier === 'broadcast' ? 'purple' : boostTier === 'flash' ? 'amber' : 'emerald'}-500/20`
        : 'border-orange-500/10 bg-[#1a0d05]/60 shadow-orange-950/30'
    }`}>
      {/* Boost indicator strip */}
      {isBoosted && boostTier && (
        <div className={`absolute inset-x-0 top-0 h-0.5 bg-linear-to-r ${boostColor}`} />
      )}
      {/* Warm saffron top accent line */}
      <div className="absolute inset-x-4 top-0 h-px bg-linear-to-r from-amber-600/30 via-amber-500/20 to-transparent" />
      {/* Warm ambient glow blob */}
      <div className="absolute -left-10 top-6 h-20 w-20 rounded-full bg-orange-500/8 blur-3xl" />

      {/* Echo banner */}
      {isEcho && echoAuthorName && (
        <div className="flex items-center gap-1.5 text-xs text-orange-300/70 mb-2 px-1">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3"/>
          </svg>
          <span>Echoed by {echoAuthorName}</span>
        </div>
      )}

      {/* Boost badge */}
      {isBoosted && boostTier && (
        <div className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-linear-to-r ${boostColor} text-white shadow-lg`}>
          ⚡ {boostTier}
        </div>
      )}

      <div className="flex gap-3 sm:gap-4">
        {/* Avatar */}
        <button onClick={onAuthorClick} className="shrink-0 relative">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl overflow-hidden ring-1 ring-amber-700/40 bg-linear-to-br from-amber-700 to-orange-700 shadow-md shadow-amber-950/30">
            {author.avatarUrl ? (
              <img src={author.avatarUrl} alt={author.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white font-bold text-sm sm:text-lg">
                {author.name.charAt(0)}
              </div>
            )}
          </div>
          {author.isVerified && (
            <span className="absolute -bottom-1 -right-1 px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] font-bold uppercase bg-orange-500 text-white rounded-full shadow">✓</span>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
          <div className="flex items-start justify-between gap-2 sm:gap-3">
            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-amber-100/80">
                <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-white font-semibold truncate max-w-30 sm:max-w-none">{author.name}</span>
                {author.username && <span className="text-amber-200/60 truncate hidden xs:inline">@{author.username}</span>}
                <span className="text-amber-200/40">•</span>
                <span className="text-amber-100/70">{timestamp}</span>
                {language && <LanguageTag language={language} size="sm" />}
              </div>
              <h3 className="text-base sm:text-xl font-semibold text-white leading-tight line-clamp-2" style={{ fontFamily: "'Baloo 2', sans-serif" }}>{content.split('.')[0]}</h3>
            </div>
            <button
              onClick={onMoreClick}
              className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-orange-500/5 border border-orange-500/10 text-amber-100/70 hover:text-white hover:border-orange-400/40 shrink-0 transition-colors"
            >
              <Icon name="dotsVertical" size={16} className="sm:hidden" />
              <Icon name="dotsVertical" size={18} className="hidden sm:block" />
            </button>
          </div>

          <p className="text-sm sm:text-base text-amber-50/80 leading-relaxed whitespace-pre-wrap line-clamp-4 sm:line-clamp-none">{content}</p>

          {media && (
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-orange-500/10 shadow-xl shadow-black/30">
              <div className="absolute inset-0 bg-linear-to-br from-orange-400/10 to-amber-300/10" />
              {imageError ? (
                <div className="relative w-full h-48 sm:h-64 flex items-center justify-center bg-linear-to-br from-[#1a0d05] to-[#120a04]">
                  <div className="text-center text-slate-400">
                    <Icon name="image" size={48} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Image not available</p>
                  </div>
                </div>
              ) : media.type === 'image' ? (
                <img src={media.url} alt="Post media" className="relative w-full object-cover max-h-64 sm:max-h-125" onError={() => setImageError(true)} />
              ) : (
                <div className="relative">
                  <img src={media.url} alt="Video thumbnail" className="relative w-full object-cover max-h-64 sm:max-h-125" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-orange-500/80 text-white font-semibold shadow-lg backdrop-blur text-sm sm:text-base">▶ Play clip</button>
                  </div>
                  {media.duration && (
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-black/70 text-white text-[10px] font-semibold">{media.duration}</span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Signal Strength Bar */}
          {strengthLevel > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-orange-400/60 font-mono uppercase tracking-widest">Signal</span>
              <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                <div
                  className={`h-full rounded-full bg-linear-to-r transition-all duration-500 ${
                    strengthLevel >= 80 ? 'from-rose-500 to-pink-400' :
                    strengthLevel >= 50 ? 'from-amber-400 to-orange-400' :
                    'from-orange-500 to-amber-400'
                  }`}
                  style={{ width: `${strengthLevel}%` }}
                />
              </div>
              <span className="text-[10px] text-orange-400/60 font-mono w-6 text-right">{strengthLevel}</span>
            </div>
          )}

          {/* Actions row */}
          <div className="flex items-center justify-between">
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

            {/* Echo + Boost buttons */}
            <div className="flex items-center gap-1">
              {/* Echo button */}
              <button
                onClick={handleEcho}
                title="Echo this drop"
                className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs text-orange-400/70 hover:text-orange-300 hover:bg-orange-500/10 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {echoes > 0 && <span>{echoes}</span>}
              </button>

              {/* Boost button */}
              {onBoost && (
                <div className="relative">
                  <button
                    onClick={() => setShowBoostMenu(!showBoostMenu)}
                    title="Boost signal"
                    className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs text-amber-400/70 hover:text-amber-300 hover:bg-amber-500/10 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                    </svg>
                    <span>Boost</span>
                  </button>
                  {showBoostMenu && (
                    <div className="absolute bottom-full right-0 mb-2 w-40 rounded-xl border border-orange-500/20 bg-[#1a0d05]/95 backdrop-blur-xl shadow-2xl z-20 overflow-hidden">
                      {(['pulse', 'flash', 'broadcast'] as const).map(tier => (
                        <button
                          key={tier}
                          onClick={() => { onBoost(); setShowBoostMenu(false); }}
                          className={`w-full px-3 py-2 text-left text-xs font-semibold capitalize bg-linear-to-r ${BOOST_COLORS[tier]} bg-clip-text text-transparent hover:bg-white/10 transition-colors`}
                        >
                          ⚡ {tier} (24h)
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

FeedCard.displayName = 'FeedCard';
