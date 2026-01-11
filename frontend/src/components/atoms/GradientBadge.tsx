import React from 'react';

/**
 * GradientBadge - Pill/badge with gradient styling
 * 
 * Signature cyan-amber gradient badge for counts, notifications, etc.
 */

export interface GradientBadgeProps {
  children: React.ReactNode;
  /** Size variant */
  size?: 'sm' | 'md';
  className?: string;
}

export const GradientBadge: React.FC<GradientBadgeProps> = ({
  children,
  size = 'sm',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  };

  return (
    <span 
      className={`
        ${sizeClasses[size]}
        bg-linear-to-r from-cyan-400 to-amber-300 
        text-slate-950 font-bold 
        rounded-full
        ${className}
      `.trim()}
    >
      {children}
    </span>
  );
};

GradientBadge.displayName = 'GradientBadge';
