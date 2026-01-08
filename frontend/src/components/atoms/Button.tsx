import React from 'react';
import { type ButtonVariant, type ButtonSize } from '@utils/constants';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: React.ReactNode;
}

/**
 * Button Atom
 * 
 * Single responsibility: Render a styled button element
 * 
 * @example
 * <Button variant="primary" size="lg">Click Me</Button>
 * <Button variant="outline" disabled>Disabled</Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { 
      variant = 'primary', 
      size = 'md', 
      isLoading = false, 
      className = '',
      disabled,
      children,
      ...props 
    },
    ref
  ) => {
    const baseStyles = 'font-semibold rounded-lg transition-colors duration-fast focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
      primary: 'bg-primary text-white hover:bg-primary-dark focus-visible:outline-primary',
      secondary: 'bg-secondary text-white hover:bg-secondary-dark focus-visible:outline-secondary',
      outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus-visible:outline-primary',
      ghost: 'text-primary hover:bg-primary/10 focus-visible:outline-primary',
      danger: 'bg-error text-white hover:bg-red-600 focus-visible:outline-error',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim()}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin">⚙️</span>
            {children}
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
