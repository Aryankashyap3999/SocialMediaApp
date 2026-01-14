import React, { useState, useMemo } from 'react';
import { Icon } from '@components/atoms/Icon';
import { Avatar } from '@components/atoms/Avatar';
import { GradientBadge } from '@components/atoms/GradientBadge';

// Notification types
type NotificationType = 'like' | 'comment' | 'follow' | 'mention' | 'repost' | 'reply' | 'system';
type TimeFilter = 'all' | 'today' | 'week' | 'month';
type TypeFilter = 'all' | 'likes' | 'comments' | 'follows' | 'mentions';

interface Notification {
  id: string;
  type: NotificationType;
  user?: {
    name: string;
    username: string;
    avatarUrl: string;
    isVerified?: boolean;
  };
  content?: string;
  postPreview?: string;
  mediaUrl?: string;
  timestamp: string;
  daysAgo: number;
  isRead: boolean;
  isFollowing?: boolean;
}

// Mock notifications data with daysAgo for filtering
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    user: {
      name: 'Sarah Chen',
      username: 'sarahchen',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      isVerified: true,
    },
    postPreview: 'Just shipped the new feature! 🚀',
    mediaUrl: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=100&h=100&fit=crop',
    timestamp: '2m',
    daysAgo: 0,
    isRead: false,
  },
  {
    id: '2',
    type: 'follow',
    user: {
      name: 'Alex Rivera',
      username: 'alexrivera',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      isVerified: false,
    },
    timestamp: '15m',
    daysAgo: 0,
    isRead: false,
    isFollowing: false,
  },
  {
    id: '3',
    type: 'comment',
    user: {
      name: 'Tech Insights',
      username: 'techinsights',
      avatarUrl: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=100&h=100&fit=crop',
      isVerified: true,
    },
    content: 'This is such a great perspective!',
    mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop',
    timestamp: '1h',
    daysAgo: 0,
    isRead: false,
  },
  {
    id: '4',
    type: 'mention',
    user: {
      name: 'Design Weekly',
      username: 'designweekly',
      avatarUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=100&h=100&fit=crop',
      isVerified: true,
    },
    content: 'mentioned you in a comment',
    mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop',
    timestamp: '3h',
    daysAgo: 0,
    isRead: true,
  },
  {
    id: '5',
    type: 'like',
    user: {
      name: 'Emily Watson',
      username: 'emilywatson',
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      isVerified: false,
    },
    postPreview: 'Working on something exciting!',
    mediaUrl: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=100&h=100&fit=crop',
    timestamp: '5h',
    daysAgo: 0,
    isRead: true,
  },
  {
    id: '6',
    type: 'follow',
    user: {
      name: 'Marcus Johnson',
      username: 'marcusj',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      isVerified: true,
    },
    timestamp: '2d',
    daysAgo: 2,
    isRead: true,
    isFollowing: true,
  },
  {
    id: '7',
    type: 'like',
    user: {
      name: 'Creative Studio',
      username: 'creativestudio',
      avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop',
      isVerified: true,
    },
    postPreview: 'Design systems are the backbone...',
    mediaUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=100&h=100&fit=crop',
    timestamp: '3d',
    daysAgo: 3,
    isRead: true,
  },
  {
    id: '8',
    type: 'comment',
    user: {
      name: 'Foodie Adventures',
      username: 'foodieadv',
      avatarUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100&h=100&fit=crop',
      isVerified: true,
    },
    content: 'replied to your comment',
    timestamp: '4d',
    daysAgo: 4,
    isRead: true,
  },
  {
    id: '9',
    type: 'follow',
    user: {
      name: 'Travel Diaries',
      username: 'traveldiaries',
      avatarUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=100&h=100&fit=crop',
      isVerified: true,
    },
    timestamp: '1w',
    daysAgo: 7,
    isRead: true,
    isFollowing: false,
  },
  {
    id: '10',
    type: 'like',
    user: {
      name: 'John Doe',
      username: 'johndoe',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      isVerified: false,
    },
    postPreview: 'Great morning vibes ☀️',
    timestamp: '2w',
    daysAgo: 14,
    isRead: true,
  },
  {
    id: '11',
    type: 'mention',
    user: {
      name: 'Tech News',
      username: 'technews',
      avatarUrl: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=100&h=100&fit=crop',
      isVerified: true,
    },
    content: 'mentioned you in a post',
    timestamp: '3w',
    daysAgo: 21,
    isRead: true,
  },
  {
    id: '12',
    type: 'follow',
    user: {
      name: 'Art Gallery',
      username: 'artgallery',
      avatarUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=100&h=100&fit=crop',
      isVerified: false,
    },
    timestamp: '1mo',
    daysAgo: 35,
    isRead: true,
    isFollowing: true,
  },
];

// Helper function to get notification text
const getNotificationText = (notif: Notification): string => {
  switch (notif.type) {
    case 'like':
      return 'liked your post';
    case 'comment':
      return 'commented on your post';
    case 'follow':
      return 'started following you';
    case 'mention':
      return notif.content || 'mentioned you';
    case 'repost':
      return 'reposted your post';
    case 'reply':
      return 'replied to your comment';
    default:
      return '';
  }
};

// Section Header Component - defined outside main component
const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <div className="px-4 py-2 bg-slate-100 dark:bg-[#141414] border-y border-slate-200 dark:border-slate-800">
    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
  </div>
);

// Notification Item Component - defined outside main component
interface NotificationItemProps {
  notif: Notification;
  onToggleFollow: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notif, onToggleFollow }) => (
  <div
    className={`
      flex items-center gap-3 px-4 py-3 hover:bg-slate-100 dark:hover:bg-[#141414]
      transition-colors cursor-pointer
      ${!notif.isRead ? 'bg-slate-50 dark:bg-[#0f0f0f]' : ''}
    `}
  >
    {/* Avatar */}
    <div className="relative shrink-0">
      <Avatar
        src={notif.user?.avatarUrl || ''}
        alt={notif.user?.name || ''}
        size="md"
      />
      {!notif.isRead && (
        <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-amber-300 rounded-full border-2 border-white dark:border-[#0a0a0a]" />
      )}
    </div>

    {/* Content */}
    <div className="flex-1 min-w-0">
      <p className="text-sm leading-snug">
        <span className="font-semibold text-slate-900 dark:text-slate-100">
          {notif.user?.name}
        </span>
        {notif.user?.isVerified && (
          <Icon name="verified" size={14} className="inline-block ml-0.5 align-middle" />
        )}
        <span className="text-slate-500 dark:text-slate-400 ml-1">{getNotificationText(notif)}</span>
        <span className="text-slate-400 dark:text-slate-500 ml-1">{notif.timestamp}</span>
      </p>
    </div>

    {/* Right side - Follow button or Media thumbnail */}
    <div className="shrink-0">
      {notif.type === 'follow' ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFollow(notif.id);
          }}
          className={`
            px-4 py-1.5 text-sm font-semibold rounded-lg transition-all border
            ${notif.isFollowing
              ? 'bg-slate-100 dark:bg-[#141414] border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-cyan-400/40'
              : 'bg-linear-to-r from-cyan-400 to-amber-300 text-slate-950 hover:from-cyan-300 hover:to-amber-200 shadow-[0_10px_30px_-16px_rgba(0,0,0,0.8)]'
            }
          `}
        >
          {notif.isFollowing ? 'Following' : 'Follow'}
        </button>
      ) : notif.mediaUrl ? (
        <div className="w-11 h-11 rounded-lg overflow-hidden bg-slate-100 dark:bg-[#141414] border border-slate-200 dark:border-slate-700">
          <img
            src={notif.mediaUrl}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      ) : null}
    </div>
  </div>
);

// Filter configs
const timeFilters: { id: TimeFilter; label: string }[] = [
  { id: 'all', label: 'All Time' },
  { id: 'today', label: 'Today' },
  { id: 'week', label: 'This Week' },
  { id: 'month', label: 'This Month' },
];

const typeFilters: { id: TypeFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'likes', label: 'Likes' },
  { id: 'comments', label: 'Comments' },
  { id: 'follows', label: 'Follows' },
  { id: 'mentions', label: 'Mentions' },
];

/**
 * NotificationsPage Component
 * 
 * Instagram-style notifications with time-based grouping and filters
 */
export const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const toggleFollow = (notifId: string) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === notifId ? { ...n, isFollowing: !n.isFollowing } : n
      )
    );
  };

  // Filter notifications
  const filteredNotifications = useMemo(() => {
    return notifications.filter((notif) => {
      // Time filter
      if (timeFilter === 'today' && notif.daysAgo > 0) return false;
      if (timeFilter === 'week' && notif.daysAgo > 7) return false;
      if (timeFilter === 'month' && notif.daysAgo > 30) return false;

      // Type filter
      if (typeFilter === 'likes' && notif.type !== 'like') return false;
      if (typeFilter === 'comments' && !['comment', 'reply'].includes(notif.type)) return false;
      if (typeFilter === 'follows' && notif.type !== 'follow') return false;
      if (typeFilter === 'mentions' && notif.type !== 'mention') return false;

      return true;
    });
  }, [notifications, timeFilter, typeFilter]);

  // Group notifications by time period
  const groupedNotifications = useMemo(() => {
    const today: Notification[] = [];
    const thisWeek: Notification[] = [];
    const thisMonth: Notification[] = [];
    const earlier: Notification[] = [];

    filteredNotifications.forEach((notif) => {
      if (notif.daysAgo === 0) today.push(notif);
      else if (notif.daysAgo <= 7) thisWeek.push(notif);
      else if (notif.daysAgo <= 30) thisMonth.push(notif);
      else earlier.push(notif);
    });

    return { today, thisWeek, thisMonth, earlier };
  }, [filteredNotifications]);

  return (
    <div className="min-h-screen max-w-2xl mx-auto bg-white dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/92 dark:bg-[#0a0a0a]/92 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50">Notifications</h1>
            {unreadCount > 0 && (
              <GradientBadge>{unreadCount}</GradientBadge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm font-medium text-cyan-300 hover:text-amber-200 transition-colors"
              >
                Mark all read
              </button>
            )}
            {/* Filter Button */}
            <div className="relative">
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className={`
                  p-2 rounded-lg transition-colors
                  ${showFilterMenu || timeFilter !== 'all' || typeFilter !== 'all'
                    ? 'bg-slate-200 dark:bg-[#141414] border border-slate-300 dark:border-slate-700 text-cyan-600 dark:text-cyan-300'
                    : 'hover:bg-slate-100 dark:hover:bg-[#141414] text-slate-500 dark:text-slate-400'
                  }
                `}
              >
                <Icon name="filter" size={20} />
              </button>

              {/* Filter Dropdown */}
              {showFilterMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowFilterMenu(false)} 
                  />
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-[#0a0a0a] rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-20 overflow-hidden">
                    {/* Time Filters */}
                    <div className="p-3 border-b border-slate-200 dark:border-slate-700">
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                        Time Period
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {timeFilters.map((filter) => (
                          <button
                            key={filter.id}
                            onClick={() => setTimeFilter(filter.id)}
                            className={`
                              px-3 py-1.5 text-xs font-medium rounded-full transition-colors
                              ${timeFilter === filter.id
                                ? 'bg-linear-to-r from-cyan-400 to-amber-300 text-slate-950'
                                : 'bg-slate-100 dark:bg-[#141414] text-slate-700 dark:text-slate-300 hover:border-cyan-400/40 border border-slate-300 dark:border-slate-700'
                              }
                            `}
                          >
                            {filter.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Type Filters */}
                    <div className="p-3">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                        Notification Type
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {typeFilters.map((filter) => (
                          <button
                            key={filter.id}
                            onClick={() => setTypeFilter(filter.id)}
                            className={`
                              px-3 py-1.5 text-xs font-medium rounded-full transition-colors
                              ${typeFilter === filter.id
                                ? 'bg-linear-to-r from-cyan-400 to-amber-300 text-slate-950'
                                : 'bg-slate-100 dark:bg-[#141414] text-slate-700 dark:text-slate-300 hover:border-cyan-400/40 border border-slate-300 dark:border-slate-700'
                              }
                            `}
                          >
                            {filter.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Clear Filters */}
                    {(timeFilter !== 'all' || typeFilter !== 'all') && (
                      <div className="px-3 pb-3">
                        <button
                          onClick={() => {
                            setTimeFilter('all');
                            setTypeFilter('all');
                          }}
                          className="w-full py-2 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
                        >
                          Clear all filters
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {(timeFilter !== 'all' || typeFilter !== 'all') && (
          <div className="px-4 pb-3 flex items-center gap-2 text-slate-200">
            {timeFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 dark:bg-[#141414] border border-cyan-400/30 text-cyan-600 dark:text-cyan-200 text-xs font-medium rounded-full">
                {timeFilters.find(f => f.id === timeFilter)?.label}
                <button 
                  onClick={() => setTimeFilter('all')}
                  className="hover:text-amber-200"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            {typeFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 dark:bg-[#141414] border border-amber-300/40 text-amber-600 dark:text-amber-200 text-xs font-medium rounded-full">
                {typeFilters.find(f => f.id === typeFilter)?.label}
                <button 
                  onClick={() => setTypeFilter('all')}
                  className="hover:text-cyan-200"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Notifications List */}
      <div className="pb-20">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-[#141414] border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-3">
              <Icon name="notifications" size={28} className="text-slate-400 dark:text-slate-500" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
              No notifications
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
              {timeFilter !== 'all' || typeFilter !== 'all' 
                ? 'Try adjusting your filters'
                : 'When you get notifications, they\'ll show up here'
              }
            </p>
          </div>
        ) : (
          <>
            {/* Today */}
            {groupedNotifications.today.length > 0 && (
              <>
                <SectionHeader title="Today" />
                {groupedNotifications.today.map((notif) => (
                  <NotificationItem key={notif.id} notif={notif} onToggleFollow={toggleFollow} />
                ))}
              </>
            )}

            {/* This Week */}
            {groupedNotifications.thisWeek.length > 0 && (
              <>
                <SectionHeader title="This Week" />
                {groupedNotifications.thisWeek.map((notif) => (
                  <NotificationItem key={notif.id} notif={notif} onToggleFollow={toggleFollow} />
                ))}
              </>
            )}

            {/* This Month */}
            {groupedNotifications.thisMonth.length > 0 && (
              <>
                <SectionHeader title="This Month" />
                {groupedNotifications.thisMonth.map((notif) => (
                  <NotificationItem key={notif.id} notif={notif} onToggleFollow={toggleFollow} />
                ))}
              </>
            )}

            {/* Earlier */}
            {groupedNotifications.earlier.length > 0 && (
              <>
                <SectionHeader title="Earlier" />
                {groupedNotifications.earlier.map((notif) => (
                  <NotificationItem key={notif.id} notif={notif} onToggleFollow={toggleFollow} />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

NotificationsPage.displayName = 'NotificationsPage';
