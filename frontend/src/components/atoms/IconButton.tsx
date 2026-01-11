import React from 'react';

/**
 * IconButton - Button wrapper for icons with consistent hover states
 * 
 * Provides consistent hover styling for icon-only buttons.
 */

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /** Rounded variant */
  rounded?: 'default' | 'full';
  /** Size of padding */
  size?: 'sm' | 'md' | 'lg';
  /** Optional tooltip/label for accessibility */
  label?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  rounded = 'default',
  size = 'md',
  label,
  className = '',
  ...props
}) => {
  const roundedClasses = {
    default: 'rounded-lg',
    full: 'rounded-full',
  };

  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5',
  };

  return (
    <button
      aria-label={label}
      className={`
        ${sizeClasses[size]}
        ${roundedClasses[rounded]}
        hover:bg-[#141414] 
        transition-colors
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </button>
  );
};

IconButton.displayName = 'IconButton';
