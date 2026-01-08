import type React from 'react';
import { type BadgeVariant, type BadgeSize } from '@utils/constants';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/**
 * Badge Atom
 * 
 * Single responsibility: Display a small labeled badge for status/labels
 * 
 * @example
 * <Badge variant="success">Verified</Badge>
 * <Badge variant="warning" icon="⚠️">Pending</Badge>
 */
export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
}) => {
  const variantStyles = {
    primary: 'bg-primary/10 text-primary border border-primary/20',
    secondary: 'bg-secondary/10 text-secondary border border-secondary/20',
    success: 'bg-success/10 text-success border border-success/20',
    warning: 'bg-warning/10 text-warning border border-warning/20',
    error: 'bg-error/10 text-error border border-error/20',
    info: 'bg-info/10 text-info border border-info/20',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs font-medium rounded-sm',
    md: 'px-2.5 py-1 text-sm font-medium rounded-md',
    lg: 'px-3 py-1.5 text-base font-semibold rounded-lg',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 whitespace-nowrap
        ${variantStyles[variant]} ${sizeStyles[size]} ${className}
      `.trim()}
    >
      {icon && <span className="text-sm">{icon}</span>}
      {children}
    </span>
  );
};

Badge.displayName = 'Badge';
