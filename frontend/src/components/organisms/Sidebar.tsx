import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavItem } from '@components/molecules/NavItem';
import { Avatar } from '@components/atoms/Avatar';
import { useAuth } from '@/hooks/context/useAuth';

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
  onLogout?: () => void;
}

/** Inline rangoli dot pattern as CSS background-image value */
const RANGOLI_DOTS =
  'radial-gradient(circle, rgba(255,153,51,0.18) 1px, transparent 1px)';

/**
 * Sidebar Organism — Indian Signal Desk Edition
 * Warm saffron/gulabi colour scheme, Baloo 2 branding,
 * tricolor active indicators and rangoli dot accents.
 */
export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed = false,
  currentUser,
  unreadMessages = 0,
  unreadNotifications = 0,
  onCreateClick,
  onLogout,
}) => {
  const location = useLocation();
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowLogoutMenu(false);
      }
    };
    if (showLogoutMenu) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showLogoutMenu]);

  const handleLogoutClick = () => {
    setShowLogoutMenu(false);
    logout();
    navigate('/auth/signin');
    onLogout?.();
  };

  return (
    <aside
      className={`
        sticky left-0 top-0 h-screen
        bg-linear-to-br from-[#0e0805] via-[#130a04] to-[#0a0603]
        border-r border-orange-500/10 backdrop-blur-xl
        flex flex-col justify-between py-6 lg:py-8 px-2 lg:px-3
        transition-all duration-300 z-40 shrink-0
        ${isCollapsed ? 'w-20 lg:w-24' : 'w-60 lg:w-72'}
      `}
    >
      {/* ── Logo & brand ─────────────────────────────────── */}
      <div className="mb-8 px-2 space-y-4">
        <div className="flex items-center gap-3 group">
          {/* Badge — saffron-to-gulabi with rangoli dot overlay */}
          <div
            className="relative w-12 h-12 rounded-2xl bg-linear-to-br from-amber-600 to-orange-700 flex items-center justify-center shadow-md shadow-amber-900/30 group-hover:shadow-amber-800/50 transition-all duration-300 group-hover:scale-105 overflow-hidden shrink-0"
          >
            {/* Rangoli micro-dots */}
            <div
              className="absolute inset-0 opacity-25"
              style={{ backgroundImage: RANGOLI_DOTS, backgroundSize: '6px 6px' }}
            />
            {/* Devanagari "अ" = phonetic A (first letter of Aptoodate) */}
            <span
              className="relative text-white font-bold text-xl select-none"
              style={{ fontFamily: "'Baloo 2', sans-serif", lineHeight: 1 }}
            >
              अ
            </span>
            <div className="absolute inset-0 rounded-2xl bg-orange-300/20 opacity-0 group-hover:opacity-100 transition-opacity blur-lg" />
          </div>

          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p
                className="text-xs uppercase tracking-widest font-black text-orange-300/90 truncate"
                style={{ fontFamily: "'Baloo 2', sans-serif" }}
              >
                Aptoodate
              </p>
              <p className="text-xs text-amber-100/60 font-medium">Signal Desk</p>
            </div>
          )}
        </div>

        {/* Tricolor pulse bar */}
        {!isCollapsed && (
          <div className="relative h-1 rounded-full overflow-hidden flex gap-px">
            <div className="flex-1 bg-orange-600/50 rounded-l-full" />
            <div className="flex-1 bg-white/20" />
            <div className="flex-1 bg-green-700/50 rounded-r-full" />
          </div>
        )}
      </div>

      {/* ── Navigation ───────────────────────────────────── */}
      <nav className="flex-1 space-y-2.5">
        {([
          { to: '/home',          icon: 'home',          label: 'Home'          },
          { to: '/discover',      icon: 'discover',      label: 'Discover'      },
          { to: '/stories',       icon: 'stories',       label: 'Signals'       },
          { to: '/notifications', icon: 'notifications', label: 'Notifications', badge: unreadNotifications },
          { to: '/messages',      icon: 'messages',      label: 'Messages',      badge: unreadMessages },
          { to: '/bookmarks',     icon: 'bookmark',      label: 'Saved'         },
          { to: '/profile',       icon: 'profile',       label: 'Profile'       },
        ] as const).map((item) => {
          const isActive =
            location.pathname === item.to ||
            location.pathname.startsWith(item.to + '/');
          return (
            <div
              key={item.to}
              className={`
                relative rounded-2xl border-2 backdrop-blur-md
                transition-all duration-300 group overflow-hidden
                ${isActive
                  ? 'border-amber-700/40 bg-amber-900/20 shadow-md shadow-amber-950/30'
                  : 'border-white/8 bg-white/5 hover:bg-white/10 hover:border-amber-700/30 shadow-sm shadow-black/20 hover:shadow-amber-950/15'
                }
              `}
            >
              {/* Warm hover wash */}
              <div className="absolute inset-0 bg-linear-to-r from-amber-900/0 via-amber-900/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <NavItem
                to={item.to}
                icon={item.icon}
                label={item.label}
                isCollapsed={isCollapsed}
              />

              {/* Indian tricolor active indicator — three micro-bars */}
              {isActive && (
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 flex flex-col gap-px">
                  <div className="w-2 h-1.5 rounded-sm bg-orange-500/70" />
                  <div className="w-2 h-1.5 rounded-sm bg-white/40" />
                  <div className="w-2 h-1.5 rounded-sm bg-green-600/60" />
                </div>
              )}

              {/* Tricolor bottom accent bar */}
              {isActive && !isCollapsed && (
                <div className="absolute bottom-0 left-0 right-0 flex h-px overflow-hidden rounded-b-2xl">
                  <div className="flex-1 bg-orange-600/60" />
                  <div className="flex-1 bg-white/30" />
                  <div className="flex-1 bg-green-700/50" />
                </div>
              )}
            </div>
          );
        })}

        {/* ── Launch a Drop ───────────────────────────────── */}
        <div className="pt-3 group">
          <button
            onClick={onCreateClick}
            className={`
              w-full rounded-2xl border border-amber-700/30
              bg-linear-to-r from-amber-700 via-orange-700 to-amber-600
              text-white font-bold py-4 px-4
              shadow-md shadow-amber-950/40
              hover:shadow-amber-900/50 hover:-translate-y-0.5
              hover:border-amber-600/50
              transition-all duration-300
              relative overflow-hidden
            `}
          >
            {/* Rangoli dot pattern overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{ backgroundImage: RANGOLI_DOTS, backgroundSize: '10px 10px' }}
            />
            {/* Shimmer on hover */}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span
              className="relative tracking-wide"
              style={{ fontFamily: "'Baloo 2', sans-serif" }}
            >
              🪷 Launch a Drop
            </span>
          </button>
        </div>
      </nav>

      {/* ── Bottom section ───────────────────────────────── */}
      <div className="space-y-3 pt-6 border-t border-orange-500/10">
        <div className="relative rounded-2xl border-2 border-white/8 bg-white/5 hover:bg-white/10 hover:border-amber-700/30 transition-all duration-300 backdrop-blur-md shadow-sm shadow-black/20 hover:shadow-amber-950/15 group overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-orange-500/0 via-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <NavItem to="/settings" icon="more" label="More" isCollapsed={isCollapsed} />
        </div>

        {currentUser && !isCollapsed && (
          <div className="relative" ref={menuRef}>
            <div
              onClick={() => setShowLogoutMenu(!showLogoutMenu)}
              className="flex items-center gap-3 px-4 py-3 mt-2 rounded-2xl border-2 border-white/10 bg-white/8 hover:bg-white/15 hover:border-orange-400/40 transition-all duration-300 cursor-pointer backdrop-blur-md shadow-lg shadow-black/20 hover:shadow-orange-500/20 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-r from-amber-900/0 via-amber-900/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Avatar src={currentUser.avatarUrl} alt={currentUser.name} size="sm" />
              <div className="flex-1 min-w-0 relative z-10">
                <p
                  className="text-sm font-bold truncate text-white"
                  style={{ fontFamily: "'Baloo 2', sans-serif" }}
                >
                  {currentUser.name}
                </p>
                {currentUser.username && (
                  <p className="text-xs text-orange-300/70 truncate">@{currentUser.username}</p>
                )}
              </div>
              <svg
                className="w-4 h-4 text-orange-300/60 group-hover:text-orange-300 transition-colors relative z-10"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <circle cx="12" cy="5"  r="1.5" />
                <circle cx="12" cy="12" r="1.5" />
                <circle cx="12" cy="19" r="1.5" />
              </svg>
            </div>

            {showLogoutMenu && (
              <div className="absolute bottom-full left-0 right-0 mb-2 rounded-2xl border-2 border-orange-400/30 bg-[#130a04]/95 backdrop-blur-xl shadow-2xl shadow-orange-500/20 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
                <button
                  onClick={handleLogoutClick}
                  className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-white/10 transition-colors group"
                >
                  <svg
                    className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="text-sm font-semibold text-white group-hover:text-red-300 transition-colors">
                    Log out
                  </span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};

Sidebar.displayName = 'Sidebar';
