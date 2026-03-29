import React from 'react';
import { Icon } from '@components/atoms/Icon';

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

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  isOwnProfile = false,
  isFollowing = false,
  onFollowClick,
  onEditClick,
  onMessageClick,
  onMoreClick,
}) => {
  // Simple signal strength from public stats
  const signalStrength = Math.min(100, user.followersCount * 2 + user.postsCount * 3);
  const strengthColor =
    signalStrength >= 70 ? 'from-purple-500 to-pink-400' :
    signalStrength >= 40 ? 'from-amber-400 to-orange-400' :
    'from-orange-500 to-emerald-400';

  return (
    <div className="relative">
      {/* Cover — dark radar pattern */}
      <div className="relative h-44 sm:h-56 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0e0805 0%, #130a04 60%, #050608 100%)' }}
      >
        {user.coverUrl ? (
          <img src={user.coverUrl} alt="Cover" className="w-full h-full object-cover opacity-60" />
        ) : (
          <>
            {/* Radar rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {[200, 150, 100, 60].map((r, i) => (
                <div key={r} className="absolute rounded-full border border-orange-500/10"
                  style={{ width: r * 2, height: r * 2, animation: `pulse ${3 + i * 0.5}s ease-in-out ${i * 0.4}s infinite` }}
                />
              ))}
              <div className="w-2 h-2 rounded-full bg-orange-400/40 shadow-[0_0_16px_4px_rgba(249,115,22,0.3)]" />
            </div>
            {/* Ambient glows */}
            <div className="absolute top-0 left-1/4 w-48 h-48 rounded-full bg-orange-500/8 blur-[80px]" />
            <div className="absolute bottom-0 right-1/4 w-40 h-40 rounded-full bg-amber-400/6 blur-[60px]" />
          </>
        )}

        {/* Cover edit */}
        {isOwnProfile && (
          <button className="absolute bottom-3 right-4 px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-sm border border-white/10 text-xs text-slate-300 hover:bg-black/70 hover:text-white transition-all flex items-center gap-1.5">
            <Icon name="image" size={14} />
            <span>Edit cover</span>
          </button>
        )}
      </div>

      {/* Profile info section */}
      <div className="relative px-4 sm:px-6 pb-4"
        style={{ background: 'linear-gradient(180deg, #130a04 0%, #0e0805 100%)' }}
      >
        {/* Avatar row */}
        <div className="flex items-end justify-between -mt-12 sm:-mt-16 mb-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl p-0.5 bg-linear-to-br from-orange-500 to-amber-400 shadow-xl shadow-orange-500/20">
              <div className="w-full h-full rounded-[14px] overflow-hidden bg-[#0e0805]">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-orange-500/30 to-amber-400/20 flex items-center justify-center text-3xl font-black text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            {/* Verified badge */}
            {user.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#0e0805] border border-orange-400/30 flex items-center justify-center shadow-lg">
                <Icon name="verified" size={18} />
              </div>
            )}

            {/* Avatar edit button */}
            {isOwnProfile && (
              <button className="absolute bottom-1 right-1 w-7 h-7 rounded-xl bg-cyan-500 hover:bg-orange-400 flex items-center justify-center shadow-lg transition-colors">
                <Icon name="image" size={13} />
              </button>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 pb-1">
            {isOwnProfile ? (
              <button
                onClick={onEditClick}
                className="px-5 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-orange-400/30 text-sm font-bold text-white transition-all"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={onMoreClick}
                  className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <Icon name="dotsVertical" size={18} className="text-slate-400" />
                </button>
                <button
                  onClick={onMessageClick}
                  className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-orange-400/30 transition-all"
                >
                  <Icon name="messages" size={18} className="text-slate-400" />
                </button>
                <button
                  onClick={onFollowClick}
                  className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                    isFollowing
                      ? 'border border-white/10 bg-white/5 text-slate-300 hover:border-red-400/30 hover:text-red-400 hover:bg-red-500/5'
                      : 'bg-linear-to-r from-orange-500 to-amber-400 text-slate-950 shadow-lg shadow-orange-500/20 hover:from-orange-400 hover:to-amber-300'
                  }`}
                >
                  {isFollowing ? 'Tuned In' : 'Tune In'}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Name + username */}
        <div className="mb-3">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-white">{user.name}</h1>
            {user.isVerified && <Icon name="verified" size={18} className="text-orange-400" />}
          </div>
          <p className="text-sm text-orange-400/70 font-mono">@{user.username}</p>
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="text-sm text-slate-300 leading-relaxed mb-3 max-w-xl">{user.bio}</p>
        )}

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 mb-4">
          {user.location && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {user.location}
            </span>
          )}
          {user.website && (
            <a href={user.website} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-orange-400/70 hover:text-orange-300 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              {user.website.replace(/^https?:\/\//, '')}
            </a>
          )}
          <span className="flex items-center gap-1">
            <Icon name="calendar" size={13} />
            Broadcasting since {user.joinDate}
          </span>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-5 mb-4">
          <button className="group text-center">
            <span className="font-black text-white group-hover:text-orange-400 transition-colors text-lg leading-none">
              {user.followingCount.toLocaleString()}
            </span>
            <p className="text-xs text-slate-500 mt-0.5">Tuned In</p>
          </button>
          <button className="group text-center">
            <span className="font-black text-white group-hover:text-orange-400 transition-colors text-lg leading-none">
              {user.followersCount.toLocaleString()}
            </span>
            <p className="text-xs text-slate-500 mt-0.5">Listeners</p>
          </button>
          <div className="text-center">
            <span className="font-black text-white text-lg leading-none">{user.postsCount}</span>
            <p className="text-xs text-slate-500 mt-0.5">Drops</p>
          </div>
        </div>

        {/* Signal strength bar */}
        {signalStrength > 0 && (
          <div className="flex items-center gap-3">
            <p className="text-xs text-slate-600 font-mono uppercase tracking-wider shrink-0">Signal</p>
            <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div
                className={`h-full rounded-full bg-linear-to-r ${strengthColor} transition-all duration-500`}
                style={{ width: `${signalStrength}%` }}
              />
            </div>
            <p className="text-xs font-bold text-slate-500 shrink-0">{signalStrength}</p>
          </div>
        )}
      </div>

      {/* Bottom border */}
      <div className="h-px bg-linear-to-r from-transparent via-orange-500/15 to-transparent" />
    </div>
  );
};

ProfileHeader.displayName = 'ProfileHeader';
