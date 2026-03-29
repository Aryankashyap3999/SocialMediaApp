import React from 'react';

/**
 * GradientButton - Primary action button with gradient styling
 * 
 * Signature cyan-amber gradient button used for primary actions.
 * Consistent styling across the app.
 */

export interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Full width */
  fullWidth?: boolean;
  /** Rounded style */
  rounded?: 'default' | 'full';
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  size = 'md',
  fullWidth = false,
  rounded = 'default',
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-base',
  };

  const roundedClasses = {
    default: 'rounded-xl',
    full: 'rounded-full',
  };

  return (
    <button
      disabled={disabled}
      className={`
        ${sizeClasses[size]}
        ${roundedClasses[rounded]}
        ${fullWidth ? 'w-full' : ''}
        bg-linear-to-r from-amber-700 to-orange-600
        hover:from-amber-600 hover:to-orange-500
        text-white font-semibold
        transition-colors
        shadow-[0_10px_30px_-16px_rgba(0,0,0,0.8)]
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </button>
  );
};

GradientButton.displayName = 'GradientButton';
