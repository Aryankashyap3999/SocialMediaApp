/**
 * Filter configuration
 *
 * Static filter arrays used in the Notifications page (and reusable elsewhere).
 * Keeping them here prevents duplication and makes label/icon updates trivial.
 */

export type TimeFilter = 'all' | 'today' | 'week' | 'month';
export type TypeFilter = 'all' | 'likes' | 'comments' | 'follows' | 'mentions';

export interface TimeFilterOption {
  id: TimeFilter;
  label: string;
}

export interface TypeFilterOption {
  id: TypeFilter;
  label: string;
  icon: string;
}

export const TIME_FILTERS: TimeFilterOption[] = [
  { id: 'all',   label: 'All Time'    },
  { id: 'today', label: 'Today'       },
  { id: 'week',  label: 'This Week'   },
  { id: 'month', label: 'This Month'  },
];

export const TYPE_FILTERS: TypeFilterOption[] = [
  { id: 'all',      label: 'All',         icon: '📻' },
  { id: 'likes',    label: 'Resonances',  icon: '⚡' },
  { id: 'comments', label: 'Signals',     icon: '💬' },
  { id: 'follows',  label: 'Tune-ins',    icon: '📡' },
  { id: 'mentions', label: 'Mentions',    icon: '@'  },
];
