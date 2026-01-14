import React from 'react';
import { Icon } from '@components/atoms/Icon';

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
  likesCount?: number;
  commentsCount?: number;
  duration?: string;
}

export interface ProfilePostGridProps {
  items: MediaItem[];
  onItemClick?: (item: MediaItem) => void;
}

/**
 * ProfilePostGrid Component
 * 
 * Grid display for profile media/posts
 */
export const ProfilePostGrid: React.FC<ProfilePostGridProps> = ({
  items,
  onItemClick,
}) => {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
          <Icon name="image" size={32} className="text-cyan-400 dark:text-cyan-500" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          No media yet
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-center max-w-sm">
          When you post photos or videos, they will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-0.5 sm:gap-1">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onItemClick?.(item)}
          className="relative aspect-square group overflow-hidden bg-slate-100 dark:bg-slate-800"
        >
          <img
            src={item.thumbnailUrl || item.url}
            alt=""
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Video duration badge */}
          {item.type === 'video' && item.duration && (
            <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/70 rounded text-white text-xs font-medium">
              {item.duration}
            </div>
          )}
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
            {item.likesCount !== undefined && (
              <div className="flex items-center gap-1.5 text-white">
                <Icon name="heart" size={20} filled />
                <span className="font-semibold">
                  {item.likesCount > 999 
                    ? `${(item.likesCount / 1000).toFixed(1)}k` 
                    : item.likesCount
                  }
                </span>
              </div>
            )}
            {item.commentsCount !== undefined && (
              <div className="flex items-center gap-1.5 text-white">
                <Icon name="comment" size={20} />
                <span className="font-semibold">
                  {item.commentsCount > 999 
                    ? `${(item.commentsCount / 1000).toFixed(1)}k` 
                    : item.commentsCount
                  }
                </span>
              </div>
            )}
          </div>
          
          {/* Video play icon */}
          {item.type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon name="play" size={24} className="text-white ml-1" />
              </div>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

ProfilePostGrid.displayName = 'ProfilePostGrid';
