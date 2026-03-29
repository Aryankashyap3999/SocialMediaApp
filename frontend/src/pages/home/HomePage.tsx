import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FeedCard } from '@components/organisms/FeedCard';
import { ComposeBox } from '@components/organisms/ComposeBox';
import { FestivalBanner } from '@components/organisms/FestivalBanner';
import { RightSidebar } from '@components/organisms/RightSidebar';
import { StoriesBar } from '@components/organisms/StoriesBar';
import { useDropStore } from '@/store/useDropStore';
import { useModalStore } from '@/store/useModalStore';
import type { Story } from '@components/organisms/StoriesBar';
import { SignalViewerModal } from './SignalViewerModal';
import type { Drop, SignalTier } from '@/store/useDropStore';
import { useFeed, useLikePost, useUnlikePost, useBookmarkPost, useUnbookmarkPost, useEchoPost, useBoostPost } from '@/hooks';
import { useActiveStories } from '@/hooks/queries/useStories';
import { useTrendingTags, useTrendingUsers } from '@/hooks/queries/useTrending';
import { useAuth } from '@/hooks/context/useAuth';
import { getRelativeTime } from '@/utils/helpers';

/**
 * HomePage
 * Main feed page with unique Aptoodate design
 */
export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const drops = useDropStore((state) => state.drops);
  const likeDrop = useDropStore((state) => state.likeDrop);
  const { openModal } = useModalStore();
  const { auth } = useAuth();
  
  // State for viewing a signal/story
  const [selectedSignal, setSelectedSignal] = useState<Drop | null>(null);
  const [isSignalViewerOpen, setIsSignalViewerOpen] = useState(false);

  // Fetch feed from API
  const { data: feedData, isLoading, error } = useFeed(20, 0);
  const likePostMutation = useLikePost();
  const unlikePostMutation = useUnlikePost();
  const bookmarkPostMutation = useBookmarkPost();
  const unbookmarkPostMutation = useUnbookmarkPost();
  const echoPostMutation = useEchoPost();
  const boostPostMutation = useBoostPost();

  // Fetch trending data for RightSidebar
  const { data: trendingTagsData } = useTrendingTags(5);
  const { data: trendingUsersData } = useTrendingUsers(5);

  // Transform trending tags → RightSidebar trending prop
  interface ApiTag { tag: string; count: number; heat?: number }
  interface ApiTrendingUser { id: string; _id?: string; username: string; name?: string; avatarUrl?: string; followersCount?: number }

  const trendingTopics = useMemo(() => {
    const tags: ApiTag[] = trendingTagsData?.data ?? [];
    return tags.map((t, i) => ({
      id: `tag-${i}`,
      category: 'Trending',
      title: `#${t.tag}`,
      postsCount: t.count >= 1000 ? `${(t.count / 1000).toFixed(1)}K` : `${t.count}`,
      heat: t.heat,
    }));
  }, [trendingTagsData]);

  // Transform trending users → RightSidebar suggestions prop
  const trendingSuggestions = useMemo(() => {
    const users: ApiTrendingUser[] = trendingUsersData?.data ?? [];
    return users.map((u) => ({
      id: u._id || u.id,
      name: u.name || u.username,
      username: u.username,
      avatarUrl: u.avatarUrl,
      mutualFollowers: u.followersCount ? `${u.followersCount} listeners` : undefined,
    }));
  }, [trendingUsersData]);

  // Fetch stories from API
  const { data: storiesData } = useActiveStories(20, 0);

  // Get only published posts and reels for the feed (from local store), sorted by most recent
  const feedDrops = drops
    .filter((drop) => drop.status === 'published' && (drop.type === 'post' || drop.type === 'reel'))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  interface ApiStory {
    id: string;
    user?: { id: string; username: string; avatarUrl?: string };
    media?: { type: string; url: string };
    caption?: string;
    signalTier?: SignalTier;
    viewers?: number;
    createdAt?: string;
  }

  // Full API story data keyed by id for quick lookup in handleStoryClick
  const apiStoryMap = useMemo(() => {
    const map: Record<string, ApiStory> = {};
    (storiesData?.data ?? []).forEach((s: ApiStory) => { map[s.id] = s; });
    return map;
  }, [storiesData]);

  // Convert API stories to Story format for StoriesBar
  const apiStories: Story[] = useMemo(() => {
    if (!storiesData?.data) return [];
    return (storiesData.data as ApiStory[]).map((story) => ({
      id: story.id,
      username: story.user?.username || 'user',
      avatarUrl: story.user?.avatarUrl || '',
      hasUnwatched: true,
      signalTier: story.signalTier || 'pulse',
    }));
  }, [storiesData]);

  // Get user's own stories (signals) from local store for now
  // TODO: Replace with API call when user auth is implemented
  const userStories = useMemo(() => {
    return drops
      .filter((drop) => drop.status === 'published' && drop.type === 'story')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [drops]);

  // Create combined stories list for StoriesBar
  const allStories: Story[] = useMemo(() => {
    const latestUserStory = userStories[0];
    const yourStory: Story = {
      id: 'your_story',
      username: userStories.length > 0 ? 'Your signal' : 'Add signal',
      avatarUrl: latestUserStory?.media[0]?.url || '',
      isYou: true,
      hasUnwatched: userStories.length > 0,
      signalTier: latestUserStory?.signalTier,
    };
    
    // Convert user's stories to Story format (show other recent ones)
    const userSignalItems: Story[] = userStories.slice(1).map((drop) => ({
      id: drop.id,
      username: drop.authorName.split(' ')[0].toLowerCase(),
      avatarUrl: drop.media[0]?.url || drop.authorAvatar,
      hasUnwatched: true,
      signalTier: drop.signalTier,
    }));
    
    // Combine: Your story + user stories + API stories
    return [yourStory, ...userSignalItems, ...apiStories];
  }, [userStories, apiStories]);

  const handleShare = (postId: string) => {
    const url = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(url).catch(() => {});
  };

  const handleAuthorClick = (username?: string) => {
    if (username) navigate(`/profile/${username}`);
  };

  const handleStoryClick = (story: Story) => {
    // "Your story" card
    if (story.isYou) {
      if (userStories.length > 0) {
        setSelectedSignal(userStories[0]);
        setIsSignalViewerOpen(true);
      } else {
        openModal('createStory', { source: 'storyBar' });
      }
      return;
    }

    // Check local store first (user-created stories)
    const localStory = drops.find(d => d.id === story.id && d.type === 'story');
    if (localStory) {
      setSelectedSignal(localStory);
      setIsSignalViewerOpen(true);
      return;
    }

    // Fall back to API story
    const apiStory = apiStoryMap[story.id];
    if (apiStory) {
      const drop: Drop = {
        id: apiStory.id,
        type: 'story',
        status: 'published',
        signalTier: apiStory.signalTier || 'pulse',
        caption: apiStory.caption || '',
        media: apiStory.media
          ? [{ id: apiStory.id, type: apiStory.media.type as 'image' | 'video', url: apiStory.media.url }]
          : [],
        authorId: apiStory.user?.id || '',
        authorName: apiStory.user?.username || '',
        authorAvatar: apiStory.user?.avatarUrl || '',
        likes: apiStory.viewers || 0,
        comments: 0,
        shares: 0,
        views: apiStory.viewers || 0,
        tags: [],
        mentions: [],
        createdAt: apiStory.createdAt || new Date().toISOString(),
        updatedAt: apiStory.createdAt || new Date().toISOString(),
        commentsEnabled: true,
        likesVisible: true,
        shareEnabled: true,
      };
      setSelectedSignal(drop);
      setIsSignalViewerOpen(true);
    }
  };

  const handleCloseSignalViewer = () => {
    setIsSignalViewerOpen(false);
    setSelectedSignal(null);
  };

  return (
    <div className="relative max-w-7xl mx-auto px-3 sm:px-4 pb-12 pt-4 lg:pt-0 space-y-4 sm:space-y-6">
      {/* Hero banner - Indian warm theme */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-orange-500/15 bg-[#1a0d05]/70 backdrop-blur-xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-orange-950/30">
        {/* Warm Indian ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.15),transparent_45%),radial-gradient(circle_at_78%_0%,rgba(232,185,35,0.12),transparent_38%)]" />
        {/* Subtle rangoli dot pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,153,51,1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="relative flex flex-col gap-4">
          <div className="space-y-2">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-orange-200/70">Aptoodate / Signal Desk</p>
            <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-white leading-tight" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
              Broadcast signals,<br className="sm:hidden" /> not stories
            </h1>
            <p className="text-sm sm:text-base text-amber-50/70 max-w-2xl hidden sm:block">Swap endless scroll for signals, capsules, and editorial drops. Drop a note, pin a moment, broadcast an idea.</p>
          </div>
          <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-orange-200 text-xs sm:text-sm w-fit">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 animate-pulse" />
            Live desk
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 lg:gap-5">
        <div className="xl:col-span-8 space-y-4 lg:space-y-5">
          {/* Indian festival banner — shows when within 7 days of a major festival */}
          <FestivalBanner />

          {/* Signal Capsules */}
          <StoriesBar 
            stories={allStories}
            onStoryClick={handleStoryClick}
            onAddStory={() => openModal('createStory', { source: 'stories' })}
          />

          {/* Compose box */}
          <ComposeBox />

          {/* Feed stack - Using real API data */}
          <div className="space-y-4">
            {/* Loading state */}
            {isLoading && (
              <div className="text-center py-16 rounded-3xl border border-orange-500/10 bg-[#1a0d05]/50 backdrop-blur-xl">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-orange-400/30 border-t-orange-400 animate-spin" />
                <p className="text-amber-200/50">Loading feed...</p>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="text-center py-16 rounded-3xl border border-red-500/20 bg-red-500/5 backdrop-blur-xl">
                <p className="text-red-400">Failed to load feed. Please try again.</p>
              </div>
            )}

            {/* Show API posts */}
            {feedData?.data?.map((post: {
                _id: string; content: string; language?: string;
                media?: { type: 'image'|'video'; url: string; duration?: string };
                author: { username: string; name?: string; avatarUrl?: string };
                likes: number; comments: number; shares: number;
                echoCount?: number; signalStrength?: number;
                isLiked?: boolean; isBookmarked?: boolean;
                isEcho?: boolean; isBoosted?: boolean; boostTier?: 'pulse'|'flash'|'broadcast';
                createdAt: string;
              }) => (
              <FeedCard
                key={post._id}
                id={post._id}
                author={{
                  name: post.author?.name || post.author?.username,
                  username: post.author?.username,
                  avatarUrl: post.author?.avatarUrl,
                  isVerified: false,
                }}
                content={post.content}
                language={post.language || 'English'}
                media={post.media?.url ? { type: post.media.type, url: post.media.url, duration: post.media.duration } : undefined}
                likesCount={post.likes || 0}
                commentsCount={post.comments || 0}
                sharesCount={post.shares || 0}
                echoCount={post.echoCount || 0}
                signalStrength={post.signalStrength || 0}
                isLiked={post.isLiked}
                isEcho={post.isEcho}
                echoAuthorName={post.isEcho ? post.author?.username : undefined}
                isBoosted={post.isBoosted}
                boostTier={post.boostTier}
                timestamp={getRelativeTime(post.createdAt)}
                onLike={() => post.isLiked ? unlikePostMutation.mutate(post._id) : likePostMutation.mutate(post._id)}
                onComment={() => navigate(`/post/${post._id}#comments`)}
                onShare={() => handleShare(post._id)}
                onBookmark={() => post.isBookmarked ? unbookmarkPostMutation.mutate(post._id) : bookmarkPostMutation.mutate(post._id)}
                onEcho={() => echoPostMutation.mutate(post._id)}
                onBoost={() => boostPostMutation.mutate({ postId: post._id, tier: 'flash' })}
                onAuthorClick={() => handleAuthorClick(post.author?.username)}
              />
            ))}

            {/* Show user-created drops from store */}
            {feedDrops.map((drop) => (
              <FeedCard
                key={drop.id}
                id={drop.id}
                author={{
                  name: drop.authorName,
                  username: drop.authorId,
                  avatarUrl: drop.authorAvatar,
                  isVerified: false,
                }}
                content={drop.caption}
                language="English"
                media={drop.media[0] ? {
                  type: drop.media[0].type === 'video' ? 'video' : 'image',
                  url: drop.media[0].url,
                } : undefined}
                likesCount={drop.likes}
                commentsCount={drop.comments}
                sharesCount={drop.shares}
                timestamp={getRelativeTime(drop.createdAt)}
                onLike={() => likeDrop(drop.id)}
                onComment={() => navigate(`/post/${drop.id}#comments`)}
                onShare={() => handleShare(drop.id)}
                onAuthorClick={() => handleAuthorClick(drop.authorId)}
              />
            ))}

            {/* Show empty state only if API data and drops are empty */}
            {!isLoading && feedData && feedData.data?.length === 0 && feedDrops?.length === 0 && (
              <div className="text-center py-16 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <svg className="w-10 h-10 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No drops yet</h3>
                <p className="text-slate-400 mb-6">Be the first to launch a drop!</p>
                <button
                  onClick={() => openModal('createPost', { source: 'feed' })}
                  className="px-6 py-3 rounded-xl bg-linear-to-r from-cyan-500 to-amber-400 text-slate-950 font-bold hover:opacity-90 transition-opacity"
                >
                  Launch a Drop
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right column - Hidden on mobile, visible on xl */}
        <div className="hidden xl:block xl:col-span-4">
          <RightSidebar
            currentUser={{ name: auth.user?.username || 'User', username: auth.user?.username || 'user', avatarUrl: auth.user?.avatarUrl || '' }}
            suggestions={trendingSuggestions}
            trending={trendingTopics}
          />
        </div>
      </div>

      {/* Signal Viewer Modal */}
      <SignalViewerModal
        isOpen={isSignalViewerOpen}
        onClose={handleCloseSignalViewer}
        signal={selectedSignal}
      />
    </div>
  );
};


HomePage.displayName = 'HomePage';
