import React from 'react';
import { FeedCard } from '@components/organisms/FeedCard';
import { useUserBookmarks, useUnbookmarkPost } from '@/hooks';
import { useLikePost, useUnlikePost } from '@/hooks';
import { getRelativeTime } from '@/utils/helpers';

export const BookmarksPage: React.FC = () => {
  const { data, isLoading } = useUserBookmarks();
  const unbookmarkMutation = useUnbookmarkPost();
  const likeMutation = useLikePost();
  const unlikeMutation = useUnlikePost();

  const bookmarks: any[] = data?.data ?? [];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-500/30">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 3a2 2 0 00-2 2v16l7-3 7 3V5a2 2 0 00-2-2H5z"/>
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Saved Drops</h1>
          <p className="text-sm text-slate-400">Your bookmarked signals</p>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="text-center py-16 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="w-12 h-12 mx-auto border-2 border-orange-400/30 border-t-cyan-400 rounded-full animate-spin" />
        </div>
      )}

      {/* Empty state */}
      {!isLoading && bookmarks.length === 0 && (
        <div className="text-center py-20 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 3a2 2 0 00-2 2v16l7-3 7 3V5a2 2 0 00-2-2H5z"/>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No saved drops</h3>
          <p className="text-slate-400">Bookmark drops to find them here later</p>
        </div>
      )}

      {/* Bookmarked posts */}
      <div className="space-y-4">
        {bookmarks.map((bookmark: any) => {
          const post = bookmark.post;
          if (!post) return null;
          return (
            <FeedCard
              key={bookmark.id}
              id={post._id}
              author={{
                name: post.author?.name || post.author?.username,
                username: post.author?.username,
                avatarUrl: post.author?.avatarUrl,
              }}
              content={post.content}
              media={post.media?.url ? { type: post.media.type, url: post.media.url } : undefined}
              likesCount={post.likes || 0}
              commentsCount={post.comments || 0}
              sharesCount={post.shares || 0}
              echoCount={post.echoCount || 0}
              signalStrength={post.signalStrength || 0}
              isLiked={post.isLiked}
              isBookmarked={true}
              isBoosted={post.isBoosted}
              boostTier={post.boostTier}
              timestamp={getRelativeTime(post.createdAt)}
              onLike={() => post.isLiked ? unlikeMutation.mutate(post._id) : likeMutation.mutate(post._id)}
              onComment={() => {}}
              onShare={() => {}}
              onBookmark={() => unbookmarkMutation.mutate(post._id)}
              onAuthorClick={() => {}}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BookmarksPage;
