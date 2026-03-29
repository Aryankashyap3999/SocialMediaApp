/**
 * Shared utility helpers
 * Single source of truth for common pure functions used across pages.
 */

/**
 * Returns a human-readable relative time string for a given ISO date string.
 * e.g. "2m", "4h", "3d", "now"
 */
export function getRelativeTime(dateString: string): string {
  if (!dateString) return 'recently';
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (seconds < 60) return 'now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  if (days < 30) return `${Math.floor(days / 7)}w`;
  return `${Math.floor(days / 30)}mo`;
}

/**
 * Returns the number of full days between now and the given ISO date string.
 */
export function getDaysAgo(dateString: string): number {
  const now = new Date();
  const date = new Date(dateString);
  return Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
}

/**
 * Formats a large number into a compact string.
 * e.g. 1_200_000 → "1.2M", 4_800 → "4.8K"
 */
export function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
}
