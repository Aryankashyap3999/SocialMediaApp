import React, { useState, useMemo, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@components/atoms/Icon';
import { Avatar } from '@components/atoms/Avatar';
import { SectionHeader } from '@components/atoms/SectionHeader';
import { TabIndicator } from '@components/atoms/TabIndicator';
import { FeedCard } from '@components/organisms/FeedCard';
import { useFeed } from '@/hooks/queries/usePosts';
import { useAllUsers } from '@/hooks/queries/useUsers';
import { useFollowUser, useUnfollowUser } from '@/hooks/mutations/useFollow';
import { useFollowing, useFollowers } from '@/hooks/queries/useFollow';
import { useLikePost, useUnlikePost, useBookmarkPost, useUnbookmarkPost, useEchoPost } from '@/hooks';
import { useTrendingTags, useTrendingPosts, useTrendingUsers } from '@/hooks/queries/useTrending';
import { useSearch } from '@/hooks/queries/useSearch';
import { useAuth } from '@/hooks/context/useAuth';
import { useSearchHistory } from '@/hooks/useSearchHistory';
import type { SearchHistoryItem } from '@/hooks/useSearchHistory';
import { getRelativeTime, formatNumber } from '@/utils/helpers';

type ViewMode = 'explore' | 'trending' | 'people';

// Signal bars based on follower count
const SignalBars: React.FC<{ count: number; size?: 'sm' | 'md' }> = ({ count, size = 'sm' }) => {
  const strength = count >= 500 ? 5 : count >= 100 ? 4 : count >= 50 ? 3 : count >= 10 ? 2 : 1;
  const w = size === 'sm' ? 'w-1' : 'w-1.5';
  return (
    <div className="flex items-end gap-0.5">
      {[1, 2, 3, 4, 5].map(bar => (
        <div
          key={bar}
          className={`${w} rounded-full transition-all
            ${bar <= strength ? 'bg-orange-400' : 'bg-white/10'}
          `}
          style={{ height: `${bar * (size === 'sm' ? 2.5 : 3) + 3}px` }}
        />
      ))}
    </div>
  );
};

// Unique broadcaster card
const BroadcasterCard: React.FC<{
  user: any;
  isFollowing: boolean;
  followsYou: boolean;
  onFollow: () => void;
  onUnfollow: () => void;
  isPending: boolean;
  isMe: boolean;
}> = ({ user, isFollowing, followsYou, onFollow, onUnfollow, isPending, isMe }) => {
  const navigate = useNavigate();
  const userId = user.id || user._id;
  const followers = user.followersCount || user.followers || 0;

  return (
    <div
      onClick={() => navigate(`/profile/${userId}`)}
      className={`relative group rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer
        ${followsYou
          ? 'border-orange-400/30 bg-orange-500/5 hover:border-orange-400/50'
          : 'border-white/8 bg-white/3 hover:border-white/15 hover:bg-white/5'
        }
      `}
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 bg-linear-to-r from-orange-500/0 via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative p-4 flex items-center gap-3">
        {/* Avatar with ring */}
        <div className="relative shrink-0">
          <div className={`p-0.5 rounded-full transition-all
            ${followsYou
              ? 'bg-linear-to-br from-orange-400 to-amber-400 shadow-lg shadow-orange-500/25'
              : isFollowing
              ? 'bg-linear-to-br from-orange-500/60 to-emerald-400/60'
              : 'bg-white/10'
            }
          `}>
            <div className="p-0.5 bg-[#0e0805] rounded-full">
              <Avatar src={user.avatarUrl} alt={user.name || user.username} size="md" />
            </div>
          </div>

          {/* "Tunes in to you" pulse */}
          {followsYou && (
            <span className="absolute inset-0 rounded-full border-2 border-orange-400/50 animate-ping" />
          )}
        </div>

        {/* User info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-bold text-sm text-white truncate">{user.name || user.username}</p>
            {user.isVerified && <Icon name="verified" size={13} className="text-amber-300 shrink-0" />}
          </div>
          <p className="text-xs text-orange-400/60 font-mono truncate">@{user.username}</p>

          <div className="flex items-center gap-2 mt-1">
            <SignalBars count={followers} />
            <span className="text-[10px] text-slate-600">{formatNumber(followers)} listeners</span>
            {followsYou && (
              <span className="flex items-center gap-0.5 text-[10px] font-semibold text-orange-400 bg-orange-500/10 border border-orange-400/20 px-1.5 py-0.5 rounded-full">
                <span>📡</span> tunes in to you
              </span>
            )}
          </div>

          {user.bio && (
            <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{user.bio}</p>
          )}
        </div>

        {/* Follow / Unfollow button */}
        {!isMe && (
          <button
            onClick={e => { e.stopPropagation(); isFollowing ? onUnfollow() : onFollow(); }}
            disabled={isPending}
            className={`shrink-0 px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50
              ${isFollowing
                ? 'border border-white/10 bg-white/5 text-slate-300 hover:border-red-400/30 hover:text-red-400 hover:bg-red-500/5'
                : 'bg-linear-to-r from-orange-500 to-amber-400 text-white shadow-lg shadow-orange-500/20 hover:from-orange-400 hover:to-amber-300 hover:shadow-orange-500/30'
              }
            `}
          >
            {isPending ? '…' : isFollowing ? 'Tuned In' : 'Tune In'}
          </button>
        )}
      </div>
    </div>
  );
};

// Search history dropdown
const HistoryDropdown: React.FC<{
  history: SearchHistoryItem[];
  onSelect: (item: SearchHistoryItem) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}> = ({ history, onSelect, onRemove, onClear }) => {
  if (history.length === 0) return (
    <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl border border-white/10 bg-[#130a04]/98 backdrop-blur-xl shadow-2xl shadow-black/60 overflow-hidden">
      <div className="px-4 py-6 text-center">
        <span className="text-2xl">📡</span>
        <p className="text-xs text-slate-500 mt-2">No recent signals</p>
      </div>
    </div>
  );

  return (
    <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl border border-white/10 bg-[#130a04]/98 backdrop-blur-xl shadow-2xl shadow-black/60 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
        <span className="text-[10px] font-black uppercase tracking-widest text-orange-400/60 font-mono">Recent Signals</span>
        <button
          onMouseDown={e => { e.preventDefault(); onClear(); }}
          className="text-[10px] text-slate-500 hover:text-red-400 transition-colors font-semibold"
        >
          Clear all
        </button>
      </div>

      {/* Items */}
      <div className="py-1">
        {history.map(item => (
          <div
            key={item.id}
            className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 group transition-colors"
          >
            {/* Icon / avatar */}
            <div className="shrink-0">
              {item.type === 'user' && item.avatarUrl ? (
                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
                  <img src={item.avatarUrl} alt="" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Text — click area */}
            <button
              onMouseDown={e => { e.preventDefault(); onSelect(item); }}
              className="flex-1 text-left min-w-0"
            >
              <p className="text-sm font-semibold text-slate-200 truncate">
                {item.type === 'user' ? (item.name || item.username) : item.query}
              </p>
              {item.type === 'user' && (
                <p className="text-[11px] text-orange-400/60 font-mono">@{item.username}</p>
              )}
            </button>

            {/* Remove */}
            <button
              onMouseDown={e => { e.preventDefault(); e.stopPropagation(); onRemove(item.id); }}
              className="shrink-0 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-white/10 transition-all"
            >
              <svg className="w-3 h-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const DiscoverPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('explore');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isPeopleSearchFocused, setIsPeopleSearchFocused] = useState(false);
  const [peopleSearch, setPeopleSearch] = useState('');
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { history, addSearch, addUser, removeItem, clearAll } = useSearchHistory();
  // Map of userId → boolean override (true = just followed, false = just unfollowed)
  const [followOverrides, setFollowOverrides] = useState<Map<string, boolean>>(new Map());
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());

  const { auth } = useAuth();
  const currentUserId = auth.user?._id || '';

  const { data: feedData, isLoading: feedLoading } = useFeed(30, 0);
  const { data: usersData, isLoading: usersLoading } = useAllUsers();
  const { data: trendingTagsData } = useTrendingTags(10);
  const { data: trendingPostsData, isLoading: trendingLoading } = useTrendingPosts(15);
  const { data: trendingUsersData } = useTrendingUsers(8);
  const { data: searchData, isLoading: searchLoading } = useSearch(searchQuery, 'all', searchQuery.length >= 2);

  // Who I follow + who follows me
  const { data: followingData } = useFollowing(currentUserId, 200, 0);
  const { data: followersData } = useFollowers(currentUserId, 200, 0);

  const followMutation = useFollowUser();
  const unfollowMutation = useUnfollowUser();
  const likeMutation = useLikePost();
  const unlikeMutation = useUnlikePost();
  const bookmarkMutation = useBookmarkPost();
  const unbookmarkMutation = useUnbookmarkPost();
  const echoMutation = useEchoPost();

  const posts: any[] = feedData?.data ?? [];
  const users: any[] = usersData?.data ?? [];
  const trendingTags: { tag: string; count: number }[] = trendingTagsData?.data ?? [];
  const trendingPosts: any[] = trendingPostsData?.data ?? [];
  const trendingUsersList: { user: any; newFollowers: number }[] = trendingUsersData?.data ?? [];

  // Build sets from API data for fast lookup
  const followingIds = useMemo<Set<string>>(() => {
    const set = new Set<string>();
    (followingData?.data ?? []).forEach((f: any) => {
      const id = f.following?.id || f.following?._id || (typeof f.following === 'string' ? f.following : null);
      if (id) set.add(id);
    });
    return set;
  }, [followingData]);

  const followerIds = useMemo<Set<string>>(() => {
    const set = new Set<string>();
    (followersData?.data ?? []).forEach((f: any) => {
      const id = f.follower?.id || f.follower?._id || (typeof f.follower === 'string' ? f.follower : null);
      if (id) set.add(id);
    });
    return set;
  }, [followersData]);

  const isFollowingUser = useCallback((userId: string): boolean => {
    if (followOverrides.has(userId)) return followOverrides.get(userId)!;
    return followingIds.has(userId);
  }, [followOverrides, followingIds]);

  const handleFollow = useCallback((userId: string) => {
    setPendingIds(p => new Set(p).add(userId));
    setFollowOverrides(m => new Map(m).set(userId, true));
    followMutation.mutate(userId, {
      onSettled: () => setPendingIds(p => { const s = new Set(p); s.delete(userId); return s; }),
      onError: () => setFollowOverrides(m => { const n = new Map(m); n.delete(userId); return n; }),
    });
  }, [followMutation]);

  const handleUnfollow = useCallback((userId: string) => {
    setPendingIds(p => new Set(p).add(userId));
    setFollowOverrides(m => new Map(m).set(userId, false));
    unfollowMutation.mutate(userId, {
      onSettled: () => setPendingIds(p => { const s = new Set(p); s.delete(userId); return s; }),
      onError: () => setFollowOverrides(m => { const n = new Map(m); n.delete(userId); return n; }),
    });
  }, [unfollowMutation]);

  const isSearching = searchQuery.length >= 2;
  const searchResults = searchData?.data;

  const filteredPosts = useMemo(() => {
    if (isSearching && searchResults) return searchResults.posts ?? [];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return posts.filter(p => p.content?.toLowerCase().includes(q) || p.author?.username?.toLowerCase().includes(q));
    }
    return posts;
  }, [posts, searchQuery, isSearching, searchResults]);

  const filteredUsers = useMemo(() => {
    if (isSearching && searchResults) return searchResults.users ?? [];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return users.filter(u => u.username?.toLowerCase().includes(q) || u.name?.toLowerCase().includes(q));
    }
    return users;
  }, [users, searchQuery, isSearching, searchResults]);

  const exploreGridPosts = useMemo(() => filteredPosts.filter((p: any) => p.media?.url), [filteredPosts]);

  // People tab filtered users
  const peopleList = useMemo(() => {
    const q = peopleSearch.toLowerCase();
    return users.filter(u => {
      if (!q) return true;
      return u.username?.toLowerCase().includes(q) || u.name?.toLowerCase().includes(q);
    });
  }, [users, peopleSearch]);

  // Split: not yet following (excluding self) vs already following
  const suggestedPeople = useMemo(
    () => peopleList.filter(u => {
      const id = u.id || u._id;
      return id !== currentUserId && !isFollowingUser(id);
    }),
    [peopleList, currentUserId, isFollowingUser]
  );

  const followingPeople = useMemo(
    () => peopleList.filter(u => {
      const id = u.id || u._id;
      return id !== currentUserId && isFollowingUser(id);
    }),
    [peopleList, currentUserId, isFollowingUser]
  );

  const renderPostCard = (post: any) => (
    <FeedCard
      key={post._id}
      id={post._id}
      author={{
        name: post.author?.name || post.author?.username || 'Unknown',
        username: post.author?.username,
        avatarUrl: post.author?.avatarUrl,
        isVerified: post.author?.isVerified,
      }}
      content={post.content}
      language={post.language}
      media={post.media?.url ? { type: post.media.type, url: post.media.url } : undefined}
      likesCount={post.likes || 0}
      commentsCount={post.comments || 0}
      sharesCount={post.shares || 0}
      echoCount={post.echoCount || 0}
      signalStrength={post.signalStrength || 0}
      isLiked={post.isLiked || false}
      isEcho={post.isEcho}
      isBoosted={post.isBoosted}
      boostTier={post.boostTier}
      timestamp={getRelativeTime(post.createdAt)}
      onLike={() => post.isLiked ? unlikeMutation.mutate(post._id) : likeMutation.mutate(post._id)}
      onBookmark={() => post.isBookmarked ? unbookmarkMutation.mutate(post._id) : bookmarkMutation.mutate(post._id)}
      onEcho={() => echoMutation.mutate(post._id)}
      onComment={() => {}}
      onShare={() => {}}
      onAuthorClick={() => {}}
    />
  );

  const renderBroadcasterCard = (user: any, badge?: number) => {
    const id = user.id || user._id;
    return (
      <div key={id} onClick={() => addUser({ id, username: user.username, name: user.name, avatarUrl: user.avatarUrl })}>
        {badge !== undefined && (
          <div className="mb-1 px-1">
            <span className="text-[10px] text-emerald-400 font-mono">+{badge} new listeners this week</span>
          </div>
        )}
        <BroadcasterCard
          user={user}
          isFollowing={isFollowingUser(id)}
          followsYou={followerIds.has(id)}
          onFollow={() => handleFollow(id)}
          onUnfollow={() => handleUnfollow(id)}
          isPending={pendingIds.has(id)}
          isMe={id === currentUserId}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #0e0805 0%, #130a04 100%)' }}>
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 border-b border-white/5 backdrop-blur-xl"
        style={{ background: 'rgba(14,8,5,0.90)' }}
      >
        <div className="px-4 py-3">
          <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-[1.01]' : ''}`}>
            <div className={`absolute inset-0 bg-linear-to-r from-orange-500/12 via-emerald-400/8 to-amber-300/12 rounded-2xl blur-xl transition-opacity duration-300 ${isSearchFocused ? 'opacity-100' : 'opacity-0'}`} />
            <div className="relative flex items-center">
              <Icon name="search" size={18} className={`absolute left-4 transition-colors ${isSearchFocused ? 'text-orange-400' : 'text-slate-500'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (blurTimer.current) clearTimeout(blurTimer.current);
                  setIsSearchFocused(true);
                }}
                onBlur={() => {
                  blurTimer.current = setTimeout(() => setIsSearchFocused(false), 150);
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    addSearch(searchQuery);
                  }
                }}
                placeholder="Search drops, topics, or broadcasters…"
                className="w-full bg-white/5 border-2 border-transparent rounded-2xl py-3 pl-11 pr-4 text-sm text-slate-100 focus:outline-none focus:border-orange-400/50 transition-all placeholder:text-slate-600"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-4 p-1 hover:bg-white/10 rounded-full transition-colors">
                  <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* History dropdown — shown when focused and no active query */}
            {isSearchFocused && !searchQuery && (
              <HistoryDropdown
                history={history}
                onSelect={item => {
                  if (item.type === 'user' && item.userId) {
                    navigate(`/profile/${item.userId}`);
                  } else {
                    setSearchQuery(item.query);
                  }
                  setIsSearchFocused(false);
                }}
                onRemove={removeItem}
                onClear={clearAll}
              />
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-t border-white/5">
          {([
            { id: 'explore', label: 'Explore' },
            { id: 'trending', label: 'Pulse' },
            { id: 'people', label: 'Frequencies' },
          ] as const).map(tab => (
            <button
              key={tab.id}
              onClick={() => setViewMode(tab.id)}
              className={`flex-1 py-3 text-xs font-bold relative transition-colors ${viewMode === tab.id ? 'text-orange-300' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {tab.label}
              {viewMode === tab.id && <TabIndicator thick />}
            </button>
          ))}
        </div>
      </div>

      <div className="pb-20">
        {/* Search results overlay */}
        {isSearching && (
          <div className="p-4 space-y-6">
            {searchLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-2 border-orange-400/30 border-t-orange-400 rounded-full animate-spin" />
              </div>
            ) : (
              <>
                {filteredUsers.length > 0 && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-orange-400/60 font-mono mb-3">Broadcasters ({filteredUsers.length})</p>
                    <div className="space-y-2">
                      {filteredUsers.slice(0, 5).map((u: any) => renderBroadcasterCard(u))}
                    </div>
                  </div>
                )}
                {filteredPosts.length > 0 && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-orange-400/60 font-mono mb-3">Drops ({filteredPosts.length})</p>
                    <div className="space-y-3">{filteredPosts.slice(0, 10).map(renderPostCard)}</div>
                  </div>
                )}
                {filteredUsers.length === 0 && filteredPosts.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-3xl mb-3">📡</p>
                    <p className="font-bold text-white">No signal for "{searchQuery}"</p>
                    <p className="text-sm text-slate-500 mt-1">Try a different frequency</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Explore Grid */}
        {!isSearching && viewMode === 'explore' && (
          <div>
            {feedLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-orange-400/30 border-t-orange-400 rounded-full animate-spin" />
              </div>
            ) : exploreGridPosts.length === 0 ? (
              <div className="text-center py-16 text-slate-500">
                <p className="text-3xl mb-3">📡</p>
                <p className="font-semibold">No drops with media yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-0.5">
                {exploreGridPosts.map((post: any, index: number) => (
                  <button key={post._id} className={`relative aspect-square group overflow-hidden bg-white/5 ${index === 0 ? 'col-span-2 row-span-2' : ''}`}>
                    <img src={post.media.url} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    {post.isBoosted && (
                      <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-full bg-amber-500/80 text-white text-[10px] font-bold">⚡</div>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="flex items-center gap-3 text-white text-xs font-bold">
                        <span className="flex items-center gap-1"><Icon name="heart" size={14} filled className="text-amber-300" />{formatNumber(post.likes || 0)}</span>
                        <span className="flex items-center gap-1"><Icon name="comment" size={14} />{formatNumber(post.comments || 0)}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Pulse / Trending */}
        {!isSearching && viewMode === 'trending' && (
          <div>
            {trendingTags.length > 0 && (
              <div className="p-4 border-b border-white/5">
                <p className="text-xs font-bold uppercase tracking-widest text-orange-400/60 font-mono mb-4">Trending Signals</p>
                <div className="space-y-2">
                  {trendingTags.map((item, index) => (
                    <button
                      key={item.tag}
                      onClick={() => setSearchQuery(item.tag)}
                      className="w-full flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/8 hover:border-orange-400/30 transition-colors group"
                    >
                      <span className="text-lg font-black text-slate-700 group-hover:text-orange-300 transition-colors w-6 text-center">{index + 1}</span>
                      <div className="flex-1 text-left">
                        <p className="font-bold text-slate-100 group-hover:text-orange-300 text-sm">#{item.tag}</p>
                        <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                          <Icon name="trending" size={11} className="text-amber-300" />
                          {item.count} drops · last 48h
                        </p>
                      </div>
                      <Icon name="chevronRight" size={14} className="text-slate-700 group-hover:text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-orange-400/60 font-mono mb-4">Hot Drops</p>
              {trendingLoading ? (
                <div className="flex items-center justify-center py-10">
                  <div className="w-8 h-8 border-2 border-orange-400/30 border-t-orange-400 rounded-full animate-spin" />
                </div>
              ) : trendingPosts.length === 0 ? (
                <div className="text-center py-10 text-slate-500">
                  <p className="text-3xl mb-2">📡</p>
                  <p className="text-sm">No trending drops yet</p>
                </div>
              ) : (
                <div className="space-y-4">{trendingPosts.map(renderPostCard)}</div>
              )}
            </div>
          </div>
        )}

        {/* Frequencies — People Discovery */}
        {!isSearching && viewMode === 'people' && (
          <div className="p-4 space-y-6">
            {/* People-specific search */}
            <div className="relative">
              <Icon name="search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={peopleSearch}
                onChange={e => setPeopleSearch(e.target.value)}
                onFocus={() => {
                  if (blurTimer.current) clearTimeout(blurTimer.current);
                  setIsPeopleSearchFocused(true);
                }}
                onBlur={() => {
                  blurTimer.current = setTimeout(() => setIsPeopleSearchFocused(false), 150);
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' && peopleSearch.trim()) addSearch(peopleSearch);
                }}
                placeholder="Search broadcasters by name or @handle…"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 focus:outline-none focus:border-orange-400/40 transition-all placeholder:text-slate-600"
              />
              {peopleSearch && (
                <button onClick={() => setPeopleSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors">
                  <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}

              {/* People history dropdown */}
              {isPeopleSearchFocused && !peopleSearch && (
                <HistoryDropdown
                  history={history.filter(h => h.type === 'user')}
                  onSelect={item => {
                    if (item.userId) navigate(`/profile/${item.userId}`);
                    else setPeopleSearch(item.query);
                    setIsPeopleSearchFocused(false);
                  }}
                  onRemove={removeItem}
                  onClear={clearAll}
                />
              )}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-[11px] text-slate-600 px-1">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-linear-to-br from-orange-400 to-amber-400 inline-block" />
                Tunes in to you
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-white/10 border border-white/20 inline-block" />
                Not yet connected
              </span>
            </div>

            {/* Rising Broadcasters — trending users */}
            {!peopleSearch && trendingUsersList.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-black uppercase tracking-widest text-orange-400/60 font-mono">Rising Signals</span>
                  <div className="flex-1 h-px bg-linear-to-r from-orange-500/20 to-transparent" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="space-y-2">
                  {trendingUsersList.map(({ user, newFollowers }) => user && renderBroadcasterCard(user, newFollowers))}
                </div>
              </div>
            )}

            {/* Users I haven't followed yet */}
            {suggestedPeople.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-black uppercase tracking-widest text-orange-400/60 font-mono">
                    {peopleSearch ? 'Results' : 'Suggested Frequencies'}
                  </span>
                  <div className="flex-1 h-px bg-linear-to-r from-orange-500/20 to-transparent" />
                  <span className="text-[10px] text-slate-600">{suggestedPeople.length}</span>
                </div>
                {usersLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-6 h-6 border-2 border-orange-400/30 border-t-orange-400 rounded-full animate-spin" />
                  </div>
                ) : (
                  <div className="space-y-2">
                    {suggestedPeople.map(u => renderBroadcasterCard(u))}
                  </div>
                )}
              </div>
            )}

            {/* Users already following */}
            {followingPeople.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-600 font-mono">Tuned In</span>
                  <div className="flex-1 h-px bg-linear-to-r from-white/5 to-transparent" />
                  <span className="text-[10px] text-slate-600">{followingPeople.length}</span>
                </div>
                <div className="space-y-2">
                  {followingPeople.map(u => renderBroadcasterCard(u))}
                </div>
              </div>
            )}

            {peopleList.length === 0 && !usersLoading && (
              <div className="text-center py-16">
                <p className="text-3xl mb-3">📡</p>
                <p className="font-bold text-white">No broadcasters found</p>
                <p className="text-sm text-slate-500 mt-1">Try a different frequency</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

DiscoverPage.displayName = 'DiscoverPage';
