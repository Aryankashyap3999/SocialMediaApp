import React from 'react';
import { Icon } from '@components/atoms/Icon';
import { Button } from '@components/atoms/Button';

export interface ProfileHeaderProps {
  user: {
    id: string;
    name: string;
    username: string;
    avatarUrl?: string;
    coverUrl?: string;
    bio?: string;
    location?: string;
    website?: string;
    joinDate: string;
    isVerified?: boolean;
    followersCount: number;
    followingCount: number;
    postsCount: number;
  };
  isOwnProfile?: boolean;
  isFollowing?: boolean;
  onFollowClick?: () => void;
  onEditClick?: () => void;
  onMessageClick?: () => void;
  onMoreClick?: () => void;
}

/**
 * ProfileHeader Component
 * 
 * Displays user profile header with cover image, avatar, bio, and action buttons
 */
export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  isOwnProfile = false,
  isFollowing = false,
  onFollowClick,
  onEditClick,
  onMessageClick,
  onMoreClick,
}) => {
  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="relative h-48 sm:h-64 bg-linear-to-br from-cyan-500 via-cyan-400 to-amber-400">
        {user.coverUrl ? (
          <img
            src={user.coverUrl}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-cyan-500 via-cyan-400 to-amber-400">
            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="1" fill="white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
          </div>
        )}
        
        {/* Cover edit button for own profile */}
        {isOwnProfile && (
          <button className="absolute bottom-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors">
            <Icon name="image" size={20} />
          </button>
        )}
      </div>

      {/* Profile Info Section */}
      <div className="relative px-4 sm:px-6 pb-4">
        {/* Avatar */}
        <div className="relative -mt-16 sm:-mt-20 mb-4">
          <div className="relative inline-block">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-linear-to-br from-cyan-500 to-amber-400 p-1 shadow-xl">
              <div className="w-full h-full rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-950 ring-4 ring-slate-50 dark:ring-slate-950">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-cyan-400 to-amber-400 flex items-center justify-center text-white text-4xl font-bold">
                    {user.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>
            
            {/* Verified badge */}
            {user.isVerified && (
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-slate-50 dark:bg-slate-950 rounded-full flex items-center justify-center shadow-lg">
                <Icon name="verified" size={24} />
              </div>
            )}
            
            {/* Edit avatar button */}
            {isOwnProfile && (
              <button className="absolute bottom-2 right-2 p-2 bg-cyan-500 hover:bg-cyan-600 rounded-full text-white transition-colors shadow-lg">
                <Icon name="image" size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Name and Actions Row */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {user.name}
              </h1>
              {user.isVerified && (
                <Icon name="verified" size={20} className="text-cyan-400" />
              )}
            </div>
            <p className="text-slate-500 dark:text-slate-400">@{user.username}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {isOwnProfile ? (
              <Button
                onClick={onEditClick}
                className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 px-6"
              >
                Edit Profile
              </Button>
            ) : (
              <>
                <button
                  onClick={onMoreClick}
                  className="p-2.5 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Icon name="dotsVertical" size={20} className="text-slate-600 dark:text-slate-400" />
                </button>
                
                <button
                  onClick={onMessageClick}
                  className="p-2.5 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Icon name="messages" size={20} className="text-slate-600 dark:text-slate-400" />
                </button>
                
                <Button
                  onClick={onFollowClick}
                  className={`px-6 ${
                    isFollowing
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-900/20 dark:hover:text-red-400'
                      : 'bg-linear-to-r from-cyan-500 to-amber-400 text-white hover:from-cyan-600 hover:to-amber-500 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.8)]'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="text-slate-700 dark:text-slate-300 text-[15px] leading-relaxed mb-4 max-w-2xl">
            {user.bio}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
          {user.location && (
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{user.location}</span>
            </div>
          )}
          
          {user.website && (
            <a
              href={user.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-cyan-500 dark:text-cyan-400 hover:underline"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <span>{user.website.replace(/^https?:\/\//, '')}</span>
            </a>
          )}
          
          <div className="flex items-center gap-1.5">
            <Icon name="calendar" size={16} />
            <span>Joined {user.joinDate}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6">
          <button className="group">
            <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
              {user.followingCount.toLocaleString()}
            </span>
            <span className="text-slate-500 dark:text-slate-400 ml-1">Following</span>
          </button>
          
          <button className="group">
            <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
              {user.followersCount.toLocaleString()}
            </span>
            <span className="text-slate-500 dark:text-slate-400 ml-1">Followers</span>
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-linear-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
    </div>
  );
};

ProfileHeader.displayName = 'ProfileHeader';
