import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProfileHeader } from './ProfileHeader';
import { ProfileTabs, type ProfileTab } from './ProfileTabs';
import { ProfilePostGrid } from './ProfilePostGrid';
import { EditProfileModal, type ProfileData } from './EditProfileModal';
import { FeedCard } from '@components/organisms/FeedCard';
import { Icon } from '@components/atoms/Icon';
import { useAuth } from '@/hooks/context/useAuth';
import { useUserById } from '@/hooks/queries/useUsers';
import { useUpdateProfile } from '@/hooks/mutations/useUsers';
import { useUserPosts } from '@/hooks';
import { useFollowStats, useFollowingStatus } from '@/hooks';
import { useFollowUser, useUnfollowUser } from '@/hooks';
import { useUserLikes } from '@/hooks/queries/useLikes';
import { getRelativeTime } from '@/utils/helpers';

export interface ProfilePageProps {
  userId?: string;
}

export const ProfilePage: React.FC<ProfilePageProps> = () => {
  const { userId: routeUserId } = useParams<{ userId: string }>();
  const { auth } = useAuth();
  const currentUserId = auth.user?._id || '';

  const profileUserId = routeUserId || currentUserId;
  const isOwnProfile = !routeUserId || routeUserId === currentUserId;

  const [activeTab, setActiveTab] = useState<ProfileTab>('posts');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data: userData, isLoading: userLoading } = useUserById(profileUserId);
  const { data: postsData } = useUserPosts(profileUserId);
  const { data: followStatsData } = useFollowStats(profileUserId);
  const { data: followingStatusData } = useFollowingStatus(isOwnProfile ? '' : profileUserId);
  const { data: likesData } = useUserLikes(isOwnProfile ? currentUserId : '');

  const followUser = useFollowUser();
  const unfollowUser = useUnfollowUser();
  const updateProfile = useUpdateProfile();

  const isFollowing = followingStatusData?.data?.isFollowing ?? false;

  const user = userData?.data;
  const posts = postsData?.data ?? [];
  const followersCount = followStatsData?.data?.followersCount ?? 0;
  const followingCount = followStatsData?.data?.followingCount ?? 0;
  const likedPosts = likesData?.data ?? [];

  const handleFollowClick = () => {
    if (isFollowing) {
      unfollowUser.mutate(profileUserId);
    } else {
      followUser.mutate(profileUserId);
    }
  };

  const handleSaveProfile = async (data: ProfileData) => {
    await updateProfile.mutateAsync({
      name: data.name,
      bio: data.bio,
      avatarUrl: data.avatarUrl,
    });
    setIsEditModalOpen(false);
  };

  const renderEmptyState = (type: string) => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center mb-4">
        <Icon
          name={type === 'posts' ? 'home' : type === 'replies' ? 'comment' : 'heart'}
          size={32}
          className="text-orange-400"
        />
      </div>
      <h3 className="text-xl font-black text-white mb-2">
        {type === 'posts' && 'No posts yet'}
        {type === 'replies' && 'No replies yet'}
        {type === 'likes' && 'No likes yet'}
      </h3>
      <p className="text-slate-500 text-center max-w-sm">
        {type === 'posts' && (isOwnProfile
          ? 'When you post something, it will show up here.'
          : "This user hasn't posted anything yet.")}
        {type === 'replies' && (isOwnProfile
          ? 'When you reply to posts, they will show up here.'
          : "This user hasn't replied to any posts yet.")}
        {type === 'likes' && (isOwnProfile
          ? 'Posts you like will appear here.'
          : "This user hasn't liked any posts yet.")}
      </p>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return posts.length > 0 ? (
          <div className="bg-white/3 rounded-2xl overflow-hidden border border-white/5">
            <div className="divide-y divide-white/5">
              {posts.map((post: { _id: string; content: string; author: { username: string; avatarUrl?: string }; likes?: number; comments?: number; createdAt: string }) => (
                <FeedCard
                  key={post._id}
                  id={post._id}
                  author={{
                    name: post.author?.username || user?.username || '',
                    username: post.author?.username || user?.username || '',
                    avatarUrl: post.author?.avatarUrl || user?.avatarUrl,
                    isVerified: false,
                  }}
                  content={post.content}
                  language="English"
                  likesCount={post.likes || 0}
                  commentsCount={post.comments || 0}
                  sharesCount={0}
                  timestamp={getRelativeTime(post.createdAt)}
                />
              ))}
            </div>
          </div>
        ) : renderEmptyState('posts');

      case 'replies':
        return renderEmptyState('replies');

      case 'media':
        return (
          <ProfilePostGrid
            items={[]}
            onItemClick={(item) => console.log('Clicked:', item)}
          />
        );

      case 'likes':
        return likedPosts.length > 0 ? (
          <div className="bg-white/3 rounded-2xl overflow-hidden border border-white/5">
            <div className="divide-y divide-white/5">
              {likedPosts.map((like: { _id: string; post?: { _id: string; content: string; author: { username: string; avatarUrl?: string }; likes?: number; comments?: number; createdAt: string } }) => {
                const post = like.post;
                if (!post) return null;
                return (
                  <FeedCard
                    key={like._id}
                    id={post._id}
                    author={{
                      name: post.author?.username || '',
                      username: post.author?.username || '',
                      avatarUrl: post.author?.avatarUrl,
                      isVerified: false,
                    }}
                    content={post.content}
                    language="English"
                    likesCount={post.likes || 0}
                    commentsCount={post.comments || 0}
                    sharesCount={0}
                    isLiked={true}
                    timestamp={getRelativeTime(post.createdAt)}
                  />
                );
              })}
            </div>
          </div>
        ) : renderEmptyState('likes');

      default:
        return null;
    }
  };

  if (userLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 rounded-full border-2 border-orange-400/30 border-t-cyan-400 animate-spin" />
      </div>
    );
  }

  const profileUser = {
    id: user._id || user.id || profileUserId,
    name: user.name || user.username,
    username: user.username,
    avatarUrl: user.avatarUrl,
    bio: user.bio,
    joinDate: user.createdAt
      ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      : '',
    isVerified: user.isVerified,
    followersCount,
    followingCount,
    postsCount: posts.length,
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #0e0805 0%, #130a04 100%)' }}>
      {/* Back button for mobile */}
      <div className="sticky top-0 z-20 flex items-center gap-4 px-4 py-3 backdrop-blur-xl border-b border-white/5 lg:hidden"
        style={{ background: 'rgba(5,6,10,0.85)' }}
      >
        <button
          onClick={() => window.history.back()}
          className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="font-black text-lg text-white">{profileUser.name}</h1>
          <p className="text-xs text-orange-400/60 font-mono">{posts.length} drops</p>
        </div>
      </div>

      <ProfileHeader
        user={profileUser}
        isOwnProfile={isOwnProfile}
        isFollowing={isFollowing}
        onFollowClick={handleFollowClick}
        onEditClick={() => setIsEditModalOpen(true)}
        onMessageClick={() => console.log('Opening messages...')}
        onMoreClick={() => console.log('Opening more options...')}
      />

      <ProfileTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={{
          posts: posts.length,
          replies: 0,
          media: 0,
          likes: likedPosts.length,
        }}
      />

      <div className="pb-20">
        {renderContent()}
      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
        initialData={{
          name: profileUser.name,
          bio: profileUser.bio || '',
          location: '',
          website: '',
          avatarUrl: profileUser.avatarUrl,
        }}
        isLoading={updateProfile.isPending}
      />
    </div>
  );
};

ProfilePage.displayName = 'ProfilePage';
