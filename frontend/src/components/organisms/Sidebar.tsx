import React from 'react';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();

  return (
    <aside
      className={`
        sticky left-0 top-0 h-screen bg-[#05060b]
        border-r border-white/5
        flex flex-col justify-between py-6 px-4
        transition-all duration-300 z-40 shrink-0
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* Logo & pulse bar */}
      <div className="mb-6 px-1 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-cyan-500 to-amber-400 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          {!isCollapsed && (
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-indigo-200/80">Aptoodate</p>
              <p className="text-sm text-indigo-100/80">Signal Desk</p>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full w-2/3 bg-linear-to-r from-indigo-500 to-emerald-400 animate-pulse" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-3">
        {([
          { to: '/home', icon: 'home', label: 'Home' },
          { to: '/discover', icon: 'discover', label: 'Discover' },
          { to: '/stories', icon: 'stories', label: 'Signals' },
          { to: '/notifications', icon: 'notifications', label: 'Notifications', badge: unreadNotifications },
          { to: '/messages', icon: 'messages', label: 'Messages', badge: unreadMessages },
          { to: '/profile', icon: 'profile', label: 'Profile' },
        ] as const).map((item) => {
          const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/');
          return (
            <div key={item.to} className={`relative rounded-2xl border transition-all ${isActive ? 'border-cyan-400/40 bg-white/10' : 'border-white/5 bg-white/5 hover:bg-white/10 hover:border-indigo-400/40'}`}>
              <NavItem
                to={item.to}
                icon={item.icon}
                label={item.label}
                isCollapsed={isCollapsed}
              />
              {!isCollapsed && isActive && (
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-12 w-1.5 rounded-full bg-linear-to-b from-cyan-400 to-amber-400" />
              )}
            </div>
          );
        })}

        {/* Create tile */}
        <div className="pt-2">
          <button
            onClick={onCreateClick}
            className="w-full rounded-2xl border border-white/10 bg-linear-to-r from-cyan-500 to-amber-400 text-slate-950 font-semibold py-4 shadow-xl shadow-cyan-500/30 hover:-translate-y-0.5 transition-transform"
          >
            Launch a Drop
          </button>
        </div>
      </nav>

      {/* Bottom section */}
      <div className="space-y-2 pt-5 border-t border-white/5">
        <div className="rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
          <NavItem to="/settings" icon="more" label="More" isCollapsed={isCollapsed} />
        </div>
        
        {currentUser && !isCollapsed && (
          <div className="flex items-center gap-3 px-3 py-3 mt-1 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
            <Avatar
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              size="sm"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate text-white">{currentUser.name}</p>
              {currentUser.username && (
                <p className="text-xs text-indigo-200 truncate">@{currentUser.username}</p>
              )}
            </div>
            <svg className="w-4 h-4 text-indigo-200" viewBox="0 0 24 24" fill="currentColor">
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
