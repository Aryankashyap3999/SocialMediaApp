/**
 * Theme Constants
 * 
 * Centralized theme definitions for the Signal Desk app.
 * Contains colors, gradients, and common style patterns.
 * Use these constants to maintain consistency across the app.
 */

// ═══════════════════════════════════════════════════════════════════
// COLORS - True Black Theme Palette
// ═══════════════════════════════════════════════════════════════════

export const COLORS = {
  // Background colors (true black, not blue-tinted slate)
  background: {
    primary: '#0a0a0a',      // Main background
    secondary: '#141414',     // Cards, sections, elevated surfaces
    tertiary: '#1a1a1a',      // Active states, hover emphasis
    elevated: '#1e1e1e',      // Modals, dropdowns
  },
  
  // Accent colors
  accent: {
    cyan: {
      light: 'cyan-300',
      DEFAULT: 'cyan-400',
      medium: 'cyan-500',
    },
    amber: {
      light: 'amber-200',
      DEFAULT: 'amber-300',
      medium: 'amber-400',
    },
  },
  
  // Border colors
  border: {
    subtle: 'slate-800',
    DEFAULT: 'slate-700',
    emphasis: 'slate-600',
  },
  
  // Text colors
  text: {
    primary: 'slate-100',
    secondary: 'slate-300',
    muted: 'slate-400',
    placeholder: 'slate-500',
  },
} as const;

// ═══════════════════════════════════════════════════════════════════
// GRADIENTS - Signature Cyan-Amber gradient combinations
// ═══════════════════════════════════════════════════════════════════

export const GRADIENTS = {
  // Primary accent gradient (horizontal)
  primary: 'bg-linear-to-r from-cyan-400 to-amber-300',
  primaryHover: 'hover:from-cyan-300 hover:to-amber-200',
  
  // Vertical gradient (for accent bars)
  vertical: 'bg-linear-to-b from-cyan-400 to-amber-300',
  verticalBright: 'bg-linear-to-b from-cyan-500 to-amber-400',
  
  // Glow effects
  glowCyan: 'from-cyan-500/15 to-transparent',
  glowAmber: 'from-amber-400/15 to-transparent',
  glowCombined: 'from-cyan-500/15 to-amber-400/15',
} as const;

// ═══════════════════════════════════════════════════════════════════
// COMPONENT STYLES - Reusable Tailwind class combinations
// ═══════════════════════════════════════════════════════════════════

export const STYLES = {
  // Section header accent bar
  sectionAccentBar: 'w-1.5 h-6 bg-linear-to-b from-cyan-400 to-amber-300 rounded-full',
  sectionAccentBarBright: 'w-1.5 h-6 bg-linear-to-b from-cyan-500 to-amber-400 rounded-full',
  
  // Tab active indicator (underline)
  tabIndicator: 'absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-linear-to-r from-cyan-400 to-amber-300 rounded-full',
  tabIndicatorThick: 'absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-linear-to-r from-cyan-400 to-amber-300 rounded-full',
  
  // Primary gradient button
  buttonPrimary: 'bg-linear-to-r from-cyan-400 to-amber-300 hover:from-cyan-300 hover:to-amber-200 text-slate-950 font-semibold transition-colors',
  buttonPrimaryShadow: 'shadow-[0_10px_30px_-16px_rgba(0,0,0,0.8)]',
  
  // Card/surface styles
  cardBase: 'bg-[#141414] border border-slate-700 rounded-2xl',
  cardHover: 'hover:border-cyan-400/30 transition-colors',
  
  // Input field styles
  inputBase: 'bg-[#141414] border-2 border-transparent rounded-2xl text-slate-100 placeholder:text-slate-500',
  inputFocus: 'focus:outline-none focus:border-cyan-400/50',
  
  // Sticky header
  stickyHeader: 'sticky top-0 z-20 bg-[#0a0a0a]/92 backdrop-blur-xl border-b border-slate-700',
  
  // Badge/pill with gradient
  badgeGradient: 'px-2 py-0.5 bg-linear-to-r from-cyan-400 to-amber-300 text-slate-950 text-xs font-bold rounded-full',
  
  // Icon button hover
  iconButtonHover: 'hover:bg-[#141414] rounded-lg transition-colors',
  iconButtonHoverRound: 'hover:bg-[#141414] rounded-full transition-colors',
} as const;

// ═══════════════════════════════════════════════════════════════════
// SHADOWS - Consistent shadow patterns
// ═══════════════════════════════════════════════════════════════════

export const SHADOWS = {
  button: 'shadow-[0_10px_30px_-16px_rgba(0,0,0,0.8)]',
  buttonLarge: 'shadow-[0_12px_30px_-18px_rgba(0,0,0,0.9)]',
  card: 'shadow-lg shadow-black/20',
} as const;

// ═══════════════════════════════════════════════════════════════════
// TYPOGRAPHY - Common text style combinations
// ═══════════════════════════════════════════════════════════════════

export const TYPOGRAPHY = {
  sectionHeading: 'text-lg font-bold text-white',
  cardTitle: 'font-semibold text-slate-100',
  cardSubtitle: 'text-sm text-slate-400',
  link: 'text-cyan-400 hover:text-cyan-300 transition-colors',
  linkAmber: 'text-amber-300 hover:text-amber-200 transition-colors',
} as const;

// ═══════════════════════════════════════════════════════════════════
// BRANDING - Signal Desk terminology
// ═══════════════════════════════════════════════════════════════════

export const BRANDING = {
  appName: 'Signal Desk',
  stories: 'Signals',
  posts: 'Drops',
  trending: 'Pulse',
  trendingTopics: 'Pulse Topics',
  hotPosts: 'Hot Drops',
  createPost: 'Launch a Drop',
} as const;
