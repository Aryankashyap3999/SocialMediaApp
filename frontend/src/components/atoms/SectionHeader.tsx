import React from 'react';

/**
 * SectionHeader - Reusable section header with accent bar
 * 
 * Used throughout the app for consistent section titles.
 * Features the signature cyan-amber gradient accent bar.
 */

export interface SectionHeaderProps {
  title: string;
  /** Optional right-side element (e.g., "See All" link, badge) */
  action?: React.ReactNode;
  /** Use brighter gradient variant (cyan-500/amber-400 vs cyan-400/amber-300) */
  bright?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  action,
  bright = false,
  className = '',
}) => {
  const barClass = bright
    ? 'w-1.5 h-6 bg-linear-to-b from-cyan-500 to-amber-400 rounded-full'
    : 'w-1.5 h-6 bg-linear-to-b from-cyan-400 to-amber-300 rounded-full';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={barClass} />
      <h3 className="text-lg font-bold text-white flex-1">{title}</h3>
      {action}
    </div>
  );
};

SectionHeader.displayName = 'SectionHeader';
