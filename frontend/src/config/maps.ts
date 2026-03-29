/**
 * Type-to-style maps
 *
 * Centralises every "switch on type → color / label" lookup.
 * Import from here instead of redeclaring inline in components.
 */

// ─── Notification types ────────────────────────────────────────────────────

export type NotificationType =
  | 'like'
  | 'comment'
  | 'follow'
  | 'mention'
  | 'repost'
  | 'reply'
  | 'system';

/** Pill background + emoji symbol for each notification type */
export const NOTIFICATION_PILL_MAP: Record<
  NotificationType,
  { bg: string; symbol: string }
> = {
  like:    { bg: 'from-amber-500/30 to-amber-400/10 border-amber-400/30',    symbol: '⚡' },
  comment: { bg: 'from-orange-500/30 to-orange-400/10 border-orange-400/30', symbol: '💬' },
  follow:  { bg: 'from-emerald-500/30 to-emerald-400/10 border-emerald-400/30', symbol: '📡' },
  mention: { bg: 'from-purple-500/30 to-purple-400/10 border-purple-400/30', symbol: '@'  },
  repost:  { bg: 'from-orange-500/30 to-amber-400/10 border-amber-400/30',   symbol: '🔁' },
  reply:   { bg: 'from-amber-500/30 to-orange-400/10 border-orange-400/30',  symbol: '↩'  },
  system:  { bg: 'from-slate-500/30 to-slate-400/10 border-slate-400/30',    symbol: '📻' },
};

/** Verb text + color for each notification type (feed row copy) */
export const NOTIFICATION_TEXT_MAP: Record<
  NotificationType,
  { verb: string; icon: string; color: string }
> = {
  like:    { verb: 'resonated with your drop',              icon: '⚡', color: 'text-amber-400'   },
  comment: { verb: 'dropped a signal on your broadcast',    icon: '💬', color: 'text-orange-400'  },
  follow:  { verb: 'tuned in to your signal',               icon: '📡', color: 'text-emerald-400' },
  mention: { verb: 'mentioned you in a broadcast',          icon: '@',  color: 'text-purple-400'  },
  repost:  { verb: 'echoed your drop',                      icon: '🔁', color: 'text-orange-300'  },
  reply:   { verb: 'replied to your signal',                icon: '↩',  color: 'text-amber-300'   },
  system:  { verb: 'sent you a signal',                     icon: '📻', color: 'text-slate-400'   },
};

// ─── Boost tiers ───────────────────────────────────────────────────────────

export type BoostTier = 'pulse' | 'flash' | 'broadcast';

/** Tailwind gradient class for each boost tier */
export const BOOST_COLORS: Record<BoostTier, string> = {
  pulse:     'from-emerald-500 to-cyan-500',
  flash:     'from-amber-400 to-orange-500',
  broadcast: 'from-purple-500 to-pink-500',
};

// ─── Signal heat ───────────────────────────────────────────────────────────

/**
 * Returns the Tailwind text + bg class for a heat percentage badge.
 * ≥70 → amber (hot), ≥40 → orange (warm), else → emerald (cool)
 */
export function getHeatBadgeClass(percent: number): string {
  if (percent >= 70) return 'text-amber-400 bg-amber-400/20';
  if (percent >= 40) return 'text-orange-400 bg-orange-400/20';
  return 'text-emerald-400 bg-emerald-400/20';
}

/**
 * Returns the Tailwind bg class for a heat dot indicator.
 */
export function getHeatDotClass(percent: number): string {
  if (percent >= 70) return 'bg-amber-400';
  if (percent >= 40) return 'bg-orange-400';
  return 'bg-emerald-400';
}
