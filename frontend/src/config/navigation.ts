/**
 * Navigation configuration
 *
 * Single source of truth for all route definitions.
 * Used by both Sidebar (desktop) and MobileBottomNav.
 * Badge counts are dynamic and injected at render time.
 */

export interface NavRoute {
  to: string;
  icon: string;
  label: string;
  /** Key used to look up dynamic badge counts */
  badgeKey?: 'unreadNotifications' | 'unreadMessages';
}

/** Full nav for the desktop sidebar */
export const SIDEBAR_NAV: NavRoute[] = [
  { to: '/home',          icon: 'home',          label: 'Home'          },
  { to: '/discover',      icon: 'discover',       label: 'Discover'      },
  { to: '/stories',       icon: 'stories',        label: 'Signals'       },
  { to: '/notifications', icon: 'notifications',  label: 'Notifications', badgeKey: 'unreadNotifications' },
  { to: '/messages',      icon: 'messages',       label: 'Messages',      badgeKey: 'unreadMessages'      },
  { to: '/bookmarks',     icon: 'bookmark',       label: 'Saved'         },
  { to: '/profile',       icon: 'profile',        label: 'Profile'       },
];

/** Condensed nav for the mobile bottom bar (no stories/bookmarks) */
export const MOBILE_NAV: NavRoute[] = [
  { to: '/home',          icon: 'home',          label: 'Home'     },
  { to: '/discover',      icon: 'discover',       label: 'Discover' },
  { to: '/notifications', icon: 'notifications',  label: 'Alerts',   badgeKey: 'unreadNotifications' },
  { to: '/messages',      icon: 'messages',       label: 'Messages', badgeKey: 'unreadMessages'      },
  { to: '/profile',       icon: 'profile',        label: 'Profile'  },
];
