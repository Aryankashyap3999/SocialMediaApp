import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@components/atoms/Icon';
import { Avatar } from '@components/atoms/Avatar';
import {
  useNotifications,
  useMarkNotificationAsRead,
  useMarkAllNotificationsAsRead,
} from '@/hooks';
import { getRelativeTime, getDaysAgo } from '@/utils/helpers';
import { TIME_FILTERS, TYPE_FILTERS } from '@/config/filters';
import type { TimeFilter, TypeFilter } from '@/config/filters';

type NotificationType = 'like' | 'comment' | 'follow' | 'mention' | 'repost' | 'reply' | 'system';

interface Notification {
  id: string;
  type: NotificationType;
  user?: { name: string; username: string; avatarUrl: string; isVerified?: boolean };
  content?: string;
  timestamp: string;
  daysAgo: number;
  isRead: boolean;
  isFollowing?: boolean;
}

interface ApiNotification {
  id: string;
  type: NotificationType;
  sender?: { username: string; avatarUrl: string; isVerified?: boolean };
  createdAt: string;
  isRead: boolean;
}


// Signal-desk language for notification types
const getSignalText = (notif: Notification): { verb: string; icon: string; color: string } => {
  switch (notif.type) {
    case 'like':
      return { verb: 'resonated with your drop', icon: '⚡', color: 'text-amber-400' };
    case 'comment':
      return { verb: 'dropped a signal on your broadcast', icon: '💬', color: 'text-orange-400' };
    case 'follow':
      return { verb: 'tuned in to your signal', icon: '📡', color: 'text-emerald-400' };
    case 'mention':
      return { verb: notif.content || 'mentioned you in a broadcast', icon: '@', color: 'text-purple-400' };
    case 'repost':
      return { verb: 'echoed your drop', icon: '🔁', color: 'text-orange-300' };
    case 'reply':
      return { verb: 'replied to your signal', icon: '↩', color: 'text-amber-300' };
    default:
      return { verb: 'sent you a signal', icon: '📻', color: 'text-slate-400' };
  }
};

// Pill for signal type icon
const SignalPill: React.FC<{ type: NotificationType }> = ({ type }) => {
  const map: Record<NotificationType, { bg: string; symbol: string }> = {
    like:    { bg: 'from-amber-500/30 to-amber-400/10 border-amber-400/30', symbol: '⚡' },
    comment: { bg: 'from-orange-500/30 to-orange-400/10 border-orange-400/30', symbol: '💬' },
    follow:  { bg: 'from-emerald-500/30 to-emerald-400/10 border-emerald-400/30', symbol: '📡' },
    mention: { bg: 'from-purple-500/30 to-purple-400/10 border-purple-400/30', symbol: '@' },
    repost:  { bg: 'from-orange-500/30 to-amber-400/10 border-amber-400/30', symbol: '🔁' },
    reply:   { bg: 'from-amber-500/30 to-orange-400/10 border-orange-400/30', symbol: '↩' },
    system:  { bg: 'from-slate-500/30 to-slate-400/10 border-slate-400/30', symbol: '📻' },
  };
  const { bg, symbol } = map[type] || map.system;
  return (
    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-linear-to-br ${bg} border flex items-center justify-center text-[10px] backdrop-blur-sm`}>
      {symbol}
    </div>
  );
};

// Section header
const GroupHeader: React.FC<{ title: string }> = ({ title }) => (
  <div className="px-4 py-2 flex items-center gap-3">
    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400/70 font-mono">{title}</span>
    <div className="flex-1 h-px bg-linear-to-r from-orange-500/20 to-transparent" />
  </div>
);

// Notification row
const NotificationRow: React.FC<{
  notif: Notification;
  onToggleFollow: (id: string) => void;
  onNavigate: (username: string) => void;
}> = ({ notif, onToggleFollow, onNavigate }) => {
  const markAsRead = useMarkNotificationAsRead();
  const { verb, color } = getSignalText(notif);

  const handleClick = () => {
    if (!notif.isRead) markAsRead.mutate(notif.id);
    if (notif.user?.username) onNavigate(notif.user.username);
  };

  return (
    <div
      onClick={handleClick}
      className={`relative flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-all duration-200 group
        ${!notif.isRead
          ? 'bg-orange-500/5 hover:bg-orange-500/10 border-l-2 border-orange-400/50'
          : 'hover:bg-white/5 border-l-2 border-transparent'
        }
      `}
    >
      {/* Unread pulse dot */}
      {!notif.isRead && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-linear-to-b from-orange-400 to-amber-400 rounded-r-full" />
      )}

      {/* Avatar + type pill */}
      <div className="relative shrink-0">
        <Avatar src={notif.user?.avatarUrl || ''} alt={notif.user?.name || ''} size="md" />
        <SignalPill type={notif.type} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm leading-snug">
          <span className="font-bold text-white">{notif.user?.name || notif.user?.username}</span>
          {notif.user?.isVerified && (
            <Icon name="verified" size={12} className="inline-block ml-0.5 align-middle" />
          )}
          {' '}
          <span className={`${color}`}>{verb}</span>
        </p>
        <p className="text-xs text-slate-600 mt-0.5">{notif.timestamp}</p>
      </div>

      {/* Follow button */}
      {notif.type === 'follow' && (
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFollow(notif.id); }}
          className={`shrink-0 px-4 py-1.5 text-xs font-bold rounded-xl transition-all border
            ${notif.isFollowing
              ? 'border-white/10 bg-white/5 text-slate-400 hover:border-red-400/30 hover:text-red-400'
              : 'border-orange-400/30 bg-linear-to-r from-orange-500/20 to-amber-400/20 text-orange-300 hover:from-orange-500/30 hover:to-amber-400/30'
            }
          `}
        >
          {notif.isFollowing ? 'Tuned In' : 'Tune In'}
        </button>
      )}
    </div>
  );
};

const timeFilters = TIME_FILTERS;
const typeFilters = TYPE_FILTERS;

export const NotificationsPage: React.FC = () => {
  const { data: notificationsData, isLoading } = useNotifications(50, 0);
  const markAllAsRead = useMarkAllNotificationsAsRead();

  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const notifications = useMemo<Notification[]>(() => {
    if (!notificationsData) return [];
    return notificationsData.data.map((n: ApiNotification) => ({
      id: n.id,
      type: n.type,
      user: n.sender ? {
        name: n.sender.username,
        username: n.sender.username,
        avatarUrl: n.sender.avatarUrl,
        isVerified: n.sender.isVerified,
      } : undefined,
      content: '',
      timestamp: getRelativeTime(n.createdAt),
      daysAgo: getDaysAgo(n.createdAt),
      isRead: n.isRead,
      isFollowing: false,
    }));
  }, [notificationsData]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filtered = useMemo(() => {
    return notifications.filter(n => {
      if (timeFilter === 'today' && n.daysAgo > 0) return false;
      if (timeFilter === 'week' && n.daysAgo > 7) return false;
      if (timeFilter === 'month' && n.daysAgo > 30) return false;
      if (typeFilter === 'likes' && n.type !== 'like') return false;
      if (typeFilter === 'comments' && !['comment', 'reply'].includes(n.type)) return false;
      if (typeFilter === 'follows' && n.type !== 'follow') return false;
      if (typeFilter === 'mentions' && n.type !== 'mention') return false;
      return true;
    });
  }, [notifications, timeFilter, typeFilter]);

  const grouped = useMemo(() => {
    const today: Notification[] = [], week: Notification[] = [], month: Notification[] = [], earlier: Notification[] = [];
    filtered.forEach(n => {
      if (n.daysAgo === 0) today.push(n);
      else if (n.daysAgo <= 7) week.push(n);
      else if (n.daysAgo <= 30) month.push(n);
      else earlier.push(n);
    });
    return { today, week, month, earlier };
  }, [filtered]);

  const navigate = useNavigate();
  const handleToggleFollow = () => { /* TODO: follow API */ };
  const handleNavigate = (username: string) => navigate(`/profile/${username}`);

  return (
    <div
      className="min-h-screen max-w-2xl mx-auto"
      style={{ background: 'linear-gradient(180deg, #0e0805 0%, #130a04 100%)' }}
    >
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-white/5 backdrop-blur-xl"
        style={{ background: 'rgba(14,8,5,0.90)' }}
      >
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-orange-400/60 font-mono">Signal Desk</p>
              <h1 className="text-xl font-black text-white leading-tight">
                Incoming Signals
                {unreadCount > 0 && (
                  <span className="ml-2 text-sm font-bold text-amber-400">{unreadCount}</span>
                )}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={() => markAllAsRead.mutate()}
                disabled={markAllAsRead.isPending}
                className="text-xs font-semibold text-orange-400 hover:text-amber-300 transition-colors px-3 py-1.5 rounded-lg border border-orange-400/20 hover:border-amber-400/30 bg-white/5"
              >
                {markAllAsRead.isPending ? '…' : 'Clear all'}
              </button>
            )}

            {/* Filter toggle */}
            <div className="relative">
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className={`p-2 rounded-xl transition-all border
                  ${showFilterMenu || timeFilter !== 'all' || typeFilter !== 'all'
                    ? 'border-orange-400/40 bg-orange-500/15 text-orange-300'
                    : 'border-white/10 bg-white/5 text-slate-500 hover:text-slate-300 hover:border-white/20'
                  }
                `}
              >
                <Icon name="filter" size={18} />
              </button>

              {showFilterMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowFilterMenu(false)} />
                  <div className="absolute right-0 top-full mt-2 w-60 rounded-2xl border border-white/10 bg-[#130a04]/95 backdrop-blur-xl shadow-2xl shadow-black/50 z-20 overflow-hidden">
                    <div className="p-3 border-b border-white/5">
                      <p className="text-xs font-bold uppercase tracking-widest text-orange-400/60 font-mono mb-2">Time Window</p>
                      <div className="flex flex-wrap gap-1.5">
                        {timeFilters.map(f => (
                          <button key={f.id} onClick={() => setTimeFilter(f.id)}
                            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all
                              ${timeFilter === f.id
                                ? 'bg-linear-to-r from-orange-500 to-amber-400 text-white'
                                : 'bg-white/5 border border-white/10 text-slate-400 hover:border-orange-400/30 hover:text-slate-200'
                              }
                            `}
                          >{f.label}</button>
                        ))}
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-bold uppercase tracking-widest text-orange-400/60 font-mono mb-2">Signal Type</p>
                      <div className="flex flex-wrap gap-1.5">
                        {typeFilters.map(f => (
                          <button key={f.id} onClick={() => setTypeFilter(f.id)}
                            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all
                              ${typeFilter === f.id
                                ? 'bg-linear-to-r from-orange-500 to-amber-400 text-white'
                                : 'bg-white/5 border border-white/10 text-slate-400 hover:border-orange-400/30 hover:text-slate-200'
                              }
                            `}
                          >{f.icon} {f.label}</button>
                        ))}
                      </div>
                    </div>
                    {(timeFilter !== 'all' || typeFilter !== 'all') && (
                      <div className="px-3 pb-3">
                        <button
                          onClick={() => { setTimeFilter('all'); setTypeFilter('all'); }}
                          className="w-full py-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
                        >
                          Reset filters
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Type filter pills scrollable row */}
        <div className="px-4 pb-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {typeFilters.map(f => (
            <button
              key={f.id}
              onClick={() => setTypeFilter(f.id)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all border
                ${typeFilter === f.id
                  ? 'border-orange-400/50 bg-orange-500/20 text-orange-300'
                  : 'border-white/8 bg-white/5 text-slate-500 hover:text-slate-300 hover:border-white/15'
                }
              `}
            >
              <span>{f.icon}</span>
              <span>{f.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="pb-20">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="relative w-16 h-16">
              {[40, 30, 20].map((r, i) => (
                <div key={r} className="absolute inset-0 rounded-full border border-cyan-500/30 animate-ping"
                  style={{ animationDelay: `${i * 0.3}s`, width: r, height: r, top: `${(16 - r / 2)}px`, left: `${(16 - r / 2)}px` }} />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.8)]" />
              </div>
            </div>
            <p className="text-xs text-slate-600 font-mono uppercase tracking-widest">Scanning signals…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 px-4">
            <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 to-amber-400/5" />
              <span className="text-3xl relative z-10">📻</span>
            </div>
            <h3 className="text-lg font-black text-white mb-1">No incoming signals</h3>
            <p className="text-sm text-slate-500 text-center max-w-xs">
              {timeFilter !== 'all' || typeFilter !== 'all'
                ? 'Try adjusting your signal filters'
                : 'When someone resonates with your drops, they\'ll appear here'}
            </p>
          </div>
        ) : (
          <div>
            {grouped.today.length > 0 && (
              <>
                <GroupHeader title="Today" />
                {grouped.today.map(n => <NotificationRow key={n.id} notif={n} onToggleFollow={handleToggleFollow} onNavigate={handleNavigate} />)}
              </>
            )}
            {grouped.week.length > 0 && (
              <>
                <GroupHeader title="This Week" />
                {grouped.week.map(n => <NotificationRow key={n.id} notif={n} onToggleFollow={handleToggleFollow} onNavigate={handleNavigate} />)}
              </>
            )}
            {grouped.month.length > 0 && (
              <>
                <GroupHeader title="This Month" />
                {grouped.month.map(n => <NotificationRow key={n.id} notif={n} onToggleFollow={handleToggleFollow} onNavigate={handleNavigate} />)}
              </>
            )}
            {grouped.earlier.length > 0 && (
              <>
                <GroupHeader title="Earlier" />
                {grouped.earlier.map(n => <NotificationRow key={n.id} notif={n} onToggleFollow={handleToggleFollow} onNavigate={handleNavigate} />)}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

NotificationsPage.displayName = 'NotificationsPage';
