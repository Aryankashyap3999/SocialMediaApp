/**
 * Size Constants
 * 
 * Centralized size definitions for consistent component sizing across the application.
 * Follows Single Responsibility Principle by separating size definitions from components.
 */

// Standard size values used across components
export const SIZES = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
} as const;

// Size type for components (Avatar, Badge, Button, Input)
export type Size = (typeof SIZES)[keyof typeof SIZES];

// Available sizes for each component type
export const SIZE_OPTIONS = {
  // Avatar sizes
  AVATAR: ['xs', 'sm', 'md', 'lg', 'xl'] as const,
  
  // Badge sizes
  BADGE: ['sm', 'md', 'lg'] as const,
  
  // Button sizes
  BUTTON: ['sm', 'md', 'lg'] as const,
  
  // Input sizes
  INPUT: ['sm', 'md', 'lg'] as const,
} as const;

export type AvatarSize = (typeof SIZE_OPTIONS.AVATAR)[number];
export type BadgeSize = (typeof SIZE_OPTIONS.BADGE)[number];
export type ButtonSize = (typeof SIZE_OPTIONS.BUTTON)[number];
export type InputSize = (typeof SIZE_OPTIONS.INPUT)[number];
