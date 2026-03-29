/**
 * Theme Constants — Indian Signal Desk Edition
 *
 * Single source of truth for warm saffron/amber palette.
 * All components should reference these instead of raw Tailwind class strings.
 */

// ═══════════════════════════════════════════════════════════════════
// COLORS — Warm Indian palette
// ═══════════════════════════════════════════════════════════════════

export const COLORS = {
  background: {
    primary:   '#0e0805',  // Deepest warm dark
    secondary: '#130a04',  // Card surfaces
    tertiary:  '#1a0d05',  // Elevated / hover
    elevated:  '#1a0d05',  // Modals, dropdowns
  },

  accent: {
    saffron: { light: 'orange-400', DEFAULT: 'orange-500', dark: 'amber-700' },
    amber:   { light: 'amber-300',  DEFAULT: 'amber-500',  dark: 'amber-700' },
    rose:    { light: 'rose-400',   DEFAULT: 'rose-600',   dark: 'rose-700'  },
  },

  border: {
    subtle:   'orange-500/8',
    DEFAULT:  'orange-500/15',
    emphasis: 'orange-500/30',
  },

  text: {
    primary:     'white',
    secondary:   'amber-100/80',
    muted:       'amber-100/50',
    placeholder: 'slate-500',
    brand:       'orange-300',
  },
} as const;

// ═══════════════════════════════════════════════════════════════════
// GRADIENTS — Saffron-to-amber
// ═══════════════════════════════════════════════════════════════════

export const GRADIENTS = {
  primary:       'bg-linear-to-r from-amber-700 to-orange-600',
  primaryHover:  'hover:from-amber-600 hover:to-orange-500',
  brand:         'bg-linear-to-br from-amber-600 to-orange-700',
  accent:        'bg-linear-to-r from-orange-500 to-amber-400',
  vertical:      'bg-linear-to-b from-orange-400 to-amber-400',
  glowSaffron:   'from-orange-500/10 to-transparent',
  glowAmber:     'from-amber-500/10 to-transparent',
  glowCombined:  'from-orange-500/10 to-amber-400/10',
} as const;

// ═══════════════════════════════════════════════════════════════════
// COMPONENT STYLES — Reusable class combos
// ═══════════════════════════════════════════════════════════════════

export const STYLES = {
  sectionAccentBar: 'w-1.5 h-6 bg-linear-to-b from-orange-400 to-amber-400 rounded-full',

  tabIndicator:      'absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-linear-to-r from-orange-400 to-amber-400 rounded-full',
  tabIndicatorThick: 'absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1   bg-linear-to-r from-orange-400 to-amber-400 rounded-full',

  buttonPrimary:       'bg-linear-to-r from-amber-700 to-orange-600 hover:from-amber-600 hover:to-orange-500 text-white font-semibold transition-colors',
  buttonPrimaryShadow: 'shadow-md shadow-amber-950/30',

  cardBase:  'bg-[#130a04] border border-orange-500/15 rounded-2xl',
  cardHover: 'hover:border-orange-400/30 transition-colors',

  inputBase:  'bg-orange-500/5 border-2 border-orange-500/10 rounded-2xl text-white placeholder:text-slate-500',
  inputFocus: 'focus:outline-none focus:border-orange-400/50',

  stickyHeader: 'sticky top-0 z-20 backdrop-blur-xl border-b border-white/5',

  badgePrimary: 'px-2 py-0.5 bg-linear-to-r from-amber-700 to-orange-600 text-white text-xs font-bold rounded-full',

  iconButtonHover:      'hover:bg-orange-500/10 rounded-lg transition-colors',
  iconButtonHoverRound: 'hover:bg-orange-500/10 rounded-full transition-colors',
} as const;

// ═══════════════════════════════════════════════════════════════════
// SHADOWS
// ═══════════════════════════════════════════════════════════════════

export const SHADOWS = {
  button:      'shadow-md shadow-amber-950/30',
  buttonLarge: 'shadow-lg shadow-amber-950/40',
  card:        'shadow-lg shadow-black/30',
} as const;

// ═══════════════════════════════════════════════════════════════════
// TYPOGRAPHY
// ═══════════════════════════════════════════════════════════════════

export const TYPOGRAPHY = {
  sectionHeading: 'text-lg font-bold text-white',
  cardTitle:      'font-semibold text-white',
  cardSubtitle:   'text-sm text-amber-100/50',
  link:           'text-orange-400 hover:text-amber-300 transition-colors',
  brand:          "font-black text-white tracking-wide",
  mono:           'font-mono uppercase tracking-widest text-orange-400/60 text-xs',
} as const;

// ═══════════════════════════════════════════════════════════════════
// BRANDING — Signal Desk terminology
// ═══════════════════════════════════════════════════════════════════

export const BRANDING = {
  appName:        'Aptoodate',
  desk:           'Signal Desk',
  stories:        'Signals',
  posts:          'Drops',
  trending:       'Pulse',
  trendingTopics: 'Pulse Topics',
  hotPosts:       'Hot Drops',
  createPost:     'Launch a Drop',
  follow:         'Tune In',
  unfollow:       'Tuned In',
  logo:           'अ',
} as const;
