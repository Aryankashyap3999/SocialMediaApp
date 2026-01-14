import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  shadow?: 'sm' | 'md' | 'lg' | 'none';
  padding?: 'sm' | 'md' | 'lg';
  border?: boolean;
  hover?: boolean;
  children: React.ReactNode;
}

/**
 * Card Molecule
 * 
 * Combines: Padding + Shadow + Border + Hover effects
 * Single responsibility: Provide consistent container styling
 * 
 * @example
 * <Card padding="lg" shadow="md">
 *   <p>Content</p>
 * </Card>
 * <Card border hover>Content</Card>
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      shadow = 'md',
      padding = 'md',
      border = false,
      hover = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const shadowStyles = {
      none: '',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
    };

    const paddingStyles = {
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    };

    return (
      <div
        ref={ref}
        className={`
          rounded-lg bg-white transition-all duration-base
          ${shadowStyles[shadow]}
          ${paddingStyles[padding]}
          ${border ? 'border border-border' : ''}
          ${hover ? 'hover:shadow-lg hover:-translate-y-1' : ''}
          ${className}
        `.trim()}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
