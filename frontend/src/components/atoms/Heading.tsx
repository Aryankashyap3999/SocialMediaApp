import React from 'react';
import { type HeadingLevel, type HeadingColor } from '@utils/constants';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  color?: HeadingColor;
  children: React.ReactNode;
}

/**
 * Heading Atom
 * 
 * Single responsibility: Display semantic heading elements with consistent styling
 * 
 * @example
 * <Heading level={1}>Page Title</Heading>
 * <Heading level={2} color="secondary">Section</Heading>
 */
export const Heading: React.FC<HeadingProps> = ({
  level = 1,
  color = 'primary',
  children,
  className = '',
  ...props
}) => {
  const sizeStyles = {
    1: 'text-3xl font-bold',
    2: 'text-2xl font-bold',
    3: 'text-xl font-semibold',
    4: 'text-lg font-semibold',
    5: 'text-base font-semibold',
    6: 'text-sm font-semibold',
  };

  const colorStyles = {
    primary: 'text-gray-900',
    secondary: 'text-gray-700',
    muted: 'text-gray-500',
  };

  const Tag = `h${level}` as const;

  return React.createElement(
    Tag,
    {
      className: `${sizeStyles[level]} ${colorStyles[color]} ${className}`.trim(),
      ...props,
    },
    children
  );
};

Heading.displayName = 'Heading';
