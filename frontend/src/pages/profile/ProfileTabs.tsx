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
    { id: 'posts', label: 'Drops', icon: 'home' },
    { id: 'replies', label: 'Replies', icon: 'comment' },
    { id: 'media', label: 'Media', icon: 'image' },
    { id: 'likes', label: 'Resonances', icon: 'heart' },
  ];

  return (
    <div className="sticky top-0 z-10 border-b border-white/5 backdrop-blur-xl"
      style={{ background: 'rgba(5,6,10,0.85)' }}
    >
      <nav className="flex">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const count = counts[tab.id];

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 relative flex items-center justify-center gap-1.5 px-3 py-3.5 text-xs font-bold transition-all
                ${isActive ? 'text-cyan-300' : 'text-slate-500 hover:text-slate-300'}
              `}
            >
              <Icon name={tab.icon} size={15} filled={isActive} className={isActive ? 'text-cyan-300' : ''} />
              <span>{tab.label}</span>
              {count !== undefined && count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold
                  ${isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/5 text-slate-500'}
                `}>
                  {count > 999 ? `${(count / 1000).toFixed(1)}k` : count}
                </span>
              )}
              {isActive && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-linear-to-r from-cyan-500 to-amber-400 rounded-full" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

ProfileTabs.displayName = 'ProfileTabs';
