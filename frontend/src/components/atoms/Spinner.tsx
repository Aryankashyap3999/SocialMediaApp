import React from 'react';

export interface SpinnerProps {
  /** Diameter in tailwind sizing — default 'md' (w-8 h-8) */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_MAP = {
  sm: 'w-5 h-5 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-2',
};

/**
 * Spinner — warm saffron loading indicator.
 * Drop-in replacement for the repeated inline spinner pattern across pages.
 */
export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className = '' }) => (
  <div
    className={`${SIZE_MAP[size]} rounded-full border-orange-400/25 border-t-orange-500 animate-spin ${className}`}
    role="status"
    aria-label="Loading"
  />
);

Spinner.displayName = 'Spinner';
