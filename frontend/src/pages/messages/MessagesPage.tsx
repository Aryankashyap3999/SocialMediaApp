import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { ConversationList, ChatView, EmptyState } from './components';
import { useAuth } from '@/hooks/context/useAuth';
import { useConversations, useMessages } from '@/hooks/queries/useMessages';
import { useSendMessage, useCreateConversation, useMarkConversationAsRead } from '@/hooks/mutations/useMessages';
import { useAllUsers } from '@/hooks/queries/useUsers';
import { Icon } from '@components/atoms/Icon';
import { Avatar } from '@components/atoms/Avatar';
import type { Conversation, Message } from './types';
import { getRelativeTime } from '@/utils/helpers';

export const MessagesPage: React.FC = () => {
  const { auth } = useAuth();
  const currentUserId = auth.user?._id || '';

  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [userSearch, setUserSearch] = useState('');

  // API hooks
  const { data: convsData } = useConversations();
  const { data: msgsData } = useMessages(activeConversationId || '', 50, 0);
  const { data: usersData } = useAllUsers();
  const sendMutation = useSendMessage();
  const createConvMutation = useCreateConversation();
  const markReadMutation = useMarkConversationAsRead();

  // Transform API conversations → UI Conversation[]
  const conversations = useMemo<Conversation[]>(() => {
    const apiConvs: any[] = convsData?.data ?? [];
    return apiConvs.map((conv) => {
      // Get the other participant(s) — exclude current user
      const others = conv.participants.filter((p: any) => p.id !== currentUserId);
      const uiParticipants = others.map((p: any) => ({
        id: p.id,
        name: p.name || p.username,
        username: p.username,
        email: '',
        avatarUrl: p.avatarUrl || '',
        isVerified: p.isVerified || false,
        isOnline: false,
      }));

      // Transform lastMessage
      let lastMessage: Message | undefined;
      if (conv.lastMessage) {
        const lm = conv.lastMessage;
        const senderId = typeof lm.sender === 'string' ? lm.sender : lm.sender?.id || lm.sender?._id || '';
        lastMessage = {
          id: lm.id || lm._id,
          // Use 'current' as sentinel so ConversationItem shows "You: ..."
          senderId: senderId === currentUserId ? 'current' : senderId,
          content: lm.content,
          timestamp: getRelativeTime(lm.createdAt),
          type: lm.type || 'text',
        };
      }

      // unreadCount is a Map/object keyed by userId
      const unread = conv.unreadCount?.[currentUserId] ?? 0;

      return {
        id: conv.id,
        participants: uiParticipants,
        isGroup: conv.isGroup || false,
        groupName: conv.groupName,
        groupAvatar: conv.groupAvatar,
        lastMessage,
        unreadCount: unread,
        isMuted: Array.isArray(conv.mutedBy) && conv.mutedBy.includes(currentUserId),
        isPinned: Array.isArray(conv.pinnedBy) && conv.pinnedBy.includes(currentUserId),
      };
    });
  }, [convsData, currentUserId]);

  // Transform API messages → UI Message[]
  const activeMessages = useMemo<Message[]>(() => {
    const apiMsgs: any[] = msgsData?.data ?? [];
    // Messages come newest-first from some backends; sort oldest-first for display
    return [...apiMsgs]
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .map((msg) => ({
        id: msg.id,
        senderId: msg.sender?.id || msg.sender?._id || msg.sender || '',
        content: msg.content,
        timestamp: getRelativeTime(msg.createdAt),
        type: msg.type || 'text',
        mediaUrl: msg.mediaUrl,
        isRead: msg.readBy ? Object.keys(msg.readBy).length > 0 : false,
      }));
  }, [msgsData]);

  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  // Mark conversation as read when opened
  useEffect(() => {
    if (activeConversationId) {
      markReadMutation.mutate(activeConversationId);
    }
  }, [activeConversationId]);

  const handleSelectConversation = useCallback((conversationId: string) => {
    setActiveConversationId(conversationId);
  }, []);

  const handleSendMessage = useCallback((content: string) => {
    if (!activeConversationId) return;
    sendMutation.mutate({ conversationId: activeConversationId, content });
  }, [activeConversationId, sendMutation]);

  const handleNewMessage = useCallback(() => {
    setShowNewMessage(true);
  }, []);

  const handleBack = useCallback(() => {
    setActiveConversationId(null);
  }, []);

  // Start a new conversation with a user
  const handleStartConversation = useCallback(async (userId: string) => {
    setShowNewMessage(false);
    setUserSearch('');
    createConvMutation.mutate(userId, {
      onSuccess: (data) => {
        const convId = data?.data?.id;
        if (convId) setActiveConversationId(convId);
      },
    });
  }, [createConvMutation]);

  // Filtered users for new message modal
  const filteredUsers = useMemo(() => {
    const allUsers: any[] = usersData?.data ?? [];
    if (!userSearch) return allUsers;
    const q = userSearch.toLowerCase();
    return allUsers.filter(
      (u) => u.username?.toLowerCase().includes(q) || u.name?.toLowerCase().includes(q)
    );
  }, [usersData, userSearch]);

  return (
    <div className="h-[calc(100vh-60px)] flex bg-[#0e0805] text-slate-100 relative">
      {/* Conversation List - Left Panel */}
      <div className={`
        w-full md:w-80 lg:w-96 shrink-0
        ${activeConversationId ? 'hidden md:block' : 'block'}
      `}>
        <ConversationList
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={handleSelectConversation}
          onNewMessage={handleNewMessage}
        />
      </div>

      {/* Chat View - Right Panel */}
      <div className={`
        flex-1
        ${activeConversationId ? 'block' : 'hidden md:block'}
      `}>
        {activeConversation ? (
          <ChatView
            conversation={activeConversation}
            messages={activeMessages}
            currentUserId={currentUserId}
            onSendMessage={handleSendMessage}
            onBack={handleBack}
          />
        ) : (
          <EmptyState onNewMessage={handleNewMessage} />
        )}
      </div>

      {/* New Message Modal */}
      {showNewMessage && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-sm mx-4 rounded-2xl bg-[#130a04] border border-orange-500/20 shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-orange-500/20">
              <h2 className="font-bold text-white">New Message</h2>
              <button
                onClick={() => { setShowNewMessage(false); setUserSearch(''); }}
                className="p-1.5 rounded-full hover:bg-slate-700 transition-colors"
              >
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Search */}
            <div className="px-4 py-2 border-b border-orange-500/20">
              <div className="relative">
                <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search people..."
                  autoFocus
                  className="w-full bg-orange-500/5 border border-orange-500/10 rounded-xl py-2 pl-9 pr-3 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-orange-400/50 placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* User list */}
            <div className="max-h-72 overflow-y-auto py-1">
              {filteredUsers.length === 0 ? (
                <p className="text-center text-slate-500 text-sm py-8">No users found</p>
              ) : (
                filteredUsers.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => handleStartConversation(user.id)}
                    disabled={createConvMutation.isPending}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-orange-500/10 transition-colors text-left"
                  >
                    <Avatar src={user.avatarUrl} alt={user.username} size="md" />
                    <div className="min-w-0">
                      <p className="font-semibold text-white text-sm truncate">{user.name || user.username}</p>
                      <p className="text-xs text-slate-500">@{user.username}</p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

MessagesPage.displayName = 'MessagesPage';
