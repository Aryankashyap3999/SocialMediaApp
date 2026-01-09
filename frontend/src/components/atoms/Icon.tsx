import React from 'react';

export interface IconProps {
  name: string;
  size?: number;
  className?: string;
  filled?: boolean;
}

/**
 * Icon Atom - Custom unique SVG icons for Aptoodate
 */
export const Icon: React.FC<IconProps> = ({ name, size = 24, className = '', filled = false }) => {
  const icons: Record<string, React.ReactNode> = {
    // Unique hexagon-inspired home icon
    home: filled ? (
      <path fill="currentColor" d="M3 10.5L12 3l9 7.5v10a1.5 1.5 0 01-1.5 1.5h-4.5a1 1 0 01-1-1v-4a2 2 0 00-4 0v4a1 1 0 01-1 1H4.5A1.5 1.5 0 013 20.5v-10z" />
    ) : (
      <path d="M3 10.5L12 3l9 7.5v10a1.5 1.5 0 01-1.5 1.5h-4.5a1 1 0 01-1-1v-4a2 2 0 00-4 0v4a1 1 0 01-1 1H4.5A1.5 1.5 0 013 20.5v-10z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ),
    // Unique diamond search icon
    search: (
      <>
        <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="11" cy="11" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
      </>
    ),
    // Globe/discover icon - unique
    discover: filled ? (
      <>
        <circle cx="12" cy="12" r="10" fill="currentColor" />
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" fill="none" stroke="white" strokeWidth="1.5" />
      </>
    ) : (
      <>
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" fill="none" stroke="currentColor" strokeWidth="2" />
      </>
    ),
    // Unique play/stories icon with sparkle
    stories: filled ? (
      <>
        <rect x="3" y="3" width="18" height="18" rx="4" fill="currentColor" />
        <path d="M10 8.5v7l5.5-3.5-5.5-3.5z" fill="white" />
        <circle cx="17" cy="5" r="2" fill="#a855f7" />
      </>
    ) : (
      <>
        <rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M10 8.5v7l5.5-3.5-5.5-3.5z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="17" cy="5" r="2" fill="currentColor" />
      </>
    ),
    // Unique chat bubble with tail
    messages: filled ? (
      <path fill="currentColor" d="M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.96L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    ) : (
      <path d="M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.96L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ),
    // Unique bell with waves
    notifications: filled ? (
      <>
        <path fill="currentColor" d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path fill="currentColor" d="M13.73 21a2 2 0 01-3.46 0" />
        <path d="M1 8a3 3 0 013-3M23 8a3 3 0 00-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      </>
    ) : (
      <>
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    // Unique create icon - sparkle plus
    create: (
      <>
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="18" cy="4" r="2" fill="currentColor" />
        <circle cx="20" cy="8" r="1" fill="currentColor" opacity="0.5" />
      </>
    ),
    // Unique user profile icon with badge
    profile: filled ? (
      <>
        <circle cx="12" cy="8" r="4" fill="currentColor" />
        <path fill="currentColor" d="M20 21a8 8 0 10-16 0" />
      </>
    ) : (
      <>
        <circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M20 21a8 8 0 10-16 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    // Unique menu icon - dots grid
    more: (
      <>
        <circle cx="6" cy="6" r="1.5" fill="currentColor" />
        <circle cx="12" cy="6" r="1.5" fill="currentColor" />
        <circle cx="18" cy="6" r="1.5" fill="currentColor" />
        <circle cx="6" cy="12" r="1.5" fill="currentColor" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        <circle cx="18" cy="12" r="1.5" fill="currentColor" />
        <circle cx="6" cy="18" r="1.5" fill="currentColor" />
        <circle cx="12" cy="18" r="1.5" fill="currentColor" />
        <circle cx="18" cy="18" r="1.5" fill="currentColor" />
      </>
    ),
    // Unique star heart icon
    heart: filled ? (
      <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    ) : (
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ),
    // Unique comment bubble icon
    comment: (
      <>
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 9h8M8 13h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    // Unique forward/share icon
    share: (
      <>
        <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="16 6 12 2 8 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="12" y1="2" x2="12" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    // Unique bookmark/save icon
    bookmark: filled ? (
      <path fill="currentColor" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
    ) : (
      <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ),
    // Verified badge with shield
    verified: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#8b5cf6" />
        <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    // Play button
    play: (
      <path d="M5 3l14 9-14 9V3z" fill="currentColor" />
    ),
    // Settings gear
    settings: (
      <>
        <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" fill="none" stroke="currentColor" strokeWidth="2" />
      </>
    ),
    // Trending/Fire icon
    trending: (
      <path d="M12 2c.5 3.5-1.5 6.5-3 8 1.5 0 3 1 3 3 0 1.5-1 3-3 3s-3-1.5-3-3c0-2 1.5-3.5 3-5-1 2-2 3.5-2 5 0 1 .5 2 2 2s2-1 2-2c0-1-.5-2-1.5-2.5 2-1.5 3.5-4.5 2.5-8.5z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ),
    // Image icon
    image: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
        <polyline points="21 15 16 10 5 21" fill="none" stroke="currentColor" strokeWidth="2" />
      </>
    ),
    // GIF icon
    gif: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="12" y="14" textAnchor="middle" fontSize="8" fontWeight="bold" fill="currentColor">GIF</text>
      </>
    ),
    // Emoji icon
    emoji: (
      <>
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="9" y1="9" x2="9.01" y2="9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="15" y1="9" x2="15.01" y2="9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </>
    ),
    // Calendar/schedule icon
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" />
      </>
    ),
    // Dots menu (vertical)
    dotsVertical: (
      <>
        <circle cx="12" cy="5" r="1.5" fill="currentColor" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        <circle cx="12" cy="19" r="1.5" fill="currentColor" />
      </>
    ),
    // Reply icon
    reply: (
      <path d="M9 14L4 9l5-5M4 9h12a4 4 0 014 4v4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ),
    // Repost icon
    repost: (
      <>
        <path d="M17 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 11V9a4 4 0 014-4h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 23l-4-4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 13v2a4 4 0 01-4 4H3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    // Analytics/stats icon
    stats: (
      <>
        <line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="12" y1="20" x2="12" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    // At sign / mention icon
    atSign: (
      <>
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-3.92 7.94" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    // Add user / follow icon
    addUser: (
      <>
        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8.5" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="20" y1="8" x2="20" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="23" y1="11" x2="17" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    // Filter icon
    filter: (
      <>
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      {icons[name] || null}
    </svg>
  );
};

Icon.displayName = 'Icon';
