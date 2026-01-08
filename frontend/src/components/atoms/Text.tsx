import type React from 'react';
import { type TextVariant, type TextColor, type TextWeight } from '@utils/constants';

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TextVariant;
  color?: TextColor;
  weight?: TextWeight;
  children: React.ReactNode;
}

/**
 * Text Atom
 * 
 * Single responsibility: Display styled text with consistent typography
 * 
 * @example
 * <Text variant="body">Regular text</Text>
 * <Text variant="small" color="muted">Small muted text</Text>
 */
export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color = 'primary',
  weight = 'normal',
  children,
  className = '',
  ...props
}) => {
  const variantStyles = {
    body: 'text-base',
    small: 'text-sm',
    tiny: 'text-xs',
  };

  const colorStyles = {
    primary: 'text-text',
    secondary: 'text-text-secondary',
    success: 'text-success',
    error: 'text-error',
    warning: 'text-warning',
    info: 'text-info',
    muted: 'text-text-tertiary',
  };

  const weightStyles = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  return (
    <span
      className={`${variantStyles[variant]} ${colorStyles[color]} ${weightStyles[weight]} ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  );
};

Text.displayName = 'Text';
