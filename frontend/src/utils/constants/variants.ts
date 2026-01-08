/**
 * Variant Constants
 * 
 * Centralized variant/style definitions for buttons, badges, text, and other components.
 * Follows Single Responsibility Principle by separating variant definitions from components.
 */

// Button variants and styles
export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  OUTLINE: 'outline',
  GHOST: 'ghost',
  DANGER: 'danger',
} as const;

export type ButtonVariant = (typeof BUTTON_VARIANTS)[keyof typeof BUTTON_VARIANTS];

// Badge variants and styles
export const BADGE_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
} as const;

export type BadgeVariant = (typeof BADGE_VARIANTS)[keyof typeof BADGE_VARIANTS];

// Text variants (typography)
export const TEXT_VARIANTS = {
  BODY: 'body',
  SMALL: 'small',
  TINY: 'tiny',
} as const;

export type TextVariant = (typeof TEXT_VARIANTS)[keyof typeof TEXT_VARIANTS];

// Text colors
export const TEXT_COLORS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  MUTED: 'muted',
} as const;

export type TextColor = (typeof TEXT_COLORS)[keyof typeof TEXT_COLORS];

// Text weights
export const TEXT_WEIGHTS = {
  NORMAL: 'normal',
  MEDIUM: 'medium',
  SEMIBOLD: 'semibold',
  BOLD: 'bold',
} as const;

export type TextWeight = (typeof TEXT_WEIGHTS)[keyof typeof TEXT_WEIGHTS];

// Heading levels
export const HEADING_LEVELS = {
  H1: 1,
  H2: 2,
  H3: 3,
  H4: 4,
  H5: 5,
  H6: 6,
} as const;

export type HeadingLevel = (typeof HEADING_LEVELS)[keyof typeof HEADING_LEVELS];

// Heading colors
export const HEADING_COLORS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  MUTED: 'muted',
} as const;

export type HeadingColor = (typeof HEADING_COLORS)[keyof typeof HEADING_COLORS];

// Badge color variants map for quick access
export const STATUS_COLORS = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
} as const;

export type StatusColor = (typeof STATUS_COLORS)[keyof typeof STATUS_COLORS];
