import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@components/atoms/Icon';

export interface NavItemProps {
  to: string;
  icon: string;
  label: string;
  badge?: number;
  isCollapsed?: boolean;
  onClick?: () => void;
}

/**
 * NavItem Molecule
 * Navigation item for sidebar with icon and label
 */
export const NavItem: React.FC<NavItemProps> = ({
  to,
  icon,
  label,
  badge,
  isCollapsed = false,
  onClick,
}) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => `
        flex items-center gap-4 px-3 py-3 rounded-lg
        transition-all duration-200 group relative
        ${isActive 
          ? 'font-bold' 
          : 'font-normal hover:bg-gray-100 dark:hover:bg-gray-800'
        }
      `}
    >
      {({ isActive }) => (
        <>
          <div className="relative">
            <Icon name={icon} size={26} filled={isActive} />
            {badge && badge > 0 && (
              <span className="absolute -top-1 -right-1 min-w-4.5 h-4.5 px-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {badge > 99 ? '99+' : badge}
              </span>
            )}
          </div>
          {!isCollapsed && (
            <span className="text-base">{label}</span>
          )}
        </>
      )}
    </NavLink>
  );
};

NavItem.displayName = 'NavItem';
