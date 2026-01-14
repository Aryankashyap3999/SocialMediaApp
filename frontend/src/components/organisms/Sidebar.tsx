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
        sticky left-0 top-0 h-screen 
        bg-linear-to-br from-[#05060b] via-[#0a0b12] to-[#050608]
        border-r border-cyan-500/10 backdrop-blur-xl
        flex flex-col justify-between py-8 px-3
        transition-all duration-300 z-40 shrink-0
        ${isCollapsed ? 'w-24' : 'w-72'}
      `}
    >
      {/* Logo & pulse bar - Enhanced */}
      <div className="mb-8 px-2 space-y-4">
        <div className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 rounded-2xl bg-linear-to-br from-cyan-500 to-amber-400 flex items-center justify-center shadow-lg shadow-cyan-500/40 group-hover:shadow-cyan-500/60 transition-all duration-300 group-hover:scale-110">
            <span className="text-white font-bold text-xl">A</span>
            <div className="absolute inset-0 rounded-2xl bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity blur-lg" />
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <p className="text-xs uppercase tracking-widest font-black text-cyan-300/90">Aptoodate</p>
              <p className="text-xs text-cyan-100/70 font-medium">Signal Desk</p>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <div className="relative h-2 rounded-full bg-linear-to-r from-white/5 to-transparent overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-cyan-500 via-emerald-400 to-transparent animate-pulse" />
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-cyan-400/30 to-transparent animate-shimmer" />
          </div>
        )}
      </div>

      {/* Navigation - Enhanced with floating cards */}
      <nav className="flex-1 space-y-2.5">
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
            <div 
              key={item.to} 
              className={`
                relative rounded-2xl border-2 backdrop-blur-md 
                transition-all duration-300 group overflow-hidden
                ${isActive 
                  ? 'border-cyan-400/60 bg-cyan-500/15 shadow-lg shadow-cyan-500/30' 
                  : 'border-white/10 bg-white/8 hover:bg-white/15 hover:border-cyan-400/40 shadow-lg shadow-black/20 hover:shadow-cyan-500/20'
                }
              `}
            >
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-linear-to-r from-cyan-500/0 via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <NavItem
                to={item.to}
                icon={item.icon}
                label={item.label}
                isCollapsed={isCollapsed}
              />
              
              {/* Unique active indicator - floating dot */}
              {isActive && (
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-linear-to-r from-cyan-400 to-emerald-400 shadow-lg shadow-cyan-400/50 animate-pulse" />
              )}
              
              {/* Bottom accent bar on active */}
              {isActive && !isCollapsed && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-cyan-400 via-emerald-400 to-cyan-500 rounded-full" />
              )}
            </div>
          );
        })}

        {/* Create tile - Enhanced */}
        <div className="pt-3 group">
          <button
            onClick={onCreateClick}
            className={`
              w-full rounded-2xl border-2 border-cyan-400/50 
              bg-linear-to-r from-cyan-500 to-amber-400 
              text-slate-950 font-bold py-4 px-4
              shadow-xl shadow-cyan-500/40 
              hover:shadow-cyan-500/60 hover:-translate-y-1 
              hover:border-cyan-300/80
              transition-all duration-300
              relative overflow-hidden
            `}
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative">Launch a Drop</span>
          </button>
        </div>
      </nav>

      {/* Bottom section - Enhanced */}
      <div className="space-y-3 pt-6 border-t border-cyan-500/10">
        <div className="rounded-2xl border-2 border-white/10 bg-white/8 hover:bg-white/15 hover:border-cyan-400/40 transition-all duration-300 backdrop-blur-md shadow-lg shadow-black/20 hover:shadow-cyan-500/20 group overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-cyan-500/0 via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <NavItem to="/settings" icon="more" label="More" isCollapsed={isCollapsed} />
        </div>
        
        {currentUser && !isCollapsed && (
          <div className="flex items-center gap-3 px-4 py-3 mt-2 rounded-2xl border-2 border-white/10 bg-white/8 hover:bg-white/15 hover:border-cyan-400/40 transition-all duration-300 cursor-pointer backdrop-blur-md shadow-lg shadow-black/20 hover:shadow-cyan-500/20 group relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-cyan-500/0 via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Avatar
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              size="sm"
            />
            <div className="flex-1 min-w-0 relative z-10">
              <p className="text-sm font-bold truncate text-white">{currentUser.name}</p>
              {currentUser.username && (
                <p className="text-xs text-cyan-300/70 truncate">@{currentUser.username}</p>
              )}
            </div>
            <svg className="w-4 h-4 text-cyan-300/60 group-hover:text-cyan-300 transition-colors relative z-10" viewBox="0 0 24 24" fill="currentColor">
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
