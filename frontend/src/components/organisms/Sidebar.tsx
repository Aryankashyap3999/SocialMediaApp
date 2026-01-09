import React from 'react';
import { NavItem } from '@components/molecules/NavItem';
import { Avatar } from '@components/atoms/Avatar';

export interface SidebarProps {
  isCollapsed?: boolean;
  currentUser?: {
    name: string;
    username?: string;
    avatarUrl?: string;
  };
  unreadMessages?: number;
  unreadNotifications?: number;
  onCreateClick?: () => void;
}

/**
 * Sidebar Organism
 * Unique navigation sidebar for Aptoodate
 */
export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed = false,
  currentUser,
  unreadMessages = 0,
  unreadNotifications = 0,
  onCreateClick,
}) => {
  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen bg-white dark:bg-gray-950
        border-r border-gray-100 dark:border-gray-800
        flex flex-col justify-between py-5 px-3
        transition-all duration-300 z-40
        ${isCollapsed ? 'w-20' : 'w-64 xl:w-72'}
      `}
    >
      {/* Logo */}
      <div className="mb-8 px-3">
        {isCollapsed ? (
          <div className="w-10 h-10 bg-linear-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-linear-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <h1 className="text-xl font-bold bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Aptoodate
            </h1>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        <NavItem to="/home" icon="home" label="Home" isCollapsed={isCollapsed} />
        <NavItem to="/discover" icon="discover" label="Discover" isCollapsed={isCollapsed} />
        <NavItem to="/stories" icon="stories" label="Stories" isCollapsed={isCollapsed} />
        <NavItem 
          to="/notifications" 
          icon="notifications" 
          label="Notifications" 
          badge={unreadNotifications} 
          isCollapsed={isCollapsed} 
        />
        <NavItem 
          to="/messages" 
          icon="messages" 
          label="Messages" 
          badge={unreadMessages} 
          isCollapsed={isCollapsed} 
        />
        <NavItem 
          to="/profile" 
          icon="profile" 
          label="Profile" 
          isCollapsed={isCollapsed} 
        />
        
        {/* Post Button */}
        {!isCollapsed && (
          <div className="pt-4 px-2">
            <button
              onClick={onCreateClick}
              className="w-full bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-full shadow-lg shadow-violet-500/25 transition-all"
            >
              Post
            </button>
          </div>
        )}
        {isCollapsed && (
          <div className="pt-4 flex justify-center">
            <button
              onClick={onCreateClick}
              className="w-12 h-12 bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 rounded-full flex items-center justify-center shadow-lg shadow-violet-500/25 transition-all"
            >
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
        )}
      </nav>

      {/* Bottom section */}
      <div className="space-y-1 pt-4 border-t border-gray-100 dark:border-gray-800">
        <NavItem to="/settings" icon="more" label="More" isCollapsed={isCollapsed} />
        
        {currentUser && !isCollapsed && (
          <div className="flex items-center gap-3 px-3 py-3 mt-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer">
            <Avatar
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              size="sm"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{currentUser.name}</p>
              {currentUser.username && (
                <p className="text-xs text-gray-500 truncate">@{currentUser.username}</p>
              )}
            </div>
            <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="12" cy="19" r="1.5" />
            </svg>
          </div>
        )}
      </div>
    </aside>
  );
};

Sidebar.displayName = 'Sidebar';
