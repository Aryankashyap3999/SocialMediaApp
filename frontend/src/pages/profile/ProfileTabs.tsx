import React from 'react';
import { Icon } from '@components/atoms/Icon';

export type ProfileTab = 'posts' | 'replies' | 'media' | 'likes';

export interface ProfileTabsProps {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
  counts?: {
    posts?: number;
    replies?: number;
    media?: number;
    likes?: number;
  };
}

/**
 * ProfileTabs Component
 * 
 * Tab navigation for different profile content sections
 */
export const ProfileTabs: React.FC<ProfileTabsProps> = ({
  activeTab,
  onTabChange,
  counts = {},
}) => {
  const tabs: { id: ProfileTab; label: string; icon: string }[] = [
    { id: 'posts', label: 'Posts', icon: 'home' },
    { id: 'replies', label: 'Replies', icon: 'comment' },
    { id: 'media', label: 'Media', icon: 'image' },
    { id: 'likes', label: 'Likes', icon: 'heart' },
  ];

  return (
    <div className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <nav className="flex">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const count = counts[tab.id];

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex-1 relative flex items-center justify-center gap-2 px-4 py-4
                font-medium text-sm transition-colors
                ${isActive 
                  ? 'text-cyan-500 dark:text-cyan-400' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900/50'
                }
              `}
            >
              <Icon 
                name={tab.icon} 
                size={18} 
                filled={isActive}
                className={isActive ? 'text-cyan-500 dark:text-cyan-400' : ''}
              />
              <span>{tab.label}</span>
              {count !== undefined && count > 0 && (
                <span className={`
                  text-xs px-1.5 py-0.5 rounded-full
                  ${isActive 
                    ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }
                `}>
                  {count > 999 ? `${(count / 1000).toFixed(1)}k` : count}
                </span>
              )}
              
              {/* Active indicator */}
              {isActive && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-linear-to-r from-cyan-500 to-amber-400 rounded-full" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

ProfileTabs.displayName = 'ProfileTabs';
