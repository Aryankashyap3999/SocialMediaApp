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
    // Monolith home icon (no Insta house)
    home: filled ? (
      <>
        <rect x="6" y="8" width="12" height="13" rx="3" fill="currentColor" />
        <path d="M9 11h6v6H9z" fill="white" opacity="0.16" />
        <path d="M12 3l5 4h-10z" fill="currentColor" />
        <circle cx="12" cy="15" r="1.6" fill="white" opacity="0.8" />
      </>
    ) : (
      <>
        <rect x="6" y="8" width="12" height="13" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M12 3l5 4h-10z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="12" cy="15" r="1.6" fill="none" stroke="currentColor" strokeWidth="2" />
      </>
    ),
    // Unique diamond search icon
    search: (
      <>
        <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="11" cy="11" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
      </>
    ),
    // Compass-gyro discover icon
    discover: filled ? (
      <>
        <circle cx="12" cy="12" r="10" fill="currentColor" />
        <path d="M7 17l3-7 7-3-3 7z" fill="white" />
        <circle cx="12" cy="12" r="2" fill="currentColor" stroke="white" strokeWidth="1.5" />
      </>
    ) : (
      <>
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M7 17l3-7 7-3-3 7z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="2" fill="none" stroke="currentColor" strokeWidth="2" />
      </>
    ),
    // Signal icon (stacked pulses)
    stories: filled ? (
      <>
        <rect x="4" y="6" width="16" height="12" rx="3" fill="currentColor" />
        <path d="M7 12h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M9 9h6" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        <path d="M9 15h6" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      </>
    ) : (
      <>
        <rect x="4" y="6" width="16" height="12" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M7 12h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M9 9h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        <path d="M9 15h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      </>
    ),
    // Message icon (pill chat)
    messages: filled ? (
      <>
        <rect x="3" y="6" width="18" height="12" rx="4" fill="currentColor" />
        <path d="M8 14l-2.5 2.5V11" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="11" cy="12" r="1" fill="white" />
        <circle cx="15" cy="12" r="1" fill="white" />
      </>
    ) : (
      <>
        <rect x="3" y="6" width="18" height="12" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M8 14l-2.5 2.5V11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="11" cy="12" r="1" fill="currentColor" />
        <circle cx="15" cy="12" r="1" fill="currentColor" />
      </>
    ),
    // Notification sonar icon
    notifications: filled ? (
      <>
        <circle cx="12" cy="12" r="9" fill="currentColor" />
        <circle cx="12" cy="12" r="3" fill="white" />
        <path d="M6 12a6 6 0 0112 0" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 12a4 4 0 018 0" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      </>
    ) : (
      <>
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M6 12a6 6 0 0112 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 12a4 4 0 018 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
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
    // Profile glyph (orbital)
    profile: filled ? (
      <>
        <circle cx="12" cy="9" r="4" fill="currentColor" />
        <path d="M5 20c1.5-3 4.5-5 7-5s5.5 2 7 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M9 8.5c0-1.2.9-2.5 3-2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      </>
    ) : (
      <>
        <circle cx="12" cy="9" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M5 20c1.5-3 4.5-5 7-5s5.5 2 7 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
    // Lock icon
    lock: (
      <>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    // Camera icon
    camera: (
      <>
        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="13" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      </>
    ),
    // Help icon
    help: (
      <>
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    // Chevron Right icon
    chevronRight: (
      <path d="M9 18l6-6-6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ),
    // Chevron Left icon
    chevronLeft: (
      <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ),
    // Compose / write message icon
    compose: (
      <>
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    // Pin icon
    pin: (
      <path d="M12 2v8l3-2v4l-3 9-3-9v-4l3 2V2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ),
    // Mute / bell off icon
    mute: (
      <>
        <path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M18.63 13A17.89 17.89 0 0118 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M6.26 6.26A5.86 5.86 0 006 8c0 7-3 9-3 9h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 8a6 6 0 00-9.33-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    // Phone / call icon
    phone: (
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ),
    // Video / camera icon
    video: (
      <>
        <polygon points="23 7 16 12 23 17 23 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" />
      </>
    ),
    // Info icon
    info: (
      <>
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="12" y1="8" x2="12.01" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    // Send icon
    send: (
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ),
    // Microphone icon
    microphone: (
      <>
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19 10v2a7 7 0 01-14 0v-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="23" x2="16" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    // Close / X icon
    close: (
      <>
        <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    // Volume / speaker icon
    volume: (
      <>
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15.54 8.46a5 5 0 010 7.07" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M19.07 4.93a10 10 0 010 14.14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    // Location / map pin icon
    location: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
      </>
    ),
    // Music note icon
    music: (
      <>
        <path d="M9 18V5l12-2v13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="6" cy="18" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="18" cy="16" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
      </>
    ),
    // Plus icon
    plus: (
      <>
        <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
