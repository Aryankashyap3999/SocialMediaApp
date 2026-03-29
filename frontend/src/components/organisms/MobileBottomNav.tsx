import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@components/atoms/Icon';

export interface MobileBottomNavProps {
  currentPath: string;
  unreadMessages?: number;
  unreadNotifications?: number;
  onCreateClick?: () => void;
}

/**
 * MobileBottomNav Organism — Indian Signal Desk Edition
 * Warm saffron/rose palette, tricolor top border, Indian active indicators
 */
export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  unreadMessages = 0,
  unreadNotifications = 0,
  onCreateClick,
}) => {
  const navItems = [
    { to: '/home',          icon: 'home',          label: 'Home'     },
    { to: '/discover',      icon: 'discover',       label: 'Discover' },
    { to: '/notifications', icon: 'notifications',  label: 'Alerts',  badge: unreadNotifications },
    { to: '/messages',      icon: 'messages',       label: 'Messages', badge: unreadMessages },
    { to: '/profile',       icon: 'profile',        label: 'Profile'  },
  ];

  return (
    <nav
      className="lg:hidden fixed inset-x-0 bottom-0 z-100"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* Indian tricolor gradient top border */}
      <div className="h-px flex">
        <div className="flex-1 bg-orange-500/60" />
        <div className="flex-1 bg-white/30" />
        <div className="flex-1 bg-green-500/60" />
      </div>

      {/* Navigation bar */}
      <div className="bg-[#120a04]/95 backdrop-blur-xl border-t border-white/5 px-2 py-2">
        <div className="flex items-center justify-around relative max-w-lg mx-auto">
          {navItems.slice(0, 2).map((item) => (
            <NavItem key={item.to} {...item} />
          ))}

          {/* Center "Launch a Drop" floating button */}
          <button
            onClick={onCreateClick}
            className="relative -mt-6 w-14 h-14 rounded-2xl bg-linear-to-br from-orange-500 to-rose-600 flex items-center justify-center shadow-lg shadow-orange-500/45 active:scale-95 transition-transform"
          >
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-orange-400 to-rose-400 opacity-0 hover:opacity-50 blur-lg transition-opacity" />
          </button>

          {navItems.slice(2).map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </div>
      </div>
    </nav>
  );
};

interface NavItemProps {
  to: string;
  icon: string;
  label: string;
  badge?: number;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, badge }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        flex flex-col items-center justify-center py-1 px-3 rounded-xl
        transition-all duration-200 relative min-w-14
        ${isActive ? 'text-orange-400' : 'text-slate-400 active:text-white'}
      `}
    >
      {({ isActive }) => (
        <>
          <div className="relative">
            <Icon name={icon} size={24} filled={isActive} />
            {badge && badge > 0 && (
              <span className="absolute -top-1 -right-1 min-w-4.5 h-4.5 px-1 bg-linear-to-r from-orange-500 to-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {badge > 99 ? '99+' : badge}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium mt-1">{label}</span>

          {/* Active indicator — mini tricolor dot stack */}
          {isActive && (
            <div className="absolute -bottom-1 flex flex-col gap-px items-center">
              <div className="w-3 h-0.5 rounded-full bg-orange-400" />
              <div className="w-2 h-0.5 rounded-full bg-white/60" />
              <div className="w-1 h-0.5 rounded-full bg-green-500" />
            </div>
          )}
        </>
      )}
    </NavLink>
  );
};

MobileBottomNav.displayName = 'MobileBottomNav';
