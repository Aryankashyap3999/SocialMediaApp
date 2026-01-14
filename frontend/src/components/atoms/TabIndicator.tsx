import React from 'react';

/**
 * TabIndicator - Active tab underline indicator
 * 
 * Reusable gradient underline for tab navigation.
 * Features the signature cyan-amber gradient.
 */

export interface TabIndicatorProps {
  /** Width of the indicator (default: w-16) */
  width?: string;
  /** Thickness variant */
  thick?: boolean;
  className?: string;
}

export const TabIndicator: React.FC<TabIndicatorProps> = ({
  width = 'w-16',
  thick = false,
  className = '',
}) => {
  const height = thick ? 'h-1' : 'h-0.5';
  
  return (
    <div 
      className={`
        absolute bottom-0 left-1/2 -translate-x-1/2 
        ${width} ${height} 
        bg-linear-to-r from-cyan-400 to-amber-300 
        rounded-full
        ${className}
      `.trim()} 
    />
  );
};

TabIndicator.displayName = 'TabIndicator';
